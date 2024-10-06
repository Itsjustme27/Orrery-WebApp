import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)
load_dotenv()
api_key = os.getenv('NASA_API_KEY')



if __name__ == '__main__':
    app.run(debug=True)
