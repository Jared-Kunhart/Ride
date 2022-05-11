import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import { getAllBookings } from "../../store/bookings"
import { useDispatch, useSelector } from 'react-redux';
import knight from '../../public/static/images/knightrider.png'



const Ride = () => {
    const bookings = useSelector(state => Object.values(state.Bookings))
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBookings())
    },[dispatch])

//This sets the center of the map. This must be set BEFORE the map loads

const [currentPosition, setCurrentPosition] = useState({lat:43.11016617798622,lng:-89.48826131670266})

// This is the equivalent to a script tag

const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
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

        <div style={{ height: '900px', width: '900px' }}>
            {isLoaded && <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={8}
              center={currentPosition}
              onUnmount={onUnmount}
              >
              {bookings?.map(marker => (
            <>
              <Marker
              key={marker.id}
              position={{lat:marker.destination.lat, lng:marker.destination.lng}}
              title={marker.destination.name}
              icon={{
                path: 'M 100 100 L 300 100 L 200 300 z',
                fillColor: marker.destination.color,
                fillOpacity: 1,
                scale: .2,
                strokeColor: 'gold',
                strokeWeight: 2
              }}
              streetView={false}
              />
              <InfoWindow position={{lat:marker.destination.lat, lng:marker.destination.lng}} >
                <div>
                    <span style={{color: `${marker.destination.color}`}}>{marker.destination.name}</span>
                </div>
              </InfoWindow>
            </>
              ))}
            </GoogleMap>}
        </div>
      </div>
    );

}

export default Ride;
