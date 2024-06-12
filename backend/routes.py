from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from backend.models import User
from backend import db

main_bp = Blueprint('main', __name__)

@main_bp.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Hello from Flask!")

@main_bp.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(username=data['username'], email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@main_bp.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    access_token = create_access_token(identity={'username': user.username, 'email': user.email})
    return jsonify(access_token=access_token), 200

@main_bp.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@main_bp.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([user.username for user in users])
