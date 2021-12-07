import * as Mqtt from 'react-native-native-mqtt';


/* create mqtt client */
export function initClient() {
    const client = new Mqtt.Client('tcp://192.168.1.84:8800');
    client.connect({
        clientId: 'CLIENT_ID'
    }, err => {});
}

