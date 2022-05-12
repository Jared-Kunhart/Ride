from flask import Blueprint
from app.models import Booking
from app.config import Config

booking_routes = Blueprint('bookings', __name__)

#, "k":Config.REACT_APP_GOOGLE_MAPS_API

@booking_routes.route("/bookings")
def getBookings():
    bookings = Booking.query.all()
    return {"bookings": [booking.to_dict() for booking in bookings]}


@booking_routes.route("/key")
def getKey():
    return {"key":Config.REACT_APP_GOOGLE_MAPS_API}
