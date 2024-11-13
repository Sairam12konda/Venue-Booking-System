# backend/models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(45), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    
    # Define relationship with Booking (one-to-many)
    bookings = db.relationship('Booking', backref='user', lazy=True)

class Venue(db.Model):
    __tablename__ = 'venues'
    
    venue_id = db.Column(db.Integer, primary_key=True)
    venue_name = db.Column(db.String(100), nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    location = db.Column(db.String(100), nullable=True)
    booking_date = db.Column(db.DateTime, nullable=True)
    start_time = db.Column(db.DateTime, nullable=True)
    end_time = db.Column(db.DateTime, nullable=True)
    availability_status = db.Column(db.Boolean, default=True)
    cost_per_hour = db.Column(db.Integer, nullable=False)
    
    # Define relationship with Booking (one-to-many)
    bookings = db.relationship('Booking', backref='venue', lazy=True)

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    booking_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.venue_id'), nullable=False)
    payment_id = db.Column(db.Integer, db.ForeignKey('payments.payment_id'))
    status = db.Column(db.Integer, nullable=True)

    # Define relationship with Payment (one-to-one)
    payment = db.relationship('Payment', backref='booking', uselist=False)

class Payment(db.Model):
    __tablename__ = 'payments'
    
    payment_id = db.Column(db.Integer, primary_key=True)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.venue_id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.Integer, nullable=True)
    payment_method = db.Column(db.String(45), nullable=True)
    
    # Define relationship with Booking (one-to-one)
    booking = db.relationship('Booking', backref='payment', uselist=False)
