import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
  Linking,
  AppState
} from 'react-native';
import {StoryScreen, AppButton,ShadowHeader, VideoCard, ReportModal, ReportDetailModal, AlartModal, CustomTimeRow, EyeViewModal} from '../../components';
import Toast from 'react-native-simple-toast';
import Slider from 'react-native-custom-slider';
import {useDispatch, connect} from 'react-redux';
import SwiperFlatList from 'react-native-swiper-flatlist';
import R from '../../res/R';
import Styles from './styles';
import { ShowAllPostRequest } from '../../actions/showAllPost.action';
import { Config } from '../../config';
import axios from 'axios';
import moment from 'moment';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
import DeviceInfo from 'react-native-device-info';
import {useScrollToTop,useIsFocused} from '@react-navigation/native';
import Share from 'react-native-share';
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';
import { DeleteSavedPostRequest, SavedPostRequest } from '../../actions/savedPost.action';
import CommonFunctions from '../../utils/CommonFuntions';
import { BlockPostRequest, BlockUserRequest, ReportPostRequest } from '../../actions/block.action';
import {NativeEventEmitter} from 'react-native';
import AppContent from '../../utils/Content';
import { VideoRatingRequest } from '../../actions/videoRating.action';
import { BottomTabRequest } from '../../actions/bottomtab.action';
const eventEmitter = new NativeEventEmitter('');

const tabBarHeight = screenHeight / 10;
const headerHeight = screenHeight /15;
const statusBarHeight = screenHeight / 20;
const sliderHeight = screenHeight / 10;
const allHeight = tabBarHeight + headerHeight + sliderHeight + headerHeight
const withoutNotchAllHeight =
  tabBarHeight + headerHeight + sliderHeight + statusBarHeight;
const forWithNotch = screenHeight - allHeight;
const forWithoutNotch = screenHeight - withoutNotchAllHeight;
const forNotchflatHeight = tabBarHeight + headerHeight + headerHeight;
const withoutNotchflatHeight = tabBarHeight + headerHeight + statusBarHeight;
const flatListHeightWithNotch = screenHeight - forNotchflatHeight;
const flatListHeightWithOutNotch = screenHeight - withoutNotchflatHeight;


const HomeScreen = (props) => {

  const listRef = react.useRef();

   useScrollToTop(listRef);
  // useScrollToTop(
  //   react.useRef({
  //     scrollToTop: () => ref.current?.scrollToOffset({offset: -100}),
  //   }),
  // );
  let videoRef;
  const dispatch = useDispatch()
  const [currIndex, setCurrIndex] = useState(0)
  const [videoPlayPause, setVideoPlayPause] = useState(false)
  const [videoModalDetail, setVideoModalDetail] = useState()
  const [videoModalPersonalDetail, setVideoModalPersonalDetail] = useState([]);
  const [videoModalTalentDetail, setVideoModalTalentDetail] = useState([]);
  const [videoModalAvailableDetail, setVideoModalAvailableDetail] = useState([]);
  const [sliderValue, setSliderValue] = useState(0); 
  const [modalPicker, setModalPicker] = useState(false);
  const [loading,setLoading] = useState(false)
  const [reportModalPicker, setReportModalPicker] = useState(false);
  const [reportDetailModalPicker, setReportDetailModalPicker] = useState(false);
  const [selectReport, setSelectReport] = useState()
  const [selectTypeReport, setSelectTypeReport] = useState('');
  const [reportPostId, setReportPostId] = useState('')
  const [reportUserId, setReportUserId] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportOkModal, setReportOkModal] = useState(false)
  const [notInterestedOkModal, setNotInterestedOkModal] = useState(false);

  const [pullLoading, setPullLoading] = useState(false)
  const [userProfileId, setUserProfileId] = useState('')
  const [tailentList, setTailentList] = useState([
    {
      id: '1',
      name: 'Music',
    },
    {
      id: '2',
      name: 'Dance',
    },
    {
      id: '3',
      name: 'Fashion',
    },
    {
      id: '4',
      name: 'Music',
    },
  ]);
  const [allVideoPostList, setAllVideoPostList] = useState([])
  const [notiList, setNotiList] = useState()
  const [addLike,setAddLike] = useState(0)



