from app.models import db, Marker
from faker import Faker
fake = Faker()

def seed_markers():
    # coords = [(43.06072321024563, -89.44357571712301), (43.06314535612799, -89.44559273818446), (43.06233798479965, -89.43401632475195), (43.06917287011588, -89.46744737596208), (43.11016617798622, -89.48826131670266), (43.0632786105677, -89.59125813686222), (43.02727370772507, -89.35213385272509), (43.103398532192976, -89.3095618337258), (43.10246970078757, -89.03042606875162)]
    # for ele in coords:
    #     (lat, lng) = ele
    #     fake_marker = Marker(name = fake.name(), color = fake.color(color_format='hex'),
    #     address = fake.address(), city = fake.city(), state = fake.state(), lat=lat, lng=lng)
    #     db.session.add(fake_marker)
    #     db.session.commit()

    marker_1 = Marker(
    lat = 43.06072321024563, lng = -89.44357571712301, name="Fluffy", color="Blue", address="Fake Address",
    city="Fake City", state="Fake State"
    )
    marker_2 = Marker(
    lat = 43.06072321024563, lng = -89.44357571712301, name="Kenshin", color="Red", address="Fake Address",
    city="Fake City", state="Fake State"
    )
    # for marker in [marker_1, marker_2]:
    db.session.add(marker_1)
    db.session.add(marker_2)
    db.session.commit()

def undo_markers():
    db.session.execute('TRUNCATE markers RESTART IDENTITY CASCADE;')
    db.session.commit()
