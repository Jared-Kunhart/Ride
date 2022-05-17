import Geocode from 'react-geocode'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../store/bookings';
import './ride.css'

const RideForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const key = useSelector(state => state.key_reducer.key)
    const [originAddress, setOriginAddress] = useState('')
    const [destinationAddress, setDestinationAddress] = useState('')
    const [destination, setDestination] = useState('')
    const [origin, setOrigin] = useState('')
    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        if (origin && destination && submitted) {
            const origin_marker = {
                origin_name: user?.firstname,
                origin_color: "#75e062",
                origin_address: "Test Origin Address",
                origin_city: "Test Origin City",
                origin_state: "Test Origin State",
                origin_lat: origin?.lat,
                origin_lng: origin?.lng,
            };
            const destination_marker = {
                destination_name: user?.lastname,
                destination_color: "#75e062",
                destination_address: "Test Destination Address",
                destination_city: "Test Destination Address",
                destination_state: "Test Destination Address",
                destination_lat: destination?.lat,
                destination_lng: destination?.lng,
            };
            dispatch(createBooking({...origin_marker, ...destination_marker}));
            setSubmitted(false)
        }
    }, [dispatch, origin, destination])

    const handleSubmit = (e) => {
        e.preventDefault()
        Geocode.fromAddress(originAddress).then(
            (response) => {
                const {lat, lng} = response?.results[0].geometry.location
                setOrigin({lat, lng})
            },
            (error) => {
            console.error(error);
            }
        );
        Geocode.fromAddress(destinationAddress).then(
            (response) => {
            const {lat, lng} = response?.results[0].geometry.location
            setDestination({lat, lng})
            },
            (error) => {
            console.error(error);
            }
        );
        setSubmitted(true)
    };

    Geocode.setApiKey(key);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    return (
        <>
        <div id='form_header'><h1>Where to {user.firstname}{user.lastname} ?</h1></div>
          <form onSubmit={(e)=>handleSubmit(e)}>
                  <input
                    id='origin_input'
                    type='text'
                    value={originAddress}
                    placeholder="Enter a pickup location"
                    onChange={(e)=>setOriginAddress(e.target.value)} />
                  <input
                   type='text'
                   id='destination_input'
                   value={destinationAddress}
                   placeholder="Where are you going ?"
                   onChange={(e)=>setDestinationAddress(e.target.value)} />
                <img alt='' id='ride_pickup_logo' src='/static/images/ridepickup.png' />
                <img alt='' id='ride_dropoff_logo' src='/static/images/ridedropoff.png' />
                <div id='future_auto_complete_div'>
              <button
              id='ride_submit_button'
              type="submit"
              disabled={originAddress && destinationAddress ? false : true}
              >
                  Ride
              </button>
              </div>
          </form>
        </>
    )
}

export default RideForm;
