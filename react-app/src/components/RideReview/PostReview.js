import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from "react-redux"
import { completeBooking } from "../../store/bookings"
import { create_user_review } from '../../store/review';
import './Modal.css'

const PostReview = ({booking}) => {
    const user = useSelector(store => store.session.user)
    const dispatch = useDispatch()
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState([]);
    console.log(rating)

    const handleSubmitNoReview = (e, close) => {
        e.preventDefault()
        const complete_booking = {
            booking_id: booking.id,
            is_complete: true
        }
        dispatch(completeBooking(complete_booking))
        close()
    }

    const handleSubmitReview = (e, close) => {
        e.preventDefault()
        const complete_booking = {
            booking_id: booking.id,
            is_complete: true
        }
        const review = {
            content,
            rating,
            user_id: user.id
        }
        dispatch(completeBooking(complete_booking))
        dispatch(create_user_review(review))
        // also has to submit review
        close()
    }

    const handleRating = (rate = Number) => setRating(rate)

    return (
        <Popup
        trigger={

            <label>
                <button id="complete_ride_button">
                Complete Ride
                </button>
            </label>
        }
        modal
        nested
        >
        {close => (
          <div className="modal">
            <div className="header"> Leave a Review </div>
            <div className="content">
            <div id='sub_content_modal_div'>
            <form id="submit_review_form" onSubmit={(e)=>handleSubmitReview(e, close)}>
            <ul>
                {errors.map((error) => <li key={error}>{error}</li>)}
            </ul>
                <textarea
                type="text"
                id='review_content_input'
                placeholder='Leave your driver review here.'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
                <div id='review_rating_div'>
              <Rating
              id='review_rating_stars'
              onClick={handleRating}
              ratingValue={rating}
              transition
              size={35}
              showTooltip
              fillColorArray={['#780505ac', '#9f0707ac', '#b40707c0', '#d20404d3', '#ff0000fd']}
              tooltipArray={[
                'Terrible',
                'Bad',
                'Average',
                'Great',
                'Perfect'
              ]}
            />
            </div>
            <label>
              <button className="modal_complete_ride_button">
                    Post review.
              </button>
            </label>
            </form>
                <form onSubmit={(e)=>handleSubmitNoReview(e, close)}>
                  <button
                    className="modal_cancel_ride_button"
                    >
                    Review later.
                  </button>
                  </form>
                  </div>
            </div>
          </div>
        )}
      </Popup>
    )
}

export default PostReview;
