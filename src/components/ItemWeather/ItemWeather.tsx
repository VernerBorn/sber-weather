import "./ItemWeather.css";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store";
import { getWeather, setLoading } from "../../store/actions/weatherActions";
import { LOCAL } from "../../api";

type ItemWeatherProps = {
  id: number;
};

const ItemWeather = React.memo(({ id }: ItemWeatherProps) => {
  const loading = useSelector((state: RootState) => state.weather.loading).has(
    id
  );
  const error = useSelector((state: RootState) => state.weather.error).has(id);

  const data = useSelector(
    (state: RootState) => state.weather.data.citiesWeather[id]
  );

  type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(id));
    dispatch(getWeather(id, "imperial"));
    dispatch(getWeather(id, "metric"));
  }, [dispatch, id]);
  return (
    <li
      className={`item-weather 
      ${loading ? "item-weather--loading" : ""} ${
        error ? "item-weather--error" : ""
      }`}
    >
      {data ? (
        <>
          <span className="item-weather__name">
            {LOCAL[data.imperial.name || data.metric.name]}
          </span>
          <div className="item-weather__temp-wrap">
            {data.imperial && (
              <span className="item-weather__temp item-weather__temp--imperial">
                {data.imperial.temp + " ℉"}
              </span>
            )}
            {data.metric && (
              <span className="item-weather__temp item-weather__temp--metric">
                {data.metric.temp + " ℃"}
              </span>
            )}
          </div>
        </>
      ) : null}
    </li>
  );
});

export default ItemWeather;
