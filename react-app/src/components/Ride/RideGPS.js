import React, { useState, useEffect } from 'react';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api'

export default function RideGPS({props}) {

{/* <RideGPS props={{destination: user_booking?.destination, origin: user_booking?.origin}} /> */}

    const [directions, setDirections] = useState(null);
    const [response, setResponse] = useState(null)
    const { origin, destination } = props;

    useEffect(() => {
      <DirectionsService
        options={{
          destination: destination,
          origin: origin,
          travelMode: 'WALKING'
        }}
      />
        if (response !== null) {
          if (response === "OK") {
            setDirections(response);
          } else {
            console.error(`error fetching directions ${response}`);
          }
        }
    }, [directions]);

    return (
      <>
        {directions && <DirectionsRenderer directions={directions} />}
      </>
    );
  }
