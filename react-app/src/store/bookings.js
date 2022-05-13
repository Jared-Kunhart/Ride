const GET_BOOKINGS = "bookings/GET_ALL";
const CREATE_BOOKING = "bookings/CREATE_BOOKING";

const getBookings = (bookings) => ({
    type: GET_BOOKINGS,
    bookings
})

const create_booking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

export const getAllBookings = () => async (dispatch) => {
    const response = await fetch(`/api/trip/bookings`);
    if (response.ok) {
        const data = await response.json();
      dispatch(getBookings(data.bookings));
    }
  };

  export const createBooking = (marker) => async (dispatch) => {
    const response = await fetch(`/api/trip/booking/destination`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(marker)
      })
    if (response.ok) {
        const booking = await response.json();
      dispatch(create_booking(booking));
    } else {
        return "ERROR AT CREATE BOOKING MARKER THUNK"
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
          case CREATE_BOOKING:
              newState = {...state}
              newState[action.booking.id] = action.booking
              return newState
          default:
              return state;
      }
  }
