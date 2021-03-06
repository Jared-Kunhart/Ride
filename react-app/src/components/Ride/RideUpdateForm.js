import Geocode from 'react-geocode'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@react-google-maps/api';
import { updateBooking } from '../../store/bookings';


const RideUpdateForm = ({booking}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const key = useSelector(state => state.key_reducer.key)
    const [destinationAddress, setDestinationAddress] = useState('')
    const [destination, setDestination] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (destination && submitted) {

            const destination_marker = {
                booking_id: booking?.id,
                destination_name: user?.lastname,
                destination_color: "#75e062",
                destination_address: destinationAddress,
                destination_city: "updatecityfornow",
                destination_state: "updatestatefornow",
                destination_lat: destination?.lat,
                destination_lng: destination?.lng,
            };
            dispatch(updateBooking(destination_marker));
            setSubmitted(false)
            setDestinationAddress("")
        }
    }, [dispatch, destination, booking?.id, user?.lastname, destinationAddress, submitted])

    const handleSubmit = (e) => {
        e.preventDefault()

        const error_array = []
        if (destinationAddress.length > 125) error_array.push("Address must be shorter than 125 characters")
        if (error_array.length) return setErrors(error_array)

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
        setErrors([])
    };

    Geocode.setApiKey(key);
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    const onUpdateAutoComplete = (e) => {
        setDestinationAddress(e)
    }

    return (
        <>
        <div className='update_destination'>
            <h3>Heading to {booking?.destination?.address}.{"\n"}</h3>
            <h5>Not your route ?</h5>
            <h1>Update your route</h1>
        </div>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <Autocomplete>
                  <input type='text'
                   className='update_destination_input'
                   value={destinationAddress}
                   placeholder="Update your destination"
                   onBlur={(e) => onUpdateAutoComplete(e.target.value)}
                   onChange={(e)=>setDestinationAddress(e.target.value)}
                   />
            </Autocomplete>
                    <div id='error_div_update'>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                    </div>
                   <div id='update_separator_button_div'></div>
                   <div id='update_dest_button_div'>
              <button id='update_submit_button' type="submit">Update Destination</button>
            </div>
          </form>
        </>
    )
}

export default RideUpdateForm;
