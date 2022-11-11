import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import { BASE_URL, API_KEY } from "../../api";
import {
  WeatherAction,
  WeatherDataRequest,
  WeatherError,
  GET_WEATHER,
  SET_LOADING,
  SET_ERROR,
} from "../types";

export const getWeather = (
  id: number,
  units: string = "metric"
): ThunkAction<void, RootState, null, WeatherAction> => {
  return async (dispatch) => {
    try {
      const url =
        BASE_URL +
        new URLSearchParams({ units, id: id.toString(), appid: API_KEY });
      const res = await fetch(url);

      if (!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const data: WeatherDataRequest = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: {
          units,
          temp: data.main.temp,
          id: data.id,
          name: data.name,
        },
      });
    } catch (err: any) {
      dispatch({
        type: SET_ERROR,
        payload: id,
      });
    }
  };
};

export const setLoading = (number: number): WeatherAction => {
  return {
    type: SET_LOADING,
    payload: number,
  };
};

export const setError = (number: number): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: number,
  };
};
