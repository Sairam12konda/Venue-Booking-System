# routes/payments.py
from flask import Blueprint, request, jsonify
from config import get_db_connection

payments_bp = Blueprint('payments', __name__)

@payments_bp.route('/add', methods=['POST'])
def add_payment():
    data = request.get_json()
    venue_id, payment_method = (
        data['venueId'], data['paymentMethod']
    )

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO payments (venue_id, payment_method) VALUES ( %s, %s)",
                   (venue_id, payment_method))
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'message': 'Payment added successfully!'})
