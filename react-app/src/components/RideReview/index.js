import { get_all_reviews } from '../../store/review';
import { useDispatch ,useSelector } from "react-redux";
import { useEffect } from 'react';

const Review = () => {
    const user = useSelector(store => store.session.user)
    const dispatch = useDispatch()
    const reviews = useSelector(store => Object.values(store.Reviews))
    console.log(reviews, "<<<<<<<<<<<<<<<<<<<<<<<<<front reviews")

    // react simple star rating

    useEffect(() => {
        dispatch(get_all_reviews(user?.id))
    }, [dispatch])

    return (
        <>
        {reviews?.map(review => (
            <div key={review?.id}>
                {review?.content}
            </div>
        ))}
        </>
    )
}


export default Review;
