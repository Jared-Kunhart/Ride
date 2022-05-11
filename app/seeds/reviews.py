from app.models import db, Review


def seed_reviews():

    review_1 = Review(
        content="if you find a prettier way let me know please", rating=2, user_id=1, is_driver_review=False
        )
    review_2 = Review(
        content="then I upgrade -> create another migration", rating=4, user_id=1, is_driver_review=False
        )
    review_3 = Review(
        content="wonderful math", rating=2, user_id=3, is_driver_review=False
        )

    for review in [review_1, review_2, review_3]:
        db.session.add(review)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
