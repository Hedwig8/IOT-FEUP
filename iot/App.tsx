import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';
import { initClient } from './broker/mqtt';

export default function App() {
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function updateLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    //let location = await Location.getLastKnownPositionAsync({ maxAge: 20 });
    //setLocation(location === null ? {} : location);
    Location.watchPositionAsync({ accuracy: Location.Accuracy.Low, timeInterval: 500, distanceInterval: 0}, (locationUpdate) => {
      
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (locationUpdate) {
        text = JSON.stringify(locationUpdate);
        //console.log(text)
      }
      setLocation(text);
    });
  }

  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="locartion" onPress={updateLocation}></Button>
      <Button title="mqtt" onPress={initClient}></Button>
      <Text>{location}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
