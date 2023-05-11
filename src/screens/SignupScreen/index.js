import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Modal,
  Alert
} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton, Header, CustomCardTextInput, CustomMaleFemale, CustomCardView, AlartModal } from '../../components';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import R from '../../res/R';
import Styles from './styles';
import axios from 'axios';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

import CountryPicker from 'react-native-country-picker-modal';
import {connect, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';



import DeviceInfo from 'react-native-device-info';
import { SignUpRequest } from '../../actions/signUp.action';
import { CreateOTPRequest } from '../../actions/createOTP.action';
import { Config } from '../../config';
import CommonFunctions from '../../utils/CommonFuntions';
import AsyncStorage from '@react-native-async-storage/async-storage';

let currYear = moment().subtract(16, 'years').calendar();
let maxDate =  moment(currYear).format('YYYY-MM-DD');

const SignupScreen = (props) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [userNameStatue, setUserNameStatus] = useState(false)
    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [userMailStatue, setUserMailStatus] = useState(false);
    const [eMail, setEMail] = useState('')
    const [userPhoneStatue, setUserPhoneStatus] = useState(false);
    const [mobNo, setMobNo] = useState('')
    const [dob, setDOB] = useState('Date of Birth')
    const [onGender, setOnGender] = useState('')
    const [calenderPicker, setCalenderPicker] = useState(false)
    const [deviceName, setDeviceName] = useState('')
    const [deviceId, setDeviceId] = useState('');
    const [userType, setUserType] = useState('')
    const [onFocusName, setOnFocusName] = useState('')

    const [companyName, setCompanyName] = useState('')
    const [companyType, setCompanyType] = useState('')   
    const [companytradeNo, setCompanyTradeNo] = useState('') 
    const [companyRegId, setCompanyRegId] = useState('')
    const [companyMailStatue, setCompanyMailStatus] = useState(false);
    const [companyMail, setCompanyMail] = useState('')
    const [companyPhoneStatue, setCompanyPhoneStatus] = useState(false);
    const [companyMob, setCompanyMob] = useState('')
    const [companyOwnerName, setCompanyOwnerName] = useState('')
    const [companyAddress, setCompanyAddress] = useState('');
    const [documentPic, setDocumentPic] = useState([])
    const [documentModalPicker, setDocumentModalPicker] = useState(false);
    const [countyModalPicker, setCountyModalPicker] = useState(false);
    const [countryCode, setCountryCode] = useState('971');
    const [countryFlag, setCountryFlag] = useState('ae');
    const [createDeviceToken, setCreateDeviceToken] = useState('')
    const [alartModalPicker, setAlartModalPicker] = useState(false)
    const [alartMessage, setAlartMessage] = useState('')
    const [myLat, setMyLat] = useState('');
    const [myLong, setMyLong] = useState('');

    useEffect(()=>{
        setLoading(true)
        onCallLatitudeLongitude()
        // onCallCreateDeviceToken()
        setCreateDeviceToken(props.route?.params?.device_token);
        setUserType(props.route?.params?.from);
        onCallDeviceInfo();
        setLoading(false)

    },[props.navigation])

  const onCallDeviceInfo = () =>{
        DeviceInfo.getDeviceName().then(deviceName => {
          setDeviceName(deviceName);
        });
        DeviceInfo.getUniqueId().then(uniqueId => {
         console.log("UNIQUEID",uniqueId)
         setDeviceId(uniqueId);
        });
        // var uniqueId = DeviceInfo.getUniqueId();
        // setDeviceId(uniqueId?._3);
  }

  const onCallLatitudeLongitude = async() => {
    // await AsyncStorage.getItem('userLatLong', (err, result) => {
    //   console.log('RESULT LONGITUDE', result);
    //   const myArray = result.split(',');
    //   console.log('Result1', myArray[0]);
    //   console.log('Result2', myArray[1]);
    //   setMyLat(myArray[0]);
    //   setMyLong(myArray[1]);
    // });

    let tempLat = await AsyncStorage.getItem('userLat')
      console.log('temp user LAT', tempLat);
      setMyLat(tempLat)
    let tempLong = await AsyncStorage.getItem('userLong');
     console.log('temp user LONG', tempLong);
     setMyLong(tempLong)

  };

  const onCallCreateDeviceToken = async() => {
      await AsyncStorage.getItem('fcmToken', (err, result) => {
      console.log('FCM TOKEN', result);
      if (result != null) {
        setCreateDeviceToken(result);
      } else {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charLength = characters.length;
        let result = ' ';
        for (let i = 0; i < 45; i++) {
          result += characters.charAt(Math.floor(Math.random() * charLength));
        }
        console.log('CUSTOM FCM TOKEN', result);
        onCallSetCustomFcmToken(result);
        setCreateDeviceToken(result);
      }
    });
    }

    const onCallSetCustomFcmToken = async result => {
      await AsyncStorage.setItem('fcmToken', result);
    };

    const onDateChange = (date) => {
      console.log(date)
      let dateFormat = moment(date).format('YYYY-MM-DD')
      console.log("DATE",dateFormat)
      setDOB(dateFormat)
      setCalenderPicker(false)
    }

    const onCheckVerifyAPI = (value, verifyAPI) => {
      
      let data = value
      console.log('CONFIG DATA', data);
      console.log('URL', `${Config.API_URL}${verifyAPI}`);

      axios({
        method: 'POST',
        url: `${Config.API_URL}${verifyAPI}`,
        data: value,
      }).then(res => {
        console.log('RESPONSE', res);
        if (res.data.status == 'success') {
          onFocusName == 'fullName' && setUserNameStatus(true);
          onFocusName == 'userPhone' && setUserMailStatus(true);
          onFocusName == 'userDOB' && setUserPhoneStatus(true);
          onFocusName == 'companyPhone' && setCompanyMailStatus(true);
          onFocusName == 'companyAddress' && setCompanyPhoneStatus(true);
        } else {
          setAlartMessage(res.data.message);
          setAlartModalPicker(true)
          onFocusName == 'fullName' && setUserNameStatus(false);
          onFocusName == 'userPhone' && setUserMailStatus(false);
          onFocusName == 'userDOB' && setUserPhoneStatus(false);
          onFocusName == 'companyPhone' && setCompanyMailStatus(false);
          onFocusName == 'companyAddress' && setCompanyPhoneStatus(false);
        }
      })
      .catch((err)=>{
        console.log('Error', err)
        Toast.show('Please Connect Internet',Toast.SHORT)
      })
    };

    
//  For Tailent and Viewer
    const onCallSetUserNameValue = (value) => {
      setUserName(value);
    }

    const onFocusFullName = (fullName) => {
        setOnFocusName('fullName');
        let userVerifyAPI = Config.verifyUsernameAPI;
        let data = {
          username: userName,
        };
        onCheckVerifyAPI(data, userVerifyAPI);
    }

    const onCallSetFullName = (value) => {
      if(value.length ==1)
      {
        let userVerifyAPI = Config.verifyUsernameAPI;
        let data = {
          username: userName,
        };
        onCheckVerifyAPI(data, userVerifyAPI);
      } 
      setFullName(value);

    }

    const onCallSetUserEmailValue = value => {
      setEMail(value);
    };

    const onFocusPhoneNumber = fullName => {
      setOnFocusName('userPhone');
      let userVerifyAPI = Config.verifyEmailAPI;
      let data = {
        email: eMail
      };
      onCheckVerifyAPI(data, userVerifyAPI);
    };

    const onCallSetUserPhoneValue = value => {
      console.log("Length",value.length)
      if(value.length ==1)
      {
        let userVerifyAPI = Config.verifyEmailAPI;
        let data = {
          email: eMail,
        };
        onCheckVerifyAPI(data, userVerifyAPI);
      }
      setMobNo(value);
      if(value.length >8)
      {
       setOnFocusName('userDOB');
       let phoneVerifyAPI = Config.verifyMobileAPI;
       let data = {
         mobile: `+${countryCode}${value}`,
       };
       onCheckVerifyAPI(data, phoneVerifyAPI); 
      }
    };

    const onCallCalenderPicker = () => {
      setCalenderPicker(!calenderPicker);
    }

   
    const onCallSetCompanyEmailValue = value => {
      // console.log('On Focus', onFocusName);
      // let mailVerifyAPI = Config.verifyEmailAPI;
      // let data = {
      //   email: value,
      // };
      setCompanyMail(value);
      // value.length > 5
      //   ? onCheckVerifyAPI(data, mailVerifyAPI)
      //   : setCompanyMailStatus(false);
    };

    const onCallSetFocusComPhone = () =>{
       setOnFocusName('companyPhone');
      let mailVerifyAPI = Config.verifyEmailAPI;
       let data = {
         email: companyMail,
       };
       onCheckVerifyAPI(data, mailVerifyAPI);
    }

    const onCallSetCompanyPhoneValue = value => {
      setCompanyMob(value);
      let mailVerifyAPI = Config.verifyEmailAPI;
      let data = {
        email: companyMail,
      };
      if(value.length == 1)
      {
       onCheckVerifyAPI(data, mailVerifyAPI);
      }
    };

    const onCallSetFocusComAdd = () => {
      setOnFocusName('companyAddress')
      let phoneVerifyAPI = Config.verifyMobileAPI;
      let data = {
        mobile: `+${countryCode}${companyMob}`,
      };
       onCheckVerifyAPI(data, phoneVerifyAPI);
    }

    const onCallSetComAddress = (value) => {
      setCompanyAddress(value);
      let phoneVerifyAPI = Config.verifyMobileAPI;
      let data = {
        mobile: `+${countryCode}${companyMob}`,
      };
      if (value.length == 1) 
      {
        onCheckVerifyAPI(data, phoneVerifyAPI);
      }
    }

const isTailentViewerDetailsValid = () => {
  return (
    CommonFunctions.isBlank(userName.trim(), 'Please Enter Valid User Name') &&
    onCheckUserName()&&
    CommonFunctions.isFalse(
      userNameStatue,
      'Please Enter Valid User Name Status',
    ) &&
    CommonFunctions.isBlank(fullName.trim(), 'Please Enter Valid Full Name') &&
    CommonFunctions.isBlank(eMail.trim(), 'Please Enter Email') &&
    CommonFunctions.isFalse(
      userMailStatue,
      'Please Enter Valid Email Id Status',
    ) &&
    CommonFunctions.isEmailValid(eMail.trim(), 'Please Enter Valid Email Id') &&
    CommonFunctions.isBlank(mobNo.trim(), 'Please Enter Mobile No') &&
    CommonFunctions.isFalse(
      userPhoneStatue,
      'Please Enter Valid Mobile No Status',
    ) &&
    onCheckDOB() &&
    CommonFunctions.isBlank(onGender.trim(), 'Please Select Your Gender')
  );
};

const onCheckUserName = () => {
  if (userName.length <= 5) {
    Toast.show('Enter more then 5 charter of username', Toast.SHORT);
    return false;
  }
  return true;
};

const onCheckDOB = () => {
  if(dob == 'Date of Birth')
  {
    Toast.show('Please Select Your Valid Date of Birth',Toast.SHORT);
    return false;
  }
  return true;
}

const isBusinessSignUpDetailsValid = () => {
    return (
      CommonFunctions.isBlank(
        companyName.trim(),
        'Please Enter Valid Company Name',
      ) &&
      CommonFunctions.isBlank(
        companyType.trim(),
        'Please Enter Valid Company Type',
      ) &&
      CommonFunctions.isBlank(
        companytradeNo.trim(),
        'Please Enter Valid Company Trade Licence Number',
      ) &&
      CommonFunctions.isBlank(
        companyRegId.trim(),
        'Please Enter Valid Company Registration Id',
      ) &&
      CommonFunctions.isBlank(companyMail.trim(), 'Please Enter Email') &&
      CommonFunctions.isEmailValid(
        companyMail.trim(),
        'Please Enter Valid Email Id',
      ) &&
      CommonFunctions.isBlank(companyMob.trim(), 'Please Enter Mobile No') &&
      CommonFunctions.isBlank(
        companyOwnerName.trim(),
        'Please Enter Company Owner Name',
      ) &&
      onCheckDocument() 
    );
}





 const onCheckLicenceRegistrationAPI = () => {
  
   let LicenceRegAPI = Config.verifyUsernameAPI;
   let data = {
     license_number: companytradeNo,
     company_registration_id: companyRegId,
     user_type: 'Business',
   };

  axios({
     method: 'POST',
     url: `${Config.API_URL}${LicenceRegAPI}`,
     data: data,
   })
     .then(res => {
       if (res.data.status == 'success') 
       {
         onCallForBusinessCreateOTP();
       }
       else
       {
        Toast.show(res.data?.message, Toast.SHORT);
       }
     })
    
 };




const onCheckDocument = () => {
  if(documentPic.length == 0)
  {
    Toast.show('Please Upload Valid Document Image File',Toast.SHORT);
    return false;
  }
  return true;
}


    const onCallSignUpAPI = () => {
      if (props.route.params?.from == 'Business')
      {
        if (isBusinessSignUpDetailsValid()) {
          onCheckLicenceRegistrationAPI();
          
          console.log('FOR BUSINESS');
        }
      }
      else
      {
        if (isTailentViewerDetailsValid()) {
          onCallForTailentViewerCreateOTP();
        }
      }
    }

    const onCallForBusinessCreateOTP = () => {
  
      let signUpData = {
        device_token: createDeviceToken,
        email: companyMail,
        device_ip: deviceId,
        user_type: userType,
        company_name: companyName,
        company_type: companyType,
        license_number: companytradeNo,
        company_registration_id: companyRegId,
        owner_name: companyOwnerName,
        company_address: companyAddress,
        document: documentPic,
        latitude: myLat != ''? myLat : '0.00',
        longitude: myLong != ''? myLong : '0.00'
      };

      let data = {
        mobile: `+${countryCode}${companyMob}`,
        number_available: '0',
        device_token: createDeviceToken,
      };
       dispatch(
         CreateOTPRequest(data, response => {
           console.log('RESPONSE', response);
           if(response.status == 'success')
           {
              props.navigation.navigate('OtpScreen', {
                signupValue: signUpData,
                countryCode: countryCode,
                mobValue: companyMob,
                fromScreen: 'SignUpScreen',
                userTypeVerify: 'Company',
                userType: props.route.params?.from,
                deviceToken: createDeviceToken,
                otpValue: response?.OTP,
              });
            // Toast.show(response?.OTP, Toast.SHORT);
              
           }
           else
           {
            Toast.show(response?.message, Toast.SHORT);
           }
         })
       )
    }


     const onCallForTailentViewerCreateOTP = () => {
       let signupData = {
         username: userName,
         gender: onGender,
         birth: dob,
         email: eMail,
         name: fullName,
         device_token: createDeviceToken,
         device_ip: deviceId,
         user_type: userType,
         device_name: deviceName,
         latitude: myLat != '' ? myLat : '0.00',
         longitude: myLong != '' ? myLong : '0.00',
       };
       let data = {
         mobile: `+${countryCode}${mobNo}`,
         number_available: '0',
         device_token: createDeviceToken,
       };
       dispatch(
         CreateOTPRequest(data, response => {
           console.log('RESPONSE', response);
           if(response?.status == 'success')
           {
            props.navigation.navigate('OtpScreen', {
              signupValue: signupData,
              countryCode: countryCode,
              mobValue: mobNo,
              fromScreen: 'SignUpScreen',
              userTypeVerify: 'tailentViewer',
              userType: props.route.params?.from,
              deviceToken: createDeviceToken,
              otpValue: response?.OTP,
            });
            // Toast.show(response?.OTP, Toast.SHORT);
           }
           else
           {
            Toast.show(response?.message, Toast.SHORT);
           }
          
         }),
       );
     };

    const handleFilePicker = () => {
      setDocumentModalPicker(true)
    };

    const onSelectPicker = params => {
    if (params == 'camera') {
      ImagePicker.openCamera({
        // width: 400,
        // height: 400,
        cropping: true,
      }).then(image => {
        console.log("IMAGE",image)
        setDocumentPic(image);
        setDocumentModalPicker(false);
      });
    } else if (params == 'gallery') {
      ImagePicker.openPicker({
        // width: 400,
        // height: 400,
        cropping: true,
      }).then(image => {
        console.log('IMAGE', image);
        setDocumentPic(image);
        setDocumentModalPicker(false);
      });
    }
  }


    return (
      <StoryScreen loading={loading}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
          />

          <View style={{flex: 1}}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View style={{flex: 1}}>
                    <View
                      style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
                      <View style={{marginTop: R.fontSize.Size50}}>
                        <Text style={Styles.detailsText}>
                          {props.route.params?.from != 'Business'
                            ? 'User Details'
                            : 'Business Details'}
                        </Text>
                        <Text style={Styles.titleDetailText}>
                          {props.route.params?.from != 'Business'
                            ? 'Enter Your Details'
                            : 'Enter Company Details'}
                        </Text>
                      </View>
                      <View>
                        {props.route.params?.from != 'Business' ? (
                          <View style={{marginTop: R.fontSize.Size30}}>
                            <CustomCardTextInput
                              value={userName}
                              onChangeText={username =>
                                onCallSetUserNameValue(username)
                              }
                              placeholder={'User Name'}
                              rightIcon={
                                userNameStatue
                                  ? R.images.checkOrangeIcon
                                  : R.images.checkGreyIcon
                              }
                              onFocus={() => setOnFocusName('userName')}
                            />
                            <CustomCardTextInput
                              value={fullName}
                              onChangeText={fname => onCallSetFullName(fname)}
                              placeholder={'Full Name'}
                              onFocus={fullName => onFocusFullName(fullName)}
                            />
                            <CustomCardTextInput
                              value={eMail}
                              onChangeText={mail =>
                                onCallSetUserEmailValue(mail)
                              }
                              placeholder={'Email'}
                              rightIcon={
                                userMailStatue
                                  ? R.images.checkOrangeIcon
                                  : R.images.checkGreyIcon
                              }
                              // onFocus={() => setOnFocusName('userEmail')}
                            />
                            <CustomTextInput
                              onChangeCounty={() => setCountyModalPicker(true)}
                              countryFlag={
                                countryFlag != '' ? countryFlag : 'ae'
                              }
                              countryCode={
                                countryCode != '' ? `+${countryCode}` : '971'
                              }
                              maxLength={10}
                              placeholder={'Mobile No'}
                              value={mobNo}
                              onChangeText={no => onCallSetUserPhoneValue(no)}
                              marginBottom={R.fontSize.Size20}
                              rightIcon={
                                userPhoneStatue
                                  ? R.images.checkOrangeIcon
                                  : R.images.checkGreyIcon
                              }
                              onFocus={userPhone =>
                                onFocusPhoneNumber(userPhone)
                              }
                            />

                            <CustomCardView
                              onPress={() => onCallCalenderPicker()}
                              title={dob}
                              TextColor={
                                dob == 'Date of Birth'
                                  ? R.colors.placeholderTextColor
                                  : R.colors.primaryTextColor
                              }
                            />

                            <CustomMaleFemale
                              maleOnPress={() => setOnGender('Male')}
                              maleIcon={
                                onGender == 'Male'
                                  ? R.images.activeMaleIcon
                                  : R.images.inactiveMaleIcon
                              }
                              maleTextColor={
                                onGender == 'Male'
                                  ? R.colors.appColor
                                  : R.colors.placeholderTextColor
                              }
                              feMaleOnPress={() => setOnGender('Female')}
                              feMaleIcon={
                                onGender == 'Female'
                                  ? R.images.activeFemaleIcon
                                  : R.images.inactiveFemaleIcon
                              }
                              feMaleTextColor={
                                onGender == 'Female'
                                  ? R.colors.appColor
                                  : R.colors.placeholderTextColor
                              }
                            />
                          </View>
                        ) : (
                          <View style={{marginTop: R.fontSize.Size30}}>
                            <CustomCardTextInput
                              value={companyName}
                              onChangeText={cname => setCompanyName(cname)}
                              placeholder={'Company Name'}
                            />
                            <CustomCardTextInput
                              value={companyType}
                              onChangeText={ctype => setCompanyType(ctype)}
                              placeholder={'Company Type'}
                            />
                            <CustomCardTextInput
                              value={companytradeNo}
                              onChangeText={ctradeNo =>
                                setCompanyTradeNo(ctradeNo)
                              }
                              placeholder={'Trade License Number'}
                            />
                            <CustomCardTextInput
                              value={companyRegId}
                              onChangeText={cRegId => setCompanyRegId(cRegId)}
                              placeholder={'Company Registration Id'}
                            />
                            <CustomCardTextInput
                              value={companyMail}
                              onChangeText={email =>
                                onCallSetCompanyEmailValue(email)
                              }
                              placeholder={'Company Email Address'}
                              // onFocus={() => setOnFocusName('companyMail')}
                              rightIcon={
                                companyMailStatue
                                  ? R.images.checkOrangeIcon
                                  : R.images.checkGreyIcon
                              }
                            />
                            <CustomTextInput
                              onChangeCounty={() => setCountyModalPicker(true)}
                              countryFlag={
                                countryFlag != '' ? countryFlag : 'ae'
                              }
                              countryCode={
                                countryCode != '' ? `+ ${countryCode}` : '971'
                              }
                              maxLength={10}
                              placeholder={'Mobile No'}
                              value={companyMob}
                              onChangeText={mobno =>
                                onCallSetCompanyPhoneValue(mobno)
                              }
                              marginBottom={R.fontSize.Size20}
                              rightIcon={
                                companyPhoneStatue
                                  ? R.images.checkOrangeIcon
                                  : R.images.checkGreyIcon
                              }
                              onFocus={() => onCallSetFocusComPhone()}
                            />

                            <CustomCardTextInput
                              value={companyAddress}
                              onChangeText={comAddress =>
                                onCallSetComAddress(comAddress)
                              }
                              placeholder={'Company Address'}
                              onFocus={() => onCallSetFocusComAdd()}
                            />

                            <CustomCardTextInput
                              value={companyOwnerName}
                              onChangeText={ownerName =>
                                setCompanyOwnerName(ownerName)
                              }
                              placeholder={'Owner Name'}
                            />
                            <CustomCardView
                              onPress={() => handleFilePicker()}
                              title={
                                documentPic.length == 0
                                  ? 'Upload Trade / Commercial License'
                                  : `${documentPic?.filename}`
                              }
                              TextColor={R.colors.placeholderTextColor}
                              rightIcon={R.images.uploadIcon}
                              marginBottom={R.fontSize.Size4}
                            />
                            <View>
                              {documentPic.path != null && (
                                <Image
                                  source={{uri: documentPic.path}}
                                  style={{width: '100%', height: screenWidth}}
                                  resizeMode={'contain'}
                                />
                              )}
                            </View>
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={{paddingVertical: R.fontSize.Size16}}>
                      <AppButton
                        onPress={() => onCallSignUpAPI()}
                        marginHorizontal={R.fontSize.Size55}
                        title={'Proceed'}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
        <Modal
          visible={calenderPicker}
          transparent={true}
          onRequestClose={() => setCalenderPicker(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.modelBackground,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                height: screenHeight / 2,
                backgroundColor: R.colors.white,
                borderTopLeftRadius: R.fontSize.Size8,
                borderTopRightRadius: R.fontSize.Size8,
                paddingVertical: R.fontSize.Size15,
              }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  marginHorizontal: R.fontSize.Size20,
                  marginBottom: R.fontSize.Size10,
                }}>
                <Pressable
                  onPress={() => setCalenderPicker(false)}
                  style={({pressed}) => [
                    {
                      padding: R.fontSize.Size6,
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}>
                  <Image
                    source={R.images.cancleIcon}
                    style={{
                      height: R.fontSize.Size10,
                      width: R.fontSize.Size10,
                    }}
                    resizeMode={'contain'}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: R.fontSize.Size20,
                }}>
                <CalendarPicker
                  startFromMonday={true}
                  onDateChange={onDateChange}
                  selectedDayColor={R.colors.appColor}
                  todayBackgroundColor={R.colors.appColor}
                  todayTextStyle={{color: R.colors.white, fontWeight: '700'}}
                  minDate={new Date('1920-01-01')}
                  initialDate={maxDate}
                  maxDate={maxDate}
                  textStyle={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.primaryTextColor,
                    fontSize: R.fontSize.Size12,
                    fontWeight: '400',
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        {countyModalPicker && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}>
            <CountryPicker
              visible={countyModalPicker}
              withFilter={true}
              withFlag={true}
              withCallingCode={true}
              onClose={close => {
                console.log('CLOSED', close);
                setCountyModalPicker(false);
              }}
              onSelect={country => {
                console.log(country);
                setCountyModalPicker(false);
                setCountryCode(country?.callingCode[0]);
                let flagName = (country?.flag).slice(5);
                setCountryFlag(country?.cca2);
                console.log('FlagName', flagName);
              }}
            />
          </View>
        )}
        <Modal
          visible={documentModalPicker}
          transparent={true}
          onRequestClose={() => setDocumentModalPicker(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.modelBackground,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                paddingVertical: R.fontSize.Size25,
                paddingHorizontal: R.fontSize.Size20,
                backgroundColor: R.colors.white,
                paddingBottom: R.fontSize.Size20,
              }}>
              <View
                style={{alignItems: 'center', marginBottom: R.fontSize.Size5}}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    color: R.colors.primaryTextColor,
                    fontWeight: '700',
                  }}>
                  {'Select Image From Camera / Gallery'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: R.fontSize.Size10,
                }}>
                <Pressable
                  onPress={() => onSelectPicker('gallery')}
                  style={({pressed}) => [
                    {
                      width: R.fontSize.Size140,
                      height: R.fontSize.Size45,
                      borderRadius: R.fontSize.Size4,
                      opacity: pressed ? 0.5 : 1,
                      backgroundColor: R.colors.appColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: R.fontSize.Size20,
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      color: R.colors.white,
                      fontSize: R.fontSize.Size14,
                      fontWeight: '700',
                    }}>
                    {'Gallery'}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onSelectPicker('camera')}
                  style={({pressed}) => [
                    {
                      width: R.fontSize.Size140,
                      height: R.fontSize.Size45,
                      borderRadius: R.fontSize.Size4,
                      opacity: pressed ? 0.5 : 1,
                      backgroundColor: R.colors.appColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: R.fontSize.Size20,
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      color: R.colors.white,
                      fontSize: R.fontSize.Size14,
                      fontWeight: '700',
                    }}>
                    {'Camera'}
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginBottom: R.fontSize.Size30,
                  marginTop: R.fontSize.Size10,
                }}>
                <Pressable
                  onPress={() => setDocumentModalPicker(false)}
                  style={({pressed}) => [
                    {
                      width: R.fontSize.Size320,
                      height: R.fontSize.Size45,
                      borderRadius: R.fontSize.Size4,
                      opacity: pressed ? 0.5 : 1,
                      borderWidth: 1,
                      borderColor: R.colors.appColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: R.fontSize.Size20,
                    },
                  ]}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      color: R.colors.appColor,
                      fontSize: R.fontSize.Size14,
                      fontWeight: '700',
                    }}>
                    {'Cancel'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <AlartModal
          visible={alartModalPicker}
          onRequestClose={() => setAlartModalPicker(false)}
          title={alartMessage}
          onPress={() => setAlartModalPicker(false)}
        />
      </StoryScreen>
    );
}
export default SignupScreen