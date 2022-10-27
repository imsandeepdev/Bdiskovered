import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Modal,
  Alert
} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton, Header, CustomCardTextInput, CustomMaleFemale, CustomCardView } from '../../components';
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
import FilePicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';




import DeviceInfo from 'react-native-device-info';
import { SignUpRequest } from '../../actions/signUp.action';
import { CreateOTPRequest } from '../../actions/createOTP.action';
import { Config } from '../../config';
import CommonFunctions from '../../utils/CommonFuntions';



const SignupScreen = (props) => {

    const RegisterType = 'Business'
    const dispatch = useDispatch()
    
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

    const [companyUserNameStatue, setCompanyUserNameStatus] = useState(false);
    const [companyName, setCompanyName] = useState('')
    const [companyType, setCompanyType] = useState('')   
    const [companytradeNo, setCompanyTradeNo] = useState('') 
    const [companyRegId, setCompanyRegId] = useState('')
    const [companyMailStatue, setCompanyMailStatus] = useState(false);
    const [companyMail, setCompanyMail] = useState('')
    const [companyPhoneStatue, setCompanyPhoneStatus] = useState(false);
    const [companyMob, setCompanyMob] = useState('')
    const [companyOwnerName, setCompanyOwnerName] = useState('')

    const [documentPic, setDocumentPic] = useState([])
    const [documentModalPicker, setDocumentModalPicker] = useState(false);
    const [countyModalPicker, setCountyModalPicker] = useState(false);
    const [countryCode, setCountryCode] = useState('971');
    const [countryFlag, setCountryFlag] = useState('ae');

    const [createDeviceToken, setCreateDeviceToken] = useState('')

    useEffect(()=>{
        onCallCreateDeviceToken()
        console.log(props.route.params?.from);
        setUserType(props.route.params?.from);
        DeviceInfo.getDeviceName().then(deviceName => {
            setDeviceName(deviceName);
            console.log('DEVICE NAME', deviceName);
        });
        var uniqueId = DeviceInfo.getUniqueId();
        setDeviceId(uniqueId?._3);
        console.log('DEVICE ID',uniqueId?._3);

    },[props.navigation])

    const onCallCreateDeviceToken = () => {
      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const charLength = characters.length;
      let result = ' ';
      for (let i = 0; i < 45; i++) {
        result += characters.charAt(Math.floor(Math.random() * charLength));
      }
      setCreateDeviceToken(result)
    }

    const onDateChange = (date) => {
      // setDOB(date)
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
          onFocusName == 'userName' && setUserNameStatus(true);
          onFocusName == 'userEmail' && setUserMailStatus(true);
          onFocusName == 'userPhone' && setUserPhoneStatus(true);
          onFocusName == 'companyUserName' && setCompanyUserNameStatus(true);
          onFocusName == 'companyMail' && setCompanyMailStatus(true);
          onFocusName == 'companyPhone' && setCompanyPhoneStatus(true);
        } else {
          Toast.show(res.data.message, Toast.SHORT);
          onFocusName == 'userName' && setUserNameStatus(false);
          onFocusName == 'userEmail' && setUserMailStatus(false);
          onFocusName == 'userPhone' && setUserPhoneStatus(false);
          onFocusName == 'companyUserName' && setCompanyUserNameStatus(false);
          onFocusName == 'companyMail' && setCompanyMailStatus(false);
          onFocusName == 'companyPhone' && setCompanyPhoneStatus(false);
        }
      })
      .catch((err)=>{
        console.log('Error', err)
        Toast.show('Please Connect Internet',Toast.SHORT)
      })
      ;

      // fetch(`${Config.API_URL}${verifyAPI}`, config)
      //   .then(res => res.json())
      //   .then(response => {
      //     console.log('Check User Name Response', response);
      //     if (response.status == 'success') {
      //       onFocusName == 'userName' && setUserNameStatus(true);
      //       onFocusName == 'userEmail' && setUserMailStatus(true);
      //       onFocusName == 'userPhone' && setUserPhoneStatus(true);
      //       onFocusName == 'companyUserName' && setCompanyUserNameStatus(true);
      //       onFocusName == 'companyMail' && setCompanyMailStatus(true);
      //       onFocusName == 'companyPhone' && setCompanyPhoneStatus(true);
      //     }
      //     else
      //     {
      //        onFocusName == 'userName' && setUserNameStatus(false);
      //        onFocusName == 'userEmail' && setUserMailStatus(false);
      //        onFocusName == 'userPhone' && setUserPhoneStatus(false);
      //        onFocusName == 'companyUserName' && setCompanyUserNameStatus(false);
      //        onFocusName == 'companyMail' && setCompanyMailStatus(false);
      //        onFocusName == 'companyPhone' && setCompanyPhoneStatus(false);
      //     }
      //   });
    };

    
