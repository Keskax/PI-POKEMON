const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemons = require("./pokemonRouter");
const types = require("./typeRouter");

const router = Router();

router.use("/pokemon", pokemons);
router.use("/types", types);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
