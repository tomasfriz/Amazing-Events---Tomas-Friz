fetch('./assets/amazing.json')
    .then(response => response.json())
    .then(data => {
        let eventosPasados = data.events.filter(event => event.date < data.currentDate);
        let categoriaPasados = [];
        eventosPasados.forEach(element => {
            if (!categoriaPasados.includes(element.category)) {
                categoriaPasados.push(element.category)
            }
        });
        let arrayCategoriasPasadas = [];
        categoriaPasados.forEach(categoria => {
            let arrayCategoria = []
            eventosPasados.forEach(evento => {
                if (evento.category == categoria) {
                    arrayCategoria.push(evento);
                }
            })
            arrayCategoriasPasadas.push(arrayCategoria);
        })

        let eventosFuturos = data.events.filter(event => event.date > data.currentDate);
        let categoriaFuturos = [];
        eventosFuturos.forEach(element => {
            if (!categoriaFuturos.includes(element.category)) {
                categoriaFuturos.push(element.category)
            }
        });
        let arrayCategoriasFuturas = [];
        categoriaFuturos.forEach(categoria => {
            let arrayCategoria = []
            eventosFuturos.forEach(evento => {
                if (evento.category == categoria) {
                    arrayCategoria.push(evento);
                }
            })
            arrayCategoriasFuturas.push(arrayCategoria);
        })

        function sacarRevenues(arrayCategoriaX) {
            let acumulado = 0;
            arrayCategoriaX.forEach((categoria) => {
                if (categoria.assistance != null) {
                    acumulado += categoria.assistance * categoria.price;
                } else {
                    acumulado += categoria.estimate * categoria.price;
                }
            })
            return acumulado;
        }

        // let ArrayAux=[0,100];
        function sacarPorcentaje(arrayImportado) {
            let capacidadTotal = 0;
            let asistenciaTotal = 0;
            arrayImportado.forEach((categoria) => {
                if (categoria.assistance != null) {
                    asistenciaTotal += categoria.assistance;
                    capacidadTotal += categoria.capacity;
                } else {
                    asistenciaTotal += categoria.estimate;
                    capacidadTotal += categoria.capacity;
                }
            })
            let porcentaje = (asistenciaTotal / capacidadTotal) * 100;
            return porcentaje;
        }

        function porcentajeMenor() {
            let eventoMasAlto = 100;
            let nombrePasado = "";
            let porcentajePasado = 0;
            data.events.forEach((categoria) => {
                if (categoria.assistance != null) {
                    let porcentaje = (categoria.assistance / categoria.capacity) * 100;
                    if (porcentaje < eventoMasAlto) {
                        eventoMasAlto = porcentaje;
                        nombrePasado = categoria.name
                        porcentajePasado = porcentaje
                    }
                }
            })
            return `${nombrePasado} (${porcentajePasado.toFixed(2)}%)`;
        }

        function porcentajeMayor() {
            let eventoMasAlto = 0;
            let nombrePasado = "";
            let porcentajePasado = 0;
            data.events.forEach((categoria) => {
                if (categoria.assistance != null) {
                    let porcentaje = (categoria.assistance / categoria.capacity) * 100;
                    if (porcentaje > eventoMasAlto) {
                        eventoMasAlto = porcentaje;
                        nombrePasado = categoria.name
                        porcentajePasado = porcentaje
                    }
                }
            })
            return `${nombrePasado} (${porcentajePasado.toFixed(2)}%)`;
        }

        function capacidadMayor() {
            let nombre = "";
            let capacidad = 0;
            data.events.forEach((categoria) => {
                if (categoria.assistance != null) {
                    if (categoria.capacity > capacidad) {
                        nombre = categoria.name
                        capacidad = categoria.capacity
                    }
                }
            })
            return `${nombre} (${capacidad})`;
        }

        let main = document.getElementById("main");
        main.insertAdjacentHTML(
            "beforeend",
            `
        <div class="row mb-3 text-start border border-danger">
            <div class="col-12 fs-4 ps-0 text-center text-light bg-danger-subtle border border-danger">Events statistics</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Events with the highest percentage of attendance</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Events with the lowest percentage of attendance</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Event with larger capacity</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">${porcentajeMayor()}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">${porcentajeMenor()}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">${capacidadMayor()}</div>
        </div>
        <div class="row mb-3 text-start border border-danger">
            <div class="col-12 fs-4 ps-0 text-center text-light bg-danger-subtle border border-danger">Upcoming events statistics by category</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Categories</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Revenues</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Percentage of attendance</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Food</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasFuturas[0])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasFuturas[0]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Museum</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasFuturas[5])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasFuturas[5]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Concert</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasFuturas[4])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasFuturas[4]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Race</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasFuturas[3])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasFuturas[3]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Books</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasFuturas[1])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasFuturas[1]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Party</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasFuturas[2])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasFuturas[2]).toFixed(2)}</div>
        </div>
        <div class="row mb-3 text-start border border-danger">
            <div class="col-12 fs-4 ps-0 text-center text-light bg-danger-subtle border border-danger">Past events statistics by category</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Categories</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Revenues</div>
            <div class="col-4 fs-6 text-light bg-danger-subtle themed-grid-col border border-danger">Percentage of attendance</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Food</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasPasadas[0])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasPasadas[0]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Museum</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasPasadas[1])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasPasadas[1]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Concert</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasPasadas[2])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasPasadas[2]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Race</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasPasadas[3])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasPasadas[3]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Books</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasPasadas[4])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasPasadas[4]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Cinema</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasPasadas[5])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasPasadas[5]).toFixed(2)}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">Party</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">$${sacarRevenues(arrayCategoriasPasadas[6])}</div>
            <div class="col-4 fs-6 themed-grid-col border border-danger">%${sacarPorcentaje(arrayCategoriasPasadas[6]).toFixed(2)}</div>
        </div>
        `
        )
    })
    .catch(error => console.error(error));