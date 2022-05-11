const GET_BOOKINGS = "bookings/GET_ALL";

const getBookings = (bookings) => ({
    type: GET_BOOKINGS,
    bookings
})

export const getAllBookings = () => async (dispatch) => {
    const response = await fetch(`/api/trip/bookings`);

    if (response.ok) {
        const data = await response.json();
      dispatch(getBookings(data.bookings));
    }
  };

  let initialState = {}
  export default function booking_reducer(state=initialState, action) {
      let newState;
      switch(action.type) {
          case GET_BOOKINGS:
              newState = {}
              action.bookings.forEach((booking) => (newState[booking.id] = booking))
              return newState
          default:
              return state;
      }
  }
