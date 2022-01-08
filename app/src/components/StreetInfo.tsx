import React, { Dispatch, useEffect, useState } from "react"
import { Text, View } from "react-native";
import { LocationType } from "./AppLogic";
import { Location } from "./Location";

export type StreetInfoProps = {
    location: LocationType;
    setLocation: Dispatch<LocationType>;
}

export const StreetInfo = ({location, setLocation} : StreetInfoProps) => {

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [id, setId] = useState(0);

    useEffect(() => {
        try {
            if (latitude === '' || longitude === '') return;
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=17`)
            .then((response) => response.json())
            .then((json) => {
                try {
                    console.log(json);
                    setLocation({
                        streetID: json.osm_id,
                        latitude: latitude,
                        longitude: longitude
                    });
                    setId(json.osm_id);
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
            <Location latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} />
            <Text></Text>
            <Text>  STREET: {location.streetID}</Text>
            <Text>  ID: {id}</Text>
            <Text></Text>
        </View>
    );
}