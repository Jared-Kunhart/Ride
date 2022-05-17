import { useDispatch } from "react-redux";
import { delete_user_review } from "../../store/review"

function DeleteReview ({ review }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(delete_user_review(review))
  }

  return (
    <form id="review_delete_form" onSubmit={handleSubmit}>
      <button id="delete" className="deleteButton" type="submit">Delete</button>
    </form>
  )
}

export default DeleteReview;
