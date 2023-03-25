import { data } from "./data.js"

let bodyInsert = document.getElementById("bodyInsert")

function InsertarElementos(element) {
    if (bodyInsert != null) {
        bodyInsert.insertAdjacentHTML(
            "beforeend",
            `
        <div class="d-inline-block mt-2 ms-2 card border border-dark bg-danger text-light ${element.category.toLowerCase()} ${element._id}">
            <img src="${element.image}" class="card-img-top border-bottom border-dark" alt="${element.name}">
            <div style="height: 60%" class="card-body d-flex flex-column justify-content-between">
                <div>
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text description py-4">${element.description}</p>
                </div>
                <div>
                    <div class="d-flex justify-content-between">
                        <a type="button" class="btn btn-dark" href="./details.html?id=${element._id}">
                        Learn more
                        </a>
                        <p class="ms-3 py-2 text-center d-block my-auto bg-secondary rounded w-25 text-light">${element.price}$</p>
                    </div>
                </div>
            </div>
        </div>
        `
        )
    }
}
if (window.location.href.includes('/index.html')) {
    data.events.forEach((element) => InsertarElementos(element))
} else if (window.location.href.includes('/pastEvents.html')) {
    data.events.forEach((element) => { if (element.date < data.currentDate) { InsertarElementos(element) } })
} else if (window.location.href.includes('/futureEvents.html')) {
    data.events.forEach((element) => { if (element.date > data.currentDate) { InsertarElementos(element) } })
}

//Filtrado
const Tarjetas = document.querySelectorAll(".card")
const filtros = document.querySelectorAll(".filtro")
let filtrosActivos = []

function filtrar() {
    Tarjetas.forEach((elemento) => {
        elemento.classList.remove('Activo')
        //Se ocultan todos los elementos
        visibility(elemento, 'ocultar')
        filtros.forEach((filtro) => {
            //Si el filtro esta activo
            if (filtro.checked) {
                //Y no esta colocado en el array de filtros activos
                if (!filtrosActivos.includes(filtro.dataset.valor)) {
                    //Lo añade
                    filtrosActivos.push(filtro.dataset.valor)
                }
                //Todos los elementos que cumplan con el filtro se muestran
                for (let i = 0; i <= filtrosActivos.length - 1; i++) {
                    if (elemento.classList.contains(filtrosActivos[i])) {
                        visibility(elemento, 'mostrar')
                        elemento.classList.add('Activo')
                    }
                }
                //Si el filtro no esta activo
            } else {
                //Si estaba activado y se desactivo
                if (filtrosActivos.includes(filtro.dataset.valor)) {
                    //Se quita
                    filtrosActivos = filtrosActivos.filter(
                        (mod) => mod != filtro.dataset.valor
                    )
                }
            }
        })
        //Si no hay ningun filtro activo se muestran todos
        if (filtrosActivos.length == 0) {
            visibility(elemento, 'mostrar')
            elemento.classList.remove('Activo')
        }
    })
}

//Listener de evento
filtros.forEach((filtro) => {
    filtro.addEventListener("change", filtrar)
})

// Filtrado de texto
const search = document.querySelector("#Search")

//Listener de texto
search.addEventListener("keyup", () => {
    //Cantidad de tarjetas ocultas
    let tarjetasOcultas = 0
    //Si la barra de busqueda no esta vacia
    if (search.value != '') {
        //Si no hay filtros activos
        if (filtrosActivos.length == 0) {
            Tarjetas.forEach((Tarjeta) => {
                //Se guarda toda la informacion de la tarjeta
                let ClasesTarjeta = Tarjeta.textContent.toLowerCase()
                if (ClasesTarjeta.includes(search.value.toLowerCase())) {
                    visibility(Tarjeta, 'mostrar')
                    notFound(false)
                } else {
                    visibility(Tarjeta, 'ocultar')
                    tarjetasOcultas += 1
                }
                if (tarjetasOcultas == Tarjetas.length) {
                    notFound(true)
                }
            })
            //Si hay filtros activos
        } else {
            let Activos = document.querySelectorAll('.Activo')
            Activos.forEach((Tarjeta) => {
                //Se guarda toda la informacion de la tarjeta
                let ClasesTarjeta = Tarjeta.textContent.toLowerCase()
                if (ClasesTarjeta.includes(search.value.toLowerCase())) {
                    visibility(Tarjeta, 'mostrar')
                    notFound(false)
                } else {
                    visibility(Tarjeta, 'ocultar')
                    tarjetasOcultas += 1
                }

                if (tarjetasOcultas == Activos.length) {
                    notFound(true)
                }
            })
        }
        //Si la barra de busqueda esta vacia
    } else {
        if (filtrosActivos.length == 0) {
            Tarjetas.forEach((Tarjeta) => {
                visibility(Tarjeta, 'mostrar')
                notFound(false)
            })
        }
    }
})

//Si no encuentra los elementos..
function notFound(cantidadDeCarteles) {
    let cartel = document.getElementById("NotFound");
    let bloqueMain = document.querySelector("main")
    if (cantidadDeCarteles == 1) {
        if (cartel == null) {
            bloqueMain.insertAdjacentHTML(
                "beforeend",
                `
                    <section id="NotFound" class="m-auto text-center text-light w-50 shadow rounded p-3 bg-danger border border-dark">
                        <h2 class="fs-2">No events found<h2>
                        <p class="fs-5">Try again<p>
                    </section>
                `
            )
        }
    } else if (cantidadDeCarteles == 0) {
        if (cartel != null) {
            cartel.remove()
            cantidadDeCarteles = 0
        }
    }
}

//Oculta o muestra los elementos
function visibility(elemento, view) {
    if (view == 'mostrar') {
        elemento.style.setProperty("display", "block", "important")
    } else if (view == 'ocultar') {
        elemento.style.setProperty("display", "none", "important")
    }
}