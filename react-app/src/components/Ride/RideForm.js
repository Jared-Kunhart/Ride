import Geocode from 'react-geocode'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create_origin_marker, create_destination_marker } from '../../store/marker';

const RideForm = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const key = useSelector(state => state.key_reducer.key)
    const [originAddress, setOriginAddress] = useState('')
    const [destinationAddress, setDestinationAddress] = useState('')
    const [destination, setDestination] = useState('')
    const [origin, setOrigin] = useState({})

    const handleSubmitOrigin = (e) => {
        e.preventDefault()
        Geocode.fromAddress(originAddress).then(
            (response) => {
                const {lat, lng} = response.results[0].geometry.location
                setOrigin({lat, lng})
            },
            (error) => {
            console.error(error);
            }
        ).then(marker = {
            name: user.firstname,
            color: "#75e062",
            address: "testaddressfornow",
            city: "testcityfornow",
            state: "teststatefornow",
            lat: origin.lat,
            lng: origin.lng,
          }).then(dispatch(create_origin_marker(marker)))
      };

      const handleSubmitDestination = (e) => {
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
        const marker = {
            name: user.firstname,
            color: "#75e062",
            address: "testaddressfornow",
            city: "testcityfornow",
            state: "teststatefornow",
            lat: destination.lat,
            lng: destination.lng,
            user_id: user.id,
          };
          dispatch(create_destination_marker(marker));
      };

    Geocode.setApiKey(key);
    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    Geocode.setLocationType("ROOFTOP");
    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    // Get latitude & longitude from address

    // const Origin = (e) => {
    //     e.preventDefault()
    //     Geocode.fromAddress(address).then(
    //         (response) => {
    //         const {lat, lng} = response.results[0].geometry.location
    //         setOrigin({lat, lng})

    //         },
    //         (error) => {
    //         console.error(error);
    //         }
    //     );
    // }

    // const Destination = (e) => {
    //     e.preventDefault()
    //     Geocode.fromAddress(destinationAddress).then(
    //         (response) => {
    //         const {lat, lng} = response.results[0].geometry.location
    //         setDestination({lat, lng})

    //         },
    //         (error) => {
    //         console.error(error);
    //         }
    //     );
    // }

    return (
        <>
          <form onSubmit={(e)=>handleSubmitOrigin(e)}>
              <label>
                  Starting Point
                  <input type='text' value={originAddress} onChange={(e)=>setOriginAddress(e.target.value)} />
              </label>
              <button type="submit">Set Origin</button>
          </form>
          <form onSubmit={(e)=>handleSubmitDestination(e)}>
              <label>
                  Destination Point
                  <input type='text' value={destinationAddress} onChange={(e)=>setDestinationAddress(e.target.value)} />
              </label>
              <button type="submit">Set Destination</button>
          </form>
        </>
    )

}

export default RideForm;
