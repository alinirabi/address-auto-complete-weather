import React, { useState, useEffect } from "react";
import Constants from '../common/Constants';
// import {getWeather} from '../api/weather';
import axios from 'axios';
const WeatherBox = ({ City, Country }) => {
    const [feels_like, setFeelsLike] = useState('');
    const [mainTemp, setMainTemp] = useState('');
    const [description, setDescription] = useState('');
    const [main, setMain] = useState('');
    const [iconID, setIconID] = useState('');
    useEffect(() => {
        getResponse(City, Country)
    });
    const getResponse = (City, Country) => {
        getWeather(City, Country)
    }
    function getWeather(City, Country) {
        axios(`${Constants.WeatherAPI}=${Country},${City}&appid=${Constants.WEATHER_KEY}&units=metric`).then(res => {
            if (res.data.cod != '404') {
                console.log(res.data);
                console.log("data");
                setFeelsLike(res.data.main.feels_like);
                setMainTemp(res.data.main.temp);
                setDescription(res.data.weather[0].description);
                setMain(res.data.weather[0].main);
                setIconID(res.data.weather[0].icon);
            }
            else {
                {
                    console.log('address does not exsist')
                }
            }
        }).catch(err => { console.log(err); console.log("er000000r") })
    }
    return (
        <>
            {Country && City ?
                <div>
                    <h1>Main Temperature : {mainTemp} Degrees Celsius</h1>
                    <h1>Feels like: {feels_like} Degrees Celsius</h1>
                    <h1>Weather Parameter: {main}</h1>
                    <h1>Description : {description}</h1>
                    <img src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"} />
                </div>
                : <span>Select Address</span>}
        </>
    )
}
export default WeatherBox;