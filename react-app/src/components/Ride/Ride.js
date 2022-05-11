import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { getAllMarkers } from "../../store/markers"
import { useDispatch } from 'react-redux';



const Ride = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllMarkers())
    },[])

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

//   <Marker key={marker.id}
//   position={{lat:marker.lat, lng:marker.lng}}
//   title={marker.name}
//   icon={{
//     path: 'M 100 100 L 300 100 L 200 300 z',
//     fillColor: marker.color,
//     fillOpacity: 1,
//     scale: .2,
//     strokeColor: 'gold',
//     strokeWeight: 2
//   }}
//   streetView={false} />


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
            </GoogleMap>}
        </div>

      </div>
    );

}

export default Ride;
