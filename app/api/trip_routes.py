from flask import Blueprint
from app.models import Booking, Marker
from app.config import Config

booking_routes = Blueprint('bookings', __name__)


@booking_routes.route("/")
def getBookings():
    markers = Marker.query.all()
    return {"markers": [marker.to_dict() for marker in markers], "k":Config.REACT_APP_GOOGLE_MAPS_API}
