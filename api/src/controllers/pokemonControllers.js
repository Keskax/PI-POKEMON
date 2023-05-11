const axios = require("axios");
const { Pokemon } = require("../db");
const { URL_API } = process.env;

const createPokemon = async (
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  type
) => {
  const existingPokemon = await Pokemon.findOne({ name });
  let existingPokemonApi;
  try {
    existingPokemonApi = await axios(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
  } catch (error) {
    existingPokemonApi = error.response;
  }
  if (
    existingPokemon ||
    (existingPokemonApi && existingPokemonApi.status === 200)
  ) {
    throw new Error("Pokemon already exist");
  }
  const data = {
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    type,
  };
  const createPoke = await Pokemon.create(data);
  return createPoke;
};

const getNPokemon = async () => {
  const pokemonData = (await axios(`${URL_API}`)).data;
  const allPokemons = pokemonData.results;

  return allPokemons;
};

const getAllPokemon = async () => {
  const pokemonDb = await Pokemon.findAll();

  const pokemonList = await getNPokemon();
  const pokemonDetails = await axios.all(
    pokemonList.map(async (pokemon) => {
      const details = (await axios(pokemon.url)).data;

      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other.dream_world.front_default,
        hp: details.stats[0].base_stat,
        attack: details.stats[1].base_stat,
        defense: details.stats[2].base_stat,
        speed: details.stats[5].base_stat,
        height: details.height,
        weight: details.weight,
        type: details.types.map((type) => type.type.name),
      };
    })
  );

  const pokemons = [...pokemonDetails, ...pokemonDb];
  return pokemons;
};

const searchPokemonByName = async (name) => {
  const pokemonDb = await Pokemon.findOne({
    where: { name: name.toLowerCase() },
  });

  if (pokemonDb) {
    return pokemonDb;
  } else {
    const response = await axios(`${URL_API}/${name.toLowerCase()}`);
    const pokemon = response.data;
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      height: pokemon.height,
      weight: pokemon.weight,
      type: pokemon.types.map((type) => type.type.name),
    };
  }
};

const pokemonById = async (id) => {
  const pokeOne = (await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
  return {
    id: pokeOne.id,
    name: pokeOne.name,
    image: pokeOne.sprites.other.dream_world.front_default,
    hp: pokeOne.stats[0].base_stat,
    attack: pokeOne.stats[1].base_stat,
    defense: pokeOne.stats[2].base_stat,
    speed: pokeOne.stats[5].base_stat,
    height: pokeOne.height,
    weight: pokeOne.weight,
    type: pokeOne.types.map((type) => type.type.name),
  };
};

module.exports = {
  createPokemon,
  getAllPokemon,
  pokemonById,
  searchPokemonByName,
};
