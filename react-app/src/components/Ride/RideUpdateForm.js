import Geocode from 'react-geocode'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../../store/bookings';


const RideUpdateForm = ({booking}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const key = useSelector(state => state.key_reducer.key)
    const [destinationAddress, setDestinationAddress] = useState('')
    const [destination, setDestination] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (destination && submitted) {

            const destination_marker = {
                booking_id: booking?.id,
                destination_name: user?.lastname,
                destination_color: "#75e062",
                destination_address: "updateaddressfornow",
                destination_city: "updatecityfornow",
                destination_state: "updatestatefornow",
                destination_lat: destination?.lat,
                destination_lng: destination?.lng,
            };
            dispatch(updateBooking(destination_marker));
            setSubmitted(false)
        }
    }, [dispatch, destination])

    const handleSubmit = (e) => {
        e.preventDefault()
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
          <form onSubmit={(e)=>handleSubmit(e)}>
              <label>
                  Destination Point
                  <input type='text' value={destinationAddress} onChange={(e)=>setDestinationAddress(e.target.value)} />
              </label>
              <button type="submit">Update Destination</button>
          </form>
        </>
    )

}

export default RideUpdateForm;
