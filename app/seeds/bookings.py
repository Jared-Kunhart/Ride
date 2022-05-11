from datetime import datetime
from app.models import db, Booking
from faker import Faker
from datetime import datetime
fake = Faker()

def seed_bookings():
    booking_1 = Booking(
        date=datetime(2022, 5, 10,9,00), price=20.42, user_id=1,
        origin_id=9, destination_id=5,
        )
    booking_2 = Booking(
        date=datetime(2022, 5, 10,5,00), price=15.55, user_id=3,
        origin_id=4, destination_id=3,
        )
    booking_3 = Booking(
        date=datetime(2022, 5, 10,12,00), price=6.54, user_id=5,
        origin_id=6, destination_id=8,
        )

    for booking in [booking_1, booking_2, booking_3]:
        db.session.add(booking)
    db.session.commit()

def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
