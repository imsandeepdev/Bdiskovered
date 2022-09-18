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
  Modal
} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton, Header, CustomCardTextInput, CustomMaleFemale, CustomCardView } from '../../components';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import R from '../../res/R';
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;
import CountryPicker from 'react-native-country-picker-modal';
import {connect, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker';



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


    const [companyName, setCompanyName] = useState('')
    const [companyType, setCompanyType] = useState('')   
    const [companytradeNo, setCompanyTradeNo] = useState('') 
    const [companyRegId, setCompanyRegId] = useState('')
    const [companyMail, setCompanyMail] = useState('')
    const [companyMob, setCompanyMob] = useState('')
    const [companyOwnerName, setCompanyOwnerName] = useState('')

    const [countyModalPicker, setCountyModalPicker] = useState(false);
    const [countryCode, setCountryCode] = useState('91');
    const [countryFlag, setCountryFlag] = useState('');

    useEffect(()=>{
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

    const onDateChange = (date) => {
      // setDOB(date)
      console.log(date)
      let dateFormat = moment(date).format('L')
      setDOB(dateFormat)
      setCalenderPicker(false)
    }

    const onCheckVerifyAPI = (value, verifyAPI) => {
      let data = {
        username: value,
      };
      const config = {
        method: 'POST',
        body: data,
      };
      console.log('DATA', data);
      fetch(`${Config.API_URL}${verifyAPI}`, config)
        .then(res => res.json())
        .then(response => {
          console.log('Check User Name Response', response);
          if (response.status == 'success') {
            onFocusName == 'userName' && setUserNameStatus(true);
            onFocusName == 'userEmail' && setUserMailStatus(true);
            onFocusName == 'userPhone' && setUserPhoneStatus(true);

          }
        });
    };

    
 
    const onCallSetUserNameValue = (value) => {
      console.log('On Focus', onFocusName)
      let userVerifyAPI = Config.verifyUsernameAPI
      setUserName(value);
      value.length > 4
        ? onCheckVerifyAPI(value, userVerifyAPI)
        : setUserNameStatus(false);
    }

    const onCallSetUserEmailValue = value => {
      console.log('On Focus', onFocusName);
      let mailVerifyAPI = Config.verifyEmailAPI;
      setEMail(value);
      (value.length > 5)
        ? onCheckVerifyAPI(value, mailVerifyAPI)
        : setUserMailStatus(false);
    };

    const onCallSetUserPhoneValue = value => {
      console.log('On Focus', onFocusName);
      let phoneVerifyAPI = Config.verifyMobileAPI;
      setMobNo(value);
      value.length >= 9
        ? onCheckVerifyAPI(value, phoneVerifyAPI)
        : setUserPhoneStatus(false);
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
      CommonFunctions.isBlank(companyOwnerName.trim(), 'Please Enter Company Owner Name') 
    );
}


    const onCallSignUpAPI = () => {
      if (props.route.params?.from == 'Business')
      {
        if (isBusinessSignUpDetailsValid()) {
          // onCallForBusinessCreateOTP();
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

    const onCallBusinessSignUpAPI = () => {
      let data = {
        device_token: '2wewe',
        email: companyMail,
        device_ip: deviceId,
        user_type: userType,
        company_name: companyName,
        company_type: companyType,
        license_number: companytradeNo,
        company_registration_id: companyRegId,
        owner_name: companyOwnerName,
        company_address: '',
        document: '',
      };

      console.log('DATA',data)

    }

     const onCallUserTailentSignUpAPI = () => {
       let data = {
         username: userName,
         gender: onGender,
         birth: dob,
         email: eMail,
         name: fullName,
         device_token: 'jkjk22',
         device_ip: deviceId,
         user_type: userType,
         device_name: deviceName,
       };

      console.log('DATA', data);
      dispatch(SignUpRequest(data, response =>{
        console.log('RESPONSE', response)
      }))
      

     };


     const onCallForTailentViewerCreateOTP = () => {
       let signupData = {
         username: userName,
         gender: onGender,
         birth: dob,
         email: eMail,
         name: fullName,
         device_token: 'jkjk22',
         device_ip: deviceId,
         user_type: userType,
         device_name: deviceName,
       };
       let data = {
         mobile: mobNo,
         number_available: '0',
         device_token: 'sjdusadhouisodjswesd3budedksaheed2',
       };
       dispatch(
         CreateOTPRequest(data, response => {
           console.log('RESPONSE', response);
           props.navigation.navigate('OtpScreen', {
             signupValue: signupData,
             countryCode: countryCode,
             mobValue: mobNo,
           });
         }),
       );
     };


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
                  <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
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
                            onChangeText={mail => onCallSetUserEmailValue(mail)}
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
                            countryFlag={countryFlag != '' ? countryFlag : 'in'}
                            countryCode={
                              countryCode != '' ? `+${countryCode}` : '+91'
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
                            onChangeText={email => setCompanyMail(email)}
                            placeholder={'Company Email Address'}
                          />
                          <CustomTextInput
                            onChangeCounty={() => setCountyModalPicker(true)}
                            countryFlag={countryFlag != '' ? countryFlag : 'in'}
                            countryCode={
                              countryCode != '' ? `+ ${countryCode}` : '+91'
                            }
                            maxLength={10}
                            placeholder={'Mobile No'}
                            value={companyMob}
                            onChangeText={mobno => setCompanyMob(mobno)}
                            marginBottom={R.fontSize.Size20}
                            rightIcon={R.images.checkGreyIcon}
                          />

                          <CustomCardTextInput
                            value={companyOwnerName}
                            onChangeText={ownerName =>
                              setCompanyOwnerName(ownerName)
                            }
                            placeholder={'Owner Name'}
                          />
                          <CustomCardView
                            title={'Upload Trade / Commercial License'}
                            TextColor={R.colors.placeholderTextColor}
                            rightIcon={R.images.uploadIcon}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <View style={{paddingVertical: R.fontSize.Size16}}>
            <AppButton
              onPress={() => onCallSignUpAPI()}
              marginHorizontal={R.fontSize.Size55}
              title={'Proceed'}
            />
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
        <Modal
          visible={countyModalPicker}
          transparent={true}
          onRequestClose={() => setCountyModalPicker(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.modelBackground,
              justifyContent: 'center',
            }}>
            <SafeAreaView
              style={{
                flex: 1,
                paddingHorizontal: R.fontSize.Size20,
                paddingVertical: R.fontSize.Size50,
                borderWidth: 1,
              }}>
              <CountryPicker
                visible={countyModalPicker}
                withFilter={true}
                withFlag={true}
                withCallingCode={true}
                onSelect={country => {
                  console.log(country);
                  setCountyModalPicker(false);
                  setCountryCode(country?.callingCode[0]);
                  let flagName = (country?.flag).slice(5);
                  setCountryFlag(flagName);
                  console.log('FlagName', flagName);
                }}
              />
            </SafeAreaView>
          </View>
        </Modal>
      </StoryScreen>
    );
}
export default SignupScreen