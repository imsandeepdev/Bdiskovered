
import {
  PermissionsAndroid, Platform,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';



export const RequestLocationPermission = async () => {
  if(Platform.OS == 'ios')
  {
    console.log("LOCATION ON LOCATION SERVICE")
     Geolocation.setRNConfiguration({
       authorizationLevel: 'whenInUse',
     });
    let permissionResult = await Geolocation.requestAuthorization('whenInUse');
    console.log("LocationPermission",permissionResult);
    if (permissionResult == 'granted') {
      getOneTimeLocation();
    } else {
      console.log('Location Error Location Denied', permissionResult);
        AsyncStorage.setItem('userLatLong', `${28.4595},${77.0266}`);
    }
    return null;
  }
  else if(Platform.OS == 'android')
  {

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
      console.log('catchError',err);
      
    }
  }
 };

  const getOneTimeLocation = async () => {
    console.log("ONE TIME")
    
         Geolocation.getCurrentPosition(
           position => {
             console.log('POSITION ON LOCATION', position);
             AsyncStorage.setItem(
               'userLatLong',
               `${position.coords.latitude},${position.coords.longitude}`,
               
             );
              AsyncStorage.setItem(
               'userLat',`${position.coords.latitude}`
             );
             AsyncStorage.setItem('userLong', `${position.coords.longitude}`);
             
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
    // }
  };