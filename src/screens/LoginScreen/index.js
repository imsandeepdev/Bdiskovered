import * as react from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,Dimensions, Pressable, TextInput,ScrollView,TouchableWithoutFeedback,KeyboardAvoidingView, Keyboard,Platform} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton } from '../../components';
import {connect, useDispatch} from 'react-redux';

import R from '../../res/R';
import Styles from './styles';
import { CreateOTPRequest } from '../../actions/createOTP.action';
const screenHeight = Dimensions.get('screen').height;

const LoginScreen = (props) => {

  const dispatch = useDispatch()
  const [mobNo, setMobNo] = useState('')

  const onCallCreateOTP = () => {
    let data = {
      mobile: '+918947915820',
      device_token:
        'cO2stOGoRpOGAnruOLGUan:APA91bGIlY_kqTLba2EN6yl9tof3GjFz0_rb_V3Nj8TH4FCyZn5eWLE4Ly7t7uIOzV5dvvhvoqrMLhjbTZgfj5oYaYdX1lKUCZ27I5la-00-HDtLAa4YInAtYy5t8ZrQAUQ-KkO',
    };
    dispatch(CreateOTPRequest(data, response=>{
      props.navigation.navigate('OtpScreen')
      console.log('RESPONSE CREATE OTP',response)
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
                        countryCode={'+91'}
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
              // onPress={() => onCallCreateOTP()}
              onPress={() => props.navigation.navigate('OtpScreen')}
              marginHorizontal={R.fontSize.Size35}
              title={'Sign In'}
            />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}
export default LoginScreen