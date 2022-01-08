import React, { useEffect, useState } from 'react';
import { StreetInfo } from './StreetInfo';
import { Communication } from './MQTT';
import uuid from 'react-native-uuid';
import { View } from 'react-native';

export type LocationType = {
    streetID: number;
    latitude: string;
    longitude: string;
}

export const AppLogic = () => {
    const [ clientID ] = useState(uuid.v4().toString());
    const [location, setLocation] = useState<LocationType>();
    const [subscribe, setSubscribe] = useState<(topic:string) => void>();
    const [publish, setPublish] = useState<(topic:string, message:string) => void>();

    const messageHandler = ({ id, text} : {id: string, text: string}) => {
        console.log(id, text);
    } 

    useEffect(() => {

    }, [location]);

    return (
        <View>
            <StreetInfo location={location ? location : {streetID: 0, latitude: '', longitude: ''}} setLocation={setLocation}  />
            <Communication clientID={clientID} setSubscribe={setSubscribe} setPublish={setPublish} messageHandler={messageHandler}/>
        </View>
    );
}