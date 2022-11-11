export const GET_WEATHER = "GET_WEATHER";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export interface WeatherDataRequest {
  coord: { lon: number; lat: number };
  weather: [{ id: number; main: string; description: string; icon: string }];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherData {
  units: string;
  temp: number;
  id: number;
  name: string;
}

export interface WeatherError {
  cod: string;
  message: string;
}

export interface WeatherState {
  data: {
    cities: number[];
    citiesWeather: { [index: number]: { [index: string]: WeatherData } };
  };
  loading: Set<number>;
  error: Set<number>;
}

interface GetWeatherAction {
  type: typeof GET_WEATHER;
  payload: WeatherData;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: number;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: number;
}

export type WeatherAction =
  | GetWeatherAction
  | SetLoadingAction
  | SetErrorAction;
