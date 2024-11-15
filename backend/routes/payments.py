# routes/payments.py
from flask import Blueprint, request, jsonify
from config import get_db_connection

payments_bp = Blueprint('payments', __name__)

@payments_bp.route('/add', methods=['POST'])
def add_payment():
    data = request.get_json()
    venue_id, user_id, payment_method = (
        data['venueId'], data['userId'], data['paymentMethod']
    )

    conn = get_db_connection()
    cursor = conn.cursor()

    # Insert the payment record
    cursor.execute("INSERT INTO payments (venue_id, user_id, payment_method) VALUES (%s, %s, %s)",
                   (venue_id, user_id, payment_method))
    conn.commit()

    # Retrieve the ID of the newly inserted record
    payment_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return jsonify({'message': 'Payment added successfully!', 'payment_id': payment_id})

