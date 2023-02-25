import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Pressable
} from 'react-native';
import { StoryScreen } from '../../components';
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import { UserSignOutRequest } from '../../actions/signUp.action';
import Toast from 'react-native-simple-toast';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './styles';


const screenWidth = Dimensions.get('screen').width;

const CustomMenuButton = (props) => {
    return (
      <Pressable
        onPress={props.onPress}
        style={({pressed}) => [
          Styles.customMenuButtonPress,
          {opacity: pressed ? 0.5 : 1}
        ]}>
        <Image
          source={props.leftSource}
          style={Styles.iconStyle}
          resizeMode={'contain'}
        />
        <Text style={Styles.customMenuButtonText}>{props.title}</Text>
      </Pressable>
    );
}

const Menu = (props) => {
  
  const dispatch = useDispatch()
  const [deviceName, setDeviceName] = useState('');

  const onCallDeviceName = () => {
     DeviceInfo.getDeviceName().then(deviceName => {
       setDeviceName(deviceName);
       console.log('DEVICE NAME', deviceName);
       onCallLogout(deviceName)
     });
  }

  const onLogout = () => {
    Alert.alert(
      '\n',
      'Do you really want to sign out?',
      [
        {
          text: 'Yes',
          onPress: () => onCallDeviceName(),
        },
        {
          text: 'No',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onCallLogout = async(deviceName) => {
    const value = await AsyncStorage.getItem('deviceAccess_token');
    console.log("VALUE",value)
    let data = {
      device_name: deviceName,
      device_token: value,
    };
    console.log('LOGDATA',data)
    dispatch(UserSignOutRequest(data,response=>{
      console.log('LOGOUT RES', response);
      if(response.status == 'success')
      {
        props.navigation.navigate('LoginScreen');
      }
      else
      {
        Toast.show(response.message, Toast.SHORT);
      }
    }))
  }

  return (
    <StoryScreen>
      <View style={Styles.mainView}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={R.images.appLogoBold}
            style={{height: screenWidth / 3.5, width: screenWidth / 2}}
            resizeMode={'contain'}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {/* {props.userType == 'Business' && (
            <CustomMenuButton
              onPress={() => props.navigation.replace('HomeMenu')}
              leftSource={R.images.inActiveHomeIcon}
              title={'Home'}
            />
          )} */}
          <CustomMenuButton
            onPress={() => props.navigation.navigate('ConnectionScreen')}
            leftSource={R.images.connectionsIcon}
            title={'Connections'}
          />
          <CustomMenuButton
            onPress={() => props.navigation.navigate('SavedPostListScreen')}
            leftSource={R.images.greySaveIcon}
            title={'Saved Post'}
          />
          <CustomMenuButton
            onPress={() =>
              props.navigation.navigate('HelpScreen')
            }
            leftSource={
              props.userType == 'Business'
                ? R.images.phoneIcon
                : R.images.helpIcon
            }
            title={'Help'}
          />
          <CustomMenuButton
            onPress={() =>
              props.navigation.navigate('FaqScreen',{from: 'FAQ'})
            }
            leftSource={
              props.userType == 'Business'
                ? R.images.helpIconNew
                : R.images.faqIcon
            }
            title={'FAQ'}
          />
          <CustomMenuButton
            onPress={() => onLogout()}
            leftSource={R.images.signoutIcon}
            title={'Sign Out'}
          />
        </View>
        <View style={{height: R.fontSize.Size80, justifyContent: 'center'}}>
          <Pressable
            onPress={() => props.navigation.navigate('SubscriptionScreen')}
            style={({pressed}) => [
              {
                flexDirection: 'row',
                alignItems: 'center',
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <Image
              source={R.images.premiumIcon}
              style={Styles.iconStyle}
              resizeMode={'contain'}
            />
            <Text style={Styles.goPremiumText}>
              {'Go Premium'}
            </Text>
            <Image
              source={R.images.premiumIcon}
              style={Styles.iconStyle}
              resizeMode={'contain'}
            />
          </Pressable>
        </View>
      </View>
    </StoryScreen>
  );
};

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect (mapStatetoProps)(Menu);
