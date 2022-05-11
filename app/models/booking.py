from .db import db
from sqlalchemy.sql import func


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    price = db.Column(db.Float(precision=4, asdecimal=False), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    origin_id = db.Column(db.Integer, db.ForeignKey("markers.id"), nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey("markers.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="bookings")
    origin = db.relationship("Marker", foreign_keys=[origin_id])
    destination = db.relationship("Marker", foreign_keys=[destination_id])

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'price': self.price,
            'user_id': self.user_id,
            'origin_id': self.origin_id,
            'destination_id': self.destination_id
        }