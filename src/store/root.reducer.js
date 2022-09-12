import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import createOTPRoot from '../reducers/createOTP.reducer'

export default combineReducers({
  
createOTPRoot
});
