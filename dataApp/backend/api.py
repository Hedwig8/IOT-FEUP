from flask import Flask
from flask_cors import CORS
from mqtt import run
import threading
from tinydb import TinyDB, Query


app = Flask(__name__)
CORS(app)

db = TinyDB('db.json')

@app.route("/")
def test():
    return "test"








def startup():
    threading.Thread(target=lambda: run()).start()
    app.run()

if __name__ == "__main__":
    startup()