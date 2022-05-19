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
            setErrors(["Invalid Address"]);
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
        <div className='update_destination'>
            <h3>Heading to {booking?.destination?.address}.{"\n"}</h3>
            <h5>Not your route ?</h5>
            <h1>Update your route</h1>
        </div>
          <form onSubmit={(e)=>handleSubmit(e)}>
                  <input type='text'
                   className='update_destination_input'
                   value={destinationAddress}
                   placeholder="Update your destination"
                   onChange={(e)=>setDestinationAddress(e.target.value)}
                   />
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
