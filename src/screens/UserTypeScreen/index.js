import * as react from 'react';
import {useState, useEffect} from 'react';
import {Text, View, Pressable, Image, SafeAreaView,TextInput,ScrollView} from 'react-native';
import { StoryScreen, Header, AppButton, CustomCardView } from '../../components';
import R from '../../res/R';
import Styles from './styles';
import Toast from 'react-native-simple-toast';
import { Config } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonFunctions from '../../utils/CommonFuntions';
import DeviceInfo from 'react-native-device-info';

const AccountType = [
    {id:'1', title:'Business'},
    {id:'2', title:'Talent'},
    {id:'3', title:'Viewer'}

]

const UserTypeScreen = (props) => {


    useEffect(()=>{
      // DeviceInfo.getUniqueId();
      // console.log('device info on usertype ', DeviceInfo.getUniqueId());
      // onCallLatitudeLongitude();
    },[props.navigation])

    const [selectedUser, setSelectedUser] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [userType, setUserType] = useState('')



    // const onCallLatitudeLongitude = async() => {
    //   await AsyncStorage.getItem('userLatLong', (err, result) => {
    //     console.log('RESULT LONGITUDE', result);
    //     const myArray = result.split(',');
    //     console.log('Result1', myArray[0]);
    //     console.log('Result2', myArray[1]);
    //     // setMyLat(myArray[0]);
    //     // setMyLong(myArray[1]);
    //   });
    // };

    const onCallUserSelect = (item) => {

        console.log("ITEM",item)
            setSelectedUser(item?.id)
            setUserType(item?.title)
        
    }

      const onCallCreateDeviceToken = async () => {
        await AsyncStorage.getItem('fcmToken', (err, result) => {
          console.log('FCM TOKEN', result);
          if (result != null) {
            onCallProcess(result);
          } else {
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            const charLength = characters.length;
            let result = ' ';
            for (let i = 0; i < 45; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charLength),
              );
            }
            console.log('CUSTOM FCM TOKEN', result);
            onCallSetCustomFcmToken(result);
            onCallProcess(result);
           
          }
        });
      };

       const onCallSetCustomFcmToken = async result => {
         await AsyncStorage.setItem('fcmToken', result);
       };


    const onCheckCondition = () => {
      return (
        CommonFunctions.isBlank(
          userType.trim(),
          'Please Select Account Type',
        ) &&
        CommonFunctions.isFalse(
          acceptTerms,
          'Please Agree Terms and Condition',
        )
      );
    }


    const onCallProcess = (deviceToken) => {
      if(onCheckCondition())
      {
        props.navigation.navigate('SignupScreen', {
          from: userType,
          device_token: deviceToken
        });
      }
    }

    return (
      <StoryScreen>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
            // title={'usertype'}
          />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={Styles.mainView}>
              <View style={{flex: 1}}>
                <View style={{marginTop: R.fontSize.Size50}}>
                  <Text style={Styles.userselectionText}>
                    {'User Selection'}
                  </Text>
                  <Text
                    style={[
                      Styles.accountTypeText,
                      {marginTop: R.fontSize.Size10},
                    ]}>
                    {'Select Account Type'}
                  </Text>
                </View>
                <View style={{marginTop: R.fontSize.Size30}}>
                  {AccountType.map((item, index) => {
                    return (
                      <CustomCardView
                        key={index}
                        onPress={() => onCallUserSelect(item)}
                        backgroundColor={
                          selectedUser == item?.id
                            ? R.colors.PrimaryApp_color
                            : R.colors.white
                        }
                        title={item.title}
                        TextColor={
                          selectedUser == item?.id
                            ? R.colors.white
                            : R.colors.primaryTextColor
                        }
                        rightIcon={R.images.checkWhiteIcon}
                        Iconheight={R.fontSize.Size16}
                        Iconwidth={R.fontSize.Size16}
                      />
                    );
                  })}
                </View>
                <View
                  style={{
                    marginTop: R.fontSize.Size45,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={[Styles.termsText]}>
                    {'Accept '}

                    <Text
                      onPress={() =>
                        props.navigation.navigate('WebViewScreen', {
                          from: 'Terms & Conditions',
                          for: 'terms',
                          url: Config.TermsNConditions,
                        })
                      }
                      style={{color: R.colors.appColor}}>
                      {'Terms & Conditions'}
                    </Text>
                    <Text style={[Styles.termsText]}>{' & '}</Text>
                    <Text
                      onPress={() =>
                        props.navigation.navigate('WebViewScreen', {
                          from: 'Privacy Policy',
                          for: 'policy',
                          url: Config.PrivacyPolicy,
                        })
                      }
                      style={{color: R.colors.appColor}}>
                      {'Privacy Policy'}
                    </Text>
                    <Text> {'of usage.'}</Text>
                  </Text>
                  <Pressable
                    onPress={() => setAcceptTerms(!acceptTerms)}
                    style={({pressed}) => [
                      {
                        height: R.fontSize.Size20,
                        width: R.fontSize.Size20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: R.fontSize.Size2,
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}>
                    <Image
                      source={
                        acceptTerms
                          ? R.images.checkTermsIcon
                          : R.images.unCheckTermsIcon
                      }
                      style={{
                        height: R.fontSize.Size18,
                        width: R.fontSize.Size18,
                      }}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{paddingVertical: R.fontSize.Size16}}>
            <AppButton
              onPress={() => onCallCreateDeviceToken()}
              marginHorizontal={R.fontSize.Size55}
              title={'Proceed'}
            />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}
export default UserTypeScreen