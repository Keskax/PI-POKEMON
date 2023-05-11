const { Router } = require("express");
const {
  createPokemonHandler,
  getPokemonHandler,
  searchPokemonByNameHandler,
  pokemonByIdHandler,
} = require("../handlers/pokemonHandlers");

const router = Router();

router.post("/", createPokemonHandler);
router.get("/", getPokemonHandler);
router.get("/name", searchPokemonByNameHandler);
router.get("/:id", pokemonByIdHandler);

module.exports = router;

// const validationError = require("./middleware/validationError");
// const newPokemons = new allPokemon();

// const router = Router();

// router.get("/name", async (req, res) => {
//   try {
//     const pokemon = await newPokemons.findPokemonForName(req, res);
//     res.json(pokemon);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/types", async (req, res) => {
//   try {
//     const types = await newPokemons.findTypes(req, res);
//     res.json(types);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/pokemon", async (req, res) => {
//   try {
//     const pokemons = await newPokemons.findPokemons();
//     res.json(pokemons);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/:idPokemon", async (req, res) => {
//   try {
//     const pokemon = await newPokemons.findPokemonByID(req, res);
//     res.json(pokemon);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post("/", validationError, async (req, res) => {
//   try {
//     const pokemon = await newPokemons.createPokemon(req, res);
//     res.status(201).json({
//       message: "created",
//       data: pokemon,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.errors[0].message });
//   }
// });
