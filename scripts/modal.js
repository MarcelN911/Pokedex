
async function openModal(id) {
    let modal = document.getElementById("modalOverlay");
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    let pokemon = await loadPokemon(id);
    window.currentPokemonId = id;
    window.currentPokemon = pokemon;

    const mainType = pokemon.types[0].type.name;
    modal.className = "modal-overlay active type-" + mainType;

    modal.innerHTML = createCardModal(pokemon);
    document.getElementById("modalContent").innerHTML = modalContentAbout(pokemon);
}

async function updateModal(direction) {
    let newId = window.currentPokemonId + direction;
    if (newId < 1) newId = 1;
    if (newId > cardCounter) return;
    let pokemon = await loadPokemon(newId);
    window.currentPokemonId = newId;
    window.currentPokemon = pokemon;
    const modal = document.getElementById("modalOverlay");
    const mainType = pokemon.types[0].type.name;
    modal.className = "modal-overlay active type-" + mainType;
    document.getElementById("pokemonModal").outerHTML = createCardModal(pokemon);
    document.getElementById("modalContent").innerHTML = modalContentAbout(pokemon);
}

function closeModal() {
    let modal = document.getElementById("modalOverlay");
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                closeModal();
            }
        });
    }
});

function getModalData(pokemon) {
    return {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.sprites.other["official-artwork"].front_default,
        height: (pokemon.height / 10).toFixed(1) + " m",
        weight: (pokemon.weight / 10).toFixed(1) + " kg",
        abilities: getAbilitiesTemplate(pokemon),
        baseExp: pokemon.base_experience,
        types: getTypesTemplate(pokemon),
        stats: getStatsTemplate(pokemon),
        moves: getMovesTemplate(pokemon),
        mainType: pokemon.types[0].type.name
    };
}

function getTypesTemplate(pokemon) {
    let typesHtml = "";
    for (let index = 0; index < pokemon.types.length; index++) {
        const typeName = pokemon.types[index].type.name;
        typesHtml += '<span class="type-badge type-' + typeName + '">' + typeName + '</span>';
    }
    return typesHtml;
}

function getMovesTemplate(pokemon) {
    let movesHtml = "";
    for (let index = 0; index < 6 && index < pokemon.moves.length; index++) {
        const moveName = pokemon.moves[index].move.name;
        movesHtml += '<span class="move-badge">' + moveName + '</span>';
    }
    return movesHtml;
}

function getAbilitiesTemplate(pokemon) {
    let abilities = "";
    for (let index = 0; index < pokemon.abilities.length; index++) {
        if (index > 0) abilities += ", ";
        abilities += pokemon.abilities[index].ability.name;
    }
    return abilities;
}

async function switchTab(tab) {
    let content = document.getElementById("modalContent");
    let pokemon = window.currentPokemon;
    if (tab === "about") {
        content.innerHTML = modalContentAbout(pokemon);
        setActiveTab("about");
    } else if (tab === "stats") {
        content.innerHTML = modalContentStats(pokemon);
        setActiveTab("stats");
    } else if (tab === "moves") {
        content.innerHTML = modalContentMoves(pokemon);
        setActiveTab("moves");
    }
}

function setActiveTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove("active");
    });
    document.querySelector('.tab-btn[data-tab="' + tab + '"]').classList.add("active");
}
