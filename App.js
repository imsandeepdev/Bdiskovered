
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppNavigator from './src/navigator/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import TalentScreen from './src/screens/TalentScreen';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';




const App = () => {
  

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <AppNavigator />
          {/* </PersistGate> */}
        </Provider>
     
  );
};



export default App;
