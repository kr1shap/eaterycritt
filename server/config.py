import os
import redis
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Flask secret key
    SECRET_KEY = os.getenv("SECRET_KEY", "SECRET_KEY")

    # Database
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///restaurant_reviews.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS
    CORS_SUPPORTS_CREDENTIALS = True

    # Session config
    SESSION_COOKIE_NAME = "session"
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url(os.getenv("REDIS_URL", "redis://127.0.0.1:6379"))