document.addEventListener('DOMContentLoaded', () => {
    homeData();
});

toPokemonDetil = async (url) => {
    let response = await fetch(url);
    let data = await response.json();

    let responseSpecies = await fetch(data.species.url);
    let dataSpecies = await responseSpecies.json();

    let responseEvolution = await fetch(dataSpecies.evolution_chain.url);
    let dataEvolution = await responseEvolution.json();

    let evolutionList = [];

    evolutionList.push({
        id: dataEvolution.chain.species.url.split('/')[6],
        name: dataEvolution.chain.species.name,
        level: 1
    })

    if (dataEvolution.chain.evolves_to.length) {
        evolutionList.push({
            id: dataEvolution.chain.evolves_to[0].species.url.split('/')[6],
            name: dataEvolution.chain.evolves_to[0].species.name,
            level: dataEvolution.chain.evolves_to[0].evolution_details[0].min_level
        })
        let nextEvolution = dataEvolution.chain.evolves_to[0];
        if (nextEvolution.evolves_to.length) {
            evolutionList.push({
                id: nextEvolution.evolves_to[0].species.url.split('/')[6],
                name: nextEvolution.evolves_to[0].species.name,
                level: nextEvolution.evolves_to[0].evolution_details[0].min_level
            })
        }

    }

    let showListEvolution = '';
    const API_POKEMON = 'https://pokeapi.co/api/v2/pokemon';
    showListEvolution += '<div class="row">';
    evolutionList.forEach(data => {
        showListEvolution += `
            <div class="col s12 m6 l4 char-wrapper" onclick="toPokemonDetil('${API_POKEMON}/${data.id}')">
                <div class="card">
                    <div class="card-image">
                        <img style="padding: 5px;" src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png">
                    </div>
                    <div class="card-content" style="text-align: center; background-color: darkgrey; padding: 2px;">
                        <p style="margin: 0;"><strong>${data.name.toUpperCase()}</strong></p>
                        <p style="margin: 0;">At Level ${data.level}</p>
                    </div>
                </div>
            </div>
        `;
    })
    showListEvolution += '</div';

    let pokemonId = url.split('/');

    let typeList = "";
    data.types.forEach(types => {
        typeList += (types.type.name) + ', ';
    })
    typeList = typeList.slice(0, -2);

    let abilityList = "";
    data.abilities.forEach(abilities => {
        abilityList += (abilities.ability.name) + ', ';
    })
    abilityList = abilityList.slice(0, -2);


    let statsList = "";
    statsList += '<div id="modded">';
    data.stats.forEach(stats => {
        statsList += `<div class="progress blue lighten-4">
                    <span>${stats.stat.name.toUpperCase()}</span>
                    <div class="determinate blue" style="width: ${Math.floor((stats.base_stat / 175) * 100)}%; animation: grow 2s;">${stats.base_stat}</div>
                </div>`;
    })
    statsList += '</div>'

    var content = document.querySelector(".content-wrapper");
    content.innerHTML = ` <div class="row" id="detail-page">
            <div class="col m12">
                <a class="waves-effect waves-teal btn-flat" onclick="toHome()"><i class="material-icons left">arrow_back</i>Back</a>
            </div>
            <div class="col s12 m5">
                <div class="card">
                    <div class="card-image">
                        <img style="padding: 10px;" src="https://pokeres.bastionbot.org/images/pokemon/${pokemonId[6]}.png">
                    </div>
                    <div class="card-content" style="text-align: center; background-color: darkgrey; padding: 2px;">
                        <p style="margin: 10px;"> <strong> ${dataSpecies.name.toUpperCase()} </strong> </p>
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
                                    <p> <b>Type</b> : ${typeList} </p>
                                </div>
                                 <div class="col s12 m6">
                                    <p> <b>Height</b> : ${data.height / 10} m </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Weight</b> : ${data.weight / 10} kg </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Abilities</b> : ${abilityList} </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Capture Rate</b> : ${dataSpecies.capture_rate}% </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Growth Rate</b> : ${dataSpecies.growth_rate.name} </p>
                                </div>
                                <div class="col s12 m6">
                                    <p> <b>Habitat</b> : ${dataSpecies.habitat.name} </p>
                                </div>
                            </div>
                            <div class="devider-title"> </div>
                            <p class="detail-title"> STATS </p>
                            ${statsList}
                            <div class="devider-title"> </div>
                            <p class="detail-title"> EVOLUTION </p>
                            ${showListEvolution}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    // $("html, body").animate({ scrollTop: 0 }, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    let elem = document.querySelector("#detail-page");
    // setTimeout(() => {
    elem.style.visibility = "visible"
    elem.style.opacity = "1"
    elem.style.transform = "scale(1)"
    elem.style.transition = "0.2s, opacity 0.2s"
    // }, 1000)

}

toHome = () => {
    homeData()
}

toAbout = () => {
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
                            <li>  <a href="https://pokeapi.co/" target="_blank">pokeres-bastianbot for Pokemon images</a>  </li>
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

    var content = document.querySelector(".content-wrapper");
    content.innerHTML = about;
}

toHistory = () => {
    let about = `
        <div class="row">
            <div class="col s12 m12">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title"><strong>History</strong></span>
                        <hr>
                        <div id="history-section" class="row">
                            <div class="col s12 m6 l6">
                                    <img src="./public/images/pokemon.png" id="img-title">
                                    <img src="./public/images/first-generation.png">
                            </div>
                            <div class="col s12 m6 l6">
                                <p>
                                    The first generation (Generation I) of the Pokémon franchise features the original 151 fictional species of creatures introduced to the core video game series in the 1996 Game Boy games Pokémon Red and Blue.
                                </p>

                                <p>
                                    The following list details the 151 Pokémon of Generation I in order of their National Pokédex number. The first Pokémon, Bulbasaur, is number 001 and the last, Mew, is number 151. Alternate forms that result in type changes are included for convenience. Mega evolutions and regional forms are included on the pages for the generation in which they were introduced.
                                </p>
                                    <strong> Source : <strong><br/>
                                      <a href="https://materializecss.com/" target="_blank">Wikipedia</a> <br/>
                                      <a href="https://materializecss.com/" target="_blank">Pokemon Images</a> <br/>
                                      <a href="https://materializecss.com/" target="_blank">Squirtle, Bulbasaur and Charmander Images</a> <br/>

                                <p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    `;

    var content = document.querySelector(".content-wrapper");
    content.innerHTML = about;
}

homeData = async () => {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');
    let data = await response.json();

    let dataPokemon = data.results || [];
    let listPokemon = "";

    listPokemon += `<div class="row">`
    dataPokemon.forEach(pokemon => {
        let pokemonId = pokemon.url.split('/');
        listPokemon += `<div class="col s6 m3 l2 char-wrapper" onclick="toPokemonDetil('${pokemon.url}')">
                            <div class="card">
                                <div class="card-image">
                                    <img style="padding: 5px;" src="https://pokeres.bastionbot.org/images/pokemon/${pokemonId[6]}.png">
                                </div>
                                <div class="card-content" style="text-align: center; background-color: darkgrey; padding: 2px;">
                                    <p style="margin: 0;"><strong>${pokemon.name.toUpperCase()}</strong></p>
                                </div>
                            </div>
                        </div>`;
    });
    listPokemon += `</div>`;

    var content = document.querySelector(".content-wrapper");
    content.innerHTML = listPokemon;
}

topFunction = () => {
    // When the user clicks on the button, scroll to the top of the document
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $("html, body").animate({ scrollTop: 0 }, 400);

}

//Get the button:
mybutton = document.getElementById("top-button");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};