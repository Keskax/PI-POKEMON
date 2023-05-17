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
