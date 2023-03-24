import React, { useState, useEffect } from 'react'
import './Proj.css'
import WeatherCard from './Card';
import { Col } from 'react-bootstrap'
import MediaQuery from 'react-responsive'





// Within the Temp component, there are two state variables defined using the "useState" hook from React



const Temp = () => {

  const [searchvalue, setSearchValue] = useState("City Of Angels");
  const [tempInfo, setTempInfo] = useState("");



  // This function uses the "try, catch" statement to handle any errors that may occur during the API call. If the API call is successful, the function extracts relevant weather data from the JSON response and stores it in an object called "myWeatherInfo".



  const getWeatherInfo = async () => {
    try {

      // using My TAs API, Danny Tran
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&APPID=3b3a8e57f1a4d465ed91f9d9f01f3baa`;
      const res = await fetch(url);
      const data = await res.json();


      const { temp, pressure, humidity } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myWeatherInfo = { temp, pressure, humidity, name, speed, country, sunset, weathermood }
      setTempInfo(myWeatherInfo);

    } catch (error) {
      console.log(error);
    }
  }


  // "useEffect" hook from React to call the "getWeatherInfo" function when the component mounts. The empty dependency array "[]" ensures that this effect only runs once when the component first mounts.
  useEffect(() => {
    getWeatherInfo();
  });



  return (
    <>
      <MediaQuery minWidth={376}>

        <div className='wrap'>
          <div className='search'>
            <Col sm={{ span: 3, offset: 3 }}>
              <input type="search" placeholder='search' id='search' className='searchTerm' value={searchvalue} onChange={(e) => { setSearchValue(e.target.value) }} />

              <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
            </Col>
          </div>
        </div>
      </MediaQuery>

      {/* temp card!! */}
      <WeatherCard tempInfo={tempInfo} />

    </>
  )
}

export default Temp