//Elementos de HTML:
//Botones encabezado:
let divCaja = document.getElementById('cajaPersonajes');
let botonFiltroTodos = document.getElementById('todos');
let botonFiltroMujeres = document.getElementById('mujeres');
let botonFiltroHombres = document.getElementById('hombres');
let botonFiltroSinGenero = document.getElementById('sinGenero');
let botonFiltroDesconocidos = document.getElementById('desconocidos');
// Botones paginado:
let botonPrimeraPagina = document.getElementById('primeraPagina');
let botonPaginaAtras = document.getElementById('paginaAtras');
let botonPaginaSiguiente = document.getElementById('paginaSiguiente');
let botonUltimaPagina = document.getElementById('ultimaPagina');

//Variable con el array de Personajes:
let totalPersonajes;
//Variable que me ayuda a iniciar el contador en la primera página: 
let paginaActual=1;



//Función para poder mostrar todos los Personajes:
function mostrarEnElHtml (arrPersonajes){
    divCaja.innerHTML='';//limpio el div con una string vacía
    arrPersonajes.forEach((listadoPersonajes)=>{
        divCaja.innerHTML +=`<div class="personajes">
                                <img class="imagenes" src="${listadoPersonajes.image}">
                                <h3 class="titulo">Nombre: ${listadoPersonajes.name} </h3>
                                <p>Género:  ${listadoPersonajes.gender} </p>
                                <p>Especie: ${listadoPersonajes.especies} </p>
                                <p>Estado:  ${listadoPersonajes.status} </p>
                                <p>Origen:  ${listadoPersonajes.origin.name} </p>
                                <p>Locación: ${listadoPersonajes.location.name} </p>
                                <div class="verMas">Ver Más</div>
                            </div>`
    })
}
//Pedido de info a la API con fetch:
function pedidoFetch (pagina){ 
fetch('https://rickandmortyapi.com/api/character/?page='+pagina)
.then( (data)=>{
    return data.json();
}).then( (data)=>{
    totalPersonajes = data.results;
    divCaja.innerHTML='';//ponemos una string vacía para limpiar lo que había en el div
    mostrarEnElHtml(totalPersonajes);
})
};
//Dejo afuera el pedido de Fetch para que se muestren los personajes al inicio:
pedidoFetch(paginaActual);

//Función para el filtrar la info según qué botón sea, si mujeres, hombres, etc.:
function filtroMujeres () {
    let mujeres = totalPersonajes.filter((listadoPersonajes)=>{
        return listadoPersonajes.gender==='Female';
    });
    mostrarEnElHtml(mujeres)
};
function filtroHombres(){
    let hombres = totalPersonajes.filter((listadoPersonajes)=>{
        return listadoPersonajes.gender==='Male';
    });
    mostrarEnElHtml(hombres)
};
function filtroTodos(){
    let todos = totalPersonajes.filter((listadoPersonajes)=>{
        return listadoPersonajes.gender;
    });
    mostrarEnElHtml(todos)
};
function filtroSinGenero(){
    let sinGenero = totalPersonajes.filter((listadoPersonajes)=>{
        return listadoPersonajes.gender==='unknown';
    });
    mostrarEnElHtml(sinGenero)
};
function filtroDesconocidos(){
    let desconocidos = totalPersonajes.filter((listadoPersonajes)=>{
        return listadoPersonajes.gender==='Genderless';
    });
    mostrarEnElHtml(desconocidos)
};

//creo el evento:
//elementoHtml.addEventListener ('tipo de evento', función que se ejecuta cuando sucede el evento ej: click)
botonFiltroTodos.addEventListener('click',filtroTodos);
botonFiltroMujeres.addEventListener('click',filtroMujeres);
botonFiltroHombres.addEventListener('click',filtroHombres);
botonFiltroSinGenero.addEventListener('click',filtroSinGenero);
botonFiltroDesconocidos.addEventListener('click',filtroDesconocidos);

//Paginado:
function siguientePagina(){
    paginaActual++;
    if(paginaActual===42){
        botonPaginaSiguiente.disabled=true;
        botonUltimaPagina.disabled=true;
    } else{
        botonPaginaAtras.disabled=false;
        botonPrimeraPagina.disabled=false;
    }
    pedidoFetch(paginaActual);
    //console.log(paginaActual);
};

function paginaAtras (){
    paginaActual--;
    if(paginaActual===1){
        botonPaginaAtras.disabled=true;
        botonPrimeraPagina.disabled=true;
    } else{
        botonPaginaSiguiente.disabled=false;
        botonUltimaPagina.disabled=false;
    }
    pedidoFetch(paginaActual);
    //console.log(paginaActual);
};

function primeraPagina(){
    paginaActual=1;
    if(paginaActual===1){
        botonPrimeraPagina.disabled=true;
        botonPaginaAtras.disabled=true;
    } else{
        botonPaginaAtras.disabled=false;
        botonPaginaSiguiente.disabled=false;
        botonUltimaPagina.disabled=false;
    }
    pedidoFetch(1);
    //console.log(paginaActual);
};

function ultimaPagina(){
    paginaActual=42;
    if(paginaActual===42){
        botonUltimaPagina.disabled=true;
        botonPaginaSiguiente.disabled=true;
        botonPaginaAtras.disabled=false;
        botonPrimeraPagina.disabled=false;
    } else{
        botonPaginaAtras.disabled=false;
        botonPrimeraPagina.disabled=false;
    }
    pedidoFetch(paginaActual);
    //console.log(paginaActual);
};

//Evento para paginado:
botonPaginaSiguiente.addEventListener('click',siguientePagina);
botonPaginaAtras.addEventListener('click',paginaAtras);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click',ultimaPagina);
//Este es el punto de partida de los botones al inicio:
botonPrimeraPagina.disabled=true;
botonPaginaAtras.disabled=true;
botonUltimaPagina.disabled=false;
botonPaginaSiguiente.disabled=false;

//le hacemos un pedido a la API a través de fetch es la promesa de una respuesta 
//.then obliga a esperar la respuesta de la promesa cumplida (fetch)
//transformo el formato "response" en formato json para poder trabajar la info en Js
//la conversión a formato json lleva un rato
//por último atrapamos la info en json con .then
//Se debe poder realizar mostrar un listado de personajes de la serie
// Se debe poder ver la siguiente información de cada personaje: Nombre - Género - Especies - Estado - Origen - Locación