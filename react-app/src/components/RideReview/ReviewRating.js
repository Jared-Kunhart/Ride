import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import './Review.css'

const ReviewRating = ({review}) => {
  const [rating, setRating] = useState(0)

  const handleRating = (rate = Number) => setRating(rate)

    return (
    <div id='review_edit_rating_div'>
        <Rating
          id='review_rating_stars'
          onClick={handleRating}
          ratingValue={review?.rating}
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
    )
}

export default ReviewRating;
