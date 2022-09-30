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
//Parseo la variable para que no la sume como string en ningun momento
let total = parseInt(localStorage.getItem('totalString') != null ? localStorage.getItem('totalString') : 0);
//Uso la funcion split para convertir el String en Array
let menuesElegidos = localStorage.getItem('menues') != null ? localStorage.getItem('menues').split(',') : [];
let totalAMostrar = document.createElement("div");
let menuesAMostrar = document.createElement("h6");
const menuesElegidosSS=[] ;



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
   total += parseInt(hamburguesa.precio);
   menuesElegidos.push(idMenu)
   const totalString = JSON.stringify(total)
   localStorage.setItem('totalString', parseInt(totalString));
   totalAMostrar.innerHTML = `<h3>Total: $ ${totalString}</h3>`
   menuesAMostrar.innerHTML = menuesElegidos 
   VerificarMenuesEnSessionStorage(menuesAMostrar.innerHTML)
   document.body.appendChild(totalAMostrar);
   document.body.appendChild(menuesAMostrar);
   VerificarHamburguesasEnLocalStorage(hamburguesa)
   cartelAgregado();

};

function cartelAgregado(){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su combo ha sido agregado.',
        showConfirmButton: false,
        timer: 1500
      })
}

function VerificarMenuesEnSessionStorage(menuesAMostrar){
    const menuesElegidosString = JSON.stringify(menuesAMostrar)
    localStorage.setItem('menues', menuesAMostrar);
     this.menuesElegidosSS =  localStorage.getItem('menues');
}

function VerificarHamburguesasEnLocalStorage(hamburguesa){
    const hamburguesaString = JSON.stringify(hamburguesa)
    localStorage.setItem(hamburguesa.id, hamburguesaString);
    const hamburguesaLS = localStorage.getItem(hamburguesa.id); 

}

   


//Vuelvo al carrito desde 0.
const vaciarCarrito = document.querySelector("#vaciarCarrito");
vaciarCarrito.onclick = function () {
    Swal.fire({
        title: 'Desea eliminar su pedido?',
        text: "No podra revertir esta opcion.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si,eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado!',
            'Su pedido ha sido eliminado.',
            'success'
          );
          total=0;
          menuesElegidos = [];
          totalAMostrar.innerHTML = `<h3>Total: $ ${total}</h3>`
          menuesAMostrar.innerHTML = 'No selecciono ningun menu.'
          document.body.appendChild(totalAMostrar);
          document.body.appendChild(menuesAMostrar);
          localStorage.clear();
        }
      })

}

 document.addEventListener('DOMContentLoaded', ()=>{
        //Por cada DOMContentLoaded pregunto si los campos no son nulos.
        if(localStorage.getItem('totalString') != null){
          totalAMostrar.innerHTML += totalAMostrar.innerHTML = `<h3>Total: $ ${localStorage.getItem('totalString')}</h3>`;
        }
        else{
          totalAMostrar.innerHTML += totalAMostrar.innerHTML = `<h3>Total: $ ${0}</h3>`;
        }
        if(localStorage.getItem('menues') != null){
          menuesAMostrar.innerHTML += localStorage.getItem('menues');
        }
        else{
          menuesAMostrar.innerHTML += 'No selecciono ningun menu.';
        }
        
        document.body.appendChild(totalAMostrar);
        document.body.appendChild(menuesAMostrar);
        }
      );