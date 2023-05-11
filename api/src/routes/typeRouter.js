const { Router } = require("express");
const router = Router();
const getTypesHandler = require("../handlers/typesHandlers");

router.get("/", getTypesHandler);

module.exports = router;
