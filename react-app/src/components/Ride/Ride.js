import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { getAllBookings } from "../../store/bookings"
import { useDispatch, useSelector } from 'react-redux';
import RideForm from './RideForm';


const Ride = () => {
    const bookings = useSelector(state => Object.values(state.Bookings))
    const key = useSelector(state => state.key_reducer.key)
    const [infoWindow, setInfoWindow] = useState(null)
    const [response, setResponse] = useState(null)
    const [destination, setDestination] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllBookings())
    },[dispatch])

    const makeDestination = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();

        setDestination({lat, lng})
      }

    const changeInfoWindow = (marker) => {
        setInfoWindow(marker)
    }

    const directionsCallback = (response) => {

        if (response !== null) {
          if (response.status === 'OK') {
            setResponse(response)
        } else {
            console.log("Route: " + response.status);
        }
      }
    }

//This sets the center of the map. This must be set BEFORE the map loads

const [currentPosition, setCurrentPosition] = useState({lat:41.8823821,lng:-87.61936659999999})

// This is the equivalent to a script tag

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key
  })

  const containerStyle = {
    width: '800px',
    height: '800px'
  };

  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

    return (
      // Important! Always set the container height explicitly
      <div className="map_page__container">

        <RideForm />
        
        <div style={{ height: '900px', width: '900px' }}>
            {isLoaded &&  currentPosition ? <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={15}
              center={currentPosition}
              onUnmount={onUnmount}
              >
          { (destination !== '' && response === null) && (
                <DirectionsService
                  // required
                  options={{
                    destination: destination,
                    origin: origin,
                    travelMode: 'DRIVING'
                  }}
                  // required
                  callback={directionsCallback}

                />
              )
            }

            {
              response !== null && (
                <DirectionsRenderer
                  panel={document.getElementById("panel")}
                  options={{
                    directions: response
                  }}

                />
              )
            }

        </GoogleMap>:null}
        </div>

        <div id='panel'>

        </div>
      </div>
    );

}

export default Ride;
