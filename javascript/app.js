const apiRick = async (pagina) => {
    let url = "https://rickandmortyapi.com/api/character/?page="+pagina;
    const api = await fetch(url);
    const data = await api.json();
    console.log(data);
    divRes = document.querySelector('#resultado');
    divRes.innerHTML = '';
    data.results.map(item => {
        divItem = document.createElement('div');
        divItem.innerHTML = `
        <div class="card">
            <img src="${item.image}">
            <div class="card-body">
                <h5>${item.name}</h5>
                <p><b>Status: </b>${item.status}</p>
                <p><b>Species: </b>${item.species}</p>
                <p><b>Gender: </b>${item.gender}</p>
            </div>
        </div>`;
        divRes.appendChild(divItem);
    });
}
apiRick(1);

document.addEventListener("DOMContentLoaded", function () {
    const abrir = document.getElementById("abrir");
    const cerrar = document.getElementById("cerrar");
    const nav = document.getElementById("nav");

    abrir.addEventListener("click", () => { nav.classList.add("visible")});
    cerrar.addEventListener("click", () => {nav.classList.remove("visible")});
});