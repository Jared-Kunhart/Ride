from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError


def review_length(form, field):
        rating = form.rating.data
        if rating == 0:
                ValidationError("Provide a rating")


class ReviewForm(FlaskForm):
        content = StringField('content')
        rating = IntegerField("rating", validators=[DataRequired()])
        user_id = IntegerField('user_id', validators=[DataRequired()])
