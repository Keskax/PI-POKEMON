const axios = require("axios");
const { Pokemon, Type } = require("../db");
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
  // Buscar los tipos de Pokémon en la base de datos
  const foundTypes = await Type.findAll({
    where: {
      name: type, // Utilizar el campo 'name' en lugar de 'id'
    },
  });

  // Crear el nuevo Pokémon y asociarlo a los tipos encontrados
  const createdPokemon = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
  });

  await createdPokemon.addTypes(foundTypes);

  return createdPokemon;
};

const getPokemonDB = async () => {
  const allPokemon = await Pokemon.findAll({
    attributes: [
      "id",
      "image",
      "name",
      "attack",
      "defense",
      "speed",
      "height",
      "weight",
    ],
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return allPokemon;
};

const getNPokemon = async () => {
  const pokemonData = (await axios(`${URL_API}?offset=0&limit=100`)).data;
  const allPokemons = pokemonData.results;

  return allPokemons;
};

const getPokemonApi = async () => {
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

  const pokemons = [...pokemonDetails];
  return pokemons;
};

const getAllPokemon = async () => {
  const apiInfo = await getPokemonApi();
  const dbInfo = await getPokemonDB();
  const infoTotal = [...apiInfo, ...dbInfo];

  return infoTotal;
};

const searchPokemonByName = async (name) => {
  const pokemonDb = await Pokemon.findAll({
    where: { name: name.toLowerCase() },
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  if (pokemonDb.length > 0) {
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
  if (isNaN(id)) {
    const pokeDb = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return [pokeDb];
  }
  const pokeOne = (await axios(`${URL_API}/${id}`)).data;
  return [
    {
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
    },
  ];
};

module.exports = {
  createPokemon,
  getAllPokemon,
  pokemonById,
  searchPokemonByName,
};
