import React, { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { get_all_reviews } from '../../store/review';
import { useDispatch ,useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating'
import DeleteReview from './DeleteReview';
import './Review.css'
import EditReviewModal from './EditReviewModal';

const Review = () => {
    const user = useSelector(store => store.session.user)
    const dispatch = useDispatch()
    const reviews = useSelector(store => Object.values(store.Reviews))

    useEffect(() => {
        dispatch(get_all_reviews(user?.id))
    }, [dispatch])

    return (
      <>
        <div id='reviews_outer_container'>
        {reviews?.sort((review1, review2) => review2?.id - review1?.id)
                 .map(review => (
            <div id='reviews_inner_container' key={review?.id}>
                <div id='reviews_container'>
                <div id='reviews_content_container'>
                    Review Content:
                    <Popup
                        trigger={<div id='dots' className="menu-item"> ... </div>}
                        position="right left"
                        on="click"
                        closeOnDocumentClick={false}
                        mouseLeaveDelay={300}
                        mouseEnterDelay={0}
                        contentStyle={{ padding: '0px', border: 'none' }}
                        arrow={false}
                        >
                        <div className="menu">
                            <div className="menu-item"><EditReviewModal review={review} /></div>
                            <div className="menu-item"><DeleteReview review={review} /></div>
                        </div>
                    </Popup>
                </div>
                </div>
                <div id='current_review_div'>
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
                <div id='update_review_div'>
                </div>
            </div>
        ))}
        </div>
      </>
    )
}


export default Review;
