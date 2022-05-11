from flask.cli import AppGroup
from .users import seed_users, undo_users
from .markers import seed_markers, undo_markers
from .bookings import seed_bookings, undo_bookings
from .reviews import seed_reviews, undo_reviews

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_markers()
    seed_bookings()
    seed_reviews()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_markers()
    undo_bookings()
    undo_reviews()
