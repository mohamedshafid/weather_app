import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Temp from "./assets/clouds.png";
import wind from "./assets/wind.png";
import humidity from "./assets/humidity.png";
import drizzle from "./assets/drizzle.png";
import snow from "./assets/snow.png";

const App = () => {
  const [cityName, setCityName] = useState("chennai");
  const [temp, setTemp] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [Humidity, setHumidity] = useState("");
  const inputRef = useRef();

  const handleClick = () => {
    if (inputRef.current.value === "") {
      alert("enter the city name and click on submit!");
    }
    setCityName(inputRef.current.value);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (cityName != "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c06770a44708c57d9f3039741c98abff&units=metric`
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setTemp(response.main.temp);
          setWindSpeed(response.wind.speed);
          setHumidity(response.main.humidity);
          if (temp == undefined) {
            alert("Enter the correct city name!");
          }
        });
    } else {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=chennai&appid=c06770a44708c57d9f3039741c98abff&units=metric`
      )
        .then((response) => response.json())
        .then((response) => {
          setTemp(response.main.temp);
          setWindSpeed(response.wind.speed);
          setHumidity(response.main.humidity);
        });
    }
  }, [cityName]);

  return (
    <div className="container">
      <div className="container-card">
        <h1>Weather</h1>
        <div className="inputs">
          <input placeholder="Enter the city Name:" ref={inputRef} required />
          <button type="submit" onClick={handleClick}>
            Submit
          </button>
        </div>
        <div className="temp">
          <h1
            style={{
              fontSize: "25px",
              fontWeight: "bolder",
              textTransform: "capitalize",
              marginBottom:"-5px",
            }}
          >
            {cityName}
          </h1>
          <img src={temp < 25 ? drizzle : Temp} alt="" />
          <h2>{temp != undefined ? temp : ""}</h2>
        </div>
        <div className="weather-details">
          <div className="wind">
            <img src={wind} alt="image" />
            <h2>
              {windSpeed ? windSpeed : ""} <br /> <span>wind speed</span>
            </h2>
          </div>
          <div className="humidity">
            <img src={humidity} alt="" />
            <h2>
              {Humidity ? Humidity : ""} <br /> <span>Humidity</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
