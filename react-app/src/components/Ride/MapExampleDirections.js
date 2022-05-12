function initMap() {
let directionsService = new google.maps.DirectionsService();
let directionsRenderer = new google.maps.DirectionsRenderer();
let chicago = new google.maps.LatLng(41.850033, -87.6500523);
let mapOptions = {
zoom:7,
center: chicago
}
let map = new google.maps.Map(document.getElementById('map'), mapOptions);
directionsRenderer.setMap(map);
}

function calcRoute() {
let start = document.getElementById('start').value;
let end = document.getElementById('end').value;
let request = {
origin: start,
destination: end,
travelMode: 'DRIVING'
};
directionsService.route(request, function(result, status) {
if (status == 'OK') {
directionsRenderer.setDirections(result);
}
});
}

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { getAllBookings } from "../../store/bookings"
import { useDispatch, useSelector } from 'react-redux';
import Geocode from 'react-geocode'
import RideForm from './RideForm';


const Ride = () => {
const bookings = useSelector(state => Object.values(state.Bookings))
const key = useSelector(state => state.key_reducer.key)
const [address, setAddress] = useState('')
const [destinationAddress, setDestinationAddress] = useState('')
const [infoWindow, setInfoWindow] = useState(null)
const [destination, setDestination] = useState('')
const [origin, setOrigin] = useState({lat:43.00952168472677, lng:-89.47153080578808})
const [response, setResponse] = useState(null)
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

Geocode.setApiKey(key);
// set response language. Defaults to english.
Geocode.setLanguage("en");
Geocode.setLocationType("ROOFTOP");
// Enable or disable logs. Its optional.
Geocode.enableDebug();
// Get latitude & longitude from address
const Origin = (e) => {
e.preventDefault()
Geocode.fromAddress(address).then(
    (response) => {
    const {lat, lng} = response.results[0].geometry.location
    setOrigin({lat, lng})

    },
    (error) => {
    console.error(error);
    }
);
}

const Destination = (e) => {
e.preventDefault()
Geocode.fromAddress(destinationAddress).then(
    (response) => {
    const {lat, lng} = response.results[0].geometry.location
    setDestination({lat, lng})

    },
    (error) => {
    console.error(error);
    }
);
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
  {/* <form onSubmit={(e)=>Origin(e)}>
      <label>
          Starting Point
          <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)} />
      </label>
      <button type="submit">Set Origin</button>
  </form>
  <form onSubmit={(e)=>Destination(e)}>
      <label>
          Destination Point
          <input type='text' value={destinationAddress} onChange={(e)=>setDestinationAddress(e.target.value)} />
      </label>
      <button type="submit">Set Destination</button>
  </form> */}

<div style={{ height: '900px', width: '900px' }}>
    {isLoaded &&  currentPosition ? <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={8}
      center={currentPosition}
      onUnmount={onUnmount}
      >
      <Marker
      title='Starting Point'
      position={origin}
      />
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
      onClick={(e)=>makeDestination(e)}
      streetView={false} >
      {/* <InfoWindow
      position={{lat:marker.destination.lat, lng:marker.destination.lng}}
      >
        <div>
        <h3>Click the Marker make directions</h3>
          <span style={{color: `${marker.color}`}}>{marker.name}</span>
        </div>
      </InfoWindow> */}
      </Marker>
    </>
      ))}
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
