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
