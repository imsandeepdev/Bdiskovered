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

const screenWidth = Dimensions.get('screen').width;

const CustomMenuButton = (props) => {
    return (
      <Pressable
        onPress={props.onPress}
        style={({pressed}) => [
          {
            paddingVertical: R.fontSize.Size5,
            flexDirection: 'row',
            alignItems: 'center',
            opacity: pressed ? 0.5 : 1,
            marginBottom:R.fontSize.Size50
          },
        ]}>
        <Image
          source={props.leftSource}
          style={{height: R.fontSize.Size20, width: R.fontSize.Size20}}
          resizeMode={'contain'}
        />
        <Text
          style={{
            flex: 1,
            marginLeft: R.fontSize.Size30,
            fontFamily: R.fonts.regular,
            fontWeight: '700',
            fontSize: R.fontSize.Size18,
            color: R.colors.primaryTextColor,
          }}>
          {props.title}
        </Text>
      </Pressable>
    );
}

const Menu = (props) => {
  
  const dispatch = useDispatch()

  const onCallLogout = () => {

    let data = {
      access_token: props.authToken
    }
    dispatch(UserSignOutRequest(data,response=>{
      console.log('LOGOUT RES', response)
    }))
  }

  return (
    <StoryScreen>
      <View
        style={{
          flex: 1,
          backgroundColor: R.colors.white,
          paddingHorizontal: R.fontSize.Size30,
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={R.images.appLogoBold}
            style={{height: screenWidth / 3.5, width: screenWidth / 2}}
            resizeMode={'contain'}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <CustomMenuButton
            onPress={() => console.log('help')}
            leftSource={R.images.helpIcon}
            title={'Help'}
          />
          <CustomMenuButton
            onPress={() => console.log('faq')}
            leftSource={R.images.faqIcon}
            title={'FAQ'}
          />
          <CustomMenuButton
            // onPress={() => onCallLogout()}
            onPress = {() => props.navigation.navigate('LoginScreen')}
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
              style={{height: R.fontSize.Size22, width: R.fontSize.Size22}}
              resizeMode={'contain'}
            />
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size24,
                fontWeight: '700',
                color: R.colors.appColor,
                marginHorizontal: R.fontSize.Size15,
              }}>
              {'Go Premium'}
            </Text>
            <Image
              source={R.images.premiumIcon}
              style={{height: R.fontSize.Size22, width: R.fontSize.Size22}}
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
});

export default connect (mapStatetoProps)(Menu);