useEffect(() => {
    const listener = (status) => {
      if (status === "background" || status === "inactive") {
        setVideoPlayPause(true);
        console.log("STOPVIDEO")
      }
    };
    AppState.addEventListener("change", listener);
    return () => {
      AppState.removeEventListener("change", listener);
    };
  }, []);




 useEffect(() => {
   const subEmitter = eventEmitter.addListener('custom-event', event => {
     console.log('EVENT', event);
      setAllVideoPostList([]);
     onCallShowAllPostPullLoading();
    //  listRef.current.goToFirstIndex();
   });
   return subEmitter;
 }, [eventEmitter.addListener]);



  useEffect(() => {
    const blur = props.navigation.addListener('blur', () => {
      setVideoPlayPause(true);
    });
    const focus = props.navigation.addListener('focus', () => {
      setVideoPlayPause(false);
    });
    return blur, focus;
  }, [props.navigation]);
  
  useEffect(()=>{
      let arr = tailentList.map((item, index) => {
        item.selected = false;
        return {...item};
      });
      console.log('ARRNEWITEM', arr);
      setTailentList(arr);
      const unsubscribe = props.navigation.addListener('focus', () => {
        screenFocus();
      });
      return unsubscribe;

  },[props.navigation])


  // const onCallDeviceName = () => {
  //   setLoading(true)
  //    let deviceName = DeviceInfo.getModel();
  //    let MaxPosition = deviceName.search('Max');
  //    setLoading(false)
  // }
  const onCallProfile = () => {
   dispatch(
     GetProfileDetailsRequest(response => {
       console.log('PROFILE DETAIL ON APP NAVIGATOR', response);
       setUserProfileId(response.Profile?.user_id);
       setNotiList(response?.unreadNotification);
     }),
   );
  }

  const screenFocus = () => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(R.colors.appColor, true);
    StatusBar.setBarStyle('dark-content', true);
    console.log("SCREEN HEIGHT", screenHeight)
    setAllVideoPostList([]);
    // onCallDeviceName();
    onCallShowPostRefresh();
  };




  const onCallModal = (type,item) => {
    setModalPicker(true);
    if(type == 'videoDetailModal')
    {
      setVideoModalDetail(item)
      setVideoModalPersonalDetail([
        item?.gender,
        `${moment().diff(item?.birth, 'years')} Year`,
        `${item?.profile_address != '' ? item?.profile_address : ''}`,
      ]);
      let tempTalentArray = item?.category;
      let useTalentArray = tempTalentArray.split(',');
      console.log('useTalentArray', useTalentArray);
      setVideoModalTalentDetail(useTalentArray);
      setVideoModalAvailableDetail([
        {'type': item?.job_type1,'amount':item?.full_time_amount},
        {'type': item?.job_type2,'amount':item?.part_time_amount},
        {'type': item?.job_type3,'amount':item?.gigs_amount}
      ]);
    }
  }

