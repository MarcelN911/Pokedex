
function createCardTemplate(pokemon) {
    return `<article class="pokemon-card bg-${pokemon.types[0].type.name}" onclick="openModal(${pokemon.id})">
                <div class="card-header">
                    <span class="pokemon-id">#${pokemon.id}</span>
                    <span class="pokemon-name">${pokemon.name}</span>
                </div>
                <div class="card-image">
                    <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}">
                </div>
                <div class="card-types">
                    <span class="type-badge type-${pokemon.types[0].type.name}">${pokemon.types[0].type.name}</span>
                    ${getSecondType(pokemon)}
                </div>
                <div class="card-stats">
                    <div class="stat">
                        <span class="stat-label">HP</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${pokemon.stats[0].base_stat}%;"></div>
                        </div>
                        <span class="stat-value">${pokemon.stats[0].base_stat}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">ATK</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${pokemon.stats[1].base_stat}%;"></div>
                        </div>
                        <span class="stat-value">${pokemon.stats[1].base_stat}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">DEF</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${pokemon.stats[2].base_stat}%;"></div>
                        </div>
                        <span class="stat-value">${pokemon.stats[2].base_stat}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">SPD</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${pokemon.stats[5].base_stat}%;"></div>
                        </div>
                        <span class="stat-value">${pokemon.stats[5].base_stat}</span>
                    </div>
                </div>
            </article>
        `;
}

function createCardModal(pokemon) {
    const data = getModalData(pokemon);
    return `
        <div class="modal bg-${data.mainType}" id="pokemonModal">
            <button class="modal-close" id="modalClose" onclick="closeModal()">×</button>
            <button class="modal-nav modal-prev" id="modalPrev">◀</button>
            <button class="modal-nav modal-next" id="modalNext">▶</button>
            <div class="modal-header">
                <span class="modal-id">#${data.id.toString().padStart(3, '0')}</span>
                <h2 class="modal-name">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <div class="modal-types">
                    ${data.types}
                </div>
            </div>
            <div class="modal-image">
                <img src="${data.img}" alt="${data.name}">
            </div>
            <div class="modal-tabs">
                <button class="tab-btn active" data-tab="about">About</button>
                <button class="tab-btn" data-tab="stats">Stats</button>
                <button class="tab-btn" data-tab="moves">Moves</button>
            </div>
            <div class="modal-content">
                <div class="tab-content active" id="tab-about">
                    <div class="info-row">
                        <span class="info-label">Height</span>
                        <span class="info-value">${data.height}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Weight</span>
                        <span class="info-value">${data.weight}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Abilities</span>
                        <span class="info-value">${data.abilities}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Base Exp</span>
                        <span class="info-value">${data.baseExp}</span>
                    </div>
                </div>
                <div class="tab-content" id="tab-stats">
                    ${data.stats}
                </div>
                <div class="tab-content" id="tab-moves">
                    <div class="moves-list">
                        ${data.moves}
                    </div>
                </div>
            </div>
        </div>
    `;
}