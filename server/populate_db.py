from db import db
from app import app
from models import User, Restaurant, Review
from datetime import datetime, timezone

# Make sure tables exist

with app.app_context():
    db.create_all()

    # --- Sample Users ---
    users = [
        User(id=1, name="Alice Johnson", email="alice@example.com", password_hash="hash1"),
        User(id=2, name="Bob Smith", email="bob@example.com", password_hash="hash2"),
        User(id=3, name="Charlie Lee", email="charlie@example.com", password_hash="hash3"),
    ]

    # --- Sample Restaurants ---
    restaurants = [
        Restaurant(id=1, name="Sushi Palace", cuisine="Japanese", location="123 Tokyo St, Cityville", created_by=1),
        Restaurant(id=2, name="Pasta House", cuisine="Italian", location="456 Rome Ave, Cityville", created_by=2),
        Restaurant(id=3, name="Taco Town", cuisine="Mexican", location="789 Mexico Rd, Cityville", created_by=3),
    ]

    # --- Sample Reviews ---
    reviews = [
        Review(id=1, user_id=1, restaurant_id=1, rating=5,
            comment="Best sushi I’ve ever had! Fresh and delicious.",
            created_at=datetime(2025, 8, 30, 12, 0, tzinfo=timezone.utc)),
        Review(id=2, user_id=2, restaurant_id=2, rating=4,
            comment="Really good pasta, but a bit pricey.",
            created_at=datetime(2025, 8, 29, 18, 30, tzinfo=timezone.utc)),
        Review(id=3, user_id=3, restaurant_id=3, rating=3,
            comment="Average tacos, nothing special.",
            created_at=datetime(2025, 8, 28, 14, 45, tzinfo=timezone.utc)),
        Review(id=4, user_id=1, restaurant_id=2, rating=5,
            comment="Loved the carbonara here!",
            created_at=datetime(2025, 8, 27, 20, 15, tzinfo=timezone.utc)),
    ]

    # --- Add all to session ---
    db.session.add_all(users)
    db.session.add_all(restaurants)
    db.session.add_all(reviews)

    # Commit changes
    db.session.commit()

    print("Sample data inserted successfully!")
