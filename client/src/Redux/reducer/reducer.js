import { GET_POKEMON } from "../action/action";

const initialState = {
  Pokemons: [],
  allPoke: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        Pokemons: action.payload,
        allPoke: action.payload,
      };
    default:
      return state;
  }
}
