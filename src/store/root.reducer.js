import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import createOTPRoot from '../reducers/createOTP.reducer';
import signUpRoot from '../reducers/signUp.reducer';
import getTailentRoot from '../reducers/getTailent.reducer';
import tailentProfileRoot from '../reducers/tailentProfileCreate.reducer';
import showAllPostRoot from '../reducers/showAllPost.reducer';
import getProfileDetailsRoot from '../reducers/getProfile.reducer';
import videoRateRoot from '../reducers/videoRating.reducer';
import uploadNewVideoRoot from '../reducers/uploadNewVideo.reducer';
import subGetPlanRoot from '../reducers/subGetPlan.reducer';
import connectedUserRoot from '../reducers/connectedUser.reducer';
import changeOwnerRoot from '../reducers/ownership.reducer';
import postFilterRoot from '../reducers/postFilter.reducer';
import notificationRoot from '../reducers/notification.reducer';
import boostPostRoot from '../reducers/boostPost.reducer';

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
videoRateRoot,
uploadNewVideoRoot,
subGetPlanRoot,
connectedUserRoot,
changeOwnerRoot,
postFilterRoot,
notificationRoot,
boostPostRoot

});
