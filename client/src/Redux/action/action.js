import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const GET_TYPES = "GET_TYPES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";

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

//*FILTRA LOS TYPES
export function filterPokemonsByTypes(payload) {
  return {
    type: FILTER_BY_TYPES,
    payload,
  };
}

//*FILTRA POR NAME
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
