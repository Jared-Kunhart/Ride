from flask import Blueprint
from app.models import Booking
from app.config import Config

booking_routes = Blueprint('bookings', __name__)


@booking_routes.route("/bookings")
def getBookings():
    bookings = Booking.query.all()
    return {"bookings": [booking.to_dict() for booking in bookings], "k":Config.REACT_APP_GOOGLE_MAPS_API}
