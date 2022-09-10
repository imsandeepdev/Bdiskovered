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
} from 'react-native';
import {CustomTextInput, StoryScreen, AppButton, Header} from '../../components';

import R from '../../res/R';
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;

const HomeScreen = (props) => {

  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <Header 
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronDown} 
        />
        <View style={{flex: 1, marginHorizontal: R.fontSize.Size20}}>
          <Text>Home Screen</Text>
        </View>
      </SafeAreaView>
    </StoryScreen>
  );
};
export default HomeScreen;
