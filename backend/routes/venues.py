# routes/venues.py
from flask import Blueprint, request, jsonify
from config import get_db_connection

venues_bp = Blueprint('venues', __name__)

@venues_bp.route('/', methods=['GET'])
def get_venues():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM venues WHERE availability_status = TRUE")
    venues = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(venues)

@venues_bp.route('/add', methods=['POST'])
def add_venue():
    data = request.get_json()
    venue_name = data['venue_name']
    capacity = data['capacity']
    location = data['location']
    booking_date = data['booking_date']  # Expected to be in 'YYYY-MM-DD' format
    start_time = data['start_time']      # Expected to be in 'HH:MM:SS' format
    end_time = data['end_time']          # Expected to be in 'HH:MM:SS' format
    cost_per_hour = data['cost_per_hour']

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO venues (venue_name, capacity, location, booking_date, start_time, end_time, cost_per_hour)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    ''', (venue_name, capacity, location, booking_date, start_time, end_time, cost_per_hour))

    cursor.close()
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'message': 'Venue added successfully!'})
