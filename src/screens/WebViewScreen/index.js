import * as React from 'react';
import {useState, useEffect} from 'react';
import {View,Image,SafeAreaView,Text,Pressable} from 'react-native';
import { Header, StoryScreen } from '../../components';
import R from '../../res/R';
import {WebView} from 'react-native-webview';
import { Config } from '../../config';

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

        <WebView
          source={{
            uri: props.route.params?.url
          }}
        />
      </StoryScreen>
    );
}

export default WebViewScreen