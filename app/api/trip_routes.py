from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Booking, Marker
from app.config import Config
from app.forms.create_marker import CreateMarker

booking_routes = Blueprint('bookings', __name__)

@booking_routes.route("/bookings")
def getBookings():
    bookings = Booking.query.all()
    return {"bookings": [booking.to_dict() for booking in bookings]}


@booking_routes.route("/booking")
def get_booking():
    booking =  Booking.query.last()
    return booking.to_dict()


@booking_routes.route("/booking/origin", methods=["POST"])
def create_origin_marker():
    form = CreateMarker()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        marker = Marker(
            name = form.name.data,
            color = form.color.data,
            address = form.address.data,
            city = form.city.data,
            state = form.state.data,
            lat = form.lat.data,
            lng = form.lng.data
        )
        db.session.add(marker)
        db.session.commit()
        return marker.to_dict()

@booking_routes.route("/booking/destination", methods=["POST"])
def create_destination_marker():
    form = CreateMarker()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        marker = Marker(
            name = form.name.data,
            color = form.color.data,
            address = form.address.data,
            city = form.city.data,
            state = form.state.data,
            lat = form.lat.data,
            lng = form.lng.data
        )
        db.session.add(marker)
        db.session.commit()

        booking = Booking(
            date = "2020/10/2",
            price = "13.55",
            user_id = current_user.id,
            origin_id = marker.id - 1,
            destination_id = marker.id,
        )
        db.session.add(booking)
        db.session.commit()
        return {"booking": booking.to_dict()}


"""
Option #1 Create booking first, Allow origin_id and destination_id to be null
Set Markers after recommit booking

Option #1 filter by date
"""


@booking_routes.route("/key")
def getKey():
    return {"key":Config.REACT_APP_GOOGLE_MAPS_API}
