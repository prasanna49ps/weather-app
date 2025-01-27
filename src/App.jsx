import './App.css'
import { FaSearch } from "react-icons/fa";

//images
import cloud from './assets/clouds.png'
import drizzle from './assets/drizzle.png'
import humidity from './assets/humidity.png'
import snow from './assets/snowflake.png'
import storm from './assets/storm.png'
import wind from './assets/wind.png'
import rain from './assets/water-droplet.png'
import sun from './assets/sun.png'
import { useEffect, useState } from 'react';

const WeatherDetails = ({icon,temp,city,country,lat,log,wind1,humidity1}) => {
  return (
    <>
    <div className="image">
      <img src={icon} alt="" />    
    </div>
    <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
       <div>
         <span className='lat'>latitude</span>
         <span>{lat}</span>
       </div>
       <div>
       <span className='lpg'>longitude</span>
       <span>{log}</span>
       </div>
      </div>

      <div className="data-container">
        <div className="element">
          <div className="imag">
          <img src={humidity} alt="" />
          </div>
         
          <div className="data">
        <div className="humidity-percent">{humidity1}%</div>
        <div className="text">humidity</div>
        </div>
        </div>
        
        

        <div className="element">
          <div className="imag">
          <img src={wind} alt="" />
          </div>
          
          <div className="data">
        <div className="humidity-percent">{wind1}%</div>
        <div className="text">wind-speed</div>
        </div>
        </div>
      </div>
    </>
  )
}

function App() {
let api_key = "d28950ee9a39c03a8b22d77a88823931"
const [text,setText] = useState("")

const [icon,setIcon] = useState(cloud)
const [temp,setTemp] = useState(23)
const [city,setCIty] = useState("chennai")
const [country,setCountry] = useState("IN")
const [log,setLog] = useState(80.2785)
const [lat,setLat] = useState(13.085)
const [wind1,setWind] = useState(2.68)
const [humidity1,setHumidity] = useState(83)
const [cityNoTFound,setCityNotFound] = useState(false)
const [loading,setLoading] = useState(false)

const weatherIconMap = {
  "01d": sun,
  "01n": sun,
  "02d": drizzle,
  "02n": drizzle,
  "03d": cloud,
  "03n": cloud,
  "04d": cloud,
  "04n": cloud,
  "09n": rain,
  "10n": storm,
  "10d": storm,
  "13d": snow, 
  "13n": snow
}

const handleCity = (e) => {
    setText(e.target.value)
}

const handleKeyDown = (e) => {
  if(e.key === "Enter" ) {
    Search()
  }
}

const Search = async () => {
  setLoading(true) 
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=d28950ee9a39c03a8b22d77a88823931&units=Metric`

  try{
   let res = await fetch(url)
   let data = await res.json()
   console.log(data);

   if(data.cod === "404") {
    console.error("city not found")
    setCityNotFound(true)
    setLoading(false)
    return;
  }

  setHumidity(data.main.humidity);
  setWind(data.wind.speed)
  setTemp(Math.floor(data.main.temp))
  setCIty(data.name)
  setCountry(data.sys.country)
  setLat(data.coord.lat)
  setLog(data.coord.lon)
  const weatherIconCode = data.weather[0].icon;
  setIcon(weatherIconMap[weatherIconCode] || sun)
  setCityNotFound(false)

  }catch (error){
      console.error("An error Occured", error.message)
  }finally{
    setLoading(false)
  }

  useEffect(() => {
    Search()
  },[])
}
  return (
    <>
      <div>
          <div className="container">
              <div className="input">
                  <input type="text" 
                  className='city-input'
                  onChange={handleCity} 
                  value={text }
                  onKeyDown={handleKeyDown}
                  placeholder='Search City'/>
                  <div className="search-icon">
                    <FaSearch className='search' onClick={() => Search()}/>
                  </div>
              </div>
              <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} wind1={wind1} humidity1={humidity1}/>
          </div>
          
      </div>
    </>
  )
}

export default App


