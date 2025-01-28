let abortController = null;

const apiRick2 = async (pagina, query = "") => {
    if (abortController) {
        abortController.abort();
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    try {
        let url = `https://rickandmortyapi.com/api/episode/?page=${pagina}&name=${query}`;
        const api = await fetch(url, { signal });
        const data = await api.json();

        renderResults(data.results);
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Solicitud cancelada");
        } else {
            console.error("Error en la solicitud:", error);
            renderError("Algo salió mal. Por favor, intenta nuevamente.");
        }
    }
};

const renderResults = (results) => {
    const divRes = document.querySelector('#resultado');
    divRes.innerHTML = '';

    if (!results || results.length === 0) {
        divRes.innerHTML = '<p>No se encontraron episodios.</p>';
        return;
    }

    results.map(item => {
        const divItem = document.createElement('div');
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
};

const renderError = (message) => {
    const divRes = document.querySelector('#resultado');
    divRes.innerHTML = `<p class="error">${message}</p>`;
};

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    let currentPage = 1;

    searchInput.addEventListener("input", (event) => {
        const query = event.target.value;
        apiRick2(currentPage, query);
    });

    const abrir = document.getElementById("abrir");
    const cerrar = document.getElementById("cerrar");
    const nav = document.getElementById("nav");

    abrir.addEventListener("click", () => nav.classList.add("visible"));
    cerrar.addEventListener("click", () => nav.classList.remove("visible"));

    apiRick2(currentPage);
});
