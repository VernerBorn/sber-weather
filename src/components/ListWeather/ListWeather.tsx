import './ListWeather.css'
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ItemWeather from "../ItemWeather/ItemWeather";

const ListWeather = () => {
  const cities = useSelector((state: RootState) => state.weather.data.cities);

  return (
    <ul className="list-weather">
      {cities.map((item) => {
        return <ItemWeather id={item} key={item} />;
      })}
    </ul>
  );
};

export default ListWeather;
