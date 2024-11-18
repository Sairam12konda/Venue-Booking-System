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
    venue_name = data.get('venue_name')
    capacity = data.get('capacity')
    location = data.get('location')
    booking_date = data.get('booking_date')
    start_time = data.get('start_time')
    end_time = data.get('end_time')
    cost = data.get('cost')

    if not all([venue_name, capacity, location, booking_date, start_time, end_time, cost]):
        return jsonify({'error': 'Missing required fields'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            INSERT INTO venues (venue_name, capacity, location, booking_date, start_time, end_time, cost)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        ''', (venue_name, capacity, location, booking_date, start_time, end_time, cost))
        conn.commit()
        new_id = cursor.lastrowid
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()

    return jsonify({'message': 'Venue added successfully!', 'venue_id': new_id})
