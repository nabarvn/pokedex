import { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import typeColors from "../../utils/typeColors";
import goBack from "../../assets/goBack.png";
import reducer, { ACTION } from "../../hooks/reducer";

const initialState = {
  pokemonName: "",
  cardIndex: "",
  imgUrl: "",
  types: [],
  description: "",
  stats: {
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    specialAttack: "",
    specialDefense: "",
  },
  height: "",
  weight: "",
  eggGroups: "",
  abilities: "",
  genderRatioMale: "",
  genderRatioFemale: "",
  evs: [],
  hatchSteps: "",
  catchRate: "",
};

const Pokemon = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { index } = useParams();

  useEffect(() => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${index}`;
    const pngIndex = String(index).padStart(3, "0");

    const pokemonFetch = async () => {
      const pokemonData = await fetch(pokemonUrl).then((res) => res.json());

      // Get Pokemon Description, Catch Rate, EggGroups, Gender Ratio, Hatch Steps
      const pokemonSpeciesData = await fetch(pokemonSpeciesUrl).then((res) =>
        res.json()
      );

      pokemonSpeciesData.flavor_text_entries.map((flavor) => {
        if (
          (flavor.language.name = "en") &&
          (flavor.language.url = "https://pokeapi.co/api/v2/language/9/")
        ) {
          dispatch({
            type: ACTION.SET_DESCRIPTION,
            payload: flavor.flavor_text,
          });
        }
        return;
      });

      // Gender Related Stats
      const femaleRate = pokemonSpeciesData["gender_rate"];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round(
        (100 / 255) * pokemonSpeciesData["capture_rate"]
      );

      const eggGroups = pokemonSpeciesData["egg_groups"]
        .map((group) => {
          return group.name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        })
        .join(", ");

      // Counting Hatch Steps
      const hatchSteps = 255 * (pokemonSpeciesData["hatch_counter"] + 1);

      dispatch({
        type: ACTION.SET_GENDER_RATIO_FEMALE,
        payload: genderRatioFemale,
      });

      dispatch({
        type: ACTION.SET_GENDER_RATIO_MALE,
        payload: genderRatioMale,
      });

      dispatch({
        type: ACTION.SET_CATCH_RATE,
        payload: catchRate,
      });

      dispatch({
        type: ACTION.SET_EGG_GROUPS,
        payload: eggGroups,
      });

      dispatch({
        type: ACTION.SET_HATCH_STEPS,
        payload: hatchSteps,
      });

      const name = pokemonData.name;
      const pngUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pngIndex}.png`;

      let { hp, attack, defense, speed, specialAttack, specialDefense } =
        state.stats;

      pokemonData.stats.map((stat) => {
        switch (stat.stat.name) {
          case "hp":
            hp = stat["base_stat"];
            break;
          case "attack":
            attack = stat["base_stat"];
            break;
          case "defense":
            defense = stat["base_stat"];
            break;
          case "speed":
            speed = stat["base_stat"];
            break;
          case "special-attack":
            specialAttack = stat["base_stat"];
            break;
          case "special-defense":
            specialDefense = stat["base_stat"];
            break;
        }
      });

      // Covert decimeters to feet
      // The (.. + 0.0001 * 100) / 100 is for rounding to 2 decimal places
      const height =
        Math.round((pokemonData.height * 0.328084 + 0.0001) * 100) / 100;

      // Converts to Lbs
      const weight =
        Math.round((pokemonData.weight * 0.220462 + 0.0001) * 100) / 100;

      const types = pokemonData.types.map((type) => type.type.name);

      const abilities = pokemonData.abilities
        .map((item) => {
          return item.ability.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1));
        })
        .map((s) => s.join("-"))
        .join(", ");

      const evs = pokemonData.stats
        .filter((stat) => {
          return stat.effort > 0 ? true : false;
        })
        .map((stat) => {
          return `${stat.effort} ${stat.stat.name
            .toLowerCase()
            .split("-")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ")}`;
        })
        .join(", ");

      dispatch({
        type: ACTION.SET_POKEMON_NAME,
        payload: name,
      });

      dispatch({
        type: ACTION.SET_IMG_URL,
        payload: pngUrl,
      });

      dispatch({
        type: ACTION.SET_CARD_INDEX,
        payload: pngIndex,
      });

      dispatch({
        type: ACTION.SET_STATS,
        payload: {
          hp,
          attack,
          defense,
          speed,
          specialAttack,
          specialDefense,
        },
      });

      dispatch({
        type: ACTION.SET_HEIGHT,
        payload: height,
      });

      dispatch({
        type: ACTION.SET_WEIGHT,
        payload: weight,
      });

      dispatch({
        type: ACTION.SET_ABILITIES,
        payload: abilities,
      });

      dispatch({
        type: ACTION.SET_EVS,
        payload: evs,
      });

      dispatch({
        type: ACTION.SET_TYPES,
        payload: types,
      });
    };

    pokemonFetch();
  }, [index]);

  return (
    <>
      <div className='col'>
        <div>
          <Link to='/' style={{ textDecoration: "none" }}>
            <img
              src={goBack}
              alt='Go Back'
              className='goBack rounded mx-auto'
              style={{ width: "2rem", height: "2rem", marginTop: "1rem" }}
            />
          </Link>
        </div>
        <div
          className='card'
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
        >
          <div className='card-header'>
            <div className='row'>
              <div className='col-5'>
                <h5>#{state.cardIndex}</h5>
              </div>
              <div className='col-7'>
                <div className='float-end'>
                  {state.types.map((type) => {
                    return (
                      <span
                        key={type}
                        className='badge rounded-pill text-wrap'
                        style={{
                          marginRight: "16px",
                          width: "4rem",
                          height: "1.5rem",
                          backgroundColor: `#${typeColors[type]}`,
                        }}
                      >
                        {type
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (item) =>
                              item.charAt(0).toUpperCase() + item.substring(1)
                          )
                          .join(" ")}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='row align-items-center'>
              <div className='col-md-3'>
                <img
                  src={state.imgUrl}
                  className='card-img-top rounded mx-auto mt-2'
                />
              </div>
              <div className='col-md-9'>
                <h4 className='text-center text-sm-start'>
                  {state.pokemonName
                    .toLowerCase()
                    .split(" ")
                    .map(
                      (item) => item.charAt(0).toUpperCase() + item.substring(1)
                    )
                    .join(" ")}
                </h4>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>HP</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{ width: `${state.stats.hp}%` }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Attack</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='Progress Bar'
                        style={{ width: `${state.stats.attack}%` }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Defense</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{ width: `${state.stats.defense}%` }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Speed</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{ width: `${state.stats.speed}%` }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Special Attack</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{ width: `${state.stats.specialAttack}%` }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row align-items-center'>
                  <div className='col-12 col-md-3'>Special Defense</div>
                  <div className='col-12 col-md-9'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='Progress Bar'
                        style={{ width: `${state.stats.specialDefense}%` }}
                        aria-valuenow='25'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='row mt-1'>
                <div className='col'>
                  <p className='p-2'>{state.description}</p>
                </div>
              </div> */}
            </div>
          </div>
          <hr />
          <div className='card-body'>
            <h5 className='card-title text-center'>Profile</h5>
            <div className='row'>
              <div className='col-md-6'>
                <div className='row container'>
                  <div className='col-md-6 col-6'>
                    <h6 className='float-md-end text-center'>Height:</h6>
                  </div>
                  <div className='col-md-6 col-6'>
                    <h6 className='text-center'>{state.height} ft.</h6>
                  </div>
                </div>
                <div className='row container'>
                  <div className='col-md-6 col-6'>
                    <h6 className='float-md-end text-center'>Weight:</h6>
                  </div>
                  <div className='col-md-6 col-6'>
                    <h6 className='text-center'>{state.weight} lbs.</h6>
                  </div>
                </div>
                <div className='row container'>
                  <div className='col-md-6 col-6'>
                    <h6 className='float-md-end text-center'>Catch Rate:</h6>
                  </div>
                  <div className='col-md-6 col-6'>
                    <h6 className='text-center'>{state.catchRate}%</h6>
                  </div>
                </div>
                <div className='row container'>
                  <div className='col-md-6 col-6'>
                    <h6 className='float-md-end text-center'>Gender Ratio:</h6>
                  </div>
                  <div className='col-md-6 col-6'>
                    <div className='progress'>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{
                          width: `${state.genderRatioFemale}%`,
                          backgroundColor: "#C2185B",
                        }}
                        aria-valuenow='15'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{state.genderRatioFemale}</small>
                      </div>
                      <div
                        className='progress-bar'
                        role='progressBar'
                        style={{
                          width: `${state.genderRatioMale}%`,
                          backgroundColor: "#1976D2",
                        }}
                        aria-valuenow='15'
                        aria-valuemin='0'
                        aria-valuemax='100'
                      >
                        <small>{state.genderRatioMale}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='row container'>
                  <div className='col-md-6 col-6'>
                    <h6 className='float-md-end text-center'>Egg Groups:</h6>
                  </div>
                  <div className='col-md-6 col-6'>
                    <h6 className='text-center'>{state.eggGroups}</h6>
                  </div>
                </div>
                <div className='row container'>
                  <div className='col-md-6 col-6'>
                    <h6 className='float-md-end text-center'>Hatch Steps:</h6>
                  </div>
                  <div className='col-md-6 col-6'>
                    <h6 className='text-center'>{state.hatchSteps}</h6>
                  </div>
                </div>
                <div className='row container'>
                  <div className='col-md-6 col-6'>
                    <h6 className='float-md-end text-center'>Abilities:</h6>
                  </div>
                  <div className='col-md-6 col-6'>
                    <h6 className='text-center'>{state.abilities}</h6>
                  </div>
                </div>
                <div className='row container'>
                  <div className='col-md-6 col-6'>
                    <h6 className='float-md-end text-center'>EVs:</h6>
                  </div>
                  <div className='col-md-6 col-6'>
                    <h6 className='text-center'>{state.evs}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-footer text-muted'>
            Data From{" "}
            <a href='https://pokeapi.co/' target='_blank' rel='noreferrer'>
              PokeAPI.co
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
