import pokemonModel from '../../public/model/pokemonModel.js';

async function dataPokemon() {
    try {
        let result = await pokemonModel.getAllPokemon();
        let listPokemon = "";

        listPokemon += `<div class="row">`
        result.forEach(pokemon => {
            let pokemonId = pokemon.url.split('/');
            listPokemon += `<div class="col s6 m3 l2 char-wrapper" onclick="toPokemonDetil('${pokemon.url}')">
                            <div class="card">
                                <div class="card-image">
                                    <img style="padding: 5px;" src="https://pokeres.bastionbot.org/images/pokemon/${pokemonId[6]}.png">
                                </div>
                                <div class="card-content">
                                    <p><strong>${pokemon.name.toUpperCase()}</strong></p>
                                </div>
                            </div>
                        </div>`;
        });
        listPokemon += `</div>`;

        return listPokemon;
    } catch (error) {
        console.log(error)
        return errorPage();
    }

}

function dataAbout() {
    let about = `
        <div class="row">
            <div class="col s12 m12">
            <div class="card">
                <div class="card-content" id="about-section">
                    <span class="card-title"><strong>About</strong></span>
                    <hr>
                    <h6><b>Hello World,</b></h6>
                    <p>
                        This is a website that lists the first generation Pokemon.
                        This website was built for the purposes of learning Progressive Web Application (PWA) by implementing client-side rendering, single-page applications,
                        and also use service workers.
                    </p>
                    <br/>
                    <p>
                        This website consists of 4 pages
                        <ul>
                            <li> Home Page </li>
                            <li> Detil Page </li>
                            <li> About Page </li>
                            <li> History Page </li>
                        </ul>
                    </p>

                    <h6> <b>Resources</b> </h6>
                     <p>   
                        <ul>
                            <li> 
                                <a href="https://materializecss.com/" target="_blank">Materialize, as CSS Framwork</a>
                            </li>
                            <li> <a href="https://pokeapi.co/" target="_blank">PokeAPI, for Pokemon data</a> </li>
                            <li>  <a href="https://pokeres.bastionbot.org/" target="_blank">pokeres-bastianbot for Pokemon images</a>  </li>
                        </ul>
                    </p>

                    <h6> <b>Source Code</b> </h6>
                     <p>   
                        This Website source code can be downloaded at <a href=" https://github.com/adhitnugrah/pwa-pokemon-world" target="_blank"> this repository</a>
                    </p>
                </div>
            </div>
            </div>
        </div>
    `;

    return about;
}

function dataHistory() {
    let history = `
        <div class="row">
            <div class="col s12 m12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title"><strong>History</strong></span>
                        <hr>
                        <div id="history-section" class="row">
                            <div class="col s12 m6 l6">
                                    <img src="./src/public/images/pokemon.png" id="img-title">
                                    <img src="./src/public/images/first-generation.png">
                            </div>
                            <div class="col s12 m6 l6">
                                <p>
                                    The first generation (Generation I) of the Pokémon franchise features the original 151 fictional species of creatures introduced to the core video game series in the 1996 Game Boy games Pokémon Red and Blue.
                                </p>

                                <p>
                                    The following list details the 151 Pokémon of Generation I in order of their National Pokédex number. The first Pokémon, Bulbasaur, is number 001 and the last, Mew, is number 151. Alternate forms that result in type changes are included for convenience. Mega evolutions and regional forms are included on the pages for the generation in which they were introduced.
                                </p>
                                    <strong> Source : <strong><br/>
                                      <a href="https://en.wikipedia.org/wiki/List_of_generation_I_Pok%C3%A9mon#:~:text=The%20first%20Pok%C3%A9mon%2C%20Bulbasaur%2C%20is,in%20which%20they%20were%20introduced." target="_blank">Wikipedia</a> <br/>
                                      <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png" target="_blank">Pokemon Images</a> <br/>
                                      <a href="https://goombastomp.com/wp-content/uploads/2016/02/gen-1-starters-540x308.png" target="_blank">Squirtle, Bulbasaur and Charmander Images</a> <br/>
                                <p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    `;

    return history;

}

