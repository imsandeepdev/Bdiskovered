import * as React from 'react';
import {useState, useEffect} from 'react';
import {View,Image,SafeAreaView,Text,Pressable} from 'react-native';
import { Header, StoryScreen } from '../../components';
import R from '../../res/R';

const WebViewScreen = (props) => {

    useEffect(()=>{

    },[props.navigation])

    return (
      <StoryScreen>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          title={(props.route.params?.from).toUpperCase()}
        />
        <View
          style={{
            height: R.fontSize.Size2,
            backgroundColor: R.colors.placeholderTextColor,
            width: '100%',
          }}
        />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: R.fonts.bold,
              fontSize: R.fontSize.Size14,
              color: R.colors.primaryTextColor,
            }}>
            {props.route.params?.from == 'help' ? `HELP SCREEN` : `FAQ SCREEN`}
          </Text>
        </View>
      </StoryScreen>
    );
}

export default WebViewScreen