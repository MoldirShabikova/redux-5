import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDisplay } from "../redux/slices/displayCountrySlice";
import { setLoadingFalse, setLoadingTrue } from "../redux/slices/loadingSlice";

const Weather = () => {
  let display = useSelector(selectDisplay);
  const dispatch = useDispatch();
  let latitude = display.capitalInfo.latlng[0];
  let longitude = display.capitalInfo.latlng[1];

  const [weather, setWeather] = useState();

  useEffect(() => {
    dispatch(setLoadingTrue());
    const options = {
      method: "GET",
      url: "https://weatherapi-com.p.rapidapi.com/current.json",
      params: { q: `${latitude}, ${longitude}` },
      headers: {
        "X-RapidAPI-Key":  "263584a1c7msh729d6b4c4336fd9p1a6709jsn40d0c15ec003",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (res) {
        setWeather(res.data);
        dispatch(setLoadingFalse());
      })
      .catch(function (error) {
        console.error(error);
        dispatch(setLoadingFalse());
        alert("Issue fetching weather data");
      });
  }, []);

  return (
    <div>
      <table className="overview-table">
        <tbody>
          <tr>
            <td>Conditions: </td>
            <td>{weather?.current?.condition?.text}</td>
          </tr>
          <tr>
            <td>Temperature: </td>
            <td>{weather?.current.temp_f} degrees Farenheit</td>
          </tr>
          <tr>
            <td>Feels Like: </td>
            <td>{weather?.current?.feelslike_f} degrees Farenheit</td>
          </tr>
          <tr>
            <td>Humidity: </td>
            <td>{weather?.current?.humidity}%</td>
          </tr>
          <tr>
            <td>Wind Speed: </td>
            <td>
              {weather?.current?.wind_mph} mph {weather?.current?.wind_dir}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Weather;
