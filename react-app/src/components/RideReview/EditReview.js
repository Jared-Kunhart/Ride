import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import { useDispatch } from "react-redux";
import { update_user_review } from "../../store/review";
import ReviewRating from './ReviewRating';

const EditReview = ({review}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
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
    };

    return (
      <form className="review_edit_form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label>
          Update Review:
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
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
        <button id="review_button" type="submit" disabled={errors.length > 0}>Update Review</button>
      </form>
    )
}

export default EditReview;
