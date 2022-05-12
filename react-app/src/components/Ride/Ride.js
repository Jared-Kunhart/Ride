import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import { getAllBookings } from "../../store/bookings"
import { useDispatch, useSelector } from 'react-redux';
import Geocode from 'react-geocode'


const Ride = () => {
    const bookings = useSelector(state => Object.values(state.Bookings))
    const key = useSelector(state => state.key_reducer.key)
    const [address, setAddress] = useState('')
    const [infoWindow, setInfoWindow] = useState(null)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllBookings())
    },[dispatch])

    const changeInfoWindow = (marker) => {
        setInfoWindow(marker)
    }
    Geocode.setApiKey(key);
    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    // Get latitude & longitude from address
    const makeMap = (e) => {
        e.preventDefault()
        Geocode.fromAddress(address).then(
            (response) => {
            const {lat, lng} = response.results[0].geometry.location
            setCurrentPosition({lat, lng})

            },
            (error) => {
            console.error(error);
            }
        );
    }

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
          <form onSubmit={(e)=>makeMap(e)}>
              <label>
                  Starting Point
                  <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)} />
              </label>
              <button type="submit">Make Map</button>
          </form>

        <div style={{ height: '900px', width: '900px' }}>
            {isLoaded &&  currentPosition ? <GoogleMap
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
              onClick = {()=>changeInfoWindow(marker)}
              streetView={false}
              />
              {infoWindow && <InfoWindow position={{lat:infoWindow.lat, lng:infoWindow.lng}} >
                <div>
                    <span style={{color: `${infoWindow.color}`}}>{infoWindow.name}</span>
                </div>
              </InfoWindow>}
            </>
              ))}
            </GoogleMap> : null}
        </div>
      </div>
    );

}

export default Ride;
