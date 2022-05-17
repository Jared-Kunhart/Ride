import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api';
import { getAllBookings } from "../../store/bookings"
import { useDispatch, useSelector } from 'react-redux';
import DeckGL from 'deck.gl';
import {GoogleMapsOverlay as DeckOverlay} from '@deck.gl/google-maps';
import RideForm from './RideForm';
import RideUpdateForm from './RideUpdateForm';
import PostReview from '../RideReview/PostReview';
import CancelRide from './CancelRide';
import Review from '../RideReview'
import { nightblue, waterblue, sincity } from './utils';
import stick from '../../public/static/images/stick.png'
import ridersmall from '../../public/static/images/ridersmall.png'
import './ride.css'

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
    // console.log(user_booking, "<<<<<<<<<<<<<<<<<<<<<<<<user booking")

    //Destination
    const dest_lat = user_booking?.destination.lat
    const dest_lng = user_booking?.destination.lng
    //Origin
    const origin_lat = user_booking?.origin.lat
    const origin_lng = user_booking?.origin.lng

    useEffect(()=>{
        dispatch(getAllBookings())
    },[dispatch])

    const makeDestination = (e) => {
        const lat = e.latLng?.lat();
        const lng = e.latLng?.lng();

        setDestination({lat, lng})
    }

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

    // const [map, setMap] = useState(null) - What does this do ???
    // onUnmount={onUnmount}
    // const onUnmount = useCallback(function callback(map) {
    //   setMap(null)
    // }, [])

    const mapRef = useRef()

    const center = useMemo(() => ({
        lat:41.8823821,
        lng:-87.61936659999999,
    }), [])

    const onLoad = useCallback(map => (mapRef.current = map), [])

    return (
      // Important! Always set the container height explicitly
      <div className="map_page__container">
        <div style={{ height: '100%', width: '100%' }}>
            {isLoaded &&  center ?
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={16}
              options={{
              styles: nightblue,
              fullscreenControl: false,
              mapTypeControl: false,
              zoomControl: false,
              streetViewControl: false,
              }}
              center={center}
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
                : <RideForm /> }
                </div>
                {user_booking ?
                <>
                  <Marker key={user_booking?.id}
                  position={{lat:user_booking?.destination.lat, lng:user_booking?.destination.lng}}
                  title={user_booking?.name}
                  icon={ridersmall}
                  onClick={(e)=>makeDestination(e)}
                  streetView={false} />
                  <Marker key={user_bookings?.id}
                  position={{lat:user_booking?.origin.lat, lng:user_booking?.origin.lng}}
                  title={user_booking?.name}
                  icon={stick}
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
