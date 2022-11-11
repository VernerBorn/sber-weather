import {
  WeatherState,
  WeatherAction,
  GET_WEATHER,
  SET_LOADING,
  SET_ERROR,
} from "./../types";

const initialState: WeatherState = {
  data: {
    cities: [524894, 498817],
    citiesWeather: {},
  },
  loading: new Set(),
  error: new Set(),
};

export const weatherReducer = (
  state = initialState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case GET_WEATHER:
      return {
        data: {
          ...state.data,
          citiesWeather: {
            ...state.data.citiesWeather,
            [action.payload.id]: {
              ...state.data.citiesWeather[action.payload.id],
              [action.payload.units]: action.payload,
            },
          },
        },
        loading: (() => {
          state.loading.delete(action.payload.id);
          return new Set(state.loading);
        })(),
        error: (() => {
          state.loading.delete(action.payload.id);
          return new Set(state.error);
        })(),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: new Set(state.loading).add(action.payload),
        error: (() => {
          state.loading.delete(action.payload);
          return new Set(state.error);
        })(),
      };
    case SET_ERROR:
      return {
        ...state,
        error: new Set(state.loading).add(action.payload),
        loading: (() => {
          state.loading.delete(action.payload);
          return new Set(state.error);
        })(),
      };
    default:
      return state;
  }
};
