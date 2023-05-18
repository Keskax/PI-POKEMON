const {
  createPokemon,
  getAllPokemon,
  pokemonById,
  searchPokemonByName,
} = require("../controllers/pokemonControllers");

const getPokemonDBHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const response = await getAllPokemon(name);
      return res.status(200).json(response);
    }
    const response = await getAllPokemon();
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  try {
    const { name, image, hp, attack, defense, speed, height, weight, type } =
      req.body;

    // Asegurarse de que los tipos se pasen como un arreglo
    const types = Array.isArray(type) ? type : [type];

    const newPoke = await createPokemon(
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      type // Pasar los tipos como un arreglo
    );

    const response = {
      ...newPoke.toJSON(),
      types,
    };
    res.status(201).json(response);
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
  const { id } = req.params;

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
    const { name } = req.query;
    const result = await searchPokemonByName(name);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getPokemonDBHandler,
  createPokemonHandler,
  getPokemonHandler,
  pokemonByIdHandler,
  searchPokemonByNameHandler,
};
