# app.py
from flask import Flask
from routes.bookings import bookings_bp
from routes.venues import venues_bp
from routes.users import users_bp
from routes.payments import payments_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
# Register Blueprints
app.register_blueprint(bookings_bp, url_prefix="/bookings")
app.register_blueprint(venues_bp, url_prefix="/venues")
app.register_blueprint(users_bp, url_prefix="/users")
app.register_blueprint(payments_bp, url_prefix="/payments")

if __name__ == "__main__":
    app.run(debug=True)
