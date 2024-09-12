from flask import Flask, jsonify
from flask_cors import CORS

import numpy as np
from scipy.constants import G

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello, world!"

@app.route('/api/orbits')
def get_orbits():
    orbits = {
        'earth': {'distance': 1.0, 'period': 365.25},
        'mars': {'distance': 1.524, 'period': 687},
    }
    return jsonify(orbits)

if __name__ == '__main__':
    app.run(debug=True)