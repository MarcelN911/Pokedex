let url = "https://pokeapi.co/api/v2/pokemon/";
let firstPokemon = 1; 
let cardCounter = 10; 

async function init() {
    let pokemon = await loadPokemon(1);
    createAllCards();
}

async function loadPokemon(id) {
    let response = await fetch(url + id);
    let pokemon = await response.json();
    return pokemon;
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

async function openModal(id) {
    let modal = document.getElementById("modalOverlay");
    modal.classList.add("active");
    let pokemon = await loadPokemon(id);
    currentPokemonId = id;
    modal.innerHTML = createCardModal(pokemon);
    modalContentAbout(pokemon);
}

async function updateModal(direction) {
    let newId = currentPokemonId + direction;
    if (newId < 1) newId = 1;
    if (newId > cardCounter) return;
    let pokemon = await loadPokemon(newId);
    currentPokemonId = newId;
    document.getElementById("pokemonModal").outerHTML = createCardModal(pokemon);
    modalContentAbout(pokemon);
}

function closeModal() {
    let modal = document.getElementById("modalOverlay");
    modal.classList.remove("active");
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




