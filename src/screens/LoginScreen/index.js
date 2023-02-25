import * as react from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,Dimensions, Pressable, TextInput,ScrollView,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard,Platform,Modal, Alert} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton } from '../../components';
import {connect, useDispatch} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import R from '../../res/R';
import Styles from './styles';
import { CreateOTPRequest } from '../../actions/createOTP.action';
const screenHeight = Dimensions.get('screen').height;
import Toast from 'react-native-simple-toast';
import CommonFunctions from '../../utils/CommonFuntions';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = (props) => {

  const dispatch = useDispatch()
  const [mobNo, setMobNo] = useState('')
  const [countyModalPicker,setCountyModalPicker] = useState(false)
  const [countryCode, setCountryCode] = useState('971')
  const [countyFlag, setCountyFlag] = useState('ae');
  const [fcmToken, setFcmToken] = useState('');
  const [createDeviceToken, setCreateDeviceToken] = useState('');


  useEffect(()=>{
    // onCallCreateDeviceToken()
  },[props.navigation])

  const onCallCreateDeviceToken = async() => {

    await AsyncStorage.getItem('fcmToken', (err, result) => {
      console.log('FCM TOKEN', result);
      if(result!= null)
      {
      setFcmToken(result);
      onCallCreateOTP(result);
      setCreateDeviceToken(result);
      }
      else
      {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charLength = characters.length;
        let result = ' ';
        for (let i = 0; i < 45; i++) {
          result += characters.charAt(Math.floor(Math.random() * charLength));
        }
        console.log('CUSTOM FCM TOKEN', result);
        onCallSetCustomFcmToken(result);
        onCallCreateOTP(result);
        setCreateDeviceToken(result);
      }
    });
  };

  const onCallSetCustomFcmToken = async(result) =>{
    await AsyncStorage.setItem('fcmToken', result)
  }


  const isValid = () => {
    return(
      CommonFunctions.isBlank(mobNo.trim(), 'Please Enter Registered Mobile Number')
    )
  }



  const onCallCreateOTP = (deviceToken) => {
    console.log("DEVICE TOKEN ON LOGIN SCREEN", deviceToken )
    if(isValid())
    {
      let data = {
        mobile: `+${countryCode}${mobNo}`,
        device_token: deviceToken,
      };
      console.log('LOGINDATA',data)
      dispatch(
        CreateOTPRequest(data, response => {
          console.log('RESPONSE CREATE OTP', response);

          if (response.status == 'success') {
            props.navigation.navigate('OtpScreen', {
              loginValue: data,
              fromScreen: 'LoginScreen',
              mobValue: mobNo,
              countryCode: countryCode,
              deviceToken: deviceToken,
              type: response.type,
              subscription_status: response.subscription_status,
              otpValue:response?.OTP
            });

          } else {
            Toast.show(response.message, Toast.SHORT);
          }
        }),
      );
    }
  }


    return (
      <StoryScreen>
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex: 1, marginHorizontal: R.fontSize.Size20}}>
                  <View style={Styles.beleaveMainView}>
                    <Image
                      source={R.images.appLogoBold}
                      style={{height: R.fontSize.Size50}}
                      resizeMode={'contain'}
                    />
                    <Text style={Styles.titleText}>
                      {'Believe. The world is waiting'}
                    </Text>
                  </View>
                  <View>
                    <Text style={Styles.welcomeText}>{'Welcome'}</Text>
                    <Text style={Styles.phoneText}>{'Enter Phone Number'}</Text>
                    <View style={{marginTop: R.fontSize.Size30}}>
                      <CustomTextInput
                        onChangeCounty={() => setCountyModalPicker(true)}
                        countryFlag={countyFlag != '' ? countyFlag : 'ae'}
                        countryCode={
                          countryCode != '' ? `+${countryCode}` : '971'
                        }
                        maxLength={10}
                        placeholder={'Mobile No'}
                        value={mobNo}
                        onChangeText={no => setMobNo(no)}
                      />
                    </View>
                    <View style={Styles.accountView}>
                      <Text
                        style={[
                          Styles.welcomeText,
                          {fontSize: R.fontSize.Size12},
                        ]}>
                        {'Don’t have an account ?'}
                      </Text>
                      <Pressable
                        onPress={() =>
                          props.navigation.navigate('UserTypeScreen')
                        }
                        // onPress={() => props.navigation.navigate('VideoScreen')}
                        style={({pressed}) => [
                          {
                            padding: R.fontSize.Size4,
                            opacity: pressed ? 0.5 : 1,
                          },
                        ]}>
                        <Text style={Styles.signUpText}>
                          {'SignUp'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
          <View style={{paddingVertical: R.fontSize.Size16}}>
            <AppButton
              onPress={() => onCallCreateDeviceToken()}
              marginHorizontal={R.fontSize.Size35}
              title={'Sign In'}
            />
          </View>
        </SafeAreaView>
        
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
                setCountyFlag(country?.cca2);
                console.log('FlagName', flagName);
              }}
            />
          </View>
        )}
      </StoryScreen>
    );
}
export default LoginScreen