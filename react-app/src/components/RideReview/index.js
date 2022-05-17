import React, { useEffect } from 'react';
import { get_all_reviews } from '../../store/review';
import { useDispatch ,useSelector } from "react-redux";
import EditReview from "./EditReview"

import './Review.css'
import DeleteReview from './DeleteReview';

const Review = () => {
    const user = useSelector(store => store.session.user)
    const dispatch = useDispatch()
    const reviews = useSelector(store => Object.values(store.Reviews))

    useEffect(() => {
        dispatch(get_all_reviews(user?.id))
    }, [dispatch])

    return (
        <>
        {reviews?.map(review => (
            <div key={review?.id}>
                {review?.content}
            <div id='edit_review_index'>
                <EditReview review={review} /> <DeleteReview review={review} />
            </div>
            </div>
        ))}
        </>
    )
}


export default Review;
