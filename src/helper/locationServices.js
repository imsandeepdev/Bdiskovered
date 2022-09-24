
import {
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';



export const requestLocationPermission = async () => {
   try {
     const granted = await PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
       {
         title: 'Bdiskovered Access your Location Permission',
         message:
           'Want to access your location ' + 'so you can Allow us.',
         buttonNeutral: 'Ask Me Later',
         buttonNegative: 'Cancel',
         buttonPositive: 'OK',
       },
     );
     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
       getOneTimeLocation();
     } else {
       console.log('Location Error Location Denied', error);
      
     }
   } catch (err) {
     console.warn(err);
    
   }
 };

  const getOneTimeLocation = async () => {
    let chcekLatitude = await AsyncStorage.getItem('userLatitude');
    let chcekLongitude = await AsyncStorage.getItem('userLongitude');
    if(!chcekLatitude && !chcekLongitude)
    {
         Geolocation.getCurrentPosition(
           position => {
             console.log('POSITION', position);
             const currentLongitude = await (position.coords.longitude);
             const currentLatitude = await (position.coords.latitude);
             Alert.alert("CURRENT LAT", currentLatitude, "CURRENT LONG", currentLongitude)
             AsyncStorage.setItem('userLongitude', currentLongitude);
             AsyncStorage.setItem('userLatitude', currentLatitude);
           },
           error => {
             console.log('Location Error', error);
           },
           {
             enableHighAccuracy: true,
             timeout: 30000,
             maximumAge: 0,
             forceRequestLocation: true,
           },
         );
    }
  };