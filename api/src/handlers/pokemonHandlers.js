const {
  createPokemon,
  getAllPokemon,
  pokemonById,
  searchPokemonByName,
} = require("../controllers/pokemonControllers");

const createPokemonHandler = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, type } =
      req.body;
    const newPoke = await createPokemon(
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      type
    );
    res.status(201).json(newPoke);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonHandler = async (req, res) => {
  try {
    const pokemons = await getAllPokemon();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const pokemonByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const pokemon = await pokemonById(id);
    if (!pokemon) {
      res.status(404).json({ error: "Pokemon not found" });
    } else {
      res.json(pokemon);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const searchPokemonByNameHandler = async (req, res) => {
  try {
    const name = req.query.name;
    const pokemons = await searchPokemonByName(name);
    res.json(pokemons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPokemonHandler,
  getPokemonHandler,
  pokemonByIdHandler,
  searchPokemonByNameHandler,
};
