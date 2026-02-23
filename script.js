
const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon/";
let firstPokemon = 1;
let cardCounter = 10;
let allPokemonMetaList = [];


async function init() {
    await loadAllPokemonMetaList();
    createAllCards();
}

async function loadAllPokemonMetaList() {
    let maxPokemon = 200;
    let response = await fetch(apiBaseUrl + `?limit=${maxPokemon}`);
    let data = await response.json();
    allPokemonMetaList = data.results;
}


async function loadPokemon(id) {
    let response = await fetch(apiBaseUrl + id);
    let pokemon = await response.json();
    return pokemon;
}

async function loadPokemonByUrl(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    return await response.json();
}

function filterPokemonByName(searchValue) {
    return allPokemonMetaList.filter(pokemonMeta =>
        pokemonMeta.name.toLowerCase().includes(searchValue)
    );
}

async function showSearchedPokemon() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let container = document.getElementById("pokemonContainer");
    container.innerHTML = "";

    let filteredPokemon = filterPokemonByName(searchValue);

    let maxResults = 20;
    for (let i = 0; i < filteredPokemon.length && i < maxResults; i++) {
        let pokemon = await loadPokemonByUrl(filteredPokemon[i].url);
        createCard(pokemon);
    }
}

function createCard(pokemon) {
    let container = document.getElementById("pokemonContainer");
    container.innerHTML += createCardTemplate(pokemon);
}

function getSecondType(pokemon) {
    if (pokemon.types[1]) {
        return `<span class="type-badge type-${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</span>`;
    }
    return "";
}

async function createAllCards() {
    for (let index = firstPokemon; index <= cardCounter; index++) {
        let pokemon = await loadPokemon(index);
        createCard(pokemon);
    }
}

async function loadMoreCards() {
    firstPokemon = cardCounter + 1;
    cardCounter = cardCounter + 10;
    createAllCards();
}

function searchPokemon() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let container = document.getElementById("pokemonContainer");
    container.innerHTML = "";

    for (let index = 1; index <= cardCounter; index++) {
        loadPokemon(index).then(pokemon => {
            if (pokemon.name.toLowerCase().search(searchValue) !== -1) {
                createCard(pokemon);
            }
        });
    }
}




