from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class UpdateReview(FlaskForm):
    id = IntegerField('id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    rating = IntegerField("rating", validators=[DataRequired()])
