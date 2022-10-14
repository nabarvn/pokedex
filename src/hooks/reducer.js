export const ACTION = {
  SET_POKEMONS: "SET_POKEMONS",
  SET_SEARCH: "SET_SEARCH",
  SET_POKETYPES: "SET_POKETYPES",
  SET_POKENAME: "SET_POKENAME",
  SET_POKEINDEX: "SET_POKEINDEX",
  SET_IMAGE_URL: "SET_IMAGE_URL",
  SET_LOADING: "SET_LOADING",
  SET_CARD_INDEX: "SET_CARD_INDEX",
  SET_DESCRIPTION: "SET_DESCRIPTION",
  SET_GENDER_RATIO_FEMALE: "SET_GENDER_RATIO_FEMALE",
  SET_GENDER_RATIO_MALE: "SET_GENDER_RATIO_MALE",
  SET_CATCH_RATE: "SET_CATCH_RATE",
  SET_EGG_GROUPS: "SET_EGG_GROUPS",
  SET_HATCH_STEPS: "SET_HATCH_STEPS",
  SET_POKEMON_NAME: "SET_POKEMON_NAME",
  SET_IMG_URL: "SET_IMG_URL",
  SET_STATS: "SET_STATS",
  SET_HEIGHT: "SET_HEIGHT",
  SET_WEIGHT: "SET_WEIGHT",
  SET_ABILITIES: "SET_ABILITIES",
  SET_EVS: "SET_EVS",
  SET_TYPES: "SET_TYPES",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.SET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
      };

    case ACTION.SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };

    case ACTION.SET_POKETYPES:
      return {
        ...state,
        pokeTypes: action.payload,
      };

    case ACTION.SET_POKENAME:
      return {
        ...state,
        pokeName: action.payload,
      };

    case ACTION.SET_POKEINDEX:
      return {
        ...state,
        pokeIndex: action.payload,
      };

    case ACTION.SET_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload,
      };

    case ACTION.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ACTION.SET_CARD_INDEX:
      return {
        ...state,
        cardIndex: action.payload,
      };

    case ACTION.SET_DESCRIPTION:
      return {
        ...state,
        description: state.description + action.payload,
      };

    case ACTION.SET_GENDER_RATIO_FEMALE:
      return {
        ...state,
        genderRatioFemale: action.payload,
      };

    case ACTION.SET_GENDER_RATIO_MALE:
      return {
        ...state,
        genderRatioMale: action.payload,
      };

    case ACTION.SET_CATCH_RATE:
      return {
        ...state,
        catchRate: action.payload,
      };

    case ACTION.SET_EGG_GROUPS:
      return {
        ...state,
        eggGroups: action.payload,
      };

    case ACTION.SET_HATCH_STEPS:
      return {
        ...state,
        hatchSteps: action.payload,
      };

    case ACTION.SET_POKEMON_NAME:
      return {
        ...state,
        pokemonName: action.payload,
      };

    case ACTION.SET_IMG_URL:
      return {
        ...state,
        imgUrl: action.payload,
      };

    case ACTION.SET_STATS:
      return {
        ...state,
        stats: {
          hp: action.payload.hp,
          attack: action.payload.attack,
          defense: action.payload.defense,
          speed: action.payload.speed,
          specialAttack: action.payload.specialAttack,
          specialDefense: action.payload.specialDefense,
        },
      };

    case ACTION.SET_HEIGHT:
      return {
        ...state,
        height: action.payload,
      };

    case ACTION.SET_WEIGHT:
      return {
        ...state,
        weight: action.payload,
      };

    case ACTION.SET_ABILITIES:
      return {
        ...state,
        abilities: action.payload,
      };

    case ACTION.SET_EVS:
      return {
        ...state,
        evs: action.payload,
      };

    case ACTION.SET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    default:
      return { ...state };
  }
};

export default reducer;
