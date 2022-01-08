import React, { Dispatch, useEffect, useState } from 'react';
import * as MQTT from '@taoqf/react-native-mqtt';
import { Section, styles } from './Section';
import { Button, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export type CommunicationProps = {
    clientID: string;
    setSubscribe: Dispatch<(topic:string) => void>;
    setPublish: Dispatch<(topic:string, message: string) => void>;
    messageHandler: ({id, text} : {id:string, text:string}) => void;
}

export const Communication = ({clientID, setSubscribe, setPublish, messageHandler} : CommunicationProps) => {
    const [client, setClient] = useState<MQTT.MqttClient | undefined>(undefined);
    const [connected, setConnected] = useState(false);
    const [host, setHost] = useState("");
    const [port, setPort] = useState("");
    const [receivedTopic, setReceivedTopic] = useState("");
    const [receivedMessage, setReceivedMessage] = useState("");

    const connectDisconnect = () => {
        connected ? disconnect() : connect();
    }

    const disconnect = () => {
        client?.end();
        setConnected((client?.connected && !client?.disconnecting) || false);
    }

    const connect = () => {

        const client = MQTT.connect(`ws://${host}:${port}`, { clientId: clientID, clean: true });
        setClient(client);

        client.on('connect', function () {
            setConnected(client.connected);
        });

        client.on('message', function (topic, message, packet) {
            // message is Buffer
            console.log(topic, ': ', message.toString());
            setReceivedTopic(topic);
            setReceivedMessage(message.toString());
            messageHandler(packet);
        });
    }

    useEffect(() => {
        setSubscribe((topic) => {
            connected ? client?.subscribe(topic) : false;
        });

        setPublish((topic, message) => {
            connected ? client?.publish(topic, message) : false;
        });
    }, []);

    return (
        <View>
            <Section title="Broker info" >
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ ...styles.highlight, fontSize: 20 }} >Host: </Text>
                        <TextInput style={{ maxHeight: 25, padding: 0, margin: 0, fontSize: 18 }} 
                                    onChangeText={setHost} value={host} keyboardType='default' 
                                    placeholder='insert host here' />
                        <Text style={{ ...styles.highlight, fontSize: 20 }} >     Port: </Text>
                        <TextInput style={{ maxHeight: 25, padding: 0, margin: 0, fontSize: 18 }} 
                                onChangeText={setPort} value={port} keyboardType='numeric' 
                                placeholder='insert port here' />
                    </View>
                    <Text ></Text>
                    <Button title={connected ? 'Disconnect from broker' : 'Connect to broker'} 
                            onPress={connectDisconnect} color={Colors.darker} />
                </View>
            </Section>
            <Section title='Messages'>
                <Text style={styles.highlight} >{receivedTopic}: </Text> {receivedMessage}
            </Section>
            <Text></Text>
        </View>
    );
}
