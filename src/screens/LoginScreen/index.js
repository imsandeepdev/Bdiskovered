import * as react from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,Dimensions, Pressable, TextInput,ScrollView,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard,Platform,Modal} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton } from '../../components';
import {connect, useDispatch} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import R from '../../res/R';
import Styles from './styles';
import { CreateOTPRequest } from '../../actions/createOTP.action';
const screenHeight = Dimensions.get('screen').height;
import Toast from 'react-native-simple-toast';


const LoginScreen = (props) => {

  const dispatch = useDispatch()
  const [mobNo, setMobNo] = useState('')
  const [countyModalPicker,setCountyModalPicker] = useState(false)
  const [countryCode, setCountryCode] = useState('91')
  const [countyFlag, setCountyFlag] = useState('');


  const onCallCreateOTP = () => {
    let data = {
      // mobile: '+918947915820',
      mobile: `${countryCode}${mobNo}`,
      device_token:
        'cO2stOGoRpOGAnruOLGUan:APA91bGIdddlY_kqTLbaw2EN6yl9tof3GjFz0_rb_V3Nj8TH4FCyZn5eWLE4Ly7t7uIOzV5dvvhvoqrMLhjbTZgfj5oYaYdX1lKUCZ27I5la-00-HDtLAa4YInAtYy5t8ZrQAUQ-KkO',
    };
    dispatch(CreateOTPRequest(data, response=>{
      console.log('RESPONSE CREATE OTP', response);

      if(response.status == 'success')
      {
      props.navigation.navigate('OtpScreen', {
        loginValue: data,
        fromScreen: 'LoginScreen',
        mobValue: mobNo,
        countryCode: countryCode,
      });
      Toast.show(response.message, Toast.SHORT)
      }
      else
      {
      Toast.show(response.message, Toast.SHORT);
      }
    }))
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
                        countryFlag={countyFlag != '' ? countyFlag : 'in'}
                        countryCode={countryCode != '' ? `+ ${countryCode}` : '91'}
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
              onPress={() => onCallCreateOTP()}
              // onPress={() => props.navigation.navigate('OtpScreen')}
              marginHorizontal={R.fontSize.Size35}
              title={'Sign In'}
            />
          </View>
        </SafeAreaView>
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
                  setCountyFlag(country?.cca2)
                  console.log('FlagName',flagName)
                }}
               
              />
            </SafeAreaView>
          </View>
        </Modal>
      </StoryScreen>
    );
}
export default LoginScreen