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
  Platform
} from 'react-native';
import { CustomTextInput, StoryScreen, AppButton, Header, CustomCardTextInput, CustomMaleFemale, CustomCardView } from '../../components';
import R from '../../res/R';
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;

const SignupScreen = (props) => {

    const RegisterType = 'Business'

    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [eMail, setEMail] = useState('')
    const [mobNo, setMobNo] = useState('')
    const [dob, setDOB] = useState('')
    const [onGender, setOnGender] = useState('male')

    const [companyName, setCompanyName] = useState('')
    const [companytype, setCompanyType] = useState('')   
    const [companytradeNo, setCompanyTradeNo] = useState('') 
    const [companyRegId, setCompanyRegId] = useState('')
    const [companyMail, setCompanyMail] = useState('')
    const [companyMob, setCompanyMob] = useState('')
    const [companyOwnerName, setCompanyOwnerName] = useState('')

    useEffect(()=>{
        console.log(props.route.params?.from);

    },[props.navigation])

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
                            onChangeText={username => setUserName(username)}
                            placeholder={'User Name'}
                            rightIcon={R.images.checkOrangeIcon}
                          />
                          <CustomCardTextInput
                            value={fullName}
                            onChangeText={fname => setFullName(fname)}
                            placeholder={'Full Name'}
                          />
                          <CustomCardTextInput
                            value={eMail}
                            onChangeText={mail => setEMail(mail)}
                            placeholder={'Email'}
                            rightIcon={R.images.checkGreyIcon}
                          />
                          <CustomTextInput
                            countryCode={'+91'}
                            maxLength={10}
                            placeholder={'Mobile No'}
                            value={mobNo}
                            onChangeText={no => setMobNo(no)}
                            marginBottom={R.fontSize.Size20}
                            rightIcon={R.images.checkGreyIcon}
                          />
                          <CustomCardTextInput
                            value={dob}
                            onChangeText={dob => setDOB(dob)}
                            placeholder={'Date of Birth'}
                          />
                          <CustomMaleFemale
                            maleOnPress={() => setOnGender('male')}
                            maleIcon={
                              onGender == 'male'
                                ? R.images.activeMaleIcon
                                : R.images.inactiveMaleIcon
                            }
                            maleTextColor={
                              onGender == 'male'
                                ? R.colors.appColor
                                : R.colors.placeholderTextColor
                            }
                            feMaleOnPress={() => setOnGender('female')}
                            feMaleIcon={
                              onGender == 'female'
                                ? R.images.activeFemaleIcon
                                : R.images.inactiveFemaleIcon
                            }
                            feMaleTextColor={
                              onGender == 'female'
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
                            value={companytype}
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
                            countryCode={'+91'}
                            maxLength={10}
                            placeholder={'Mobile No'}
                            value={companyMob}
                            onChangeText={mobno => setCompanyMob(mobno)}
                            marginBottom={R.fontSize.Size20}
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
              onPress={() => props.navigation.navigate('OtpScreen')}
              marginHorizontal={R.fontSize.Size55}
              title={'Proceed'}
            />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}
export default SignupScreen