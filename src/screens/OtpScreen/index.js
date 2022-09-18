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
} from 'react-native';
import { StoryScreen, Header, AppButton } from '../../components';
import R from '../../res/R';
import Styles from './styles';
import {connect, useDispatch} from 'react-redux';
import { SignInRequest, SignUpRequest } from '../../actions/signUp.action';
import Toast from 'react-native-simple-toast';


const OtpScreen = (props) => {

    const dispatch = useDispatch()
    const [otpNo, setOtpNo] = useState('')
    const [otpArray, setOtpArray] = useState([])
    const firstTextInputRef = useRef(null);
    const secondTextInputRef = useRef(null);
    const thirdTextInputRef = useRef(null);
    const fourthTextInputRef = useRef(null);
    const fifthTextInputRef = useRef(null);
    const sixTextInputRef = useRef(null);
    // const [signUpData, setSignUpData] = useState()

  useEffect(()=>{

    console.log('SIGNUPVALUE', props.route.params?.signupValue);
    // setSignUpData(props.route.params?.signupValue);
    // console.log(signUpData)
  },[props.navigation])

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
      };
      console.log('LOGINDATA',data)
      dispatch(SignInRequest(data, response =>{
          console.log('LOGIN RES', response)
          if(response.status == 'success')
          {
            props.navigation.replace('HomeMenu')
            Toast.show(response.message, Toast.SHORT);
          }
          else
          {
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
     formData.append('device_token', 'dsghh');
     formData.append('email', signUpData?.email);
     formData.append('device_ip', signUpData?.device_ip);
     formData.append('user_type', signUpData?.user_type);
     formData.append('company_name', signUpData?.company_name);
     formData.append('company_type', signUpData?.company_type);
     formData.append('license_number', signUpData?.license_number);
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
        if(response.status == 'success')
        {
          props.navigation.navigate('TalentFinishScreen');
          Toast.show(response.message, Toast.SHORT);
        }
        else
        {
          Toast.show(response.message, Toast.SHORT);
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
       if (response.status == 'success') {
         props.navigation.navigate(props.route.params?.userType == 'Viewer' ? 'TalentFinishScreen' : 'TalentScreen');
         Toast.show(response.message, Toast.SHORT);
       } else {
         Toast.show(response.message, Toast.SHORT);
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
        
          if (index === 0) {
            secondTextInputRef.current.focus();
          } else if (index === 1) {
            thirdTextInputRef.current.focus();
          } else if (index === 2) {
            fourthTextInputRef.current.focus();
          } else if (index === 3) {
            fifthTextInputRef.current.focus();
          } else if (index === 4) {
            sixTextInputRef.current.focus();
          }
        }
      };
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
                                  ? R.fontSize.Size5
                                  : 0,
                              textAlign: 'center',
                            }}
                            keyboardType={'number-pad'}
                            maxLength={1}
                            value={otpArray[index]}
                            autoFocus={index === 0 ? true : undefined}
                            ref={textInputRef}
                            onChangeText={onOtpChange(index)}
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
      </StoryScreen>
    );
}
export default OtpScreen