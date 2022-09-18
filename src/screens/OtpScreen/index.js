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
import { SignUpRequest } from '../../actions/signUp.action';


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

    // setSignUpData(props.route.params?.signupValue);
    // console.log(signUpData)
  },[props.navigation])


  const onCallVerify = () => {

    let tempval = otpArray.toString();
    const otpValue = tempval.replace(/\,/g, '');
    let signUpData = props.route.params?.signupValue;
    let data = {
      ...signUpData,
      otp:otpValue
    }
    console.log('SIGNUP',data)
    dispatch(SignUpRequest(data, response => {
      console.log('Response', response)
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
              onPress={() => onCallVerify()}
              marginHorizontal={R.fontSize.Size55}
              title={'Verify'}
            />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}
export default OtpScreen