import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
  SafeAreaView,
  Modal,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native';
import {
  CustomCardView,
  Header,
  StoryScreen,
  AppButton,
  CustomCardTextInput,
  ShadowHeader,
  CustomCardLine,
  CustomLineTextInput,
} from '../../components';
import {connect, Connect, useDispatch} from 'react-redux';
import R from '../../res/R';
import Geolocation from 'react-native-geolocation-service';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;


const SearchScreen = props => {

  const RequestLocationPermission = async () => {
    if (Platform.OS == 'ios') {
      console.log('LOCATION');
      Geolocation.setRNConfiguration({
        authorizationLevel: 'whenInUse',
      });
      let permissionResult = await Geolocation.requestAuthorization('whenInUse');
      console.log(permissionResult)
      if (permissionResult == 'granted') {
        getOneTimeLocation();
      } else {
        console.log('Location Error Location Denied', error);
      }
        // IOS permission request does not offer a callback :/
        return null;
    } else if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Bdiskovered Access your Location Permission',
            message: 'Want to access your location ' + 'so you can Allow us.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        } else {
          console.log('Location Error Location Denied', error);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

    const getOneTimeLocation =  () => {
      console.log('ONE TIME');
    
      
        Geolocation.getCurrentPosition(
          position => {
            console.log('POSITION', position);
            
          },
          error => {
            console.log('Location Error', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0,
            forceRequestLocation: true,
          },
        );
      
    };
 
  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.toggleDrawer()}
          leftSource={R.images.menuIcon}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text>{'Work On Progress'}</Text>
                </View>
                <TouchableOpacity onPress={() => RequestLocationPermission()}>
                  <Text>LOCATION</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </StoryScreen>
  );
};

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStatetoProps)(SearchScreen);
