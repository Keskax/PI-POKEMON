import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const GET_TYPES = "GET_TYPES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const FILTER_CREATED = "FILTER_CREATED";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";

//*TRAE A LOS POKEMONS
export function getAllPokemon() {
  return async function (dispatch) {
    try {
      const allPoke = await axios.get("http://localhost:3001/pokemon");

      return dispatch({
        type: GET_POKEMON,
        payload: allPoke.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}

//*TRAE LOS TYPES
export function getAllTypes() {
  return async function (dispatch) {
    try {
      const info = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: info.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
}
//*TRAE LOS POKE POR EL NAME
export function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/pokemon/name?name=${name}`
      );
      return dispatch({
        type: GET_NAME_POKEMON,
        payload: response.data,
      });
    } catch (err) {
      console.error(`Pokemon not found, try another name`);
      alert(`Pokemon not found, try another name`);
    }
  };
}

//*FILTRA LOS TYPES
export function filterPokemonsByTypes(payload) {
  return {
    type: FILTER_BY_TYPES,
    payload,
  };
}

//*ORDER ASC, DES
export function orderPokemonsByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

//* FILTRA LOS POKE POR ATTACK
export function orderPokemonsByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}

//* FILTRA LOS POKE BD/API
export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}
