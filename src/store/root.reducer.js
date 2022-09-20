import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import createOTPRoot from '../reducers/createOTP.reducer';
import signUpRoot from '../reducers/signUp.reducer';
import getTailentRoot from '../reducers/getTailent.reducer';
import tailentProfileRoot from '../reducers/tailentProfileCreate.reducer';
import showAllPostRoot from '../reducers/showAllPost.reducer';
import getProfileDetailsRoot from '../reducers/getProfile.reducer';

const authPersistConfig = {
  storage: AsyncStorage,
  key: 'auth',
};

export default combineReducers({
  
createOTPRoot,
auth: persistReducer(authPersistConfig,signUpRoot),
getTailentRoot,
tailentProfileRoot,
showAllPostRoot,
getProfileDetailsRoot,

});