const onCallShowPostRefresh = () => {
  // setLoading(true)
  let data = {
    mobile_type: 'ios',
  };
 
  dispatch(
    ShowAllPostRequest(data, response => {
      console.log('SHOW ALL POST RES', response);
      if (response.status == 'success') {
        setCurrIndex(0);
        setAllVideoPostList(response?.Post);
        setSliderValue(0);
        onCallProfile();
        // setLoading(false);
      } else if (response.status == 'tokenError') {
        // setLoading(false);
        props.navigation.replace('LoginScreen');
      }
      // else
      // {
      //   setLoading(false)
      // }
    }),
  );
};


  const onCallShowAllPost = () => {
    // setLoading(true)
    let data = {
      mobile_type:'ios'
    }
    dispatch(ShowAllPostRequest(data,response => {
      console.log('SHOW ALL POST RES', response)
      if (response.status == 'success') {
        setAllVideoPostList([...response?.Post]);
        setSliderValue(0);
      } 
    }))  
  }

    const onCallShowAllPostPullLoading = () => {
      // setLoading(true)
      // setPullLoading(true)
      let data = {
        mobile_type: 'ios',
      };
      dispatch(
        ShowAllPostRequest(data, response => {
          console.log('SHOW ALL POST RES', response);
          if (response.status == 'success') {
            setAllVideoPostList([...response?.Post]);
            // setPullLoading(false)
            // setLoading(false);
            // dispatch(BottomTabRequest('HomeScreen'));


          } else if (response.status == 'tokenError') {
            // setPullLoading(false);
            // setLoading(false);
            // dispatch(BottomTabRequest('HomeScreen'));


            props.navigation.replace('LoginScreen');
          }
          else
          {
          // setPullLoading(false);
            // setLoading(false);
            // dispatch(BottomTabRequest('HomeScreen'));

              
          }
        }),
      );
    };

  const onChangeIndex = ({index}) => {
    console.log("INDEX ITEM",index)
    setVideoPlayPause(false);
    setCurrIndex(index)
    setSliderValue(0);
    // console.log("AllPostInfo",allVideoPostList)
  }

  const onCallVideoRatingAPI = (PercentLike,PostId,index1,userId,userType) => {
    // setLoading(true)
    let data = {
      id: PostId,
      percentage_like: `${PercentLike}`,
      user_id: userId,
      user_type: userType
    };
    
    dispatch(VideoRatingRequest(data,response =>{
      
        if (response.status == 'success') {
          let tempDoc = allVideoPostList;
          let arr = tempDoc.map((item, index) => {
            if (index == index1) {
              item.total_likes = parseInt(item.total_likes) + parseInt(1);
              item.total_rating =
                parseInt(item.total_rating) + parseInt(PercentLike);
              item.postInfo = [
                ...item.postInfo,
                {percentage_like: PercentLike},
              ];
            }
            return {...item};
          });
          setAllVideoPostList(arr);
          console.log('UPdate state', allVideoPostList);
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show(response.message, Toast.SHORT);
        }
      }));
  }

  const onCallConnectNow = (item) => 
  {
    setModalPicker(false) 
     props.userProfile?.Profile?.subscription != 0
       ? props.navigation.navigate('ConnectedProfileScreen', {
           profileId: item?.profileID,
           myUserId: props.userProfile?.Profile?.user_id,
           tailentPost: item
         })
       : props.navigation.navigate('SubscriptionScreen');
  }


  const onPressOrangeAppIcon = (item) => {
    console.log('USER PROFILE ID==>', userProfileId);
    // userProfileId == item.user_id && onCallProfileScreen();
    props.userProfile?.Profile?.subscription != 0
      ? 
      (userProfileId == item.user_id) ?onCallProfileScreen():
      props.navigation.navigate('ConnectedProfileScreen', {
          profileId: item?.profileID,
          myUserId: props.userProfile?.Profile?.user_id,
          tailentPost: item,
        })
      : onCallSubscriptionScreen() ;
  }

  const onCallSubscriptionScreen = () => {
        props.navigation.navigate('SubscriptionScreen')
  }

  const onCallProfileScreen = () => {
      dispatch(BottomTabRequest('ProfileScreen'));
      props.navigation.navigate('ProfileScreen');
  }

  const myCustomShare = async (videoURL) => {
    const shareOptions = {
      title: 'BDiskovered',
      message: `Hey, have you tried Bdiskovered? 
VideoLink :${videoURL}`,
      url: `${videoURL}`,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };

  const onCallReportModal = (postId, userId) => {
    setReportPostId(postId)
    setReportUserId(userId)
    setReportModalPicker(true);
  }

  const onCallReportModalPress1 = (reportType) => {
    setReportModalPicker(false)
    setSelectTypeReport(reportType)
    setNotInterestedOkModal(true);
  }
  const onCallReportModalPress2 = (reportType )=> {
    setReportModalPicker(false);
    setSelectTypeReport(reportType);
    setReportDetailModalPicker(true);
  };
  const onCallReportModalPress3 = (reportType) => {
    setReportModalPicker(false);
    setSelectTypeReport(reportType);
    setReportDetailModalPicker(true);
  };

  const OnCallSelectReport = (index,item) => {
    setSelectReport(index)
    setReportDesc(item.title);
    console.log("ReportDetail",item.title)
    console.log('ReportIndex', index);

  }

  const onCallClosedReportDetailModal = () => {
    setSelectTypeReport('')
    setReportDetailModalPicker(false)
    setSelectReport('')
  }

  const onCallSavePost = (postId,ind) => {
    let data = {
      post_id: postId
    };
    // setLoading(true)
   
    dispatch(SavedPostRequest(data, response =>{
      console.log('Saved Post Response', response);
      if(response.status == 'success')
      {
        const dummyData = allVideoPostList;
         let arr = dummyData.map((item, index) => {
           if (ind == index) {
             item.post_save = !item.post_save;
           }
           return {...item};
         });
        console.log('saved post return', arr);
        setAllVideoPostList(arr);
        //  setLoading(false);
      }
      else
      {
        Toast.show(response?.message, Toast.SHORT);
        // setLoading(false);
      }
    }))
  }

  const onCallRemoveSavePost = (postId,ind) => {
    let data = {
      post_id: postId,
    };
    // setLoading(true);
    dispatch(
      DeleteSavedPostRequest(data, response => {
        console.log('UnSaved Post Response', response);
        if (response.status == 'success') {
          const dummyData = allVideoPostList;
          let arr = dummyData.map((item, index) => {
            if (ind == index) {
              item.post_save = !item.post_save;
            }
            return {...item};
          });
          console.log('saved post return', arr);
          setAllVideoPostList(arr);
          // setLoading(false);

        } else {
          Toast.show(response?.message, Toast.SHORT);
          // setLoading(false);
        }
      }),
    );
  };

  const onCallReportPostValidation = () => {
    return CommonFunctions.isBlank(
      reportDesc.trim(),
      'Select any report reason',
    );
  }

const onCallReportPost = () => {
  if(onCallReportPostValidation())
  {
    onCallReportPostAPI()
  }
}

  const onCallReportPostAPI = (reportTitle) => {
    let data = {
      user_id: reportUserId,
      post_id: reportPostId,
      descritpion: reportTitle,
    };
    console.log('ReportData', data);
    dispatch(
      ReportPostRequest(data, response => {
        console.log('Report Response', response);
        if (response.status == 'success') {
          // Toast.show(response.message, Toast.SHORT)
          onCallClosedReportDetailModal();
          onCallShowAllPost();
          setReportOkModal(true);
        } else {
          Toast.show(response.message, Toast.SHORT);
        }
      }),
    );
  };


  const onCallBlockUser = () => {
    let data = {
      blockId: reportUserId,
    };
    // setLoading(true)
    dispatch(BlockUserRequest(data, response => {
      console.log("BLOCK USER RESPONSE",response)
      if(response.status == 'success')
      {
        // Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        onCallShowAllPost()
        // setLoading(false);

      }
      else
      {
        Toast.show(response.message, Toast.SHORT)
        onCallClosedReportDetailModal();
        // setLoading(false)
      }
    }))
  }

  const onCallBlockPost = () => {
    let data = {
      postId: reportPostId
    };
    dispatch(BlockPostRequest(data, response =>{
      console.log('BLOCK POST RESPONSE', response);

      if (response.status == 'success') {
        setNotInterestedOkModal(false);
        onCallShowAllPost();
      } else {
        Toast.show(response.message, Toast.SHORT);
        setNotInterestedOkModal(false);
      }
    }))
  }

  // const onProgress = (data: OnProgressData) => {
  //   console.log('OnProgress', data.currentTime);
  // };

 const onLoad = data => {
   console.log('ONLOAD START', data);
 };

  // const onSeek = (data: OnSeekData) => {
  //   console.log("Seektimem",data.seekTime)
  //   videoRef?.seek(data.seekTime);
  // };
  
  const updateIndex = ({ viewableItems }) => {
  console.log("index",viewableItems)
  setCurrIndex(viewableItems[0]?.index);
  }
  
  return (
    <StoryScreen
      loading={props.loading || loading}
      statusBarIosStyle={{
        height: DeviceInfo.hasNotch() ? headerHeight : statusBarHeight,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.toggleDrawer()}
          headerHeight={headerHeight}
          leftSource={R.images.menuIcon}
          rightSource2={R.images.bellIcon}
          rightSourceOnPress2={() =>
            props.navigation.navigate('NotificationScreen')
          }
          rightSourceExtraView={
            notiList > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}>
                <Image
                  source={R.images.redCircleIcon}
                  resizeMode={'contain'}
                  style={{
                    height: R.fontSize.Size8,
                    width: R.fontSize.Size8,
                  }}
                />
              </View>
            )
          }
        />

        <View style={{flex: 1}}>
          <SwiperFlatList
            // ref={listRef}
            // index={currIndex}
            refreshing={props.loading}
            // onRefresh={onCallShowAllPostPullLoading}
            vertical={true}
            style={{
              height: DeviceInfo.hasNotch()
                ? flatListHeightWithNotch
                : flatListHeightWithOutNotch,
            }}
            nestedScrollEnabled
            data={allVideoPostList}
            keyExtractor={(item, index) => index.toString()}
            onChangeIndex={onChangeIndex}
            onViewableItemsChanged={updateIndex}
            renderItem={({item, index}) => {
              console.log('TYPE', item?.type);
              return (
                <View
                  key={index}
                  style={{
                    height: DeviceInfo.hasNotch()
                      ? flatListHeightWithNotch
                      : flatListHeightWithOutNotch,
                  }}>
                  <Pressable
                    onPress={() => setVideoPlayPause(!videoPlayPause)}
                    style={({pressed}) => [
                      {
                        opacity: pressed ? 1 : 1,
                        height: DeviceInfo.hasNotch()
                          ? forWithNotch
                          : forWithoutNotch,
                      },
                    ]}>
                    <VideoCard
                      ref={ref => {
                        videoRef = ref;
                      }}
                      userStatusBackgroundColor={
                        item?.user_status == 'available'
                          ? R.colors.whatsAppColor
                          : R.colors.redColor
                      }
                      onPressUserIcon={() => {
                        props.userProfile?.Profile?.user_id == item.user_id
                          ? onCallProfileScreen()
                          : onCallModal('videoDetailModal', item);
                      }}
                      eyeonPress={() => {
                        item?.type == 'post_add' ? console.log('Addon') : null;
                      }}
                      eyeIcon={
                        item?.type == 'post_add' ? R.images.whiteDotIcon : null
                      }
                      videoUrl={`${Config.API_URL}${item?.post?.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userImage={
                        item?.avatar != Config.USER_PROFILE_URL
                          ? {
                              uri: `${Config.API_URL}${item?.avatar?.replace(
                                'http://localhost:8080/',
                                '',
                              )}`,
                            }
                          : R.images.inActiveProfileIcon
                      }
                      userName={
                        item?.type == 'post_add' ? item?.title : item?.username
                      }
                      videoCat={
                        item?.profile_address != '' ? item?.profile_address : ''
                      }
                      bottomTitle={item?.title}
                      bottomDiscription={item?.description}
                      usdPrice={
                        item?.type == 'post_add'
                          ? null
                          : item?.amount == '0'
                          ? null
                          : `USD ${item?.amount} ${
                              item.negotiable == 'Yes' ? '(Negotiable)' : ''
                            }`
                      }
                      onLoad={onLoad}
                      paused={currIndex !== index || videoPlayPause}
                      onPressSave={() => {
                        item?.post_save
                          ? onCallRemoveSavePost(item?.postID, index)
                          : onCallSavePost(item?.postID, index);
                      }}
                      saveIcon={
                        item?.post_save
                          ? R.images.orangeSaveIcon1
                          : R.images.bookmarkIcon
                      }
                      // saveTitle={item?.post_save ? '' : 'Save'}
                      onPressShare={() =>
                        myCustomShare(
                          `${Config.API_URL}${item?.post.replace(
                            'http://localhost:8080/',
                            '',
                          )}`,
                        )
                      }
                      shareFiled={item?.type == 'post_add' && true}
                      reportHidden={
                        item?.user_id == props.userProfile?.Profile?.user_id &&
                        true
                      }
                      onPressReport={() =>
                        onCallReportModal(item?.postID, item?.user_id)
                      }
                    />
                  </Pressable>
                  {item?.type == 'post_add' ? (
                    <Pressable
                      onPress={() => Linking.openURL(item?.url_link)}
                      style={({pressed}) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          height: sliderHeight,
                          backgroundColor: R.colors.appColor,
                          paddingHorizontal: R.fontSize.Size12,
                        },
                      ]}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size16,
                            color: R.colors.white,
                            fontWeight: '500',
                          }}>
                          {'Visit Now'}
                        </Text>
                      </View>
                      <View>
                        <Image
                          source={R.images.whiteChevronIcon}
                          resizeMode={'contain'}
                        />
                      </View>
                    </Pressable>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginHorizontal: R.fontSize.Size12,
                        alignItems: 'center',
                        height: sliderHeight,
                        justifyContent: 'center',
                      }}>
                      <View style={{flex: 1}}>
                        <View>
                          <Slider
                            disabled={
                              item?.postInfo != 'undefined' &&
                              item?.postInfo != null &&
                              item?.postInfo[0]?.percentage_like != null
                                ? true
                                : false
                            }
                            value={
                              item?.postInfo != 'undefined' &&
                              item?.postInfo != null &&
                              item.postInfo[0]?.percentage_like != null
                                ? parseInt(item.postInfo[0]?.percentage_like)
                                : sliderValue[index]
                            }
                            minimumValue={0}
                            maximumValue={100}
                            customMinimumTrack={
                              <View
                                style={{
                                  height: R.fontSize.Size8,
                                  backgroundColor: R.colors.appColor,
                                  borderRadius: R.fontSize.Size5,
                                }}
                              />
                            }
                            customMaximumTrack={
                              <View
                                style={{
                                  height: R.fontSize.Size8,
                                  backgroundColor:
                                    R.colors.placeholderTextColor,
                                  borderRadius: R.fontSize.Size5,
                                }}
                              />
                            }
                            minimumTrackTintColor={R.colors.white}
                            maximumTrackTintColor={R.colors.white}
                            onValueChange={val => setSliderValue(val)}
                            onSlidingComplete={value => {
                              console.log('SLIDE COMPLETE', value?.toFixed(0));
                              onCallVideoRatingAPI(
                                value?.toFixed(0),
                                item?.postID,
                                index,
                                item?.user_id,
                                item?.user_type,
                              );
                            }}
                            customThumb={
                              <View
                                style={{
                                  overflow: 'hidden',
                                  top: 5,
                                  left: 0,
                                  right: 0,
                                }}>
                                <Image
                                  source={R.images.redHeartIcon}
                                  style={{
                                    width: R.fontSize.Size35,
                                    height: R.fontSize.Size35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}
                                  resizeMode={'contain'}
                                />
                              </View>
                            }
                          />
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size12,
                              fontWeight: '700',
                              color: R.colors.placeHolderColor,
                            }}>
                            {'Liked By '}
                            <Text style={{color: R.colors.appColor}}>
                              {item?.total_likes != ''
                                ? item?.total_likes
                                : '0'}
                            </Text>
                          </Text>
                          <View
                            style={{
                              width: 1,
                              height: R.fontSize.Size14,
                              backgroundColor: R.colors.placeHolderColor,
                              marginHorizontal: R.fontSize.Size10,
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size12,
                              fontWeight: '700',
                              color: R.colors.placeHolderColor,
                            }}>
                            {'Average Like '}
                            <Text style={{color: R.colors.appColor}}>
                              {item?.total_rating != '' &&
                              item?.total_rating != '0'
                                ? `${parseInt(item?.total_rating/item?.total_likes)}%`
                                : '0%'}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingHorizontal: R.fontSize.Size5,
                          height: R.fontSize.Size26,
                        }}>
                        <Text
                          style={{
                            color: R.colors.appColor,
                            fontSize: R.fontSize.Size12,
                            fontWeight: '700',
                          }}>
                          {item?.postInfo != 'undefined' &&
                          item?.postInfo != null &&
                          item?.postInfo[0]?.percentage_like != null
                            ? `${parseInt(item.postInfo[0]?.percentage_like)}%`
                            : `${sliderValue.toFixed(0)}%`}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => onPressOrangeAppIcon(item)}
                        style={({pressed}) => [
                          {
                            // marginHorizontal: R.fontSize.Size8,
                            alignItems: 'center',
                            opacity: pressed ? 0.5 : 1,
                          },
                        ]}>
                        <Image
                          source={R.images.orangeAppIcon}
                          style={{
                            height: R.fontSize.Size30,
                            width: R.fontSize.Size30,
                            marginBottom: R.fontSize.Size6,
                          }}
                          resizeMode={'contain'}
                        />
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size14,
                            fontWeight: '500',
                            color: R.colors.placeHolderColor,
                          }}
                          numberOfLines={1}>
                          {'Connect'}
                        </Text>
                      </Pressable>
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
      <EyeViewModal
        visible={modalPicker}
        onRequestClose={() => setModalPicker(false)}
        cancelOnPress={() => setModalPicker(false)}
        userProfile={
          (videoModalDetail?.avatar != Config.USER_PROFILE_URL && videoModalDetail?.avatar != null)
          ?
          {
          uri: `${Config.API_URL}${videoModalDetail?.avatar.replace(
            'http://localhost:8080/',
            '',
          )}`,
        }
        :
        R.images.inActiveProfileIcon
      }
        userName={videoModalDetail?.username}
        userStatusBackgroundColor={
          videoModalDetail?.user_status == 'available'
            ? R.colors.whatsAppColor
            : R.colors.redColor
        }
        bio={videoModalDetail?.bio}
        personalList={videoModalPersonalDetail.map((item, index) => {
          return (
            <View key={index} style={Styles.videoModalMapView}>
              {item != '' && (
                <View style={Styles.videoModalPersonalDetailView} />
              )}
              <Text style={Styles.videoModalPersonalDetailText}>{item}</Text>
            </View>
          );
        })}
        talentList={videoModalTalentDetail.map((item, index) => {
          return (
            <View key={index} style={Styles.videoModalTalentView}>
              <Text style={Styles.videoModalTalentText} numberOfLines={1}>
                {item}
              </Text>
            </View>
          );
        })}
        availableList={videoModalAvailableDetail.map((item, index) => {
          return (
            <View key={index}>
              {item?.amount != '' && item?.amount != null ? (
                <CustomTimeRow
                  leftTitle={item?.type}
                  rightText={item?.amount}
                  rightDayHours={item?.type == 'Full Time' ? '/day' : '/hrs'}
                />
              ) : null}
            </View>
          );
        })}
        connectOnPress={() => {
          onCallConnectNow(videoModalDetail);
        }}
      />
      <ReportModal
        visible={reportModalPicker}
        onRequestClose={() => setReportModalPicker(false)}
        closeModal={() => setReportModalPicker(false)}
        onPress1={() => onCallReportModalPress1('cutVideo')}
        onPress2={() => onCallReportModalPress2('dontRecommend')}
        onPress3={() => onCallReportModalPress3('report')}
        blockTitleColor={R.colors.blockRedColor}
      />
      <ReportDetailModal
        visible={reportDetailModalPicker}
        onRequestClose={() => onCallClosedReportDetailModal()}
        closeModal={() => onCallClosedReportDetailModal()}
        onPressCancel={() => onCallClosedReportDetailModal()}
        onPressReport={() => {
          selectTypeReport == 'dontRecommend'
            ? onCallBlockUser()
            : onCallBlockPost();
        }}
        modaljustifyContent={'flex-end'}
        buttonHidden={selectTypeReport == 'report' ? true : false}
        reportTitle={selectTypeReport == 'report' ? 'Proceed' : 'Proceed'}
        title={selectTypeReport == 'report' ? 'Report Post' : ''}
        ReportContent={
          <View>
            {selectTypeReport == 'report' && (
              <View>
                {/* <Text
                  style={[Styles.dontRecText, {fontSize: R.fontSize.Size14}]}>
                  {'Report Post'}
                </Text> */}
                <Text
                  style={[
                    Styles.dontRecText,
                    {
                      color: R.colors.placeHolderColor,
                      fontSize: R.fontSize.Size14,
                    },
                  ]}>
                  {'Why are you reporting this post? '}
                </Text>
                <ScrollView
                  contentContainerStyle={{
                    flexGrow: 1,
                    marginTop: R.fontSize.Size4,
                  }}
                  showsVerticalScrollIndicator={false}>
                  {AppContent.ReportList.map((item, index) => {
                    return (
                      <Pressable
                        key={index}
                        onPress={() => onCallReportPostAPI(item.title)}
                        style={({pressed}) => [
                          Styles.reportContentView,
                          {opacity: pressed ? 0.5 : 1},
                        ]}>
                        <View style={{flex: 1, marginLeft: R.fontSize.Size10}}>
                          <Text
                            style={Styles.reportContentTitle}
                            numberOfLines={2}>
                            {item.title}
                          </Text>
                        </View>
                        <Image
                          source={R.images.chevronRightIcon}
                          style={Styles.reportContentCheckIcon}
                          resizeMode={'contain'}
                        />
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}
            {selectTypeReport == 'cutVideo' && (
              <View style={Styles.cutVideoView}>
                <Text style={Styles.cutVideoText}>
                  {AppContent.cutVideoContent}
                </Text>
              </View>
            )}
            {selectTypeReport == 'dontRecommend' && (
              <View style={Styles.dontRecView}>
                <Text style={Styles.dontRecText}>
                  {'Are you sure you want to block?'}
                </Text>
                <Text
                  style={[
                    Styles.dontRecText,
                    {
                      color: R.colors.placeHolderColor,
                      marginTop: R.fontSize.Size4,
                    },
                  ]}>
                  {AppContent.dontRecContent}
                </Text>
              </View>
            )}
          </View>
        }
      />
      <AlartModal
        visible={reportOkModal}
        onRequestClose={() => setReportOkModal(false)}
        icon={R.images.checkOrangeIcon}
        marginHorizontalModal={R.fontSize.Size35}
        title={AppContent.reportOkContent}
        onPress={() => setReportOkModal(false)}
      />
      <AlartModal
        visible={notInterestedOkModal}
        onRequestClose={() => setNotInterestedOkModal(false)}
        icon={R.images.checkOrangeIcon}
        marginHorizontalModal={R.fontSize.Size35}
        title={AppContent.cutVideoContent}
        onPress={() => onCallBlockPost()}
      />
    </StoryScreen>
  );
};

const mapStateToProps = (state, props) => ({
  loading:
    state.showAllPostRoot.loading ||
    state.auth.loading ||
    state.getProfileDetailsRoot.loading ||
    // state.savedPostRoot.loading ||
    // state.videoRateRoot.loading ||
    state.blockRoot.loading
    ,
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps)(HomeScreen);
