import React, { useEffect, useState } from 'react';
import { StreetInfo } from './StreetInfo';
import { Communication } from './MQTT';
import uuid from 'react-native-uuid';
import { View } from 'react-native';
import { MqttClient } from '@taoqf/react-native-mqtt';
import * as geolib from 'geolib';
import { Section } from './Section';

export type LocationType = {
    streetID: number;
    latitude: string;
    longitude: string;
    speed: number;
    heading: number;
    clientID: string;
}

const prefix = 'iot/app/info/david/henrique/miguel/';

export const AppLogic = () => {
    const [clientID] = useState(uuid.v4().toString());
    const [client, setClient] = useState<MqttClient>();
    const [location, setLocation] = useState<LocationType>({ streetID: 0, latitude: '', longitude: '', speed: 0, heading: 0, clientID: clientID });
    const [danger, setDanger] = useState(false);

    const okMsg = 'You are OK';
    const warningMsg = 'Warning: ';
    const dangerMsg = 'Danger: you are heading straight into someone!';

    const messageHandler = (message: string) => {
        const objMessage = JSON.parse(message);

        // same client
        if (objMessage.clientID === clientID) {
            console.log('same client');
            return;
        } 

        // compute imaginary point in a given direction (heading) a given distance (distance variable)
        const distance = 15; // m
        const imaginaryPoint = geolib.computeDestinationPoint(
            { latitude: location.latitude, longitude: location.longitude },
            distance,
            location.heading
        );

        // checks if point is near line delimited by start and end points, by a given distance
        const maxDistance = 3; // m
        const isNear = geolib.isPointNearLine(
            { latitude: objMessage.latitude, longitude: objMessage.longitude },
            { latitude: location.latitude, longitude: location.longitude },
            { latitude: imaginaryPoint.latitude, longitude: imaginaryPoint.longitude },
            maxDistance
        );

        if (isNear) {
            setDanger(true);
        } else {
            setDanger(false);
        }
    }

    useEffect(() => {
        if (publish != undefined && subscribe != undefined && location != undefined) {
            subscribe(location.streetID.toString());
            publish(location.streetID.toString(), JSON.stringify(location));
        }
    }, [location]);

    const subscribe = (topic: string) => {
        client?.subscribe(prefix + topic);
    }

    const publish = (topic: string, message: string) => {
        console.log(topic, ': ', message);
        client?.publish(prefix + topic, message);
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
            <Section title='STATUS' ></Section>
            <View style={{display: danger ? 'none' : 'flex', backgroundColor: 'green'}}>
                <Section title={'>' + ' ' + okMsg} ></Section>
            </View>
            <View style={{display: danger ? 'flex' : 'none', backgroundColor: 'red'}}>
                <Section title={'>' + ' ' + dangerMsg} ></Section>
            </View>
            <StreetInfo location={location} setLocation={setLocation} clientID={clientID} />
            <Communication clientID={clientID} client={client} setClient={setClient} />

        </View>
    );
}