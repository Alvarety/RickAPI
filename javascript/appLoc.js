const apiRick3 = async (pagina) => {
    let url = "https://rickandmortyapi.com/api/location?page="+pagina;
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);
    divRes = document.querySelector('#resultado');
    divRes.innerHTML = '';
    data.results.map(item => {
        divItem = document.createElement('div');
        divItem.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text"><b>Tipo: </b>${item.type}</p>
                <p class="card-text"><b>Locacion: </b>${item.dimension}</p>
            </div>
        </div>`;
        divRes.appendChild(divItem);
    });
}
apiRick3(1);

document.addEventListener("DOMContentLoaded", function () {
    const abrir = document.getElementById("abrir");
    const cerrar = document.getElementById("cerrar");
    const nav = document.getElementById("nav");

    abrir.addEventListener("click", () => { nav.classList.add("visible")});
    cerrar.addEventListener("click", () => {nav.classList.remove("visible")});
});
