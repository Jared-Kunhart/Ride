import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditReview from './EditReview'


const EditReviewModal = ({review}) => {
  return (
    <>
      <Popup
        trigger={<span id='update_review_div'> Edit Review </span>}
        modal
        nested
      >

        {close => (
                <EditReview review={review} close={close} />

        )}
      </Popup>
    </>
  )
}

export default EditReviewModal;
