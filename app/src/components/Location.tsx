import React, { Dispatch, useEffect, useState } from "react";
import { Button, PermissionsAndroid, Platform, Text, ToastAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Section, styles } from "./Section";

export type LocationProps = {
    latitude: string;
    setLatitude: Dispatch<string>;
    longitude: string;
    setLongitude: Dispatch<string>;
    setSpeed: Dispatch<number>;
    setHeading: Dispatch<number>;
}

export const Location = ({latitude, setLatitude, longitude, setLongitude, setSpeed, setHeading}:LocationProps) => {
    const [lat, setLat] = useState("0");
    const [long, setLong] = useState("0");
    const [head, setHead] = useState('0');

    const hasLocationPermissions = async () => {
        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    }

    const updateLocation = async () => {
        try {
            const hasPermissions = await hasLocationPermissions();
            if (!hasPermissions) return;

            Geolocation.getCurrentPosition((locationUpdate) => {
                setLat(locationUpdate.coords.latitude.toString());
                setLong(locationUpdate.coords.longitude.toString());
            }, (error) => {
                console.log("Error code ", error.code, ': ', error.message);
            }, { distanceFilter: 0, showLocationDialog: true, forceLocationManager: true, });
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    const subscribeLocation = async () => {
        try {
            const hasPermissions = await hasLocationPermissions();
            if (!hasPermissions) return;

            Geolocation.watchPosition((locationUpdate) => {
                setLatitude(locationUpdate.coords.latitude.toString());
                setLongitude(locationUpdate.coords.longitude.toString());
                setSpeed(locationUpdate.coords.speed || 0);
                setHeading(locationUpdate.coords.heading || 0);
                setHead(locationUpdate.coords.heading?.toString() ?? '0');
            }, (error) => {
                console.log("Error code ", error.code, ': ', error.message);
            }, { distanceFilter: 0, interval: 500, showLocationDialog: true, forceLocationManager: true, });
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    useEffect(() => {
        subscribeLocation();
    }, []);

    return (
        <Section title="Location" >
            <Text style={styles.highlight}>Latitude: </Text>{lat}
            <Text style={styles.highlight}>   Longitude: </Text>{long}
            {"\n"}
            <Button title="Update Location" onPress={updateLocation} color={Colors.darker}></Button>
            {"\n\n"}
            <Text style={styles.highlight}>Automatic Latitude: </Text>{latitude}
            {"\n"}
            <Text style={styles.highlight}>Automatic Longitude: </Text>{longitude}
            {"\n"}
            <Text style={styles.highlight}>Heading: </Text>{head}
            {'\n'}
        </Section>
    );
}


