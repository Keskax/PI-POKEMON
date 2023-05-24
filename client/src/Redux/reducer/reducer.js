import {
  GET_POKEMON,
  GET_TYPES,
  CREATE_POKEMON,
  FILTER_BY_TYPES,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  FILTER_CREATED,
  GET_DETAILS,
  GET_NAME,
  CLEAN_DETAIL,
} from "../action/action";

const initialState = {
  Pokemons: [],
  allPoke: [],
  Details: {},
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

    case GET_NAME:
      return {
        ...state,
        Pokemons: [action.payload],
      };

    case CREATE_POKEMON:
      return {
        ...state,
      };

    case GET_DETAILS:
      return {
        ...state,
        Details: action.payload,
      };

    case FILTER_BY_TYPES:
      const { allPoke } = state;
      const filterType = action.payload;
      let filterPoke;

      if (filterType === "All") {
        filterPoke = allPoke;
      } else {
        filterPoke = allPoke.filter((pk) => {
          if (pk.Types) {
            // Verificar si existe la propiedad "Types"
            return pk.Types.includes(filterType);
          } else {
            // Si no existe la propiedad "Types", usar la propiedad "type"
            return pk.type.includes(filterType);
          }
        });
      }

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
      const allPokemons = state.allPoke;
      let createdFilter;

      if (action.payload === "CREATED") {
        createdFilter = allPokemons.filter((pokemon) => pokemon.created);
      } else if (action.payload === "existing") {
        createdFilter = allPokemons.filter((pokemon) => !pokemon.created);
      }

      return { ...state, pokemons: createdFilter || allPokemons };

    case CLEAN_DETAIL:
      return {
        ...state,
        Details: {},
      };

    default:
      return state;
  }
}
