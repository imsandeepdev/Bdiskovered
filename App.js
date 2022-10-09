import './ignoreWarnings';
import * as React from 'react';
import {useEffect} from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import { RequestLocationPermission } from './src/helper/locationServices';
// import { notificationListner } from './src/helper/notificationServices';


const App = () => {
  useEffect(()=>{
    RequestLocationPermission()
    // notificationListner()
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
