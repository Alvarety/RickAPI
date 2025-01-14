const apiRick2 = async (pagina) => {
    let url = "https://rickandmortyapi.com/api/episode?page="+pagina;
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
                <p class="card-text"><b>ID: </b>${item.id}</p>
                <p class="card-text"><b>Air Date: </b>${item.air_date}</p>
                <p class="card-text"><b>Codigo: </b>${item.episode}</p>
            </div>
        </div>`;
        divRes.appendChild(divItem);
    });
}
apiRick2(1);

document.addEventListener("DOMContentLoaded", function () {
    const abrir = document.getElementById("abrir");
    const cerrar = document.getElementById("cerrar");
    const nav = document.getElementById("nav");

    abrir.addEventListener("click", () => { nav.classList.add("visible")});
    cerrar.addEventListener("click", () => {nav.classList.remove("visible")});
});