async function dataPokemonDetail(url) {
    try {
        let pokemonProfile = await pokemonModel.getOnePokemon(url);
        let pokemonSpecies = await pokemonModel.getPokemonSpecies(pokemonProfile.species.url);
        let pokemonType = getPokemonType(pokemonProfile.types)
        let pokemonAbilities = getPokemonAbilities(pokemonProfile.abilities);
        let pokemonStats = getPokemonStats(pokemonProfile.stats);
        let pokemonEvolution = getPokemonEvolution(pokemonSpecies.evolution_chain.url);

        let detilPage = ` <div class="row" id="detail-page">
            <div class="col m12">
                <a class="waves-effect waves-green btn-flat" onclick="toHome()"><i class="material-icons left">arrow_back</i>Back</a>
            </div>
            <div class="col s12 m5 char-wrapper-detil">
                <div class="card">
                    <div class="card-image">
                        <img style="padding: 10px;" src="https://pokeres.bastionbot.org/images/pokemon/${url.split('/')[6]}.png">
                    </div>
                    <div class="card-content">
                        <p style="margin: 10px;"> <strong> ${pokemonSpecies.name.toUpperCase()} </strong> </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s12 m7">
                    <div class="card">
                        <div class="card-content">
                            <p class="detail-title"> PROFILE </p>
                            <div class="row">
                                <div class="col s12 m6">
                                    <p> <b>Type</b> : ${pokemonType} </p>
                                </div>
                                 <div class="col s12 m6">
                                    <p> <b>Height</b> : ${pokemonProfile.height / 10} m </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Weight</b> : ${pokemonProfile.weight / 10} kg </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Abilities</b> : ${pokemonAbilities} </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Capture Rate</b> : ${pokemonSpecies.capture_rate}% </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Growth Rate</b> : ${pokemonSpecies.growth_rate.name} </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Habitat</b> : ${pokemonSpecies.habitat.name} </p>
                                </div>
                            </div>
                            <div class="devider-title"> </div>
                            <p class="detail-title"> STATS </p>
                            ${pokemonStats}
                            <div class="devider-title"> </div>
                            <p class="detail-title"> EVOLUTION </p>
                            ${pokemonEvolution}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        return detilPage;
    }
    catch (error) {
        console.log(error)
        return errorPage();
    }

}

function getPokemonType(data) {
    let typeList = "";
    data.forEach(types => {
        typeList += (types.type.name) + ', ';
    })
    typeList = typeList.slice(0, -2);

    return typeList;
}

function getPokemonAbilities(data) {
    let abilityList = "";
    data.forEach(abilities => {
        abilityList += (abilities.ability.name) + ', ';
    })
    abilityList = abilityList.slice(0, -2);


    return abilityList;
}

function getPokemonStats(data = []) {
    let statsList = "";
    statsList += '<div id="modded">';
    data.forEach(stats => {
        statsList += `<div class="progress green lighten-4">
                    <span>${stats.stat.name.toUpperCase()}</span>
                    <div class="determinate green" style="width: ${Math.floor((stats.base_stat / 175) * 100)}%; animation: grow 2s;">${stats.base_stat}</div>
                </div>`;
    })
    statsList += '</div>'
    return statsList
}

async function getPokemonEvolution(url) {
    let result = await pokemonModel.getPokemonEvolution(url);
    let evolutionList = [];

    evolutionList.push({
        id: result.chain.species.url.split('/')[6],
        name: result.chain.species.name,
        level: 1
    })

    if (result.chain.evolves_to.length) {
        evolutionList.push({
            id: result.chain.evolves_to[0].species.url.split('/')[6],
            name: result.chain.evolves_to[0].species.name,
            level: result.chain.evolves_to[0].evolution_details[0].min_level
        })
        let nextEvolution = result.chain.evolves_to[0];
        if (nextEvolution.evolves_to.length) {
            evolutionList.push({
                id: nextEvolution.evolves_to[0].species.url.split('/')[6],
                name: nextEvolution.evolves_to[0].species.name,
                level: nextEvolution.evolves_to[0].evolution_details[0].min_level
            })
        }

    }

    let showListEvolution = '';
    showListEvolution += '<div class="row">';
    evolutionList.forEach(data => {
        showListEvolution += `
            <div class="col s12 m6 l4 char-wrapper" onclick="toPokemonDetil('https://pokeapi.co/api/v2/pokemon/${data.id}')">
                <div class="card">
                    <div class="card-image">
                        <img style="padding: 5px;" src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png">
                    </div>
                    <div class="card-content">
                        <p><strong>${data.name.toUpperCase()}</strong></p>
                        <p>At Level ${data.level}</p>
                    </div>
                </div>
            </div>
        `;
    })
    showListEvolution += '</div';

    return showListEvolution;
}

function errorPage() {
    let page = ` <div class="row">
            <div class="col s12 m12">
            <div class="card">
                <div class="card-content" id="about-section">
                    <span class="card-title"><strong>Sorry, something wrong</strong></span>
                    <hr>
                    <p>
                        Try it later or check your internet connection.
                    </p>
                </div>
            </div>
            </div>
        </div>`;

    return page;
}

export default {
    dataPokemon,
    dataAbout,
    dataHistory,
    dataPokemonDetail
}