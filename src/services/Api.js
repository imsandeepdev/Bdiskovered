import {toggleLoader} from '../actions/common.action';

import {store} from '../store';
import {Config} from '../config';
import Toast from 'react-native-simple-toast';


const RequestPostFetch = ({url, body, datatype}) =>
  new Promise((resolve, reject) => {
    const headerAuth = {
      Accept: 'application/json',
      'Content-Type': datatype=='formdata' ? 'multipart/form-data' : 'application/x-www-form-urlencoded;charset=UTF-8',
      // 'Content-Type':  datatype=='formdata' && 'multipart/form-data',
    };
    const headers = headerAuth;

    var formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const config = {
      method: 'POST',
      headers,
      body: datatype=='formdata' ? body : formBody,
    };
    const requestUrl = Config.API_URL + url;

    console.log(
      'Request params ==> ',
      requestUrl,
      'BODY==>',
      formBody,
      'CONFIG==>',
      config,
    );

    fetch(requestUrl, config)
      .then(response => response.json())
      .then(responseJson => {
        console.log('RESPONSEJSON STATUS', responseJson.status);
        console.log('RESPONSEJSON', responseJson);

        if (responseJson.status == 'success') {
          resolve(responseJson);
        } else {
          Toast.show(responseJson.Message, Toast.SHORT);
          reject(responseJson);
        }
      })
      .catch(error => {
        reject(error);
        console.log('ERRORONAPI', error);
        Toast.show('Check Internet Connection', Toast.SHORT);
      });
  });


  export default {
    RequestPostFetch,
  };