import * as React from 'react';
import {useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {FullViewStoryScreen} from '../../components';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import Styles from './styles';
import R from '../../res/R';

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
        <Image source={R.images.SplashIcon} />
      </View>
    </FullViewStoryScreen>
  );
};

export default SplashScreen;
