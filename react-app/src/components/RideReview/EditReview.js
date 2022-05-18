import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from "react-redux";
import { update_user_review } from "../../store/review";

const EditReview = ({review, swapUpdateDiv}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(review?.content);
    const [rating, setRating] = useState(review?.rating)
    const [errors, setErrors] = useState([]);

    const handleRating = (rate = Number) => setRating(rate)

    const handleSubmit = async (e, close) => {
      e.preventDefault();
      const updated_review = {
          ...review,
          content,
          rating,
      };
      console.log(updated_review)
      await dispatch(update_user_review(updated_review));
      setContent("")
      close()
    };

    return (
      <Popup
      trigger={

          <label>
              <span>
              Edit Review
              </span>
          </label>
      }
      modal
      nested
      >
        {close => (
      <form className="review_edit_form" onSubmit={(e) => handleSubmit(e, close)}>
        <ul>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
          <textarea
            id='edit_review_input'
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        <Rating
          id='update_review_rating_stars'
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
        <button id="review_button" type="submit">Update Review</button>
        <button id="review_button" onClick={(e) => close()}>Cancel</button>
      </form>
      )}
      </Popup>
    )
}

export default EditReview;
