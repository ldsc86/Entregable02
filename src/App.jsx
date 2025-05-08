import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import LocationButton from './components/LocationButton'
import WeatherInfo from './components/WeatherInfo'
import './App.css'
import { AlertCircle } from 'lucide-react'
import { BASE_URL, API_KEY, options } from './lib/utils'

function App() {
  const [weather, setWeather] = useState({})
  const [error, setError] = useState(null)
  const [city, setCity] = useState('Venezuela')
  const [coords, setCoords] = useState({ lat: 0, lon: 0 })
  
 
  useEffect(() => {
    getWeatherByCity()
  }, [city, coords])

  const getWeatherByCity = async () => {
    const { lat, lon } = coords
    setError(null)
    axios.get(`${BASE_URL}${lat != 0 && lon != 0 ? `lat=${lat}&lon=${lon}` : `q=${city}`}&appid=${API_KEY}${options}`)
      .then((res) => {
        const timeOptions = {
          hour: '2-digit',
          minute: '2-digit'       
        }

        setWeather({
          name: res.data.name,
          country: res.data.sys.country,
          temp: Math.ceil(res.data.main.temp),
          description: res.data.weather[0].description,
          humidity: res.data.main.humidity,
          wind: res.data.wind.speed,
          pressure: res.data.main.pressure,
          visibility: res.data.visibility,
          feels_like: Math.ceil (res.data.main.feels_like),
          clouds: res.data.clouds.all,
          sunrise: new Date (res.data.sys.sunrise * 1000).toLocaleTimeString([], timeOptions),
          sunset: new Date (res.data.sys.sunset * 1000).toLocaleTimeString([], timeOptions), 
          icon: res.data.weather[0].icon,
        })
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError('Ciudad no encontrada')
        }
        console.error(err.response?.data?.message || err.message) 
      })
  }

  return (
    <div className='container'>
      {/* Video de fondo */}
      <video autoPlay loop muted className='background-video'>
        <source src="/src/assets/background.mp4" type="video/mp4" />
      </video>

      <div className='card'>
      {/* Buscador por pais */}
      <div className='card__header'>
      <Search setCity={setCity} setCoords={setCoords} />
      <LocationButton setCoords={setCoords} setError={setError} />
      </div>
      <div className='card__body'>
        {error && <p className='error'>
          <AlertCircle className='error__icon' />{error}
          </p>}
      
        {/* Informacion del estado del clima */}
        {weather && <WeatherInfo weather={weather} />}
        </div>
      </div>
    </div>
  )
}

export default App
