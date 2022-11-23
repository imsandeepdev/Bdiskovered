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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = props => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('SplashScreen');

  useEffect(()=>{

    if(props.authToken)
    {
      dispatch(GetProfileDetailsRequest(response=>{
        console.log("PROFILE DETAIL ON APP NAVIGATOR",response)
        AsyncStorage.setItem('MyUserId', response?.Profile?.user_id);
      }))
    }
    console.log(props.authToken)
    const initialRouteName = props.authToken != '' ? 'HomeMenu' : 'LoginScreen';
    setInitialRoute(initialRouteName);

  },[]);


  return (
    <NavigationContainer ref={navigationRef} linking={props.linking}>
      <Stack.Navigator
        // initialRouteName={initialRoute}
        initialRouteName={props.authToken ? 'HomeMenu' : 'LoginScreen'}
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
