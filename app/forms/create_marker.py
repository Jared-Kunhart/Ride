from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Marker

class CreateMarker(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  color = StringField('color')
  address = StringField('address')
  city = StringField('city')
  state = StringField('state')
  lat = StringField('lat')
  lng = StringField('lng')


# class CreateMarker(FlaskForm):
#   origin_name = StringField('origin_name')
#   origin_color = StringField('origin_color')
#   origin_address = StringField('origin_address')
#   origin_city = StringField('origin_city')
#   origin_state = StringField('origin_state')
#   origin_lat = StringField('origin_lat', validators=[DataRequired()])
#   origin_lng = StringField('origin_lng', validators=[DataRequired()])
#   destination_name = StringField('destination_name')
#   destination_color = StringField('destination_color')
#   destination_address = StringField('destination_address')
#   destination_city = StringField('destination_city')
#   destination_state = StringField('destination_state')
#   destination_lat = StringField('destination_lat', validators=[DataRequired()])
#   destination_lng = StringField('destination_lng', validators=[DataRequired()])
