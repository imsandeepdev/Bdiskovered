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
import { NotificationDeleteRequest, NotificationListRequest } from '../../actions/notification.action';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/messaging';
import moment from 'moment/moment';


const NotificationScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [notiList, setNotiList] = useState([])
  const [fcmToken, setFcmToken] = useState('');
  const [newFcmToken, setNewFcmToken] = useState('');
  const [myUserId, setMyUserId] = useState('');



  useEffect(() => {

    const unsubscribe = props.navigation.addListener('focus', () => {
      screenFocus();
    });
    return unsubscribe;
    

  }, [props.navigation]);

  const screenFocus = () => {
    onCallNotificationList();
    onCallFCMToken();
    // onCallFCM();
    setMyUserId(props.userProfile?.Profile?.user_id);
  }

const onCallFCMToken = async () => {
  setLoading(true);
  let checkToken = await AsyncStorage.getItem('fcmToken');
  console.log('TOKEN', checkToken);
  setFcmToken(checkToken)
  setLoading(false);
};

// const onCallFCM = async() => {
//   setLoading(true)
//   const fcmToken = await firebase.messaging().getToken();
//   setNewFcmToken(fcmToken)
//   setLoading(false);

// }
 
const onCallNotificationList = () => {
  setLoading(true)
  dispatch(NotificationListRequest(response =>{
    console.log("NOTIFICATION LIST RES", response)
    if(response.status == 'success')
    {
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

const onCallDeleteNoti = (item) => {

  console.log("ITEM",item)

  let data = {
    notification_id: item._id,
    notification_type: item.type,
  };
  console.log("DATA",data)
  setLoading(true)
  dispatch(NotificationDeleteRequest(data,response=>{
    console.log("NOTIFICATION DELETE",response)
    if(response.status == 'success')
    {
      if (item.type == 'Connect')
      {
        onConnectChat(item);
      }
      else
      {
        onCallVideoList(item);
      }
    }
    setLoading(false)
  }))
}

const onCallVideoList = (item) => {
  props.navigation.navigate('ParticularVideoScreen', {
    videoPostId: item?.id,
    from: 'ProfileScreen',
  });
}


const onConnectChat = (item) => {

    props.navigation.navigate('ChatScreen', {
      tailentUserId: item?.id,
      MyUserId: myUserId,
      userName: item?.username,
      userItem: item,
      fireID:
        item?.id > myUserId
          ? myUserId + '+' + item?.id
          : item?.id + '+' + myUserId,
    })
}

  return (
    <StoryScreen loading={loading || props.loading}>
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
          {/* <Text>{`FCMTOKEN==>${fcmToken}`}</Text> */}
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={notiList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                // disabled={item.type == 'Connect' ? false : true}
                onPress={() => onCallDeleteNoti(item)}
                style={({pressed}) => [
                  {
                    paddingVertical: R.fontSize.Size6,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: R.colors.placeholderTextColor,
                    backgroundColor: R.colors.white,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}>
                <View
                  style={{
                    height: R.fontSize.Size40,
                    width: R.fontSize.Size40,
                    borderRadius: R.fontSize.Size30,
                    borderWidth: 1,
                    borderColor: R.colors.placeholderTextColor,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {item?.avatar != 'http://localhost:8080/profile/user.png' ? (
                    <Image
                      source={{
                        uri: `${Config.API_URL}${item?.avatar?.replace(
                          'http://localhost:8080/',
                          '',
                        )}`,
                      }}
                      style={{
                        height: R.fontSize.Size40,
                        width: R.fontSize.Size40,
                      }}
                      resizeMode={'cover'}
                    />
                  ) : (
                    <Image
                      source={R.images.inActiveProfileIcon}
                      style={{
                        height: R.fontSize.Size40,
                        width: R.fontSize.Size40,
                      }}
                      resizeMode={'cover'}
                    />
                  )}
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: R.fontSize.Size15,
                  }}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size12,
                      fontWeight: '400',
                      color: R.colors.primaryTextColor,
                    }}
                    numberOfLines={2}>
                    {item?.message}
                  </Text>
                  {/* <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size12,
                      fontWeight: '400',
                      color: R.colors.primaryTextColor,
                    }}
                    numberOfLines={2}>
                    {item?.desc}
                  </Text> */}
                </View>
                <View style={{paddingLeft: R.fontSize.Size10}}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size10,
                      color: R.colors.placeHolderColor,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>
                    {`${moment(item?.createdAt).format('Do MMM')}\n${moment(
                      item?.createdAt,
                    ).format('hh:mm:A')}`}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          
          // renderHiddenItem={({item, index}) => (
          //   <Pressable
          //     onPress={() => onCallDeleteNoti(item)}
          //     style={({pressed}) => [
          //       {
          //         width: R.fontSize.Size50,
          //         position: 'absolute',
          //         right: 2,
          //         top: 2,
          //         bottom: 2,
          //         alignItems: 'center',
          //         opacity: pressed ? 0.5 : 1,
          //         justifyContent: 'center',
          //       },
          //     ]}>
          //     <View
          //       style={{
          //         marginVertical: R.fontSize.Size5,
          //         alignItems: 'center',
          //         justifyContent: 'center',
          //         borderRadius: R.fontSize.Size4,
          //         height: R.fontSize.Size50,
          //         width: R.fontSize.Size50,
          //         backgroundColor: R.colors.appColor,
          //       }}>
          //       <Image
          //         source={R.images.deleteIcon}
          //         style={{
          //           height: R.fontSize.Size40,
          //           width: R.fontSize.Size35,
          //         }}
          //         resizeMode={'contain'}
          //       />
          //     </View>
          //   </Pressable>
          // )}
          // leftOpenValue={0}
          // rightOpenValue={-55}
          ListEmptyComponent={() => {
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
                  {`Notifications not found`}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </StoryScreen>
  );
};

const mapStatetoProps = (state, props) => ({
  loading: state.notificationRoot.loading,
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStatetoProps)(NotificationScreen);
