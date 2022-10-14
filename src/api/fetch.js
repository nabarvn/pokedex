const getPokemons = async () => {
  const data = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=690&offset=0"
  ).then((res) => res.json());

  return data.results;
};

export default getPokemons;
