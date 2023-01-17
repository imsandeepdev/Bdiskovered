import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, PermissionsAndroid,Image} from 'react-native';
import {navigationRef} from './NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import SignupScreen from '../screens/SignupScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import TalentScreen from '../screens/TalentScreen';
import HomeScreen from '../screens/HomeScreen';
import Menu from '../screens/Menu';
import R from '../res/R';
import CustomTabBar from '../screens/CustomTabBar';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import PaymentResultScreen from '../screens/PaymentResultScreen';
import CardScreen from '../screens/CardScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UploadVideoScreen from '../screens/UploadVideoScreen';
import VideoScreen from '../screens/VideoScreen';
import TalentFinishScreen from '../screens/TalentFinishScreen';
import {connect, useDispatch} from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import UserViewAllScreen from '../screens/UserViewAllScreen';
import PopularViewAllScreen from '../screens/PopularViewAllScreen';
import ConnectedProfileScreen from '../screens/ConnectedProfileScreen';
import { GetProfileDetailsRequest } from '../actions/getProfile.action';
import SearchScreen from '../screens/SearchScreen';
import TailentVideoList from '../screens/TailentVideoList';
import WebViewScreen from '../screens/WebViewScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ChatScreen from '../screens/ChatScreen';
import CardDetailScreen from '../screens/CardDetailScreen';
import FilterVideoScreen from '../screens/FilterVideoScreen';
import ParticularVideoScreen from '../screens/ParticularVideoScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoResultScreen from '../screens/NoResultScreen';
import { LoginSessionRequest } from '../actions/loginSession.action';
import DeviceInfo from 'react-native-device-info';
import { UserSignOutRequest } from '../actions/signUp.action';
import CompressVideo from '../screens/CompressVideo';
import SavedPostList from '../screens/SavedPostList';
import SavedVideoScreen from '../screens/SavedVideoScreen';
import BlockUserScreen from '../screens/BlockUserScreen';
import HelpScreen from '../screens/HelpScreen';
import FaqScreen from '../screens/FaqScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = props => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('SplashScreen');
  const [sessionStatus, setSessionStatus] = useState(true);



  useEffect(()=>{
    setLoading(true)
    props.authToken && OnCallStartSessionStatus();
    if(props.authToken)
    {
      dispatch(GetProfileDetailsRequest(response=>{
        console.log("PROFILE DETAIL ON APP NAVIGATOR",response)
        AsyncStorage.setItem('MyUserId', response?.Profile?.user_id);
        AsyncStorage.setItem('MyUserMobile', response?.Profile?.mobile);

      }))
    }
    console.log(props.authToken)
    const initialRouteName = props.authToken  ? 'HomeMenu' : 'LoginScreen';
    setInitialRoute(initialRouteName);
    // const interval = setInterval(() => {onCheckSessionStatus()}, 10000);
    // return () => {
    //   clearInterval(interval);
    // },
    setLoading(false); 

  },[]);

  const OnCallStartSessionStatus = async()=>{
      try {
        await AsyncStorage.setItem('sessionStatus','start');
      } catch (e) {
        console.log("ERR",e)
      }
  }

   const OnCallEndSessionStatus = async () => {
     try {
       await AsyncStorage.setItem('sessionStatus', 'end');
     } catch (e) {
       console.log("ERR",e)
     }
   };


  const onCheckSessionStatus = async() => {
    let tempSession = await AsyncStorage.getItem('sessionStatus');
    console.log("TEM SESSION",tempSession)
    if(tempSession == 'start')
    {
      OnCallLoginSession()
    }
    else
    {
      OnEndLoginSession()
    }
  }

  const OnEndLoginSession = () => {
    console.log('End Session Now');
  }

  const OnCallLoginSession = async () => {
    
    let userFcmToken = await AsyncStorage.getItem('fcmToken')
    let userMobileNo = await AsyncStorage.getItem('MyUserMobile');

    console.log("USER FCM TOKEN", userFcmToken)
    console.log('USER MOBILE NO', userMobileNo);
    onCallLoginSessionAPI(userFcmToken, userMobileNo);
  };

    const onCallLoginSessionAPI = (fcmToken,userMobile) => {
      let data = {
        mobile: userMobile,
        device_token: fcmToken,
      };
      console.log('DATA', data);

      dispatch(
        LoginSessionRequest(data, response => {
          console.log('Response Login Session', response?.data);

          if (
            response?.data?._id != undefined &&
            response?.data?.device_info?.isLoggedIn != 0
          ) {
            console.log(response?.data?._id);
            console.log('Only Call Session ');

          } else {
            onCallDeviceName();
          }
          
        }),
      );
    };


     const onCallDeviceName = () => {
       DeviceInfo.getDeviceName().then(deviceName => {
         console.log('DEVICE NAME', deviceName);
         onCallLogout(deviceName);
       });
     };

     const onCallLogout = async deviceName => {
      setLoading(true)
      OnCallEndSessionStatus();
       const value = await AsyncStorage.getItem('deviceAccess_token');
       console.log('VALUE', value);
       let data = {
         device_name: deviceName,
         device_token: value,
       };
       console.log('LOGDATA', data);
       dispatch(
         UserSignOutRequest(data, response => {
           console.log('LOGOUT ON APP NAVIGATOR', response);
           setInitialRoute('LoginScreen')
           setLoading(false)
         }),
       );
     };
  
    if(loading)
    {
      return <SplashScreen/>
    }

  return (
    <NavigationContainer ref={navigationRef} linking={props.linking}>
      <Stack.Navigator
        initialRouteName={initialRoute}
        // initialRouteName={props.authToken ? 'HomeMenu' : 'LoginScreen'}
        screenOptions={{gestureEnabled: false}}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserTypeScreen"
          component={UserTypeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TalentScreen"
          component={TalentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeMenu"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PaymentResultScreen"
          component={PaymentResultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CardScreen"
          component={CardScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateProfileScreen"
          component={UpdateProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubscriptionScreen"
          component={SubscriptionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UploadVideoScreen"
          component={UploadVideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TalentFinishScreen"
          component={TalentFinishScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserViewAllScreen"
          component={UserViewAllScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PopularViewAllScreen"
          component={PopularViewAllScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConnectedProfileScreen"
          component={ConnectedProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UploadScreen"
          component={UploadVideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TailentVideoList"
          component={TailentVideoList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ConnectionScreen"
          component={ConnectionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CardDetailScreen"
          component={CardDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FilterVideoScreen"
          component={FilterVideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ParticularVideoScreen"
          component={ParticularVideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NoResultScreen"
          component={NoResultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompressVideoScreen"
          component={CompressVideo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavedPostListScreen"
          component={SavedPostList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SavedVideoScreen"
          component={SavedVideoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BlockUserScreen"
          component={BlockUserScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HelpScreen"
          component={HelpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FaqScreen"
          component={FaqScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function Home({route}) {
  return (
    <Drawer.Navigator
      drawerContent={props => <Menu {...props} />}
      initialRouteName="HomeScreen">
      <Drawer.Screen name="Dashboard" component={OnCustomTabs} options={{headerShown:false}}/>
    </Drawer.Navigator>
  );
}

const OnCustomTabs = props => {
  // const getTabBarVisibility = (route) => {
  //   const routeName = route.state ? route.state.routes[route.state.index].name : '';
  //   if(routeName == 'ChatScreen'){
  //     return false;
  //   }
  //   return true;
  // }
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="HomeScreen">
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="UploadScreen"
        component={UploadVideoScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
   userType: state.auth.userType,
});

export default connect(mapStatetoProps)(AppNavigator);
