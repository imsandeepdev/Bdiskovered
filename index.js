/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';

import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().onNotificationOpenedApp(async remoteMessage => {
  console.log(
    'Notification caused app to open from background state:',remoteMessage.notification
  );
});

// const requestUserPermission = async () => {
//   const authorizationStatus = await messaging().requestPermission();

//   if (authorizationStatus) {
//     console.log('Permission status:', authorizationStatus);
//   }
// };
// requestUserPermission();

AppRegistry.registerComponent(appName, () => App);
