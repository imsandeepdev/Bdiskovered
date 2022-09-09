import * as react from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,Dimensions, Pressable, TextInput} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton } from '../../components';

import R from '../../res/R';
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;

const LoginScreen = (props) => {

  const [mobNo, setMobNo] = useState('')


    return (
      <StoryScreen>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, marginHorizontal: R.fontSize.Size20}}>
            <View style={{flex: 1}}>
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
                <View
                style={{marginTop:R.fontSize.Size30}}
                >
                  <CustomTextInput
                  countryCode={'+91'}
                  maxLength={10}
                  placeholder={'Mobile No'}
                  value={mobNo}
                  onChangeText={(no)=>setMobNo(no)}
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
                    style={[Styles.welcomeText, {fontSize: R.fontSize.Size12}]}>
                    {'Don’t have an account ?'}
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
                      {'SignUp'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <AppButton 
            marginHorizontal={R.fontSize.Size35}
            title={'Sign In'} 
            />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}
export default LoginScreen