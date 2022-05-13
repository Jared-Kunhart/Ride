from .db import db


class Marker(db.Model):
    __tablename__ = 'markers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    color = db.Column(db.String(7))
    address = db.Column(db.String(100))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    lat = db.Column(db.Numeric(scale=13, asdecimal=False))
    lng = db.Column(db.Numeric(scale=13, asdecimal=False))

    origin_id = db.relationship("Booking", foreign_keys="Booking.origin_id", back_populates="origin")
    destination_id = db.relationship("Booking", foreign_keys="Booking.destination_id", back_populates="destination")


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "color": self.color,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "lat": self.lat,
            "lng": self.lng
            }
