//Declaro Objeto.
class Menu {
    constructor (id, nombre, precio){
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }

}
//Declaro variables.
let hamburguesaQueso;
let hamburguesaDoble;
let hamburguesaBacon;
const listaCombos =[];
let idMenu;
const menuesElegidosSS=[] ;
//Parseo la variable para que no la sume como string en ningun momento
let total = parseInt(sessionStorage.getItem('totalString') != null ? sessionStorage.getItem('totalString') : 0);
//Uso la funcion split para convertir el String en Array
let menuesElegidos = sessionStorage.getItem('menues') != null ? sessionStorage.getItem('menues').split(',') : [];
let totalAMostrar = document.createElement("div");
let menuesAMostrar = document.createElement("h6");
let ContadorSuperHambDoble = parseInt(sessionStorage.getItem('ContadorSuperHambDoble') != null ? sessionStorage.getItem('ContadorSuperHambDoble') : 0);
let ContadorSuperHambBacon = parseInt(sessionStorage.getItem('ContadorSuperHambBacon') != null ? sessionStorage.getItem('ContadorSuperHambBacon') : 0);
let ContadorHambQueso = parseInt(sessionStorage.getItem('ContadorHambQuesoString') != null ? sessionStorage.getItem('ContadorHambQuesoString') : 0);
let nombre = localStorage.getItem('nombreString')!= null ? localStorage.getItem('nombreString') : "";
let email = localStorage.getItem('emailString')!= null ? localStorage.getItem('emailString') : "";;
let domicilio = localStorage.getItem('domicilioString')!= null ? localStorage.getItem('domicilioString') : ""; ;


//Traigo los datos de un archivo JSON local, como default GET.
fetch('data.json')
    .then( (res) => res.json()) 
    .then( (data) => {
        data.forEach((producto) => {
          listaCombos.push(new Menu (producto.id,producto.nombre,producto.precio))
        })
    })
    .catch((error) =>{
      console.log(error)
    })
  

setTimeout(() =>{
  //Declaro instancias del objeto.
    hamburguesaQueso = listaCombos[0];
    hamburguesaDoble = listaCombos[1];
    hamburguesaBacon = listaCombos[2];
  },1000)

const ingresarUsuario = document.querySelector("#ingresarUsuario");
ingresarUsuario.addEventListener("click", () => {
  iniciarSesion();
});

function iniciarSesion(){
  Swal
  .fire({
   title: 'Iniciar Sesion',
   html:
     '<label>Nombre</label><input id="swal-input1" class="swal2-input">' +
     '<label>Domicilio</label><input id="swal-input2" class="swal2-input">'+
     '<label>Email</label><input id="swal-input3" class="swal2-input">',
   focusConfirm: false,
   preConfirm: () => {
     return [
       nombre = document.querySelector('#swal-input1').value,
       domicilio = document.querySelector('#swal-input2').value,
       email = document.querySelector('#swal-input3').value,
       nombreString = JSON.stringify(nombre),
       localStorage.setItem('nombreString', nombreString),
       emailString = JSON.stringify(email),
       localStorage.setItem('nombreString', emailString),
       domicilioString = JSON.stringify(domicilio),
       localStorage.setItem('nombreString', domicilioString),
       Swal.fire(
        'Bienvenido!',
        'Comeras las mejores hamburguesas.',
        'success'
      ),
     ]
   }
 })
} 


const cerrarSesion = document.querySelector("#cerrarSesion");
cerrarSesion.onclick = function  ()  {
    Swal.fire({
        title: 'Estas seguro que desea finalizar su sesion?',
        text: "Se borrara su pedido en progreso.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Si,cerrar sesion!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Hasta la proxima!',
            'Has finalizado tu sesion.',
            'success'
          );
          nombre = "";
          email = "";
          domicilio = "";
          limpiarVariables();
          
        }
      })
  }



//Genero constantes trayendo la info por id.
//Escucho el evento con el que interactua el usuario.
const hamburQueso = document.querySelector("#SuperHambQueso");
hamburQueso.addEventListener("click", () => {
  if (nombre === undefined || nombre === ""){
    preguntarInicioSesion()
  }
  else{
    setTimeout(() =>{
      ContadorHambQueso++
      const ContadorHambQuesoString = JSON.stringify(ContadorHambQueso)
      sessionStorage.setItem('ContadorHambQuesoString', parseInt(ContadorHambQuesoString));
      modificarProducto(",",hamburguesaQueso,ContadorHambQuesoString,"#ContadorHambQueso");
    },1000)
  }
});

