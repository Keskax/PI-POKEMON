import axios from "axios";

export const GET_POKEMON = "GET_POKEMON";

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
