import {
  GET_POKEMON,
  GET_TYPES,
  CREATE_POKEMON,
  FILTER_BY_TYPES,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  FILTER_CREATED,
  POKEMON_DETAIL,
} from "../action/action";

const initialState = {
  Pokemons: [],
  allPoke: [],
  Types: [],
  Details: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMON:
      return {
        ...state,
        Pokemons: action.payload,
        allPoke: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        Types: action.payload,
      };

    case CREATE_POKEMON:
      return {
        ...state,
        Pokemons: action.payload,
      };

    case POKEMON_DETAIL:
      return {
        ...state,
        Details: action.payload,
      };

    case FILTER_BY_TYPES:
      const { allPoke } = state;
      let filterPoke = action.payload;
      filterPoke =
        action.payload === "All"
          ? (filterPoke = allPoke)
          : (filterPoke = allPoke.filter((pk) =>
              pk.type.includes(action.payload)
            ));
      return {
        ...state,
        Pokemons: filterPoke,
      };

    case ORDER_BY_NAME:
      const orderName =
        action.payload === "ASC"
          ? state.Pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.Pokemons.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        Pokemons: orderName,
      };

    case ORDER_BY_ATTACK:
      const orderAttack =
        action.payload === "LOW"
          ? state.Pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.Pokemons.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        Pokemons: orderAttack,
      };

    case FILTER_CREATED:
      const allPokeCreated =
        action.payload === "CREATED"
          ? state.allPoke.filter((pk) => pk.createdInDb === true)
          : state.allPoke.filter((pk) => pk.createdInDb === false);
      return {
        ...state,
        Pokemons: action.payload === "All" ? state.allPoke : allPokeCreated,
      };

    default:
      return state;
  }
}
