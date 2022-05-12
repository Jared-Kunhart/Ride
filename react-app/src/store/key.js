const GET_KEY = "bookings/GET_KEY"

const get_key = (key) => ({
    type: GET_KEY,
    key
})

export const getKey = () => async (dispatch) => {
    const response = await fetch(`/api/trip/key`);
    if (response.ok) {
        const data = await response.json();
      dispatch(get_key(data.key));
    }
  };

let initialState = {}
export default function key_reducer(state=initialState, action) {
    switch(action.type) {
        case GET_KEY:
            return {key: action.key}
        default:
            return state;
    }
}
