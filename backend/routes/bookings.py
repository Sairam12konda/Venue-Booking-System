from flask import Blueprint, request, jsonify
from datetime import datetime
from config import get_db_connection

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('/', methods=['POST'])  # Change to POST
def get_user_bookings():
    data = request.get_json()  # Get JSON payload
    user_id = data.get('user_id')  
    print(data)# Extract user_id from the request body
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



@bookings_bp.route('/create', methods=['POST'])
def create_booking():
    data = request.get_json()
    user_id = data.get('user_id')
    venue_id = data.get('venue_id')
    payment_id = data.get('payment_id')

    # Validate that all required fields are present
    if not all([user_id, venue_id, payment_id]):
        return jsonify({"error": "Missing required fields"}), 400

    # Insert the new booking into the database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO bookings (user_id, venue_id, payment_id)
        VALUES (%s, %s, %s)
    """, (user_id, venue_id, payment_id))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Booking created successfully!"}), 201

