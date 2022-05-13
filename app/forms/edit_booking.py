from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class EditBooking(FlaskForm):
  destination_name = StringField('destination_name')
  destination_color = StringField('destination_color')
  destination_address = StringField('destination_address')
  destination_city = StringField('destination_city')
  destination_state = StringField('destination_state')
  destination_lat = StringField('destination_lat', validators=[DataRequired()])
  destination_lng = StringField('destination_lng', validators=[DataRequired()])
