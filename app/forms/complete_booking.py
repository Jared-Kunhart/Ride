from xmlrpc.client import Boolean
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, DateField, FloatField
from wtforms.validators import DataRequired

class CompleteBooking(FlaskForm):
    date = DateField("date")
    is_complete = BooleanField("is_complete")
    price = FloatField("price")
    used_id = IntegerField("user_id")
    origin_id = IntegerField("origin_id")
    destination_id = IntegerField("destination_id")
