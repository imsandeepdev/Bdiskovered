import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
import {navigate} from '../navigator/NavigationService';
import notifee, {AuthorizationStatus} from '@notifee/react-native';

async function requestUserPermissionNoti() {

const settings = await notifee.requestPermission();

// if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
//   console.log('Permission settings:', settings);
// } else {
//   console.log('User declined permissions');
// }


  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  return enabled;
}

async function getToken() {
  return await messaging().getToken();
}

async function subscribeForgroundNotification() {
  Notifications.registerRemoteNotifications();
  Notifications.events().registerNotificationReceivedForeground(
    (notification: Notification, completion) => {
      completion({alert: true, sound: true, badge: true});
    },
  );

  Notifications.events().registerNotificationOpened(
    (notification: Notification, completion) => {
      console.log(`Notification opened: ${notification.payload}`);
       navigate('NotificationScreen');
      completion();
    },
  );
}

async function makeLocalNotification(remoteMessage) {
   await notifee.displayNotification({
     id: remoteMessage.messageId,
     title: remoteMessage.notification.title,
     body: remoteMessage.notification.body,
     
   });
}

export {
  requestUserPermissionNoti,
  getToken,
  subscribeForgroundNotification,
  makeLocalNotification,
};
