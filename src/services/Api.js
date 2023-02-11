import {toggleLoader} from '../actions/common.action';

import {store} from '../store';
import {Config} from '../config';
import Toast from 'react-native-simple-toast';
import axios from 'axios';

const RequestPostFetch = ({url, body, datatype}) =>
  new Promise((resolve, reject) => {
    const headerAuth = {
      Accept: 'application/json',
      'Content-Type': datatype=='formdata' ? 'multipart/form-data' : 'application/x-www-form-urlencoded;charset=UTF-8',
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

    
  // const axiosbody = datatype == 'formdata' ? body : formBody;
  // console.log('Request params ==> ', requestUrl, 'BODY==>', axiosbody);
  // axios
  //   .post(requestUrl, axiosbody,{headers})
  //   .then(response => {
  //     console.log('RESPONSE ON API===>', response);
  //     let status = response.status == '200' ? 'success' : 'failed';
  //     if (status) {
  //       resolve(response.data);
  //     } else {
  //       Toast.show(response.message, Toast.SHORT);
  //       reject(response.data);
  //     }
  //   })
    fetch(requestUrl, config)
      .then(response => response.json())
      .then(responseJson => {
        console.log('RESPONSEJSON STATUS', responseJson.status);
        console.log('RESPONSEJSON', responseJson);

        if (responseJson.status == 'success') {
          resolve(responseJson);
        } else {
          Toast.show(responseJson.message, Toast.SHORT);
          reject(responseJson);
        }
      })
    .catch(error => {
      console.log('ERRORONAPI', error);
      Toast.show('Check Internet Connection', Toast.SHORT);
    });
  });


  const getRequest = ({url,  body}) =>
    new Promise((resolve, reject) => {
     
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      const config  = {
      method: 'GET',
      headers,
    };
      const requestUrl = Config.API_URL + url;
      console.log('Print ==> ', config, ' ==> ', requestUrl);
      fetch(requestUrl, config)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.status == 'success') {
            resolve(responseJson);
          } else {
            Toast.show(responseJson.message, Toast.SHORT);
            reject(responseJson);
          }
        })
        .catch(error => {
            console.log('ERRORONAPI', error);
            Toast.show('Check Internet Connection', Toast.SHORT);
        });
    });

    const MultiPostFetch = ({url, body, datatype }) =>
      new Promise((resolve, reject) => {
      
      const {
      auth: { authToken },
       } = store.getState();

       console.log('Authtoken On API', authToken)

        const headerAuth = {
          Accept: 'application/json',
          'Content-Type':
            datatype == 'formdata'
              ? 'multipart/form-data'
              : 'application/x-www-form-urlencoded;charset=UTF-8',
          token: authToken,
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
          body: datatype == 'formdata' ? body : formBody,
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
              Toast.show(responseJson.message, Toast.SHORT);
              reject(responseJson);
            }
          })
          .catch(error => {
            console.log('ERRORONAPI', error);
            Toast.show('Check Internet Connection', Toast.SHORT);
          });
      });

      const MultiGetRequest = ({url, body}) =>
        new Promise((resolve, reject) => {
          const {
            auth: {authToken},
          } = store.getState();
          const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': authToken
          };
          const config = {
            method: 'GET',
            headers,
          };
          const requestUrl = Config.API_URL + url;
          console.log('Print ==> ', config, ' ==> ', requestUrl);
          fetch(requestUrl, config)
            .then(response => response.json())
            .then(responseJson => {
              if (responseJson.status == 'success') {
                resolve(responseJson);
              } 
              else {
                Toast.show(responseJson.message, Toast.SHORT);
                reject(responseJson);
              }
            })
            .catch(error => {
              console.log('ERRORONAPI', error);
              Toast.show('Check Internet Connection', Toast.SHORT);
            });
        });

  const VideoPostFetch = ({url, body, datatype}) =>
    new Promise((resolve, reject) => {
      const {
        auth: {authToken},
      } = store.getState();

      console.log('Authtoken On API', authToken);

      const headerAuth = {
        Accept: 'application/json',
        'Content-Type':'multipart/form-data',
        token: authToken,
      };
      const headers = headerAuth;

    
      const config = {
        method: 'POST',
        headers,
        body: body,
      };
      const requestUrl = Config.API_URL + url;
      console.log(
        'Request params ==> ',
        requestUrl,
        'BODY==>',
        body,
        'CONFIG==>',
        config,
      );

      // axios.post(requestUrl, body, {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //     token: authToken,
      //   },
      // }).then(response => {
      //   console.log(response)
      // })
      fetch(requestUrl, config)
        .then(response => response.json())
        .then(responseJson => {
          console.log('RESPONSEJSON STATUS', responseJson.status);
          console.log('RESPONSEJSON', responseJson);

          if (responseJson.status == 'success') {
            resolve(responseJson);
          } else {
            Toast.show(responseJson.message, Toast.SHORT);
            reject(responseJson);
          }
        })
        .catch(error => {
          console.log('ERRORONAPI', error);
          Toast.show('Check Internet Connection', Toast.SHORT);
        });
    });

    const OnlyShowAllPostFetch = ({url, body, datatype}) =>
      new Promise((resolve, reject) => {
        const {
          auth: {authToken},
        } = store.getState();

        console.log('Authtoken On API', authToken);

        const headerAuth = {
          Accept: 'application/json',
          'Content-Type':
            datatype == 'formdata'
              ? 'multipart/form-data'
              : 'application/x-www-form-urlencoded;charset=UTF-8',
          token: authToken,
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
          body: datatype == 'formdata' ? body : formBody,
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

            resolve(responseJson);
          })
          .catch(error => {
            console.log('ERRORONAPI', error);
            Toast.show('Check Internet Connection', Toast.SHORT);
          });
      });

  export default {
    RequestPostFetch,
    getRequest,
    MultiPostFetch,
    MultiGetRequest,
    VideoPostFetch,
    OnlyShowAllPostFetch,
  };