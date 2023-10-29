var pokemon;
var estats;
var id;
var pokemones = [];
var dataTipo1 = []
var dataTipo2 = []

let URL = "https://pokeapi.co/api/v2/pokemon/";
let URL_DESCRIPCION = "https://pokeapi.co/api/v2/characteristic/";

getPokemon(localStorage.getItem("idPokemon"));

function getPokemon(idPokemon) {
    fetch(URL + idPokemon)
        .then(datos => {
            return datos.json();
        })
        .then(data => {
            console.log(localStorage.getItem("idPokemon"));
            id = data.id;
            localStorage.setItem("idPokemon", id);
            document.getElementById("imgPokemon").src = data.sprites.other["official-artwork"].front_default;
            document.getElementById("imgPokemon").alt = data.name;
            llenarDatosPokemon(data);
            llenarDatosEstats(data.stats);
            obtenerDescripcion(idPokemon);
            getPokemonNombreAnteriorPosterior(data.id);
            document.getElementById("descripcion").innerHTML = "";
        });
}

function pokemonAnterior() {
    id = parseInt(localStorage.getItem("idPokemon")) - 1;
    if (id >= 1 && id <= 1010) {
        getPokemon(id);
    }
}

function pokemonPosterior(id) {
    id = parseInt(localStorage.getItem("idPokemon")) + 1;
    if (id >= 1 && id <= 1010) {
        getPokemon(id);
    }
}

function obtenerDescripcion(idPokemon) {
    fetch(URL_DESCRIPCION + idPokemon)
        .then(datos => {
            return datos.json();
        })
        .then(data => {
            document.getElementById("descripcion").innerHTML = data.descriptions[5].description;
        });
}


function llenarDatosPokemon(data) {
    let tipos = data.types.map((type) =>
        `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    document.querySelector(".pokemon-tipos").innerHTML = tipos;

    let pokeId = data.id.toString();
    if (pokeId.length == 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length == 2) {
        pokeId = "0" + pokeId;
    }

    document.querySelector(".pokemon-id-back2").innerHTML = "#" + pokeId;
    document.querySelector(".pokemon-nombre").innerHTML = data.name;

    document.querySelector(".pokemon-id").innerHTML = "<strong>#" + pokeId + "</strong>";

    const pokemonStatsElement = document.querySelector('.pokemon-stats');
    pokemonStatsElement.innerHTML = `
        <p class="stat">${data.height}M</p>
        <p class="stat">${data.weight}KG</p>`;
    // document.getElementById("especie").innerHTML = '<label style="color: gray; flex: 1;">Especie</label>   ' + data.species;
    // document.getElementById("descripcion").innerHTML = data.descripcion;
}

function llenarDatosEstats(data) {
    var pokemonStats = {
        hp: data[0].base_stat,
        ataque: data[1].base_stat,
        defensa: data[2].base_stat,
        ataqueEspecial: data[3].base_stat,
        defensaEspecial: data[4].base_stat,
        velocidad: data[5].base_stat,
    };

    // Crear un array con los valores de los stats
    var statsValues = Object.values(pokemonStats);

    var datos = {
        labels: ['HP', 'Ataque', 'Defensa', 'Atq. Especial', 'Def. Especial', 'Velocidad'],
        datasets: [{
            label: 'Estadísticas',
            data: statsValues,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };

    var valores = Object.values(pokemonStats);
    var maximo = Math.max(...valores);
    var minimo = Math.min(...valores);

    var config = {
        type: 'radar',
        data: datos,
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: 'white'
                    },
                    grid: {
                        color: 'white'
                    },
                    pointLabels: {
                        color: 'white',
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                }
            }
        }
    };

    // Obtener el elemento del gráfico por su ID
    var chartElement = document.getElementById('myRadarChart');
    if (chartElement) {
        // Destruir la instancia del gráfico si ya existe
        if (chartElement.chart) {
            chartElement.chart.destroy();
        }

        // Crear el nuevo gráfico
        var ctx = chartElement.getContext('2d');
        chartElement.chart = new Chart(ctx, config);
    }
}


function getPokemonNombreAnteriorPosterior(idPokemon) {
    id = idPokemon - 1;
    if (idPokemon - 1 == 0) {
        id = idPokemon
    }

    fetch(URL + id)
        .then(datos => {
            return datos.json();
        })
        .then(data => {
            document.getElementById("pokemonAnterior").innerHTML = "#" + data.id + " " + data.name;
            document.getElementById("imagen-anterior").src = data.sprites.other["official-artwork"].front_default;
            document.getElementById("imagen-anterior").alt = data.name;
        });

    id = idPokemon + 1;
    if (idPokemon + 1 > 1010) {
        id = idPokemon;
    }

    fetch(URL + id)
        .then(datos => {
            return datos.json();
        })
        .then(data => {
            document.getElementById("pokemonPosterior").innerHTML = "#" + data.id + " " + data.name;
            document.getElementById("imagen-posterior").src = data.sprites.other["official-artwork"].front_default;
            document.getElementById("imagen-posterior").alt = data.name;
        });
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 39) {
        pokemonPosterior();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
        pokemonAnterior();
    }
});

const verAnterior = document.getElementById("verAnterior");
const verPosterior = document.getElementById("verPosterior");

verAnterior.addEventListener("click", function () {
    pokemonAnterior();
});

verPosterior.addEventListener("click", function () {
    pokemonPosterior();
});