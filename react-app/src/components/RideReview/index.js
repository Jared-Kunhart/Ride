import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { get_all_reviews } from '../../store/review';
import { useDispatch ,useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating'
import { update_user_review } from "../../store/review";
import DeleteReview from './DeleteReview';
import './Review.css'

const Review = () => {
    const user = useSelector(store => store.session.user)
    const dispatch = useDispatch()
    const reviews = useSelector(store => Object.values(store.Reviews))
    const [content, setContent] = useState("");
    const [rating, setRating] = useState("")
    const [errors, setErrors] = useState([]);
    const [menu, setMenu] = useState("")

    const handleRating = (rate = Number) => setRating(rate)

    const handleSubmit = async (e, id) => {
      e.preventDefault();
      const updated_review = {
          id,
          content,
          rating,
      };
      await dispatch(update_user_review(updated_review));
      setContent("")
      setMenu("")
    };

    useEffect(() => {
        dispatch(get_all_reviews(user?.id))
    }, [dispatch])

    return (
      <>
        <div id='reviews_outer_container'>
        {reviews?.sort((review1, review2) => review2?.id - review1?.id)
                 .map(review => (
            <div id='reviews_inner_container' key={review?.id}>
            {menu !== "" && menu === review?.id && (
                <div id='update_review_div'>
                    <form className="review_edit_form" onSubmit={(e) => handleSubmit(e, review?.id)}>
                    <div id='update_content'>
                    <ul>
                    {errors.map((error) => <li key={error}>{error}</li>)}
                    </ul>
                    <textarea
                        id='edit_review_input'
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    </div>
                    <Rating
                    id='update_review_rating_stars'
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
                    <button id="review_button" type="submit" disabled={errors.length > 0}>Update Review</button>
                </form>
                </div>)}
                <div id='reviews_container'>
                <div id='reviews_content_container'>
                    Review Content:
                    <Popup
                        trigger={<div id='dots' className="menu-item"> ... </div>}
                        position="right top"
                        on="click"
                        closeOnDocumentClick
                        mouseLeaveDelay={300}
                        mouseEnterDelay={0}
                        contentStyle={{ padding: '0px', border: 'none' }}
                        arrow={false}
                        >
                        <div className="menu">
                            <div onClick={() => setMenu(review?.id)} className="menu-item">Edit</div>
                            <div className="menu-item"><DeleteReview review={review} /></div>
                        </div>
                    </Popup>
                </div>
                </div>
                <div id='current_review_div' style={{ display: 'block'}}>
                    <div id='review_content'>
                        {review?.content === "" ? "No Content, Add a review !"
                        : review?.content}
                    </div>
                <Rating
                    id='review_rating_stars'
                    ratingValue={review?.rating}
                    readonly
                    size={30}
                    fillColorArray={['#780505ac', '#9f0707ac', '#b40707c0', '#d20404d3', '#ff0000fd']}
                    />
                </div>
            </div>
        ))}
        </div>
      </>
    )
}


export default Review;
