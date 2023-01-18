import * as React from 'react';
import {useState, useEffect} from 'react';
import {TouchableOpacity,Image,View,Text,Dimensions} from 'react-native';
import R from '../../res/R';
import { useDispatch, connect } from 'react-redux';
import { Config } from '../../config';
const screenHeight = Dimensions.get('window').height;

const tabBarHeight = screenHeight/10
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

  useEffect(()=>{
    console.log(props.userProfile?.Profile?.name)
  },[])

  return (
    <View
      style={{
        backgroundColor: R.colors.white,
        overflow: 'hidden',
      }}>
      <View
        style={{
          borderTopWidth:0.2,
          borderColor:R.colors.placeholderTextColor,
          justifyContent: 'space-around',
          height: tabBarHeight,
          flexDirection: 'row',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 0,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          // backgroundColor: R.colors.white,
          // elevation: 5,
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
                : R.images.inActiveHomeIcon
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
                ? R.images.activeSearchIcon
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
          onPress={navigateToFourScreen}
          activeOpacity={0.6}
          style={{
            height: R.fontSize.Size60,
            paddingVertical: R.fontSize.Size5,
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <View
            style={{
              height: R.fontSize.Size40,
              width: R.fontSize.Size40,
              borderRadius: R.fontSize.Size20,
              backgroundColor: R.colors.lightWhite,
              borderWidth: 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor:
                select === 'ProfileScreen'
                  ? R.colors.appColor
                  : R.colors.placeholderTextColor,
            }}>
          {props.userProfile?.Profile?.avatar !=
              'http://localhost:8080/profile/user.png' &&
            props.userProfile?.Profile?.avatar != '' ? (
              <Image
                source={{
                  uri: `${
                    Config.API_URL
                  }${props.userProfile?.Profile?.avatar.replace('http://localhost:8080/','')}`,
                }}
                resizeMode={'cover'}
                style={{
                  height: R.fontSize.Size35,
                  width: R.fontSize.Size35,
                  borderRadius: R.fontSize.Size20,
                }}
              />
            ) : ( 
            <Image
              source={R.images.inActiveProfileIcon}
              resizeMode={'cover'}
              style={{
                height: R.fontSize.Size35,
                width: R.fontSize.Size35,
                borderRadius: R.fontSize.Size20,
              }}
            />
           )} 
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
});


export default connect(mapStateToProps)(CustomTabBar)