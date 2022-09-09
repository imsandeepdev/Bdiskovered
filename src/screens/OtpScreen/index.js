import * as react from 'react';
import {useState, useEffect} from 'react';
import {Text, View, Pressable, Image, SafeAreaView,TextInput} from 'react-native';
import { StoryScreen, Header, AppButton } from '../../components';
import R from '../../res/R';
import Styles from './styles';

const OtpScreen = () => {

    const [otpNo, setOtpNo] = useState('')

    return(
        <StoryScreen>
            <SafeAreaView
            style={{flex:1}}
            >
                <Header
                onPress={()=>console.log('Pressed')}
                />
                <View
                style={Styles.mainView}
                >
                <View
                style={{flex:1}}
                >
                    <View
                    style={{marginTop:R.fontSize.Size50}}
                    >
                        <Text style={Styles.verificationText}>{'Verification'}</Text>
                        <Text style={[Styles.smsCodeText,{marginTop:R.fontSize.Size10}]}>{'We Sent a SMS Code'}</Text>
                        <Text style={[Styles.verificationText,{marginTop:R.fontSize.Size15}]}>{`on your number `} 
                        <Text style={{color:R.colors.appColor}}>{'+91 6526367673'}</Text>
                        </Text>
                    </View>

                    <View
                    style={{marginTop:R.fontSize.Size30,flexDirection:'row'}}
                    >
                        <View
                        style={{
                            height:R.fontSize.Size45,
                            width:R.fontSize.Size45,
                            alignItems:'center',
                            justifyContent:'center',
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
                        }}
                        >
                            <TextInput
                                style={{fontSize:R.fontSize.Size18,fontFamily:R.fonts.regular, fontWeight:'700', color:R.colors.primaryTextColor,height:R.fontSize.Size30,width:R.fontSize.Size30,textAlign:'center'}}
                                keyboardType={'number-pad'}
                                maxLength={1}
                                value={otpNo}
                                onChangeText={(otp)=>setOtpNo(otp)}
                            />

                        </View>

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

                     <AppButton
                         marginHorizontal={R.fontSize.Size35}
                         title={'Verify'} 
                    />

                </View>
            </SafeAreaView>
        </StoryScreen>
    )
}
export default OtpScreen