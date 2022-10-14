import { createContext, useEffect, useReducer } from "react";
import getPokemons from "../api/fetch";
import reducer, { ACTION } from "../hooks/reducer";

const pokeContext = createContext();

export const PokedataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { pokemons: [], search: [] });

  useEffect(() => {
    getPokemons().then((json) => {
      dispatch({ type: ACTION.SET_POKEMONS, payload: json });
      dispatch({ type: ACTION.SET_SEARCH, payload: json });
    });
  }, []);

  const handleSearch = (e) => {
    const resultsArray = state.pokemons.filter((pokemon) =>
      pokemon.name.includes(e.target.value.toLowerCase())
    );

    dispatch({ type: ACTION.SET_SEARCH, payload: resultsArray });
  };

  const homePage = () => {
    dispatch({ type: ACTION.SET_SEARCH, payload: state.pokemons });
  };

  return (
    <pokeContext.Provider value={{ ...state, handleSearch, homePage }}>
      {children}
    </pokeContext.Provider>
  );
};

export default pokeContext;
