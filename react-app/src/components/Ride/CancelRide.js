import { useDispatch } from "react-redux";
import { deleteBooking } from "../../store/bookings";



const CancelRide = ({booking}) => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const delete_booking = {
            booking_id: booking.id
        }
        dispatch(deleteBooking(delete_booking))
    }
    return (
        <>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <label>
                <button>
                  Cancel Ride
                </button>
            </label>
        </form>
      </>
    )
}

export default CancelRide;
