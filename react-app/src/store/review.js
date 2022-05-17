const LOAD_REVIEWS = 'reviews/GET'
const CREATE_REVIEW = 'reviews/CREATE'
const UPDATE_REVIEW = 'reviews/UPDATE'
const DELETE_REVIEW = 'reviews/DELETE'

// GET REVIEWS
const load_reviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const get_all_reviews = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/user/${id}/reviews`)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(load_reviews(reviews.reviews))
    } else {
        return "ERROR AT GET ALL REVIEWS THUNK"
    }
}

// CREATE REVIEW
const create_review = (review) => ({
    type: CREATE_REVIEW,
    review
})

export const create_user_review = (review) => async(dispatch) => {
    const response = await fetch("/api/reviews/new", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const new_review = await response.json()
        dispatch(create_review(new_review))
    } else {
        return "ERROR AT CREATE REVIEW THUNK"
    }
}

// UPDATE REVIEW
const update_review = (review) => ({
    type: UPDATE_REVIEW,
    review
})

export const update_user_review = (review) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}/update`, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const updated_review = await response.json()
        dispatch(update_review(updated_review))
    } else {
        return "ERROR AT UPDATED REVIEW THUNK"
    }
}

//DELETE REVIEW
const delete_review = (review) => ({
    type: DELETE_REVIEW,
    review
})

export const delete_user_review = (review) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}/delete`, {
        method: "DELETE",
        body: JSON.stringify(review)
    })
    if (response.ok) {
        dispatch(delete_review(review))
    }
}



const review_reducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD_REVIEWS:
            newState = {}
            action.reviews.forEach(review => newState[review.id] = review)
            return newState
        case CREATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState
        case UPDATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.review.id]
            return newState
        default:
            return state
    }
}

export default review_reducer;