const hamburDoble = document.querySelector("#SuperHambDoble");
hamburDoble.addEventListener("click", () => {
  if (nombre === undefined || nombre === ""){
    preguntarInicioSesion()
  }
  else{
    setTimeout(() =>{
        ContadorSuperHambDoble++
        const ContadorSuperHambDobleString = JSON.stringify(ContadorSuperHambDoble)
        sessionStorage.setItem('ContadorSuperHambDoble', parseInt(ContadorSuperHambDobleString));
        modificarProducto("+",hamburguesaDoble,ContadorSuperHambDobleString,"#ContadorSuperHambDoble");
    },1000)
  }
});

const hamburBacon = document.querySelector("#SuperHambBacon");
hamburBacon.addEventListener("click", () => {
  if (nombre === undefined || nombre === ""){
    preguntarInicioSesion()
  }
  else{
    setTimeout(() =>{
      ContadorSuperHambBacon++
      const ContadorSuperHambBaconString = JSON.stringify(ContadorSuperHambBacon)
      sessionStorage.setItem('ContadorSuperHambBacon', parseInt(ContadorSuperHambBaconString));
      modificarProducto("+",hamburguesaBacon,ContadorSuperHambBaconString,"#ContadorSuperHambBacon");
    },1000)
  }  
});

const QuitarSuperHambQueso = document.querySelector("#QuitarSuperHambQueso");
QuitarSuperHambQueso.addEventListener("click", () => {
  if (nombre === undefined || nombre === ""){
    preguntarInicioSesion()
  }
  else{
    setTimeout(() =>{
      if(ContadorHambQueso >0){
        ContadorHambQueso--
        const ContadorHambQuesoString = JSON.stringify(ContadorHambQueso)
        sessionStorage.setItem('ContadorHambQuesoString', parseInt(ContadorHambQuesoString));
        modificarProducto("-",hamburguesaQueso,ContadorHambQuesoString,"#ContadorHambQueso");
      }
      },1000)
  }
});

const QuitarSuperHambDoble = document.querySelector("#QuitarSuperHambDoble");
QuitarSuperHambDoble.addEventListener("click", () => {
  if (nombre === undefined || nombre === ""){
    preguntarInicioSesion()
  }
  else{ 
    setTimeout(() =>{
      if(ContadorSuperHambDoble > 0){
      ContadorSuperHambDoble--
      const ContadorSuperHambDobleString = JSON.stringify(ContadorSuperHambDoble)
      sessionStorage.setItem('ContadorSuperHambDoble', parseInt(ContadorSuperHambDobleString));
      modificarProducto("-",hamburguesaDoble,ContadorSuperHambDobleString,"#ContadorSuperHambDoble");
      }
    },1000)
  }
  });

const QuitarSuperHambBacon = document.querySelector("#QuitarSuperHambBacon");
QuitarSuperHambBacon.addEventListener("click", () => {
  if (nombre === undefined || nombre === ""){
    preguntarInicioSesion()
  }
  else{  
    setTimeout(() =>{
      if(ContadorSuperHambBacon > 0){
        ContadorSuperHambBacon--
        const ContadorSuperHambBaconString = JSON.stringify(ContadorSuperHambBacon)
        sessionStorage.setItem('ContadorSuperHambBacon', parseInt(ContadorSuperHambBaconString));
        modificarProducto("-",hamburguesaBacon,ContadorSuperHambBaconString,"#ContadorSuperHambBacon");
      }
    },1000)
  }
});

//Corroborar que el usuario haya iniciado sesion
function preguntarInicioSesion(){
  Swal.fire({
    title: 'Iniciar Sesion',
    text: "Inicie sesion para poder armar su pedido",
    icon: 'error',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: "Cancelar",
    confirmButtonText: 'Iniciar Sesion'
  }).then((result) => {
    if (result.isConfirmed) {
      iniciarSesion();
    }
  })
}
  

