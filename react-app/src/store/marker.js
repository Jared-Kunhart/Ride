const CREATE_MARKER = "markers/CREATE_MARKER"

const create_marker = (marker) => ({
    type: CREATE_MARKER,
    marker
})

export const create_origin_marker = (marker) => async (dispatch) => {
    const response = await fetch(`/api/trip/booking/origin`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(marker)
      })
    if (response.ok) {
        const marker = await response.json();
      dispatch(create_marker(marker));
    } else {
        return "ERROR AT CREATE ORIGIN MARKER THUNK"
    }
  };

export const create_destination_marker = (marker) => async (dispatch) => {
    const response = await fetch(`/api/trip/booking/destination`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(marker)
      })
    if (response.ok) {
        const marker = await response.json();
      dispatch(create_marker(marker));
    } else {
        return "ERROR AT CREATE DEST MARKER THUNK"
    }
  };

  const marker_reducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case CREATE_MARKER:
        newState = { ...state, [action.marker.id]: action.marker }
        return newState;
      default:
        return state;
    }
  }

  export default marker_reducer;
