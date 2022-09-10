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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = props => {

  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('LoginScreen');

 
  

  return (
    <NavigationContainer ref={navigationRef} linking={props.linking}>
      <Stack.Navigator initialRouteName={initialRoute}>
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
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="HomeScreen"
      >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SearchScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="UploadScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const CustomTabBar1 = props => {
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
    <View style={{backgroundColor: R.colors.white}}>
      <View
        style={{
          justifyContent: 'space-around',
          height: R.fontSize.Size60,
          flexDirection: 'row',
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
                ? R.images.activeMaleIcon
                : R.images.inactiveMaleIcon
            }
            resizeMode={'contain'}
            style={{
              height: R.fontSize.EXXXLarge,
              width: R.fontSize.EXXXLarge,
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
                ? R.images.activeMaleIcon
                : R.images.inactiveMaleIcon
            }
            resizeMode={'contain'}
            style={{
              height: R.fontSize.EXXXLarge,
              width: R.fontSize.EXXXLarge,
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
                ? R.images.activeMaleIcon
                : R.images.inactiveMaleIcon
            }
            resizeMode={'contain'}
            style={{
              height: R.fontSize.EXXXLarge,
              width: R.fontSize.EXXXLarge,
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
                ? R.images.activeMaleIcon
                : R.images.inactiveMaleIcon
            }
            resizeMode={'contain'}
            style={{
              height: R.fontSize.EXXXLarge,
              width: R.fontSize.EXXXLarge,
            }}
          />
        </TouchableOpacity>
        
      </View>
    </View>
  );
};


export default AppNavigator;
