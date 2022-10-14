import { useContext } from "react";
import pokeContext from "../context/pokedata";

const useGlobalContext = () => {
  return useContext(pokeContext);
};

export default useGlobalContext;
