import * as react from 'react';
import {useState, useEffect,useRef} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Modal
} from 'react-native';
import { StoryScreen, Header, AppButton } from '../../components';
import R from '../../res/R';
import Styles from './styles';
import {connect, useDispatch} from 'react-redux';
import { SignInRequest, SignUpRequest, UserLogoutAllRequest } from '../../actions/signUp.action';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import { CreateOTPRequest } from '../../actions/createOTP.action';
import AsyncStorage from '@react-native-async-storage/async-storage';




const OtpScreen = (props) => {

    const dispatch = useDispatch()
    const [otpNo, setOtpNo] = useState('')
    const [deviceName, setDeviceName] = useState('');
    const [pickerModal, setPickerModal] = useState(false);
    const [otpArray, setOtpArray] = useState([])
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixTextInputRef = useRef(null);
    // const [signUpData, setSignUpData] = useState()

  useEffect(()=>{
    // props.route.params?.fromScreen == 'LoginScreen' ? setOtpArray(props.route.params?.otpValue) : setOtpArray([])
    console.log('DEVICE TOKEN', props.route.params?.deviceToken);
    console.log('SIGNUPVALUE', props.route.params?.signupValue);
    console.log('OTP VALUE', props.route.params?.otpValue);
    setOtpArray(props.route.params?.otpValue);
    
    onCallDeviceName();
    // setSignUpData(props.route.params?.signupValue);
    // console.log(signUpData)
  },[props.navigation])

  const onCallDeviceName = () => {
    DeviceInfo.getDeviceName().then(deviceName => {
      setDeviceName(deviceName);
      console.log('DEVICE NAME', deviceName);
    });
  };

const onSaveDeviceToken = async () => {
  try {
    await AsyncStorage.setItem(
      'deviceAccess_token',
      props.route.params?.deviceToken,
    );
  } catch (e) {
    Toast.show('Failed to save device token',Toast.SHORT);
  }
};



  const onCallCheckVerify = () => {
    props.route.params?.fromScreen == 'SignUpScreen'
    ?
      onCallSignUpVerify()
    :
      onCallLoginVerify()
  }

  const onCallLoginVerify = () => {
      let tempval = otpArray.toString();
      const otpValue = tempval.replace(/\,/g, '');
      let loginData = props.route.params?.loginValue;
      let data = {
        ...loginData,
        otp: otpValue,
        device_name: deviceName,
        type: props.route.params?.type,
        subscription_status: props.route.params?.subscription_status,
      };
      console.log('LOGINDATA',data)
      dispatch(SignInRequest(data, response =>{
        let tempArray = []
        tempArray = response.data?.profile_info;
        console.log("TEMP LENGTH", tempArray?.length)
        console.log('LOGIN RES PROFILE INFO',response);
          
           if (response.data?.user_type == 'Talent' && tempArray?.length == 0) {
             console.log('YES DONE');
           } else {
             console.log('FAILED');
           } 


          if (response.status == 'success' && response.token != null) {
            if (
              response.data?.user_type == 'Talent' &&
              tempArray?.length == 0
            ) {
              props.navigation.replace('TalentScreen');
              // Toast.show(response.message, Toast.SHORT);
              onSaveDeviceToken();
            } else {
              props.navigation.replace('HomeMenu');
              // Toast.show(response.message, Toast.SHORT);
              onSaveDeviceToken();
            }
             
          } 
          else if (
            response.message ==
            'your account has been logged in other device please logout from device'
          ) {
            Toast.show(response.message, Toast.SHORT);
            setPickerModal(true);
          } else {
            Toast.show(response.message, Toast.SHORT);
          }
        })
      )
  }

  const onCallSignUpVerify = () => {
    props.route.params?.userTypeVerify == 'tailentViewer'?
    onCallTailentViewerVerify():
    onCallCompanyVerify()
  }

  const onCallCompanyVerify = () => {
     let tempval = otpArray.toString();
     const otpValue = tempval.replace(/\,/g, '');
    let signUpData = props.route.params?.signupValue;
    let dataType = 'formdata';
     let formData = new FormData();
     formData.append('device_token', signUpData?.device_token);
     formData.append('email', signUpData?.email);
     formData.append('device_ip', signUpData?.device_ip);
     formData.append('user_type', signUpData?.user_type);
     formData.append('company_name', signUpData?.company_name);
     formData.append('company_type', signUpData?.company_type);
     formData.append('license_number', signUpData?.license_number);
     formData.append('latitude', signUpData?.latitude);
     formData.append('longitude', signUpData?.longitude);
     formData.append('device_name', deviceName);
       formData.append(
         'company_registration_id',
         signUpData?.company_registration_id,
       );
     formData.append('owner_name', signUpData?.owner_name);
     formData.append('company_address', signUpData?.company_address);
     formData.append('otp', otpValue)
     formData.append(
       'document',
       signUpData?.document.path == null || signUpData?.document?.path == null
         ? ''
         : {
             uri:
               Platform.OS === 'android'
                 ? signUpData?.document?.path
                 : signUpData?.document?.path?.replace('file://', ''),
             type: signUpData?.document?.mime,
             name: signUpData?.document?.filename ?? 'image.jpg',
           },
     );
    console.log('Company Request for Signup',formData)
    dispatch(
      SignUpRequest(formData, dataType, response => {
        console.log('ResponseForBusiness', response);
        if (response.status == 'success' && response.token != null) {
          props.navigation.navigate('TalentFinishScreen');
          // Toast.show(response.message, Toast.SHORT);
          onSaveDeviceToken();

        } else {
          Toast.show(response?.message, Toast.SHORT);
          Toast.show(response, Toast.SHORT);

        }
      }),
    );
  }


  const onCallTailentViewerVerify = () => {

    let tempval = otpArray.toString();
    const otpValue = tempval.replace(/\,/g, '');
    let signUpData = props.route.params?.signupValue;

    let data = {
      ...signUpData,
      otp:otpValue
    }
    let dataType = 'jsondata';
    console.log('SIGNUP',data)
    dispatch(SignUpRequest(data,dataType,response => {
      console.log('ResponseOnTailentViewer', response)
       if (response?.status == 'success') {
         props.navigation.navigate(props.route.params?.userType == 'Viewer' ? 'TalentFinishScreen' : 'TalentScreen');
         Toast.show(response.message, Toast.SHORT);
          onSaveDeviceToken();

       } else {
         Toast.show(response , Toast.SHORT);
       }
    }))

  }


    const onOtpChange = index => {
      return value => {
        if (isNaN(Number(value))) {
          // do nothing when a non digit is pressed
          return;
        }
        console.log('OTPVALUE', value);

        const otpArrayCopy = otpArray.concat();
        otpArrayCopy[index] = value;
        setOtpArray(otpArrayCopy);

        // auto focus to next InputText if value is not blank
        if (value !== '') {
        
          index === 0 && secondTextInputRef.current.focus(),
          index === 1 && thirdTextInputRef.current.focus(),
          index === 2 && fourthTextInputRef.current.focus(),
          index === 3 && fifthTextInputRef.current.focus();
          index === 4 && sixTextInputRef.current.focus();
        }
      };
    };

    const handleKeyPress = ({nativeEvent: {key: keyValue}}, index) => {
      console.log(keyValue);
      console.log('Index', index);

      if (keyValue == 'Backspace') {
          setOtpArray([]);

          index === 5 && fifthTextInputRef.current.focus(),
          index === 4 && fourthTextInputRef.current.focus(),
          index === 3 && thirdTextInputRef.current.focus(),
          index === 2 && secondTextInputRef.current.focus(),
          index === 1 && firstTextInputRef.current.focus();
      } else {
          index === 0 && secondTextInputRef.current.focus(),
          index === 1 && thirdTextInputRef.current.focus(),
          index === 2 && fourthTextInputRef.current.focus(),
          index === 3 && fifthTextInputRef.current.focus();
          index === 4 && sixTextInputRef.current.focus();
      }
    };


    const onCallLogoutAllDevices = () => {
      let data = {
        type: 'All',
        mobile: `+${props.route.params?.countryCode}${props.route.params?.mobValue}`,
        device_name: deviceName,
        device_token: props.route.params?.deviceToken,
      };
      console.log('AllLogout Data',data)
      dispatch(UserLogoutAllRequest(data,response => {
        console.log('Logout all devices response', response)
        if(response.status == 'success')
        {
          // Toast.show(response.message, Toast.SHORT)
          setPickerModal(false)
          props.navigation.replace('LoginScreen')
        }
        else
        {
          Toast.show(response.message, Toast.SHORT);
          setPickerModal(false);
        }
      }))
    }


      const onCallResndOTP = () => {  
        let data =
          props.route.params?.fromScreen == 'SignUpScreen'
            ? {
                mobile: `+${props.route.params?.countryCode}${props.route.params?.mobValue}`,
                number_available: "0",
                device_token: props.route.params?.deviceToken,
              }
            : {
                mobile: `+${props.route.params?.countryCode}${props.route.params?.mobValue}`,
                device_token: props.route.params?.deviceToken,
              };
          console.log("RESND OTP DATA", data)

          dispatch(
            CreateOTPRequest(data, response => {
              console.log('RESPONSE RESND OTP', response);
              if (response.status == 'success') {
                Toast.show(response.OTP, Toast.LONG);
                firstTextInputRef.current.focus();
                setOtpArray(response.OTP);

              } else {
                Toast.show(response.message, Toast.SHORT);
              }
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
          <View style={Styles.mainView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View
                    style={{
                      paddingHorizontal: R.fontSize.Size20,
                    }}>
                    <View style={{marginTop: R.fontSize.Size50}}>
                      <Text style={Styles.verificationText}>
                        {'Verification'}
                      </Text>
                      <Text
                        style={[
                          Styles.smsCodeText,
                          {marginTop: R.fontSize.Size10},
                        ]}>
                        {'We Sent a SMS Code'}
                      </Text>
                      <Text
                        style={[
                          Styles.verificationText,
                          {marginTop: R.fontSize.Size15},
                        ]}>
                        {`on your number `}
                        <Text style={{color: R.colors.appColor}}>
                          {`+${props.route.params?.countryCode} ${props.route.params?.mobValue}`}
                        </Text>
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: R.fontSize.Size30,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {[
                        firstTextInputRef,
                        secondTextInputRef,
                        thirdTextInputRef,
                        fourthTextInputRef,
                        fifthTextInputRef,
                        sixTextInputRef,
                      ].map((textInputRef, index) => (
                        <View
                          key={index}
                          style={{
                            height: R.fontSize.Size45,
                            width: R.fontSize.Size45,
                            alignItems: 'center',
                            justifyContent: 'center',
                            shadowColor: '#000',
                            backgroundColor: R.colors.white,
                            borderRadius: R.fontSize.Size5,
                            alignItems: 'center',
                            shadowOffset: {
                              width: 2,
                              height: 2,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 2.84,
                            elevation: 5,
                            marginHorizontal: R.fontSize.Size6,
                          }}>
                          <TextInput
                            style={{
                              fontSize: R.fontSize.Size18,
                              fontFamily: R.fonts.regular,
                              fontWeight: '700',
                              color: R.colors.primaryTextColor,
                              height: R.fontSize.Size45,
                              width: R.fontSize.Size45,
                              marginTop:
                                Platform.OS === 'android'
                                  ? R.fontSize.Size2
                                  : 0,
                              textAlign: 'center',
                            }}
                            keyboardType={'number-pad'}
                            maxLength={1}
                            value={otpArray[index]}
                            autoFocus={index === 0 ? true : undefined}
                            ref={textInputRef}
                            onChangeText={onOtpChange(index)}
                            onKeyPress={e => handleKeyPress(e, index)}
                          />
                        </View>
                      ))}
                    </View>
                    <View
                      style={{
                        marginTop: R.fontSize.Size45,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={[
                          Styles.welcomeText,
                          {fontSize: R.fontSize.Size12},
                        ]}>
                        {'Didn’t recieve the code?'}
                      </Text>
                      <Pressable
                        onPress={() => onCallResndOTP()}
                        style={({pressed}) => [
                          {
                            padding: R.fontSize.Size4,
                            opacity: pressed ? 0.5 : 1,
                          },
                        ]}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size12,
                            color: R.colors.appColor,
                            fontWeight: '700',
                          }}>
                          {'Resend OTP'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <View style={{paddingVertical: R.fontSize.Size16}}>
            <AppButton
              onPress={() => onCallCheckVerify()}
              marginHorizontal={R.fontSize.Size55}
              title={'Verify'}
            />
          </View>
        </SafeAreaView>
        <Modal
          visible={pickerModal}
          transparent={true}
          onRequestClose={() => setPickerModal(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.modelBackground,
              justifyContent: 'center',
            }}>
            <View
              style={{
                paddingVertical: R.fontSize.Size40,
                paddingHorizontal: R.fontSize.Size20,
                backgroundColor: R.colors.white,
                paddingBottom: R.fontSize.Size2,
                marginHorizontal: R.fontSize.Size15,
                borderRadius: R.fontSize.Size8,
              }}>
              <View
                style={{alignItems: 'center', marginBottom: R.fontSize.Size5}}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    color: R.colors.primaryTextColor,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {
                    'Your account has been logged in another device\nPlease logout from devices'
                  }
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: R.fontSize.Size10,
                  paddingTop: R.fontSize.Size10,
                  paddingBottom: R.fontSize.Size20,
                }}>
                <Pressable
                  onPress={() => onCallLogoutAllDevices()}
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
                    {'Logout'}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setPickerModal(false)}
                  style={({pressed}) => [
                    {
                      width: R.fontSize.Size140,
                      height: R.fontSize.Size45,
                      borderRadius: R.fontSize.Size4,
                      opacity: pressed ? 0.5 : 1,
                      borderWidth: 2,
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
export default OtpScreen