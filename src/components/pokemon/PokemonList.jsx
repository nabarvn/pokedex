import PokemonCard from "./PokemonCard";
import pokeLoader from "../../assets/pokeLoader.gif";
import useGlobalContext from "../../hooks/globalContext";

const PokemonList = () => {
  const { search } = useGlobalContext();
  return (
    <div className='pokemonList'>
      <div className='row'>
        {search.length ? (
          search.map((pokemon) => (
            <PokemonCard
              key={pokemon.url}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))
        ) : (
          <div className='row'>
            <div className='col'>
              <img
                src={pokeLoader}
                alt='Pokemons Loading...'
                className='rounded mx-auto mt-2'
                style={{
                  width: "20em",
                  height: "20em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;
