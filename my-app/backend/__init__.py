from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Certifique-se de que o caminho de importação está correto
    app.config.from_object('backend.config.Config')
    
    db.init_app(app)
    jwt = JWTManager(app)

    with app.app_context():
        from .auth import auth_bp
        from .routes import routes_bp
        
        app.register_blueprint(auth_bp, url_prefix='/auth')
        app.register_blueprint(routes_bp, url_prefix='/api')  # Prefixo '/api'

        db.create_all()

    return app
