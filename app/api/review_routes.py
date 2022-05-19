from crypt import methods
from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Review
from app.forms.review_form import ReviewForm
from app.forms.edit_review import UpdateReview

review_routes = Blueprint('reviews', __name__)


@review_routes.route("/user/<int:id>/reviews")
def get_user_reviews(id):
    reviews = Review.query.filter(Review.user_id == id).all()
    review_list = [review.to_dict() for review in reviews]
    return {'reviews': review_list}


def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@review_routes.route("/new", methods=["POST"])
def create_user_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review = Review(
            content = form.content.data,
            rating = form.rating.data,
            is_driver_review = False,
            user_id = current_user.id
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    else:
        print({'errors': validation_errors_to_error_messages(form.errors)}, "<<<<<<<<<<<<<<<<<<<<<<<<backend")
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@review_routes.route("/<int:id>/update", methods=["PUT"])
def update_user_review(id):
    form = UpdateReview()
    form['csrf_token'].data = request.cookies['csrf_token']

    review = Review.query.get(id)

    if review:
        review.content = form.content.data
        review.rating = form.rating.data

    db.session.commit()
    return review.to_dict()


@review_routes.route("/<int:id>/delete", methods=["DELETE"])
def delete_user_review(id):
    review = Review.query.get(id)

    db.session.delete(review)
    db.session.commit()
    return "Review Deleted"



@review_routes.errorhandler(500)
def internal_server_error(e):
    return {'errors': ["Internal Server Error"]}, 500
