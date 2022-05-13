from .db import db
from sqlalchemy.sql import func


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    price = db.Column(db.Float(precision=4, asdecimal=False), nullable=False)
    is_complete = db.Column(db.Boolean, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    origin_id = db.Column(db.Integer, db.ForeignKey("markers.id"), nullable=True)
    destination_id = db.Column(db.Integer, db.ForeignKey("markers.id"), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="bookings")
    origin = db.relationship("Marker", back_populates="origin_id", cascade='all, delete', foreign_keys=[origin_id])
    destination = db.relationship("Marker", back_populates="destination_id", cascade='all, delete', foreign_keys=[destination_id])

    #cascade='all,delete-orphan'

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'price': self.price,
            'is_complete': self.is_complete,
            'user_id': self.user_id,
            'origin_id': self.origin_id,
            'destination_id': self.destination_id,
            'origin': self.origin.to_dict(),
            'destination': self.destination.to_dict()
        }
