const axios = require("axios");
const { Type } = require("../db");
const { URL_API_STAT } = process.env;

const getTypes = async () => {
  let types = await Type.findAll();

  if (types.length === 0) {
    const response = await axios.get(`${URL_API_STAT}`);
    const typeApi = response.data.results;

    types = await axios.all(
      typeApi.map(async (type) => {
        const response = await axios.get(type.url);
        const name = response.data.name; // aquí se cambia de "nombre" a "name"
        return { name };
      })
    );

    await Type.bulkCreate(types);
  }

  return types;
};

module.exports = getTypes;
