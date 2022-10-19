from crypt import methods
from flask import Blueprint, request
from flask_login import current_user
from app.models import db, Booking, Marker
from app.config import Config
from app.forms.create_marker import CreateMarker
from app.forms.edit_booking import EditBooking

booking_routes = Blueprint('bookings', __name__)

"""
filter by date
"""

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

@booking_routes.route("/booking/new", methods=["POST"])
def create_booking():
    form = CreateMarker()
    form['csrf_token'].data = request.cookies['csrf_token']

    origin_marker = Marker(
        name = form.origin_name.data,
        color = form.origin_color.data,
        address = form.origin_address.data,
        city = form.origin_city.data,
        state = form.origin_state.data,
        lat = form.origin_lat.data,
        lng = form.origin_lng.data
    )
    db.session.add(origin_marker)
    db.session.commit()

    destination_marker = Marker(
        name = form.destination_name.data,
        color = form.destination_color.data,
        address = form.destination_address.data,
        city = form.destination_city.data,
        state = form.destination_state.data,
        lat = form.destination_lat.data,
        lng = form.destination_lng.data
    )
    db.session.add(destination_marker)
    db.session.commit()

    booking = Booking(
        date = "2020/10/2",
        price = "13.55",
        is_complete = False,
        user_id = current_user.id,
        origin_id = origin_marker.id,
        destination_id = destination_marker.id,
    )
    db.session.add(booking)
    db.session.commit()

    return booking.to_dict()


@booking_routes.route('/booking/<int:id>/edit', methods=["PUT"])
def edit_booking(id):
    form = EditBooking()
    form['csrf_token'].data = request.cookies['csrf_token']

    booking = Booking.query.get(id)
    marker = Marker.query.get(booking.destination_id)

    marker.address = form.destination_address.data
    marker.lat = form.destination_lat.data
    marker.lng = form.destination_lng.data
    db.session.commit()
    return booking.to_dict()


@booking_routes.route('/booking/<int:id>/complete', methods=["PUT"])
def complete_booking(id):

    booking = Booking.query.get(id)

    booking.is_complete = True
    db.session.commit()
    # print(booking.to_dict())
    return booking.to_dict()


@booking_routes.route('/booking/<int:id>/delete', methods=["DELETE"])
def delete_booking(id):

    booking = Booking.query.get(id)
    db.session.delete(booking)
    db.session.commit()
    return "Deleted"


@booking_routes.route("/key")
def getKey():
    return {"key":Config.REACT_APP_GOOGLE_MAPS_API}


@booking_routes.errorhandler(500)
def internal_server_error(e):
    return {'errors': ["Internal Server Error"]}, 500
