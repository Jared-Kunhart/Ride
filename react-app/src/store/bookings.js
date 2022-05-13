const GET_BOOKINGS = "bookings/GET_ALL";
const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
const COMPLETE_BOOKING = "bookings/COMPLETE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

//GET
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
//CREATE
const create_booking = (booking) => ({
    type: CREATE_BOOKING,
    booking
})

export const createBooking = (booking) => async (dispatch) => {
  const response = await fetch(`/api/trip/booking/new`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(booking)
    })
  if (response.ok) {
      const new_booking = await response.json();
    dispatch(create_booking(new_booking));
  } else {
      return "ERROR AT CREATE BOOKING MARKER THUNK"
  }
};
// UPDATE
const update_booking = (booking) => ({
    type: UPDATE_BOOKING,
    booking
})

export const updateBooking = (booking) => async (dispatch) => {
  const response = await fetch(`/api/trip/booking/${booking.booking_id}/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  })
  if (response.ok) {
    const updated_booking = await response.json()
    dispatch(update_booking(updated_booking))
    return response
  } else {
    return "ERROR AT UPDATE BOOKING THUNK"
  }
}
// COMPLETE
const complete_booking = (booking) => ({
  type: COMPLETE_BOOKING,
  booking
})

export const completeBooking = (booking) => async (dispatch) => {
  const response = await fetch(`/api/trip/booking/${booking.booking_id}/complete`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking)
  })
  if (response.ok) {
    const updated_booking = await response.json()
    dispatch(complete_booking(updated_booking))
    return response
  } else {
    return "ERROR AT COMPLETE BOOKING THUNK"
  }
}

//DELETE
const delete_booking = (id) => ({
  type: DELETE_BOOKING,
  booking_id: id
})

export const deleteBooking = (booking) => async(dispatch) => {
  const response = await fetch(`/api/trip/booking/${booking.booking_id}/delete`, {
      method: "DELETE",
  })
  if (response.ok) {
      dispatch(delete_booking(booking.booking_id))
  } else {
      return "ERROR AT DELETE BOOKING THUNK"
  }
}



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
          case UPDATE_BOOKING:
              return {
                ...state,
                [action.booking.id]: action.booking
              }
          case COMPLETE_BOOKING:
            return {
              ...state,
              [action.booking.id]: action.booking
            }
          case DELETE_BOOKING:
              newState = {...state}
              delete newState[action.booking_id]
              return newState
          default:
              return state;
      }
  }
