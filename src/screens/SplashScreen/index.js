import * as React from 'react';
import {useEffect} from 'react';
import {View, Image, StatusBar, Dimensions} from 'react-native';
import {FullViewStoryScreen} from '../../components';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import Styles from './styles';
import R from '../../res/R';

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width


const SplashScreen = props => {
  useEffect(() => {
    hideNavigationBar();
    setTimeout(() => {
      props?.navigation?.replace('LoginScreen');
      StatusBar.setBarStyle('dark-content', true);
    }, 2000);
  }, []);
  return (
    <FullViewStoryScreen statusBarStyle="light-content">
      <View style={Styles.mainView}>
        <Image source={R.images.SplashIcon} 
              style={{height: screenHeight, width: screenWidth}}
              resizeMode={'cover'}
        />
      </View>
    </FullViewStoryScreen>
  );
};

export default SplashScreen;
