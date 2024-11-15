# routes/users.py
from flask import Blueprint, request, jsonify
import hashlib
from config import get_db_connection

users_bp = Blueprint('users', __name__)

@users_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name, email, password = data['name'], data['email'], data['password']
    password_hash = hashlib.sha256(password.encode()).hexdigest()

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the email is already registered
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()
    if existing_user:
        return jsonify({"error": "Email already exists."}), 409
    
    # Register the user with is_admin set to False
    cursor.execute('''
        INSERT INTO users (name, email, password, is_admin)
        VALUES (%s, %s, %s, %s)
    ''', (name, email, password_hash, False))
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'message': 'User registered successfully!'}), 201

@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data['email'], data['password']
    password_hash = hashlib.sha256(password.encode()).hexdigest()

    conn = get_db_connection()
    cursor = conn.cursor()

    # Select only specific fields to avoid sending sensitive data
    cursor.execute("SELECT *FROM users WHERE email = %s AND password = %s", (email, password_hash))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify({'message': 'Login successful!', 'user': user})
    
    return jsonify({'message': 'Invalid credentials'}), 401
