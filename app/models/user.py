from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Identity
from flask_login import UserMixin

def mydefault():
    global i
    i += 1
    return i

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, default=mydefault, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    firstname = db.Column(db.String(40), nullable=False)
    lastname = db.Column(db.String(40), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    is_driver = db.Column(db.Boolean, nullable=False)
    is_available = db.Column(db.Boolean, nullable=False)

    bookings = db.relationship("Booking", back_populates="user")
    reviews = db.relationship("Review", back_populates="user")



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'is_driver': self.is_driver,
            'is_available': self.is_available,
            'bookings': [booking.to_dict() for booking in self.bookings]
        }
