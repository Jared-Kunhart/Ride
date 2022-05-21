import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import { getAllBookings } from "../../store/bookings"
import { useDispatch, useSelector } from 'react-redux';
// import DeckGL from 'deck.gl';
// import {GeoJsonLayer, ArcLayer} from '@deck.gl/react';
// import {GoogleMapsOverlay as DeckOverlay} from '@deck.gl/google-maps';
import RideForm from './RideForm';
import RideUpdateForm from './RideUpdateForm';
import PostReview from '../RideReview/PostReview';
import CancelRide from './CancelRide';
import { nightblue } from './utils';
import stick from '../../public/static/images/stickgreyglow.png'
import ridersmall from '../../public/static/images/ridersmall.png'
import './ride.css'
// import PlacesAutocomplete from './AutoComplete';

const Ride = () => {
    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => Object.values(state.Bookings))
    const key = useSelector(state => state.key_reducer.key)
    const [response, setResponse] = useState(null)
    const [destination, setDestination] = useState('')
    const dispatch = useDispatch()
    // console.log(response?.routes[0]?.legs[0]?.end_address) Only works, response is on click
    //console.log(response.routes[0].legs[0].start_address)

    const user_bookings = bookings?.filter(booking =>
      booking?.user_id === user?.id && booking?.is_complete === false)
    // console.log(user_bookings, "<<<<<<<<<<<<<<<<<<<<<<<<user bookings")
    const user_booking = user_bookings[user_bookings?.length - 1]
    // {user_booking && user_booking.is_complete === false ? <RideUpdateForm /> : <RideForm>}

    //Destination
    const dest_lat = user_booking?.destination.lat
    const dest_lng = user_booking?.destination.lng
    //Origin
    const origin_lat = user_booking?.origin.lat
    const origin_lng = user_booking?.origin.lng

    useEffect(()=>{
        dispatch(getAllBookings())
    },[dispatch])

    const directionsCallback = (response) => {
        if (response !== null) {
          if (response?.status === 'OK') {
            setResponse(response)
        } else {
            console.log("Route: " + response?.status);
        }
      }
    }

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: key
    })

    const containerStyle = {
      width: '100%',
      height: '100%'
    };

    const makeDestination = (e) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();

        setDestination({lat, lng})
    }

    // *******-MarkerDrag-*******\\
  //   const onMarkerDragEnd = (e) => {
  //     const lat = e.latLng.lat();
  //     const lng = e.latLng.lng();
  //     setCurrentPosition({ lat, lng})
  //   };
  //   <GoogleMap
  //   mapContainerStyle={mapStyles}
  //   zoom={13}
  //   center={currentPosition}>
  //   {
  //     currentPosition.lat ?
  //     <Marker
  //     position={currentPosition}
  //     onDragEnd={(e) => onMarkerDragEnd(e)}
  //     draggable={true} /> :
  //     null
  //   }
  // </GoogleMap>



    // const [map, setMap] = useState(null)
    // const onUnmount = useCallback(function callback(map) {
    //   setMap(null)
    // }, [])
    // onUnmount={onUnmount}

    // useEffect(() => {
    //   if (map) {
    //     map.panTo(center)
    //   }
    // }, [map])


    const mapRef = useRef()

    const center = useMemo(() => ({
        lat:41.8823821,
        lng:-87.61936659999999,
    }), [])

    const onLoad = useCallback(map => (mapRef.current = map), [])


    const divStyle = {
      background: `none`,
      border: `1px solid #ccc`,
      padding: 10
    }

    return (
      // Important! Always set the container height explicitly
      <div className="map_page__container">
        <div style={{ height: '100%', width: '100%' }}>
            {isLoaded &&  center ?
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={13}
              options={{
              styles: nightblue,
              fullscreenControl: false,
              mapTypeControl: false,
              zoomControl: false,
              streetViewControl: false,
              }}
              center={user_booking ? {lat:user_booking?.origin.lat, lng:user_booking?.origin.lng} : center}
              onLoad={onLoad}
              >
                <div id='directions_modal_form'>
                {user_booking && user_booking?.is_complete === false ?
                <>
                <div id='reposition_please'>
                <RideUpdateForm booking={user_booking} />
                </div>
                <div id='submit_button_line'>
                <CancelRide booking={user_booking}/> <PostReview booking={user_booking} />
                </div>
                </>
                :<RideForm />}
                </div>
                {user_booking ?
                <>
                  <Marker key={user_bookings?.id}
                  position={{lat:user_booking?.origin.lat, lng:user_booking?.origin.lng}}
                  title={user_booking?.name}
                  icon={stick}
                  streetView={false} />
                  <Marker key={user_booking?.id}
                  position={{lat:user_booking?.destination.lat, lng:user_booking?.destination.lng}}
                  title={user_booking?.name}
                  icon={ridersmall}
                  streetView={false} />
                  </> : <></>
                }
            {(destination !== '' && response === null) && (
                <DirectionsService
                  // required
                  options={{
                    destination: {lat:dest_lat, lng:dest_lng},
                    origin: {lat:origin_lat, lng:origin_lng},
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

                  options={{
                    directions: response
                  }}

                />
              )
            }
        </GoogleMap>:null}
        </div>
      </div>

    );

}

export default Ride;
