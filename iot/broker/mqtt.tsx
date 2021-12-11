import MQTT from 'sp-react-native-mqtt';
export function initClient() {



    MQTT.createClient({
        uri: 'mqtt://test.mosquitto.org:1883',
        clientId: 'your_client_id'
    }).then(function (client) {

        client.on('closed', function () {
            console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
            console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {
            console.log('mqtt.event.message', msg);
        });

        client.on('connect', function () {
            console.log('connected');
            client.subscribe('/data', 0);
            client.publish('/data', "test", 0, false);
        });

        client.connect();
    }).catch(function (err) {
        console.log(err);
    });

}


/* create mqtt client 
export function initClient() {
    const client =  MQTT.createClient({uri: 'mqtt://192.168.1.84:8800', clientId: 'your_client_id'});
    client.connect({
        clientId: 'CLIENT_ID'
    }, err => {});
}

*/