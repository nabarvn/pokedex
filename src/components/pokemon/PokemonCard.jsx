import { useEffect, useReducer } from "react";
import styled from "styled-components";
import dotLoader from "../../assets/dotLoader.gif";
import barLoader from "../../assets/barLoader.gif";
import { Link } from "react-router-dom";
import typeColors from "../../utils/typeColors";
import reducer, { ACTION } from "../../hooks/reducer";

const Sprite = styled.img`
  width: 7em;
  height: 7em;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

const PokemonCard = ({ name, url }) => {
  const [state, dispatch] = useReducer(reducer, {
    pokeName: "",
    pokeIndex: "",
    imageUrl: "",
    loading: true,
    cardIndex: "",
    pokeTypes: [],
  });

  const errorImage = (err) => {
    return (err.target.src = barLoader);
  };

  useEffect(() => {
    const index = url.split("/")[url.split("/").length - 2];
    const pngIndex = String(index).padStart(3, "0");

    const pokemonDataFetch = async () => {
      const pokemonData = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      ).then((res) => res.json());

      const types = pokemonData.types.map((type) => type.type.name);
      dispatch({ type: ACTION.SET_POKETYPES, payload: types });
    };

    dispatch({ type: ACTION.SET_POKENAME, payload: name });
    dispatch({ type: ACTION.SET_POKEINDEX, payload: index });

    dispatch({
      type: ACTION.SET_IMAGE_URL,
      payload: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pngIndex}.png`,
    });

    dispatch({ type: ACTION.SET_LOADING, payload: false });
    dispatch({ type: ACTION.SET_CARD_INDEX, payload: pngIndex });

    pokemonDataFetch();
  }, [name, url]);

  return state.loading ? (
    <div className='col-md-3 col-sm-6 mb-5'>
      <div className='card'>
        <img
          src={dotLoader}
          alt='Pokemon'
          className='card-img-top rounded mx-auto mt-2'
          style={{ width: "9em", height: "9em" }}
        />
      </div>
    </div>
  ) : (
    <div className='col-md-3 col-sm-6 mb-5'>
      <Link
        to={`pokemon/${state.pokeIndex}`}
        style={{ textDecoration: "none" }}
        className='text-black'
      >
        <Card className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-7'>
                <h5 style={{ marginLeft: "5px" }}>#{state.cardIndex}</h5>
              </div>
              <div className='col-5'>
                <div className='float-end'>
                  {state.pokeTypes.map((type) => {
                    return (
                      <span
                        key={type}
                        className='badge rounded-pill'
                        style={{
                          marginRight: "5px",
                          width: "1rem",
                          height: "1rem",
                          backgroundColor: `#${typeColors[type]}`,
                        }}
                      >
                        <small></small>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <Sprite
            className='card-img-top rounded mx-auto mt-2'
            src={state.imageUrl}
            onError={errorImage}
          />
          <div className='card-body mx-auto'>
            <h6 className='card-title'>
              {state.pokeName
                .toLowerCase()
                .split(" ")
                .map((item) => item.charAt(0).toUpperCase() + item.substring(1))
                .join(" ")}
            </h6>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default PokemonCard;
