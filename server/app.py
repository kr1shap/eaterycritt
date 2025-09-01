from flask import Flask, jsonify, request, session
from dotenv import load_dotenv
from flask_login import LoginManager, current_user, login_required, login_user, logout_user
from flask_sqlalchemy import SQLAlchemy
from models import User, Restaurant, Review
from db import db
from sqlalchemy import func
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import Config


load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)  

app.config.from_object(Config)
bcrypt = Bcrypt(app)

server_session = Session(app)
login_manager = LoginManager(app)

db.init_app(app)

with app.app_context():
    db.create_all()

#Testing route to get all tables
@app.route("/tables")
@cross_origin()
def get_tables():
    users = User.query.all()
    restaurants = Restaurant.query.all()
    reviews = Review.query.all()

    return jsonify({
        "users": [{"id": u.id, "name": u.name, "email": u.email} for u in users],
        "restaurants": [{"id": r.id, "name": r.name, "cuisine": r.cuisine} for r in restaurants],
        "reviews": [{"id": rev.id, "rating": rev.rating, "comment": rev.comment} for rev in reviews]
    })


#AUTH/LOGIN ENDPOINTS 
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route("/signup", methods=["POST"])
@cross_origin()
def signup():
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    password = data.get("password")

    if not email or not name or not password:
        return jsonify({"error": "Missing fields"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400
    
    #Can have same username, but must be under different email
    user = User(email=email, name=name)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully", "user_id": user.id}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)  # Flask-Login handles session
        return jsonify({"message": "Logged in successfully", "user_id": user.id}), 200

    return jsonify({"error": "Invalid email or password"}), 401

@app.route("/logout", methods=["POST"])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return jsonify({"message": "Logged out"}), 200
    else:
        return jsonify({"message": "No active session"}), 200
    
#Get current auth user
@app.route("/@me")
@login_required
def me():
    return jsonify({
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email
    })


#RESTAURANT ENDPOINTS 

#Get all restaurants 
@app.route("/restaurants", methods=["GET"])
def get_restaurants_all():
    restaurants = Restaurant.query.all()
    data = [
        {
            "id": r.id,
            "name": r.name,
            "cuisine": r.cuisine,
            "location": r.location,
        }
        for r in restaurants
    ]
    return jsonify(data), 200

#Get single restaurant
@app.route("/restaurants/<int:restaurant_id>", methods=["GET"])
def get_restaurant_id(restaurant_id):
    r = Restaurant.query.get_or_404(restaurant_id)
    data = {
        "id": r.id,
        "name": r.name,
        "cuisine": r.cuisine,
        "location": r.location,
    }
    return jsonify(data), 200

#Get reviews for restaurant 
@app.route("/restaurants/<int:restaurant_id>/reviews", methods=["GET"])
def get_restaurant_reviews(restaurant_id):
    reviews = Review.query.filter_by(restaurant_id=restaurant_id).all()
    data = [
        {
            "id": rev.id,
            "user_id": rev.user_id,
            "restaurant_id": rev.restaurant_id,
            "rating": rev.rating,
            "comment": rev.comment,
            "created_at": rev.created_at.isoformat()
        }
        for rev in reviews
    ]
    return jsonify(data), 200

#Create reviews 
@app.route("/restaurants/<int:restaurant_id>/reviews", methods=["POST"])
# @login_required
def create_review(restaurant_id): 
    try:
        data = request.get_json()

        rating = data.get("rating")
        comment = data.get("comment")
        user_id = data.get("user_id")

        if not rating or not comment or not user_id:
            return jsonify({"error": "Missing user_id, rating/comment"}), 400

        review = Review(
            user_id=user_id,
            restaurant_id=restaurant_id,
            rating=rating,
            comment=comment
        )

        db.session.add(review)
        db.session.commit()

        return jsonify({
            "message": "successfully created review"
        }), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  
    
#Add a restaurant 
@app.route("/addRestaurant", methods=["POST"])
# @login_required
def create_rest(): 
    try:
        data = request.get_json()

        name = data.get("name")
        location = data.get("location")
        cusisine = data.get("cuisine")
        created_by = data.get("created_by")

        if not name or not location or not cusisine or created_by:
            return jsonify({"error": "Missing name/loc/cusine/creator"}), 400

        rest = Restaurant(
            name=name,
            location=location,
            cusisine=cusisine,
            created_by=created_by
        )

        db.session.add(rest)
        db.session.commit()

        return jsonify({
            "message": "successfully added restaurant!"
        }), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  


@app.route("/restaurants/<int:restaurant_id>/avgRating", methods=["GET"])
def get_avg(restaurant_id):
    avg_rating = db.session.query(func.avg(Review.rating))\
                           .filter(Review.restaurant_id == restaurant_id)\
                           .scalar()

    if avg_rating is None:
        return jsonify({"average_rating": None, "message": "No reviews yet"}), 200

    avg_rating = round(avg_rating, 2)

    return jsonify({"average_rating": avg_rating}), 200

# USER ENDPOINTS 
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id): 
    user = User.query.filter_by(id=user_id).first()

    if user is None: 
        return jsonify({"error": "No user found"}), 400
    
    return jsonify({
            "id": user.id,
            "email": user.email,
            "name": user.name
    }), 200

if __name__ == "__main__":
        app.run(debug=True)
