from flask import Blueprint, request, jsonify
from .models import User

routes_bp = Blueprint('routes_bp', __name__)

@routes_bp.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"})

@routes_bp.route('/user_data', methods=['GET'])
def get_user_data():
    user_id = request.args.get('user_id')
    user = User.query.get(user_id)
    if user:
        return jsonify({
            "height": user.height,
            "weight": user.weight,
            "age": user.age,
            "activity_level": user.activity_level
        })
    return jsonify({"msg": "User not found"}), 404

@routes_bp.route('/calculate_tde', methods=['POST'])
def calculate_tde():
    data = request.get_json()
    height = data.get('height')
    weight = data.get('weight')
    age = data.get('age')
    activity_level = data.get('activity_level')

    if not all([height, weight, age, activity_level]):
        return jsonify({"msg": "Missing data"}), 400

    # Fórmula de Harris-Benedict revisada para TDE
    if data.get('gender') == 'male':
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    else:
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)

    activity_multipliers = {
        "sedentary": 1.2,
        "lightly active": 1.375,
        "moderately active": 1.55,
        "very active": 1.725,
        "extra active": 1.9
    }

    tde = bmr * activity_multipliers.get(activity_level, 1.2)

    return jsonify({"tde": tde})
