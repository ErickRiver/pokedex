const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const botonesGeneracion = document.querySelectorAll(".btn-gen");

let URL = "https://pokeapi.co/api/v2/pokemon/";
let URL_DESCRIPCION = "https://pokeapi.co/api/v2/characteristic/";

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) =>
        `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length == 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length == 2) {
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.innerHTML = `
    <div class="pokemon">
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}M</p>
                <p class="stat">${poke.weight}KG</p>
            </div>
        </div>
    </div>`;
    div.addEventListener("click", function () {
        mostrarPokemonSeleccionado(poke.id);
    });

    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 1010; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))


botonesGeneracion.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";
    const generaciones = {
        "0": 0,
        "1": 151,
        "2": 251,
        "3": 386,
        "4": 493,
        "5": 649,
        "6": 721,
        "7": 809,
        "8": 898,
        "9": 1010,
    }
    for (let i = generaciones[botonId - 1] + 1; i <= generaciones[botonId]; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {
                mostrarPokemon(data);
            })
    }
}));

function mostrarPokemonSeleccionado(idPokemon) {
    localStorage.setItem("idPokemon", idPokemon);
    const newWindow = window.open(`pokemon.html`, "_blank");
}