import * as react from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,Dimensions, Pressable, TextInput,ScrollView,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard,Platform,Modal, Alert} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton } from '../../components';
import {connect, useDispatch} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
// import CountryPicker from 'react-native-country-codes-picker';
import R from '../../res/R';
import Styles from './styles';
import { CreateOTPRequest } from '../../actions/createOTP.action';
const screenHeight = Dimensions.get('screen').height;
import Toast from 'react-native-simple-toast';
import CommonFunctions from '../../utils/CommonFuntions';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';


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

  const onCallCreateDeviceToken = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charLength = characters.length;
    let result = ' ';
    for (let i = 0; i < 45; i++) {
      result += characters.charAt(Math.floor(Math.random() * charLength));
      
    }
    onCallCreateOTP(result);
    setCreateDeviceToken(result);
    // await AsyncStorage.getItem('fcmToken', (err, result) => {
    //   console.log('FCM TOKEN', result);
    //   setFcmToken(result);
    //   Toast.show(result, Toast.SHORT)
    //   onCallCreateOTP(result);
    //   setCreateDeviceToken(result);
    // });
  };


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
              deviceToken: createDeviceToken,
              type: response.type,
              subscription_status: response.subscription_status,
            });
            Toast.show(response.OTP, Toast.LONG);
            Alert.alert(response?.OTP);

          } else {
            Toast.show(response.message, Toast.SHORT);
          }
        }),
      );
    }
  }

  // const checkToken = async () => {
  //   const token = await messaging().getToken();
  //   if (token) {
  //     console.debug('FCM Token', token);
  //     setFcmToken(token);
  //   }
  // };

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
                  <View
                    style={{
                      alignItems: 'center',
                      paddingTop: R.fontSize.Size30,
                      height: screenHeight / 4,
                    }}>
                    <Image
                      source={R.images.appLogoBold}
                      style={{height: R.fontSize.Size50}}
                      resizeMode={'contain'}
                    />
                    <Text style={Styles.titleText}>
                      {'Making Dreams Come True'}
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
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size12,
                            color: R.colors.appColor,
                            fontWeight: '700',
                          }}>
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
              // onPress={() => props.navigation.navigate('OtpScreen')}
              marginHorizontal={R.fontSize.Size35}
              title={'Sign In'}
            />
          </View>
        </SafeAreaView>
        {/* <Modal
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
              }}> */}

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
        {/* <CountryPicker
              
                show={countyModalPicker}
                pickerButtonOnPress={country => {
                  console.log(country);
                  setCountyModalPicker(false);
                  setCountryCode(country?.dial_code);
                  // let flagName = (country?.flag).slice(5);
                  setCountyFlag(country?.code);
                  // console.log('FlagName', flagName);
                }}
              /> */}

        {/* </SafeAreaView>
          </View>
        </Modal> */}
      </StoryScreen>
    );
}
export default LoginScreen