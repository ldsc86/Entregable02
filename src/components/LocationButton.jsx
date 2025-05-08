import { LocateFixed } from 'lucide-react'
import './LocationButton.css'

function LocationButton({setCoords, setError}) {

    const handleLocation = (position) => {  
        if (navigator.geolocation) {
          function success({ coords }) {
            setCoords({ lat: coords.latitude,lon: coords.longitude })
          }
    
          function error() {
            setError('Debes permitir la geolocalizacion')
          }
    
          navigator.geolocation.getCurrentPosition(success,error)
        } else {
          setError('Tu navegador no soporta geolocalizacion')
        }
      }
  return (
    <button type='button'onClick={handleLocation} className='location'>
        <LocateFixed className='location__icon' />
    </button>
  )
}

export default LocationButton