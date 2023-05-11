// const axios = require("axios");
// require("dotenv").config();
// const { URL_API, URL_API2 } = process.env;

// const { Pokemon, Type } = require("../db");

// //! Traer info de la API
// const getApiInfo = async () => {
//   let arrayPokemonsApi = [];

//   //* carga de pokeAPI
//   try {
//     const response = await axios.get(`${URL_API}`);
//     const arrayResultApi = response.data.results;
//     const urlApi = [];

//     arrayResultApi.map((el) => urlApi.push(axios.get(el.url)));
//     //* se obtiene uno por uno los datos de cada pokemon

//     const pokemons = await axios.all(urlApi);
//     arrayPokemonsApi = pokemons.map((el) => {
//       return {
//         id: el.data.id,
//         name: el.data.name,
//         image: el.data.sprites.other.dream_world.front_default,
//         hp: el.data.stats[0].base_stat,
//         attack: el.data.stats[1].base_stat,
//         defense: el.data.stats[2].base_stat,
//         speed: el.data.stats[5].base_stat,
//         height: el.data.height,
//         weight: el.data.weight,
//         types: el.data.types.map((t) => {
//           return {
//             name: t.type.name,
//           };
//         }),
//       };
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   //* end - carga de poke API
//   return arrayPokemonsApi;
// };

// //!INFO DE LA BDD

// const getDbInfo = async () => {
//   let pokeDb = await Pokemon.findAll({
//     include: [
//       {
//         model: Type,
//         attributes: ["name"],
//         through: {
//           attributes: [],
//         },
//       },
//     ],
//   });
//   let pokeTMap = pokeDb.map((el) => {
//     return {
//       id: el.id,
//       name: el.name,
//       height: el.height,
//       weight: el.weight,
//       hp: el.hp,
//       attack: el.attack,
//       defense: el.defense,
//       speed: el.speed,
//       image: el.image,
//       types: el.types.map((el) => el.name),
//     };
//   });

//   return pokeTMap;
// };

// //!CONCATENAR LA INFO DE LA API Y BDD

// const getAllPokemon = async () => {
//   const apiInfoTotal = await getApiInfo();
//   const dbInfo = await getDbInfo();
//   const infoTotal = {
//     ...apiInfoTotal,
//     ...dbInfo,
//   };
//   return infoTotal;
// };

// module.exports = {
//   getApiInfo,
//   getDbInfo,
//   getAllPokemon,
// };
