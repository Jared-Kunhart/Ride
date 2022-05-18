import { Modal } from '../../context/Modal';
import { useState } from 'react';
import EditReview from './EditReview'


const EditReviewModal = ({review}) => {
    const [showModal, setShowModal] = useState(false);
  return (
    <>
      <span id="review_button" className="editReview" onClick={() => setShowModal(true)}>
        Edit Review
      </span>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <div>
            <EditReview review={review} hideModal={() => setShowModal(false)} />
            </div>
        </Modal>
      )}
    </>
  )
}

export default EditReviewModal;
