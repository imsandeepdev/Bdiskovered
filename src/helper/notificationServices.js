import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken()
  }
}

const getFcmToken = async () => {
    let chcekToken = await AsyncStorage.getItem('fcmToken')
    console.log("the old token", chcekToken)
    if(!chcekToken){ 
    try {
      const fcmToken = await messaging().getToken();
      if(!!fcmToken){
      console.log('FCM Token Genrated', fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    } catch (error) {
      console.log('Error in FcmToken', error);
      Alert.alert(error?.messaging);
    }
    }
}

export const notificationListner = async() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log("Notification caused app to open from background state:",
        remoteMessage.notification,
        );
        console.log("background state", remoteMessage.notification)
    });

    // Check whether notification is available
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if(remoteMessage){
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            console.log('remote message',remoteMessage.notification)
            }
            
        })
}