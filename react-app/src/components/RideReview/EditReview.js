import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from "react-redux";
import { update_user_review } from "../../store/review";

const EditReview = ({review, close}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(review?.content);
    const [rating, setRating] = useState(review?.rating)
    const [errors, setErrors] = useState([]);

    const handleRating = (rate = Number) => setRating(rate)

    const handleSubmit = async (e) => {
      e.preventDefault();
      const updated_review = {
          ...review,
          content,
          rating,
      };
      console.log(updated_review)
      await dispatch(update_user_review(updated_review));
      setContent("")
      return close()
    };

    return (
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
          <div id='update_button_row'>
        <Rating
          id='update_review_rating_stars'
          onClick={handleRating}
          ratingValue={rating}
          transition
          size={30}
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
        <button id="update_review_button" type="submit">Update Review</button>
        <button id="cancel_review_button">Cancel</button>
        </div>
      </form>
    )
}

export default EditReview;
