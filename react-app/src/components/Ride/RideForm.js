import Geocode from 'react-geocode'
import { Autocomplete } from '@react-google-maps/api';
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
    const [errors, setErrors] = useState([]);

    /*
    Info for submitting a destination
    Pickup Form Values -> originAddress/setOriginAddress
    Destination Form Values -> destinationAddress/setDestinationAddress
    handleSubmit -> Takes the address value from form, routes through google and
    turns that address into a lat/lng that sets those values in state origin/setOrigin & destination/setDestination
    useEffect triggers because state now has origin & destination & has been submitted
    useEffect sends origin_marker and destination_marker to backend which creates a
    booking with is_complete set to false, a user_id, and assigns both marker id's to the
    booking origin_id and destination_id
    */

    useEffect(() => {
        if (origin && destination && submitted) {
            const origin_marker = {
                origin_name: user?.firstname,
                origin_color: "#75e062",
                origin_address: originAddress,
                origin_city: "Test Origin City",
                origin_state: "Test Origin State",
                origin_lat: origin?.lat,
                origin_lng: origin?.lng,
            };
            const destination_marker = {
                destination_name: user?.lastname,
                destination_color: "#75e062",
                destination_address: destinationAddress,
                destination_city: "Test Destination Address",
                destination_state: "Test Destination Address",
                destination_lat: destination?.lat,
                destination_lng: destination?.lng,
            };
            dispatch(createBooking({...origin_marker, ...destination_marker}));
            setSubmitted(false)
        }
    }, [dispatch, origin, destination, originAddress, destinationAddress, submitted, user?.firstname, user?.lastname])

    const handleSubmit = (e) => {
        e.preventDefault()

        const error_array = []
        if (originAddress.length > 125) error_array.push("Address must be shorter than 125 characters")
        if (destinationAddress.length > 125) error_array.push("Address must be shorter than 125 characters")
        if (error_array.length) return setErrors(error_array)

        Geocode.fromAddress(originAddress).then(
            (response) => {
                const {lat, lng} = response?.results[0].geometry.location
                setOrigin({lat, lng})
            },
            (error) => {
            setErrors(["Invalid Address"]);
            }
        );
        Geocode.fromAddress(destinationAddress).then(
            (response) => {
            const {lat, lng} = response?.results[0].geometry.location
            setDestination({lat, lng})
            },
            (error) => {
            setErrors(["Invalid Address"]);
            }
        );
        setSubmitted(true)
    };

    Geocode.setApiKey(key);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    const onOriginAutoComplete = (e) => {
        setOriginAddress(e)
    }

    const onDestinationAutoComplete = (e) => {
        setDestinationAddress(e)
    }

    return (
        <>
        <div id='form_header'><h1>Where to {user.firstname} {user.lastname} ?</h1></div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <Autocomplete>
                <input
                id='origin_input'
                type='text'
                value={originAddress}
                placeholder="Enter a pickup location"
                onBlur={(e) => onOriginAutoComplete(e.target.value)}
                onChange={(e) => setOriginAddress(e.target.value)} />
            </Autocomplete>
            <Autocomplete>
                <input
                type='text'
                id='destination_input'
                value={destinationAddress}
                placeholder="Where are you going ?"
                onBlur={(e) => onDestinationAutoComplete(e.target.value)}
                onChange={(e) => setDestinationAddress(e.target.value)} />
            </Autocomplete>
            <img alt='' id='ride_pickup_logo' src='/static/images/ridepickup.png' />
            <img alt='' id='ride_dropoff_logo' src='/static/images/ridedropoff.png' />
            <div id='future_auto_complete_div'>
            <div id='error_div_post'>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
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
