from flask import Blueprint, request, jsonify
from datetime import datetime
from config import get_db_connection

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/', methods=['GET'])
def get_user_bookings():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({"error": "Missing required parameter: user_id"}), 400

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""
        SELECT b.*
        FROM bookings b
        INNER JOIN users u ON b.user_id = u.user_id
        WHERE u.user_id = %s;
    """, (user_id,))
    bookings = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(bookings)

@bookings_bp.route('/book', methods=['POST'])
def book_venue():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Missing request body"}), 400

    required_fields = ['user_id', 'venue_id', 'booking_date', 'start_time', 'end_time']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400

    user_id = data.get('user_id')
    venue_id = data.get('venue_id')
    booking_date = data.get('booking_date')  # expecting 'YYYY-MM-DD' format
    start_time = data.get('start_time')    # expecting 'HH:MM' format
    end_time = data.get('end_time')      # expecting 'HH:MM' format
    status = data.get('status', 1)        # default status can be 1 for 'booked'

    try:
        # Combine date and time strings into datetime objects
        booking_date_dt = datetime.strptime(booking_date, '%Y-%m-%d')
        start_time_dt = datetime.strptime(f"{booking_date} {start_time}", '%Y-%m-%d %H:%M')
        end_time_dt = datetime.strptime(f"{booking_date} {end_time}", '%Y-%m-%d %H:%M')

        # Validate booking logic (e.g., check venue availability for the specified time slot)
        # ... (implementation details omitted for brevity)

        # Insert booking data into the database
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            INSERT INTO bookings (user_id, venue_id, booking_date, start_time, end_time, status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (user_id, venue_id, booking_date_dt, start_time_dt, end_time_dt, status))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Venue booked successfully!"}), 201

    except Exception as e:
        print("Error while booking venue:", e)
        return jsonify({"error": "Booking failed. Please try again."}), 500