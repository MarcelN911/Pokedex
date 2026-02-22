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

function getStatsTemplate(pokemon) {
    let statsHtml = "";
    for (let index = 0; index < pokemon.stats.length; index++) {
        const statName = pokemon.stats[index].stat.name.toUpperCase();
        const statValue = pokemon.stats[index].base_stat;
        let statWidth = statValue;
        if (statWidth > 100) statWidth = 100;
        statsHtml += '<div class="stat">';
        statsHtml += '<span class="stat-label">' + statName + '</span>';
        statsHtml += '<div class="stat-bar"><div class="stat-fill" style="width: ' + statWidth + '%;"></div></div>';
        statsHtml += '<span class="stat-value">' + statValue + '</span>';
        statsHtml += '</div>';
    }
    return statsHtml;
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

