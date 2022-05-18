from .db import db


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    is_driver_review = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'rating': self.rating,
            'is_driver_review': self.is_driver_review,
            'user_id': self.user_id,
            'user': self.user.to_dict()
        }
