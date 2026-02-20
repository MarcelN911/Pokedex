let url = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemon(id) {
    let response = await fetch(url + id);
    let pokemon = await response.json();
    return pokemon;
}

function createCard(pokemon) {
    let container = document.getElementById("pokemonContainer");
    container.innerHTML += createCardTemplate(pokemon);
}

async function init() {
    let pokemon = await loadPokemon(1);
    createAllCards();
}

function getSecondType(pokemon) {
    if (pokemon.types[1]) {
        return `<span class="type-badge type-${pokemon.types[1].type.name}">${pokemon.types[1].type.name}</span>`;
    }
    return "";
}

async function openModal(id) {
    let modal = document.getElementById("modalOverlay");
    modal.classList.add("active");
    let pokemon = await loadPokemon(id);
    modal.innerHTML = createCardModal(pokemon);
}

function closeModal() {
    let modal = document.getElementById("modalOverlay");
    modal.classList.remove("active");
}

let firstPokemon = 1; 
let cardCounter = 20; 

async function createAllCards() {
    for (let index = firstPokemon; index <= cardCounter; index++) {
        let pokemon = await loadPokemon(index);
        createCard(pokemon);
    }
}

async function loadMoreCards() {
    firstPokemon = cardCounter + 1;
    cardCounter = cardCounter + 20;
    createAllCards();
}




