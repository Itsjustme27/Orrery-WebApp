from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS

import numpy as np
from scipy.constants import G

app = Flask(__name__)
CORS(app)

@app.route('/')
def func():
    return "Hello world"

if __name__ == '__main__':
    app.run(debug=True)