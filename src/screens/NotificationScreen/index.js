import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
  Dimensions
} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import {Config} from '../../config';
import {SwipeListView} from 'react-native-swipe-list-view';
import { NotificationListRequest } from '../../actions/notification.action';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const notificationList = [
  {
    id: '1',
    title:
      'First NitificationFun for my own blog, on this occasion I will explain to you in connection with no profile picture icon',
    desc: 'Description of notificationFun for my own blog, on this occasion I will explain to you in connection with no profile picture icon',
    date: '23 May',
    year: '2022',
    avatar:
      'https://cdn2.vectorstock.com/i/1000x1000/26/01/young-executive-woman-profile-icon-vector-9692601.jpg',
  },
  {
    id: '2',
    title: 'First Nitification',
    desc: 'Description of notification',
    date: '23 May',
    year: '2022',
    avatar:
      'https://cdn2.vectorstock.com/i/1000x1000/26/01/young-executive-woman-profile-icon-vector-9692601.jpg',
  },
  {
    id: '2',
    title: 'First Nitification',
    desc: 'Description of notification',
    date: '23 May',
    year: '2022',
    avatar:
      'https://cdn2.vectorstock.com/i/1000x1000/26/01/young-executive-woman-profile-icon-vector-9692601.jpg',
  },
];

const NotificationScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [notiList, setNotiList] = useState([])
  const [fcmToken, setFcmToken] = useState();


  useEffect(() => {
    onCallNotificationList()
    onCallFCMToken()
  }, [props.navigation]);

const onCallFCMToken = async () => {
  setLoading(true)
  await AsyncStorage.getItem('fcmToken', (err, result) => {
    console.log('FCM TOKEN', result);
    setFcmToken(result);
  setLoading(false);

  });
};
 
const onCallNotificationList = () => {
  setLoading(true)
  dispatch(NotificationListRequest(response =>{
    console.log("NOTIFICATION LIST RES", response)
    if(response.status == 'success')
    {
    Toast.show(response.message, Toast.SHORT);

    setNotiList(response.dataList)
    setLoading(false);

    }
    else
    {
    Toast.show(response.message, Toast.SHORT)
    setLoading(false);

    }
  }))
}


  return (
    <StoryScreen loading={loading}>
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={'Notifications'}
      />
      <View
        style={{
          height: R.fontSize.Size2,
          backgroundColor: R.colors.placeholderTextColor,
          width: '100%',
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: R.fontSize.Size20,
        }}>
        <SwipeListView
          data={notiList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                key={index}
                style={{
                  paddingVertical: R.fontSize.Size6,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: R.colors.placeholderTextColor,
                  backgroundColor: R.colors.white,
                }}>
                <View
                  style={{
                    height: R.fontSize.Size55,
                    width: R.fontSize.Size55,
                    borderRadius: R.fontSize.Size30,
                    borderWidth: 1,
                    borderColor: R.colors.placeholderTextColor,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={{uri: item?.avatar}}
                    style={{
                      height: R.fontSize.Size50,
                      width: R.fontSize.Size50,
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: R.fontSize.Size15,
                  }}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size15,
                      fontWeight: '700',
                      color: R.colors.primaryTextColor,
                    }}
                    numberOfLines={1}>
                    {item?.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size12,
                      fontWeight: '400',
                      color: R.colors.primaryTextColor,
                    }}
                    numberOfLines={2}>
                    {item?.desc}
                  </Text>
                </View>
                <View style={{paddingLeft: R.fontSize.Size10}}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size10,
                      color: R.colors.placeHolderColor,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>{`${item?.date}\n${item?.year}`}</Text>
                </View>
              </View>
            );
          }}
          renderHiddenItem={({item, index}) => (
            <Pressable
              onPress={() => console.log('delete')}
              style={({pressed}) => [
                {
                  width: R.fontSize.Size50,
                  position: 'absolute',
                  right: 2,
                  top: 2,
                  bottom: 2,
                  alignItems: 'center',
                  opacity: pressed ? 0.5 : 1,
                  justifyContent: 'center',
                },
              ]}>
              <View
                style={{
                  marginVertical: R.fontSize.Size5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: R.fontSize.Size4,
                  height: R.fontSize.Size50,
                  width: R.fontSize.Size50,
                  backgroundColor: R.colors.appColor,
                }}>
                <Image
                  source={R.images.deleteIcon}
                  style={{
                    height: R.fontSize.Size40,
                    width: R.fontSize.Size35,
                  }}
                  resizeMode={'contain'}
                />
              </View>
            </Pressable>
          )}
          leftOpenValue={0}
          rightOpenValue={-55}
          ListEmptyComponent={()=>{
             return (
               <View
                 style={{
                   alignItems: 'center',
                   justifyContent: 'center',
                   height: screenHeight / 1.2,
                   width: '100%',
                 }}>
                 <Text
                   style={{
                     fontFamily: R.fonts.regular,
                     fontSize: R.fontSize.Size14,
                     fontWeight: '700',
                     color: R.colors.placeHolderColor,
                   }}>
                   {`No notifications yet!`}
                 </Text>
                 <Text>{fcmToken}</Text>
                
               </View>
             );
          }}
        />
      </View>
    </StoryScreen>
  );
};

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStatetoProps)(NotificationScreen);
