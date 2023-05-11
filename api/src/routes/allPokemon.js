// const axios = require("axios");
// require("dotenv").config();
// const { URL_API } = process.env;

// const { Pokemon, Type } = require("../db");

// //! Traer info de la API
// const getApiInfo = async () => {
//   const apiUrl = await axios
//     .get(`${URL_API}/pokemon?limit=60`)
//     .then((response) => response.data.results);
//   const apiInfo = apiUrl.map((element) => element.url);
//   const apiInfoTotal = await axios.all(
//     apiInfo.map(async (url) => {
//       const el = (await axios.get(url)).data;
//       return {
//         id: el.id,
//         name: el.name,
//         hp: el.stats[0].base_stat,
//         attack: el.stats[1].base_stat,
//         defense: el.stats[2].base_stat,
//         speed: el.stats[6].base_stat,
//         height: el.height,
//         weight: el.weight,
//         img: el.sprites.other["official-artwork"].front_default,
//         types: el.types.map((tp) => tp.type.name),
//       };
//     })
//   );
//   return apiInfoTotal;
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

// class allPokemon {
//   constructor() {
//     this.URL = URL_API;
//   }

//   //! Función que responde con 60 pokemons de la API y de la BDD

//   async findPokemons() {
//     try {
//       const dbInfo = await Pokemon.findAll({
//         include: {
//           model: Type,
//           attributes: ["name"],
//           through: {
//             attributes: [],
//           },
//         },
//       });

//       const responseDb = dbInfo?.map((data) => {
//         const { id, name, image, types, attack, defense } = data;
//         return {
//           id,
//           name,
//           image,
//           attack,
//           defense,
//           Types: types.map((type) => type.name),
//         };
//       });

//       const pokemons = await axios.get(`${this.URL}/pokemon/?limit=60`);
//       const results = pokemons.data.results.map((pokemon) =>
//         axios.get(pokemon.url)
//       );
//       const apiInfo = await Promise.all(results);
//       const responseAPI = apiInfo.map((data) => {
//         const { id, sprites, name, types, stats } = data.data;
//         return {
//           id,
//           image:
//             sprites.other.home.front_default ||
//             sprites.other["official-artwork"].front_default,
//           name,
//           Types: types.map((type) => type.type.name),
//           attack: stats[1].base_stat,
//         };
//       });

//       if (dbInfo) {
//         return [...responseDb, ...responseAPI];
//       }
//       return responseAPI;
//     } catch (error) {
//       return { message: error.message };
//     }
//   }

//   //! función que responde con 1 pokemon este lo busca en la API y en BDD

//   async findPokemonByID(req, res) {
//     const { idPokemon } = req.params;

//     try {
//       const pokemon = await axios.get(`${this.API_URL}/pokemon/${idPokemon}`);
//       const el = pokemon.data;
//       return {
//         id: el.id,
//         name: el.name,
//         image:
//           el.sprites.other.home.front_default ||
//           el.sprites.other["official-artwork"].front_default,
//         hp: el.stats[0].base_stat,
//         attack: el.stats[1].base_stat,
//         defense: el.stats[2].base_stat,
//         speed: el.stats[6].base_stat || null,
//         height: el.height || null,
//         weight: el.weight || null,
//         Types: el.types.map((type) => type.type.name),
//       };
//     } catch (errorAPI) {
//       try {
//         const pokemon = await Pokemon.findByPk(idPokemon, {
//           include: {
//             model: Type,
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//           },
//         });
//         if (pokemon) {
//           const {
//             id,
//             name,
//             image,
//             hp,
//             attack,
//             defense,
//             speed,
//             height,
//             weight,
//             Types,
//           } = pokemon;
//           return {
//             id,
//             name: toLowerCase(name),
//             image,
//             hp,
//             attack,
//             defense,
//             speed,
//             height,
//             weight,
//             Types: Types.map((type) => type.name),
//           };
//         }
//       } catch (errorDB) {
//         res.status(404).json({
//           errorAPI: errorAPI.message,
//           errorDB: errorDB.message,
//         });
//       }
//     }
//   }

//   //! función que responde con un pokemon buscado por el nombre tanto en la API como en la BDD

//   async findPokemonForName(req, res) {
//     const queryName = req.query.name;
//     try {
//       const pokemon = await axios.get(
//         `${this.URL}/pokemon/${queryName.toLowerCase()}`
//       );
//       const { id, name, sprites, types } = pokemon.data;
//       return {
//         id,
//         name,
//         image:
//           sprites.other.home.front_default ||
//           sprites.other["official-artwork"].front_default,
//         Types: types.map((type) => type.type.name),
//       };
//     } catch (errorAPI) {
//       try {
//         const pokemon = await Pokemon.findOne({
//           where: { name: queryName.toLowerCase() },
//           include: {
//             model: Type,
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//           },
//         });
//         const { id, Types, image } = pokemon;
//         const nameBD = pokemon.name;
//         if (pokemon) {
//           return {
//             id,
//             image,
//             name: toLowerCase(nameBD),
//             Types: Types.map((type) => type.name),
//           };
//         }
//       } catch (errorDB) {
//         res.status(404).json({
//           errorAPI: errorAPI.message,
//           errorDB: errorDB.message,
//         });
//       }
//     }
//   }

//   //! función que crea un Pokemon y lo guarda en la BDD

//   async createPokemon(req, res) {
//     try {
//       const { name, image, hp, attack, defense, speed, height, weight, types } =
//         req.body;
//       const newPokemon = await Pokemon.create({
//         name,
//         image,
//         hp,
//         attack,
//         defense,
//         speed: speed || null,
//         height: height || null,
//         weight: weight || null,
//       });

//       await newPokemon.addTypes(types);

//       return newPokemon;
//     } catch (error) {
//       return { message: error.message };
//     }
//   }

//   //! función que copia los types de la API a la BDD y responde con los types de la base de datos
//   async findTypes() {
//     try {
//       const typesBD = await Type.findAll();
//       if (typesBD.length === 0) {
//         const data = await axios.get(`${this.URL}/type`);
//         const types = data.data.results.map((type) => {
//           return { name: type.name };
//         });
//         const newTypes = await Type.bulkCreate(types);
//         return newTypes;
//       }
//       return typesBD;
//     } catch (error) {
//       return { message: error.message };
//     }
//   }
// }

// module.exports = allPokemon;
