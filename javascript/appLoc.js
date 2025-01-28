let abortController = null;

const apiRick3 = async (pagina, query = "") => {
    if (abortController) {
        abortController.abort();
    }

    abortController = new AbortController();
    const signal = abortController.signal;

    try {
        let url = `https://rickandmortyapi.com/api/location/?page=${pagina}&name=${query}`;
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
        divRes.innerHTML = '<p>No se encontraron localizaciones.</p>';
        return;
    }

    results.map(item => {
        const divItem = document.createElement('div');
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
    const divRes = document.querySelector('#resultado');
    divRes.innerHTML = `<p class="error">${message}</p>`;
};

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    let currentPage = 1;

    searchInput.addEventListener("input", (event) => {
        const query = event.target.value;
        apiRick3(currentPage, query);
    });

    const abrir = document.getElementById("abrir");
    const cerrar = document.getElementById("cerrar");
    const nav = document.getElementById("nav");

    abrir.addEventListener("click", () => nav.classList.add("visible"));
    cerrar.addEventListener("click", () => nav.classList.remove("visible"));

    apiRick3(currentPage);
});
