const getTypes = require("../controllers/typesControllers");

const getTypesHandler = async (req, res) => {
  try {
    const types = await getTypes();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTypesHandler;
