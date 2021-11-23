import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';



export default function App() {

  const [gps, setGps] = useState({});
  const [permissions, setPermissions] = useState(false);




  useEffect(async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      console.log(granted);
    } finally {
      
    }
    Geolocation.getCurrentPosition((position) => {
      console.log(position);
    },
    (error) => {
      console.log(error)
    }

    );
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
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
