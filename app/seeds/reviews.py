from app.models import db, Review


def seed_reviews():

    review_1 = Review(
        content="Entered phone number for my account, entered SMS code, and then got sent back to the first screen to enter my phone number multiple times. Can't use the skill if I can't login…", rating=80, user_id=1, is_driver_review=False
        )
    review_2 = Review(
        content="Please test your app before you deploy. FYI it does not work. Links but keep saying i cant help with that.", rating=40, user_id=1, is_driver_review=False
        )
    review_3 = Review(
        content="Tried the skill today to fetch a ride. to my surprise, it requested a car - awesome......however one minor detail - I couldn't specify my destination.", rating=100, user_id=1, is_driver_review=False
        )
    review_4 = Review(
        content="Quite handy. Not sure what previous reviewers were doing. I open lyft she asks what I'm wanting to do. Tells me how far is nearest driver. And sets up ride. Even updates me.", rating=20, user_id=1, is_driver_review=False
        )
    review_5 = Review(
        content="please add the option to add more custom adresses instead of just work and home", rating=60, user_id=1, is_driver_review=False
        )
    review_6 = Review(
        content="crazy", rating=0, user_id=1, is_driver_review=False
        )

    for review in [review_1, review_2, review_3, review_4, review_5, review_6]:
        db.session.add(review)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
