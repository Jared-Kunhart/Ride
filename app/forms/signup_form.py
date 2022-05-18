from xmlrpc.client import Boolean
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, PasswordField
from wtforms.fields.html5 import EmailField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), Email(), user_exists])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired(), EqualTo('confirm',  message='Passwords must match')])
    confirm = PasswordField('confirm')
    is_driver = BooleanField('is_driver')
    is_available = BooleanField('is_available')

# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')
