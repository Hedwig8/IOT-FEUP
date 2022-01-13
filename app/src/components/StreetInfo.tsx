import React, { Dispatch, useEffect, useState } from "react"
import { Text, View } from "react-native";
import { LocationType } from "./AppLogic";
import { Location } from "./Location";

export type StreetInfoProps = {
    location: LocationType;
    setLocation: Dispatch<LocationType>;
    clientID: string;
}

export const StreetInfo = ({location, setLocation, clientID} : StreetInfoProps) => {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [speed, setSpeed] = useState(0);
    const [heading, setHeading] = useState(0);
    
    useEffect(() => {
        try {
            if (latitude === '' || longitude === '') return;
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=17`)
            .then((response) => response.json())
            .then((json) => {
                try {
                    setLocation({
                        streetID: json.osm_id,
                        latitude: json.lat,
                        longitude: json.lon,
                        speed: speed,
                        heading: heading,
                        clientID: clientID
                    });
                } catch(error) {
                    console.log('Error: ', error);
                }
            });
        } catch (error) {
            console.log('Error: ', error);
        }
    }, [longitude]);

    return (
        <View>
            <Location latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} setHeading={setHeading} setSpeed={setSpeed}/>
            <Text></Text>
            <Text>  STREET: {location.streetID}</Text>
            <Text></Text>
        </View>
    );
}