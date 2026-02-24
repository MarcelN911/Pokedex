

const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon/";
let firstPokemon = 1;
let cardCounter = 20;
let allPokemonMetaList = [];
let pokemonCache = {};


async function init() {
    showLoader();
    await loadAllPokemonMetaList();
    await createAllCards();
    hideLoader();
}

async function loadAllPokemonMetaList() {
    let maxPokemon = 200;
    let response = await fetch(apiBaseUrl + `?limit=${maxPokemon}`);
    let data = await response.json();
    allPokemonMetaList = data.results;
}

function showLoader() {
    document.getElementById('loaderOverlay').style.display = 'flex';
}
function hideLoader() {
    document.getElementById('loaderOverlay').style.display = 'none';
}

async function loadPokemon(id) {
    if (pokemonCache[id]) {
        return pokemonCache[id];
    }
    let response = await fetch(apiBaseUrl + id);
    let pokemon = await response.json();
    pokemonCache[id] = pokemon;
    return pokemon;
}

async function loadPokemonByUrl(pokemonUrl) {
    if (pokemonCache[pokemonUrl]) {
        return pokemonCache[pokemonUrl];
    }
    let response = await fetch(pokemonUrl);
    let pokemon = await response.json();
    pokemonCache[pokemonUrl] = pokemon;
    return pokemon;
}

function filterPokemonByName(searchValue) {
    return allPokemonMetaList.filter(pokemonMeta =>
        pokemonMeta.name.toLowerCase().includes(searchValue)
    );
}

async function showSearchedPokemon() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    document.getElementById("pokemonContainer").innerHTML = "";
    if (!validateSearchInput(searchValue)) return;
    showLoader();
    let filteredPokemon = filterPokemonByName(searchValue);
    if (filteredPokemon.length === 0) return handleNoResults();
    await renderSearchedPokemon(filteredPokemon, 20);
    hideLoader();
}

function validateSearchInput(searchValue) {
    if (searchValue.length < 3) {
        showSearchHint('Please enter at least <span>3 letters</span> to search.');
        return false;
    }
    return true;
}

function handleNoResults() {
    hideLoader();
    showSearchHint('No Pokémon found for your search.');
}

async function renderSearchedPokemon(pokemonList, maxResults = 20) {
    for (let index = 0; index < pokemonList.length && index < maxResults; index++) {
        let pokemon = await loadPokemonByUrl(pokemonList[index].url);
        createCard(pokemon);
    }
}

function showSearchHint(message) {
    let container = document.getElementById("alert");
        if (!container) return;
        if (message) {
            container.innerHTML = `<div class="search-hint">${message}</div>`;
            container.style.display = "flex";
    } else {
            container.innerHTML = "";
            container.style.display = "none";
    }
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
    showSearchHint("");
    for (let index = firstPokemon; index <= cardCounter; index++) {
        let pokemon = await loadPokemon(index);
        createCard(pokemon);
    }
}

async function loadMoreCards() {

    let container = document.getElementById("pokemonContainer");
    if (!container.innerHTML || container.querySelector('.search-hint')) {
        firstPokemon = 1;
        cardCounter = 20;
    } else {
        firstPokemon = cardCounter + 1;
        cardCounter = cardCounter + 20;
    }
    await createAllCards();
}