//  For Tailent and Viewer
    const onCallSetUserNameValue = (value) => {
      console.log('On Focus', onFocusName)
      let userVerifyAPI = Config.verifyUsernameAPI  
      let data = {
        username:value
      }
      setUserName(value);
      value.length > 2
        ? onCheckVerifyAPI(data, userVerifyAPI)
        : setUserNameStatus(false);
    }

    const onCallSetUserEmailValue = value => {
      console.log('On Focus', onFocusName);
      let mailVerifyAPI = Config.verifyEmailAPI;
      let data = {
        email: value,
      };
      setEMail(value);
      (value.length > 5)
        ? onCheckVerifyAPI(data, mailVerifyAPI)
        : setUserMailStatus(false);
    };

    const onCallSetUserPhoneValue = value => {
      console.log('On Focus', onFocusName);
      let phoneVerifyAPI = Config.verifyMobileAPI;
       let data = {
         mobile: `+${countryCode}${value}`,
       };
      setMobNo(value);
      value.length >= 9
        ? onCheckVerifyAPI(data, phoneVerifyAPI)
        : setUserPhoneStatus(false);
    };

    // For Business 

    const onCallSetCompanyUserNameValue = value => {
      console.log('On Focus', onFocusName);
      let userVerifyAPI = Config.verifyUsernameAPI;
      let data = {
        username: value,
      };
      setCompanyName(value);
      value.length > 2
        ? onCheckVerifyAPI(data, userVerifyAPI)
        : setCompanyUserNameStatus(false);
    };

    const onCallSetCompanyEmailValue = value => {
      console.log('On Focus', onFocusName);
      let mailVerifyAPI = Config.verifyEmailAPI;
      let data = {
        email: value,
      };
      setCompanyMail(value);
      value.length > 5
        ? onCheckVerifyAPI(data, mailVerifyAPI)
        : setCompanyMailStatus(false);
    };

    const onCallSetCompanyPhoneValue = value => {
      console.log('On Focus', onFocusName);
      let phoneVerifyAPI = Config.verifyMobileAPI;
      let data = {
        mobile: `+${countryCode}${value}`,
      };
      setCompanyMob(value);
      value.length >= 9
        ? onCheckVerifyAPI(data, phoneVerifyAPI)
        : setCompanyPhoneStatus(false);
    };

const isTailentViewerDetailsValid = () => {
  return (
    CommonFunctions.isBlank(userName.trim(), 'Please Enter Valid User Name') &&
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
      CommonFunctions.isBlank(companyOwnerName.trim(), 'Please Enter Company Owner Name') &&
      onCheckDocument()
    );
}

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
          onCallForBusinessCreateOTP();
          console.log("FOR BUSINESS")
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
        company_address: '',
        document: documentPic,
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
              });
            Toast.show(response?.OTP, Toast.LONG);
            Alert.alert(response?.OTP);
              
           }
           else
           {
            Toast.show(response?.message, Toast.SHORT);
           }
         })
       )
    }

    // const onCallBusinessSignUpAPI = () => {
    //   let data = {
    //     device_token: '2wewe',
    //     email: companyMail,
    //     device_ip: deviceId,
    //     user_type: userType,
    //     company_name: companyName,
    //     company_type: companyType,
    //     license_number: companytradeNo,
    //     company_registration_id: companyRegId,
    //     owner_name: companyOwnerName,
    //     company_address: '',
    //     document: '',
    //   };

    //   console.log('DATA',data)

    // }

    //  const onCallUserTailentSignUpAPI = () => {
    //    let data = {
    //      username: userName,
    //      gender: onGender,
    //      birth: dob,
    //      email: eMail,
    //      name: fullName,
    //      device_token: 'jkjk22',
    //      device_ip: deviceId,
    //      user_type: userType,
    //      device_name: deviceName,
    //    };

    //   console.log('DATA', data);
    //   dispatch(SignUpRequest(data, response =>{
    //     console.log('RESPONSE', response)
    //   }))
      

    //  };


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
            });
            Toast.show(response?.OTP, Toast.LONG);
            Alert.alert(response?.OTP);
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

    //  const handleFilePicker = async() => {
    //     try{
    //       await FilePicker.pick({
    //         presentationStyle: 'fullScreen'
    //       })
    //     }
    //     catch(err) {
    //       console.log('ErrorFilePicker', err)
    //     }
    //  }

    return (
      <StoryScreen>
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
                              onChangeText={fname => setFullName(fname)}
                              placeholder={'Full Name'}
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
                              onFocus={() => setOnFocusName('userEmail')}
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
                              onFocus={() => setOnFocusName('userPhone')}
                            />

                            <CustomCardView
                              onPress={() => setCalenderPicker(!calenderPicker)}
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
                              onChangeText={cname =>
                                onCallSetCompanyUserNameValue(cname)
                              }
                              placeholder={'Company Name'}
                              onFocus={() => setOnFocusName('companyUserName')}
                              rightIcon={
                                companyUserNameStatue
                                  ? R.images.checkOrangeIcon
                                  : R.images.checkGreyIcon
                              }
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
                              onFocus={() => setOnFocusName('companyMail')}
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
                              onFocus={() => setOnFocusName('companyPhone')}
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
          {/* <View style={{paddingVertical: R.fontSize.Size16}}>
            <AppButton
              onPress={() => onCallSignUpAPI()}
              marginHorizontal={R.fontSize.Size55}
              title={'Proceed'}
            />
          </View> */}
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
                  minDate={new Date('1920,1,1')}
                  maxDate={new Date(moment().format('YYYY,MM,DD'))}
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
      </StoryScreen>
    );
}
export default SignupScreen