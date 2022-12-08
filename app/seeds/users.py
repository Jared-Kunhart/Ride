from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    pass
    # passenger_1 = User(
    #     email='rider@ride.com', firstname='K.I.', lastname='T.T',
    #     password='password', is_driver=False, is_available=False
    #     )
    # driver_1 = User(
    #     email='knight@rider.com', firstname='Michael', lastname="Knight",
    #     password='oro', is_driver=True, is_available=True
    #     )
    # passenger_2 = User(
    #     email='roger@roger.com', firstname='Roger', lastname='Camps',
    #     password='oro', is_driver=False, is_available=False
    #     )
    # driver_2 = User(
    #     email='damian@damian.com', firstname='Damian', lastname="Rojas",
    #     password='oro', is_driver=True, is_available=True
    #     )
    # passenger_3 = User(
    #     email='jason@jason.com', firstname='Jason', lastname='Vien',
    #     password='oro', is_driver=False, is_available=False
    #     )
    # driver_3 = User(
    #     email='chris@chris.com', firstname='Chris', lastname="Mizell",
    #     password='oro', is_driver=True, is_available=True
    #     )

    # db.session.add(passenger_1)
    # db.session.add(driver_1)
    # db.session.add(passenger_2)
    # db.session.add(driver_2)
    # db.session.add(passenger_3)
    # db.session.add(driver_3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
