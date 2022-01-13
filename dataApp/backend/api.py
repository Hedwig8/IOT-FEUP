from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from mqtt import run
import threading
from tinydb import TinyDB, Query
import json


app = Flask(__name__)
CORS(app)

db = TinyDB('db.json')

@app.route('/')
def hello_world():
    jsonResp = {'jack': 4098, 'sape': 4139}
    print(jsonify(jsonResp))
    return jsonify(jsonResp)


@app.route("/insert", methods=['POST'])
def insert():
    data = request.get_json()
    db.insert(data)
    return "success"


@app.route("/getStreets")
def getStreets():
    data = db.all()
    print(json.dumps(data))
    return jsonify(data)


def startup():
    threading.Thread(target=lambda: run(db)).start()
    app.run()

if __name__ == "__main__":
    startup()