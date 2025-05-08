import { useState } from 'react'
import { MapPin, Droplets, CircleGauge, Eye, Wind, Cloudy, Thermometer } from 'lucide-react'
import './WeatherInfo.css'

function WeatherInfo({ weather }) {
  const [isCelsius, setIsCelsius] = useState(true)

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius)
  }

  const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32

  return (
    <div className='card__info'>
      <h1 className='card__title'>
        <MapPin className='card__icon' /> {weather.name}, <span className='card__span'>{weather.country}</span>
      </h1>

      <img className='card__image' src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`} alt={weather.description} />

      <h1 className='card__temp'>
        {isCelsius ? weather.temp : convertToFahrenheit(weather.temp)}°{isCelsius ? 'C' : 'F'}
      </h1>
      <button className='toggle-button' onClick={toggleTemperatureUnit}>
        Cambiar a °{isCelsius ? 'F' : 'C'}
      </button>

      <p className='card__description'><q>{weather.description}</q></p>

      <div className='card__details'>
        <p className='card__details-item'>
          <Droplets className='card__details-icon' />
          <span className='card__details-item-text'>
            Humedad
            <span className='card__datails-item-value'>{weather.humidity}%</span>
          </span>
        </p>

        <p className='card__details-item'>
          <CircleGauge className='card__details-icon' />
          <span className='card__details-item-text'>
            Presión
            <span className='card__datails-item-value'>{weather.pressure} hpa</span>
          </span>
        </p>

        <p className='card__details-item'>
          <Eye className='card__details-icon' />
          <span className='card__details-item-text'>
            Visibilidad
            <span className='card__datails-item-value'>{weather.visibility} Km</span>
          </span>
        </p>

        <p className='card__details-item'>
          <Wind className='card__details-icon' />
          <span className='card__details-item-text'>
            Viento
            <span className='card__datails-item-value'>{weather.wind} Km/h</span>
          </span>
        </p>

        <p className='card__details-item'>
          <Cloudy className='card__details-icon' />
          <span className='card__details-item-text'>
            Nubes
            <span className='card__datails-item-value'>{weather.clouds}%</span>
          </span>
        </p>

        <p className='card__details-item'>
          <Thermometer className='card__details-icon' />
          <span className='card__details-item-text'>
            Sensación
            <span className='card__datails-item-value'>
              {isCelsius ? weather.feels_like : convertToFahrenheit(weather.feels_like)}°{isCelsius ? 'C' : 'F'}
            </span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default WeatherInfo