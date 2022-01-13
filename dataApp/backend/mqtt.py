from paho.mqtt import client as mqtt_client
from tinydb import TinyDB, Query
import json

broker = 'test.mosquitto.org'
port = 1883

prefix = 'iot/app/info/david/henrique/miguel/'

client_id = 'data_collector'
Tinydb = None

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribeToAll(client: mqtt_client):
    def on_message(client, userdata, msg):
        Tinydb.insert(json.loads(msg.payload.decode()))
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client.subscribe(prefix + "#")
    client.on_message = on_message


def run(db):
    global Tinydb
    Tinydb = db
    client = connect_mqtt()
    subscribeToAll(client)
    client.loop_forever()


if __name__ == '__main__':
    run()