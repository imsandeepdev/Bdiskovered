import * as React from 'react';
import {Platform} from 'react-native';
import Toast from 'react-native-simple-toast';

const CommonFunctions = {
  showToast: msg => {
    return Toast.show(msg, Toast.SHORT);
  },

  isFalse: (value, msg) => {
    if (value == false) {
      CommonFunctions.showToast(msg);
      return false;
    }
    return true;
  },

  isBlank: (value, msg) => {
    if (value == '') {
      CommonFunctions.showToast(msg);
      return false;
    }
    return true;
  },

  isUndefined: (value, msg) => {
    if (value == undefined) {
      CommonFunctions.showToast(msg);
      return false;
    }
    return true;
  },

  isEmailValid: (value, msg) => {
    let reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(value) === false) {
      CommonFunctions.showToast(msg);
      return false;
    } else return true;
  },
  isMobileValid: (value, msg) => {
    if (value.length.toString() < 10) {
      CommonFunctions.showToast(msg);
      return false;
    } else return true;
  },

  isCheckValidLength: (value,length,msg) => {
    if (value.length.toString() < length) {
      CommonFunctions.showToast(msg);
      return false;
    } else return true;
  },

  getDeviceType: () => {
    if (Platform.OS === 'ios') {
      return 'iOS';
    } else {
      return 'android';
    }
  },
};

export default CommonFunctions;
