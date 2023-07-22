from app.models import db, Review


def seed_reviews():
    review_1 = Review(
        content="Imitation is the highest form of praise. It's no wonder that both the car designers as well as drivers would want their vehicles to have at least some of the KITT's gadgets. During the show's initial run in the 1980s, owners of Trans-Am cars could buy special aftermarket kits and add KITT's scanner eye to their own cars.", rating=80, user_id=1, is_driver_review=False
        )
    review_2 = Review(
        content="Did 70 in a 35 and nearly ran over a saltwater crocodile, made it home safe thankfully", rating=20, user_id=1, is_driver_review=False
        )
    review_3 = Review(
        content="Great conversation, friendly driver, thank you", rating=100, user_id=1, is_driver_review=False
        )
    review_4 = Review(
        content="", rating=60, user_id=1, is_driver_review=False
        )
    review_5 = Review(
        content="Clean car, friendly driver.", rating=80, user_id=1, is_driver_review=False
        )
    review_6 = Review(
        content="Must have got this driver on a bad day, started talking about his native catalonia the entire time.", rating=60, user_id=1, is_driver_review=False
        )
    review_7 = Review(
    content="Great Driver, Thanks !", rating=100, user_id=1, is_driver_review=False
    )

    for review in [review_1, review_2, review_3, review_4, review_5, review_6, review_7]:
        db.session.add(review)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
