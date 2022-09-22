//Declaro Objeto.
class Menu {
    constructor (id, nombre, precio){
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }

}

//Declaro instancias del objeto.
const hamburguesaQueso = new Menu ("1", "Hamburguesa con queso" , 1000);
const hamburguesaDoble = new Menu ("2", "Hamburguesa doble" , 1500);
const hamburguesaBacon = new Menu ("3", "Hamburguesa bacon", 1600);

//Declaro variables.
let idMenu;
let total = 0;
let menuesElegidos = [];
let totalAMostrar = document.createElement("div");
let menuesAMostrar = document.createElement("h6");


//Genero constantes trayendo la info por id.
//Escucho el evento con el que interactua el usuario.
const hamburQueso = document.querySelector("#SuperHambQueso");
hamburQueso.addEventListener("click", () => {
    agregar(hamburguesaQueso);
  });
    



const hamburDoble = document.querySelector("#SuperHambDoble");
hamburDoble.addEventListener("click", () => {
    agregar(hamburguesaDoble);
  });

const hamburBacon = document.querySelector("#SuperHambBacon");
hamburBacon.addEventListener("click", () => {
    agregar(hamburguesaBacon);
  });


//Funcion que utilizan todos los menus de la web ya que comparten variables y objeto.
function agregar(hamburguesa){
   idMenu =  hamburguesa.nombre
   total += hamburguesa.precio;
   menuesElegidos.push(idMenu)
   VerificarMenuesEnSessionStorage(menuesElegidos)
   totalAMostrar.innerHTML = `<h3>Total: $ ${total}</h3>`
   menuesAMostrar.innerHTML = menuesElegidos
   document.body.appendChild(totalAMostrar);
   document.body.appendChild(menuesAMostrar);
   VerificarHamburguesasEnLocalStorage(hamburguesa)
};

function VerificarMenuesEnSessionStorage(menuesElegidos){
    const menuesElegidosString = JSON.stringify(menuesElegidos)
    sessionStorage.setItem('menues', menuesElegidosString);
    const menuesElegidosLS =  sessionStorage.getItem('menues');
}

function VerificarHamburguesasEnLocalStorage(hamburguesa){
    const hamburguesaString = JSON.stringify(hamburguesa)
    localStorage.setItem(hamburguesa.id, hamburguesaString);
    const hamburguesaLS =  localStorage.getItem(hamburguesa.id); 
}

//Vuelvo al carrito desde 0.
const vaciarCarrito = document.querySelector("#vaciarCarrito");
vaciarCarrito.onclick = function () {
    total=0;
    menuesElegidos = [];
    totalAMostrar.innerHTML = `<h3>Total: $ ${total}</h3>`
    menuesAMostrar.innerHTML = 'No selecciono ningun menu.'
    document.body.appendChild(totalAMostrar);
    document.body.appendChild(menuesAMostrar);
    localStorage.clear();
}