//Funcion que utilizan todos los menus de la web ya que comparten variables y objeto.

 function modificarProducto(operacion,hamburguesa,contador,contadorNombre){
  idMenu =  hamburguesa.nombre
  
  if(operacion == "-"){
    total -= parseInt(hamburguesa.precio);
    const index = menuesElegidos.map(e => e).indexOf(hamburguesa.nombre);
    menuesElegidos.splice(index,1)
     cartelRemovido();
  }
  else{
    
    total += parseInt(hamburguesa.precio);
    menuesElegidos.push(idMenu)
     cartelAgregado();
  }
  const totalString = JSON.stringify(total)
  sessionStorage.setItem('totalString', parseInt(totalString));
  totalAMostrar.innerHTML = `<h3>Total: $ ${totalString}</h3>`
  menuesAMostrar.innerHTML = menuesElegidos 
  VerificarMenuesEnSessionStorage(menuesAMostrar.innerHTML)
  document.body.appendChild(totalAMostrar);
  document.body.appendChild(menuesAMostrar);
  VerificarHamburguesasEnsessionStorage(hamburguesa)
  document.querySelector(contadorNombre).innerHTML=contador;
  
  
}

function cartelAgregado(){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Su combo ha sido agregado.',
        showConfirmButton: false,
        timer: 1500
      })
}

function cartelRemovido(){
  Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Su combo ha sido eliminado.',
      showConfirmButton: false,
      timer: 1500
    })
}

function VerificarMenuesEnSessionStorage(menuesAMostrar){
    const menuesElegidosString = JSON.stringify(menuesAMostrar)
    sessionStorage.setItem('menues', menuesAMostrar);
     this.menuesElegidosSS =  sessionStorage.getItem('menues');
}

function VerificarHamburguesasEnsessionStorage(hamburguesa){
    const hamburguesaString = JSON.stringify(hamburguesa)
    sessionStorage.setItem(hamburguesa.id, hamburguesaString);
    const hamburguesaLS = sessionStorage.getItem(hamburguesa.id); 

}

//Vuelvo al carrito desde 0.
const vaciarCarrito = document.querySelector("#vaciarCarrito");
vaciarCarrito.onclick = function  ()  {
  if(total > 0){
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
          limpiarVariables();
        }
      })
   }

  }
  //Separo el sweetAlert de las variables que se tienen que limpiar
  function limpiarVariables(){
          total=0;
          menuesElegidos = [];
          document.querySelector("#ContadorHambQueso").innerHTML=0
          document.querySelector("#ContadorSuperHambDoble").innerHTML=0
          document.querySelector("#ContadorSuperHambBacon").innerHTML=0
          ContadorHambQueso = 0;
          ContadorSuperHambDoble = 0;
          ContadorSuperHambBacon = 0;
          totalAMostrar.innerHTML = `<h3>Total: $ ${total}</h3>`
          menuesAMostrar.innerHTML = 'No selecciono ningun menu.'
          document.body.appendChild(totalAMostrar);
          document.body.appendChild(menuesAMostrar);
          sessionStorage.clear();
  }

  const finalizarCompra = document.querySelector("#finalizarCompra");
  
  finalizarCompra.onclick = function  ()  {
    if(total > 0){
      Swal.fire({
          title: 'Finalizar compra?',
          text: nombre + " si finaliza la compra no podra agregar mas productos.",
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: "Cancelar",
          confirmButtonText: 'Comprar ahora'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'En Camino!',
              'Su pedido de ' + menuesElegidos +  '\n\resta en camino hacia su domicilio:'+ domicilio +  '\n\r' + "Total: $" + total +'.\n\r' + "Podra seguir su pedido por su mail:" + email,
              'success'
            );
            limpiarVariables();
            
          }
        })
      }
      else{
        Swal.fire(
          'Seleccione un combo para continuar',
          'No selecciono ningun combo!',
          'error'
        );
      }

  }

 document.addEventListener('DOMContentLoaded', ()=>{
        document.querySelector("#ContadorHambQueso").innerHTML=ContadorHambQueso
        document.querySelector("#ContadorSuperHambDoble").innerHTML=ContadorSuperHambDoble
        document.querySelector("#ContadorSuperHambBacon").innerHTML=ContadorSuperHambBacon
        totalAMostrar.innerHTML +=  sessionStorage.getItem('totalString') != null ? `<h3>Total: $ ${sessionStorage.getItem('totalString')}</h3>`: `<h3>Total: $ ${0}</h3>`;
        menuesAMostrar.innerHTML += sessionStorage.getItem('menues') != null ? sessionStorage.getItem('menues') : 'No selecciono ningun menu.';
        document.body.appendChild(totalAMostrar);
        document.body.appendChild(menuesAMostrar);
        }
      );