const GET_MARKERS = "markers/GET_ALL";

const getMarkers = (markers) => ({
    type: GET_MARKERS,
    markers
})

export const getAllMarkers = () => async (dispatch) => {
    const response = await fetch(`/api/trip/markers`);

    if (response.ok) {
        const data = await response.json();
      dispatch(getMarkers(data.markers));
    }
  };

let initialState= null
export default function marker_reducer(state=initialState, action) {
    switch(action.type) {
        case GET_MARKERS:
            return {markers: action.markers}
        default:
            return state;
    }
}
