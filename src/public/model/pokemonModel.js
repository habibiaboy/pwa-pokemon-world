import fetch from '../../public/helper/fetch.js';

async function getAllPokemon() {
    const data = await fetch.get('https://pokeapi.co/api/v2/pokemon', { limit: 151 });
    return data.results || [];
}

async function getOnePokemon(url) {
    const data = await fetch.get(url);
    return data;
}

async function getPokemonSpecies(url) {
    const data = await fetch.get(url);
    return data;
}

async function getPokemonEvolution(url) {
    const data = await fetch.get(url);
    return data;
}


export default {
    getAllPokemon,
    getOnePokemon,
    getPokemonSpecies,
    getPokemonEvolution
}