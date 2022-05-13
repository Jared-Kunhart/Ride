import Geocode from 'react-geocode'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create_origin_marker } from '../../store/marker';
import { createBooking } from '../../store/bookings';


const RideForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const key = useSelector(state => state.key_reducer.key)
    const [originAddress, setOriginAddress] = useState('')
    const [destinationAddress, setDestinationAddress] = useState('')
    const [destination, setDestination] = useState('')
    const [origin, setOrigin] = useState({})
    const [submitted, setSubmitted] = useState(false)

    //  SUBMIT ORIGIN FUNCTIONS \\
    // origin refers to current state \\
    useEffect(() => {
        if (origin && destination && submitted) {


            const origin_marker = {
                origin_name: user.firstname,
                origin_color: "#75e062",
                origin_address: "testaddressfornow",
                origin_city: "testcityfornow",
                origin_state: "teststatefornow",
                origin_lat: origin.lat,
                origin_lng: origin.lng,
            };
            const destination_marker = {
                destination_name: user.lastname,
                destination_color: "#75e062",
                destination_address: "testaddressfornow",
                destination_city: "testcityfornow",
                destination_state: "teststatefornow",
                destination_lat: destination.lat,
                destination_lng: destination.lng,
            };
            console.log({...origin_marker, ...destination_marker}, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
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
    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    // Get latitude & longitude from address

    return (
        <>
          <form onSubmit={(e)=>handleSubmit(e)}>
              <label>
                  Starting Point
                  <input type='text' value={originAddress} onChange={(e)=>setOriginAddress(e.target.value)} />
              </label>
              <label>
                  Destination Point
                  <input type='text' value={destinationAddress} onChange={(e)=>setDestinationAddress(e.target.value)} />
              </label>
              <button type="submit">Submit</button>
          </form>
        </>
    )

}

export default RideForm;
