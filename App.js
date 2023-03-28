import './ignoreWarnings';
import * as React from 'react';
import {useEffect} from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import { RequestLocationPermission } from './src/helper/locationServices';
import { notificationListner } from './src/helper/notificationServices';
import { requestUserPermission } from './src/helper/notificationServices';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIos from '@react-native-community/push-notification-ios';
import { makeLocalNotification, requestUserPermissionNoti, subscribeForgroundNotification } from './src/helper/notification';
import { Alert } from 'react-native';
import notifee from '@notifee/react-native';



const App = () => {
  useEffect(async()=>{
    RequestLocationPermission()
    requestUserPermission()
    notificationListner()


    subscribeForgroundNotification()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //  console.log('Message handled in the foreground!', remoteMessage);
      //  Alert.alert(JSON.stringify(remoteMessage))
       await notifee.displayNotification({
         title: remoteMessage.notification.title,
         body: remoteMessage.notification.body,
       });
    });

    return unsubscribe;

  },[])



  return (
   
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
  );
};

export default App;
