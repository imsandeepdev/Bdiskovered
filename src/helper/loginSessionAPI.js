

import AsyncStorage from '@react-native-async-storage/async-storage';


export function LoginSessionAPI  () {



 AsyncStorage.getItem('fcmToken', (err, result) => {
    console.log('FCM TOKEN SESSION', result);
    
  });


}