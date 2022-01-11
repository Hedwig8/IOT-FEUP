import React, { useEffect, useState } from 'react';
import { StreetInfo } from './StreetInfo';
import { Communication } from './MQTT';
import uuid from 'react-native-uuid';
import { View } from 'react-native';
import { MqttClient } from '@taoqf/react-native-mqtt';

export type LocationType = {
    streetID: number;
    latitude: string;
    longitude: string;
    speed: number;
    heading: number;
}

const prefix = 'iot/app/info/david/henrique/miguel/';

export const AppLogic = () => {
    const [ clientID ] = useState(uuid.v4().toString());
    const [ client, setClient ] = useState<MqttClient>();
    const [ location, setLocation ] = useState<LocationType>({streetID: 0, latitude: '', longitude: '', speed: 0, heading: 0});

    const messageHandler = (message:string) => {
        console.log(message);

        // TODO collision detection logic
    } 

    useEffect(() => {
        if (publish != undefined && subscribe != undefined && location != undefined) {
            subscribe(location.streetID.toString());
            publish(location?.streetID.toString(), JSON.stringify(location));
        }
    }, [location]);

    const subscribe = (topic:string) => {
        client?.subscribe(prefix + topic);
    }

    const publish = (topic:string, message: string) => {
        console.log(topic, ': ', message);
        client?.publish(topic, message);
    }

    useEffect(() => {
        client?.on("message", function (topic, message, packet) {
            // message is Buffer
            console.log(topic, ': ', message.toString());
            messageHandler(message.toString());
        }); 
    }, [client]);

    return (
        <View>
            <StreetInfo location={location} setLocation={setLocation}  />
            <Communication clientID={clientID} client={client} setClient={setClient} />
        </View>
    );
}