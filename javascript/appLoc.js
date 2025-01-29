let abortController = null;
let currentPage = 1;
let queryActual = "";
let cargando = false;
const totalPages = 7;

const apiRick = async (pagina, query = "") => {
    if (abortController) {
        abortController.abort();
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    try {
        let url = `https://rickandmortyapi.com/api/location/?page=${pagina}&name=${query}`;
        const api = await fetch(url, { signal });
        const data = await api.json();

        if (data.error) {
            renderError("No se encontraron personajes.");
            return;
        }

        renderResults(data.results, pagina === 1);
        cargando = false;

    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Solicitud cancelada");
        } else {
            console.error("Error en la solicitud:", error);
            renderError("Algo salió mal. Intenta nuevamente.");
        }
        cargando = false;
    }
};

const renderResults = (results, limpiar = false) => {
    const divRes = document.querySelector("#resultado");

    if (limpiar) divRes.innerHTML = "";

    results.forEach((item) => {
        const divItem = document.createElement("div");
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
};

const renderError = (message) => {
    const divRes = document.querySelector("#resultado");
    divRes.innerHTML = `<p class="error">${message}</p>`;
};

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const abrir = document.getElementById("abrir");
    const cerrar = document.getElementById("cerrar");
    const nav = document.getElementById("nav");

    abrir.addEventListener("click", () => nav.classList.add("visible"));
    cerrar.addEventListener("click", () => nav.classList.remove("visible"));

    searchInput.addEventListener("input", (event) => {
        queryActual = event.target.value;
        currentPage = 1;
        apiRick(currentPage, queryActual);
    });

    apiRick(currentPage);

    window.addEventListener("scroll", () => {
        if (
            !cargando &&
            currentPage < totalPages &&
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200
        ) {
            cargando = true;
            currentPage++;
            apiRick(currentPage, queryActual);
        }
    });
});
