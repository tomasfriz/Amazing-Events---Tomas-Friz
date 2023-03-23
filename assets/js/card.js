fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => console.log(error))
const urlObject = new URL(window.location.href);
const idObjeto = urlObject.searchParams.get('id');

let insertdata = document.getElementById("contenedor");

function InsertarDatos(id){
    if (insertdata != null) {
        data.events.forEach((event)=>{
            if(event._id==id){
                insertdata.insertAdjacentHTML("beforeend",`
                <div class="m-auto d-flex flex-column w-50">
                        <div class="row shadow rounded d-flex p-3">
                            <div class="w-100 mx-3 mx-auto my-auto col">
                                <img src="${event.image}" alt="Illustatrive image" class="w-100 rounded">
                            </div>
                            <section class="d-flex text-dark flex-column g-2 col-sm-8">
                                <h2>${event.name}<span class="badge fs-6 ms-2 bg-secondary">${event.date}</span></h2>
                                <p>${event.description}</p>
                                <section>
                                    <i class="bi bi-cash-stack"></i>
                                    <p class="d-inline fw-bold">Price:</p>
                                    <p class="d-inline">${event.price}</p>
                                </section>
                                <section>
                                    <i class="bi bi-geo-alt-fill"></i>
                                    <p class="d-inline fw-bold">Location:</p>
                                    <p class="d-inline">${event.place}</p>
                                </section>
                                <section>
                                    <i class="bi d-inline bi-person-check-fill"></i>
                                    <p class="d-inline fw-bold">Capacity:</p>
                                    <p class="d-inline">${event.capacity}</p>
                                </section>
                                <section>
                                    <i class="bi bi-person-fill"></i>
                                    <p class="d-inline fw-bold">${event.estimate==null?'Assistance':'Estimate'}</p>
                                    <p class="d-inline">${event.estimate!=null?event.estimate:event.assistance}</p>
                                </section>
                            </section>
                        </div>
                    <a class="btn btn-secondary my-2 shadow" href="./index.html"><i class="bi bi-arrow-left-short"></i> Back Home <i class="bi bi-house"></i></a>
                </div>
                `
                )
            }
        })
    }
}
InsertarDatos(idObjeto);