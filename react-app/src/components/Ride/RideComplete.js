import { useDispatch } from "react-redux"
import { completeBooking } from "../../store/bookings"


const RideComplete = ({booking}) => {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const complete_booking = {
            booking_id: booking.id,
            is_complete: true
        }
        dispatch(completeBooking(complete_booking))
    }

    return (
        <>
          <form onSubmit={(e)=>handleSubmit(e)}>
              <label>
                  <button>
                    Complete Ride
                  </button>
              </label>
          </form>
        </>
    )
}

export default  RideComplete;
