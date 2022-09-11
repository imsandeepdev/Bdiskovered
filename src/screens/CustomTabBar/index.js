import * as React from 'react';
import {useState} from 'react';
import {TouchableOpacity,Image,View,Text} from 'react-native';
import R from '../../res/R';

const CustomTabBar = props => {
  const [select, setSelect] = useState('HomeScreen');

  const navigateToFirstScreen = () => {
    props.navigation.navigate('HomeScreen');
    setSelect('HomeScreen');
  };

  const navigateToSecondScreen = () => {
    props.navigation.navigate('SearchScreen');
    setSelect('SearchScreen');
  };

  const navigateToThirdScreen = () => {
    props.navigation.navigate('UploadScreen');
    setSelect('UploadScreen');
  };

  const navigateToFourScreen = () => {
    props.navigation.navigate('ProfileScreen');
    setSelect('ProfileScreen');
  };

  return (
    <View
      style={{
        backgroundColor: R.colors.white,
        overflow: 'hidden',
        paddingTop: 5,
      }}>
      <View
        style={{
          justifyContent: 'space-around',
          height: R.fontSize.Size80,
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          backgroundColor: R.colors.white,
          elevation: 5,
        }}>
        <TouchableOpacity
          onPress={navigateToFirstScreen}
          activeOpacity={0.6}
          style={{
            height: R.fontSize.Size60,
            paddingVertical: R.fontSize.Size5,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <Image
            source={
              select === 'HomeScreen'
                ? R.images.activeHomeIcon
                : R.images.activeHomeIcon
            }
            resizeMode={'contain'}
            style={{
              height: R.fontSize.Size28,
              width: R.fontSize.Size28,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToSecondScreen}
          activeOpacity={0.6}
          style={{
            height: R.fontSize.Size60,
            paddingVertical: R.fontSize.Size5,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <Image
            source={
              select === 'SearchScreen'
                ? R.images.activeHomeIcon
                : R.images.inActiveSearchIcon
            }
            resizeMode={'contain'}
            style={{
              height: R.fontSize.Size28,
              width: R.fontSize.Size28,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToThirdScreen}
          activeOpacity={0.6}
          style={{
            height: R.fontSize.Size60,
            paddingVertical: R.fontSize.Size5,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <Image
            source={
              select === 'UploadScreen'
                ? R.images.activeAddIcon
                : R.images.inActiveAddIcon
            }
            resizeMode={'contain'}
            style={{
              height: R.fontSize.Size28,
              width: R.fontSize.Size28,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToFourScreen}
          activeOpacity={0.6}
          style={{
            height: R.fontSize.Size60,
            paddingVertical: R.fontSize.Size5,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <Image
            source={
              select === 'ProfileScreen'
                ? R.images.activeHomeIcon
                : R.images.inActiveAddIcon
            }
            resizeMode={'contain'}
            style={{
              height: R.fontSize.Size28,
              width: R.fontSize.Size28,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomTabBar