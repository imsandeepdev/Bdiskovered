import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
} from 'react-native';
import {StoryScreen, AppButton,ShadowHeader, VideoCard, ReportModal, ReportDetailModal, AlartModal} from '../../components';
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
import {useScrollToTop, useFocusEffect,useIsFocused} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserLocationRequest } from '../../actions/userLocation.action';
import Share from 'react-native-share';
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';
import { DeleteSavedPostRequest, SavedPostRequest } from '../../actions/savedPost.action';
import CommonFunctions from '../../utils/CommonFuntions';
import { BlockPostRequest, BlockUserRequest, ReportPostRequest } from '../../actions/block.action';
import {NativeRouter, Route, Link} from 'react-router-native';
import { Routes } from 'react-router-dom';
import {NativeEventEmitter} from 'react-native';
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

const ReportList = [
  {
    id: '1',
    title: 'Violence',
  },
  {
    id: '2',
    title: 'Misinformation',
  },
  {
    id: '3',
    title: 'Sexually explicit',
  },
  {
    id: '4',
    title: 'Spam',
  },
  {
    id: '5',
    title: 'Illegal activities ',
  },
  {
    id: '6',
    title: 'Sucide/Dangerous acts',
  },
  {
    id: '7',
    title: 'Promotions of drugs or weapons',
  },
  {
    id: '8',
    title: 'Pornography',
  },
  {
    id: '9',
    title: 'Copyright Infringement',
  },
  {
    id: '10',
    title: 'Personal/Private content',
  },
  {
    id: '11',
    title: 'Other',
  },
];

const CustomTimeRow = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: R.fontSize.Size10,
        marginLeft: R.fontSize.Size14,
      }}>
      <View
        style={{
          alignItems: 'center',
          width: screenWidth / 3.8,
          height: R.fontSize.Size30,
          backgroundColor: R.colors.appColor,
          justifyContent: 'center',
          borderRadius: R.fontSize.Size8,
        }}>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: R.colors.lightWhite,
            marginHorizontal: R.fontSize.Size12,
          }}>
          {props.leftTitle}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: R.fontSize.Size5,
        }}>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            color: R.colors.primaryTextColor,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
          }}>
          {'USD'}
        </Text>
        <Text
          style={{
            marginHorizontal: R.fontSize.Size4,
            textAlign: 'center',
            borderBottomWidth: 1,
            borderColor: R.colors.appColor,
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: R.colors.black,
          }}>
          {props.rightText}
        </Text>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            color: R.colors.primaryTextColor,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
          }}>
          {props.rightDayHours}
        </Text>
      </View>
    </View>
  );
};

const HomeScreen = (props) => {

  const listRef = react.useRef(null);
  const isFocused = useIsFocused();

   useScrollToTop(listRef);
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
  const [modalType, setModalType] = useState('')
  const [reportModalPicker, setReportModalPicker] = useState(false);
  const [reportDetailModalPicker, setReportDetailModalPicker] = useState(false);
  const [selectReport, setSelectReport] = useState()
  const [selectTypeReport, setSelectTypeReport] = useState('');
  const [reportPostId, setReportPostId] = useState('')
  const [reportUserId, setReportUserId] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportOkModal, setReportOkModal] = useState(false)
  const [fixedHeight, setFixedHeight] = useState(280)
  const [videoCurrentTime, setVideoCurrentTime] = useState()

  const [pullLoading, setPullLoading] = useState(false)
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



  eventEmitter.addListener('custom-event', event => {
    // console.log(event); // { data: 'test' }
      // setAllVideoPostList([]);
      // onCallShowPostRefresh();
      goToFirstIndex();
  });

const goToFirstIndex = () =>{
  listRef.current.goToFirstIndex()
}
  useEffect(() => {
    const blur = props.navigation.addListener('blur', () => {
      console.log('Focus on home');

      setVideoPlayPause(true);
    });
    const focus = props.navigation.addListener('focus', () => {
      console.log('Focus on home1');

      setVideoPlayPause(false);
    });
    const didFocus = props.navigation.addListener('didFocus', () => {
      console.log('Focus on home Didfocus');

      setVideoPlayPause(false);
    });
    return blur, focus, didFocus;
  }, [props.navigation]);
  


  useEffect(()=>{
    // onCallLatitudeLongitude();
    // onCallProfile();
    // onCallDeviceName();
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


  const onCallDeviceName = () => {
    setLoading(true)
     let deviceName = DeviceInfo.getModel();
     let MaxPosition = deviceName.search('Max');
     const tempfixedHeight = MaxPosition == -1 ? R.fontSize.Size278 : R.fontSize.Size276
     setFixedHeight(tempfixedHeight)
     setLoading(false)
  }

  // const onCallLatitudeLongitude = () => { 
  //   AsyncStorage.getItem('userLatLong', (err, result) => {
  //     const myArray = result.split(',');
  //     console.log('Result1', myArray[0]);
  //     console.log('Result2', myArray[1]);
  //     onCallLatLong(myArray[0], myArray[1]);
  //   });
  // }

  const onCallProfile = () => {

   dispatch(
     GetProfileDetailsRequest(response => {
       console.log('PROFILE DETAIL ON APP NAVIGATOR', response);
     }),
   );
  }

  // const onCallLatLong = (lat,long) => {
  //   let data = {
  //     latitude: lat,
  //     longitude: long,
  //   };
  //   console.log("DATA",data)
  //   dispatch(UserLocationRequest(data,response=>{
  //     console.log("UserLOC RES",response)
  //   }))
  // }

  const screenFocus = () => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(R.colors.appColor, true);
    StatusBar.setBarStyle('dark-content', true);
    console.log("SCREEN HEIGHT", screenHeight)
    setAllVideoPostList([]);
    onCallDeviceName()
    onCallShowPostRefresh();
    onCallProfile();
  };

  const onCallModal = (type,item) => {
    setModalType(type)
    setModalPicker(true);
    if(type == 'videoDetailModal')
    {
      setVideoModalDetail(item)
      setVideoModalPersonalDetail([
        item?.gender,
        `${moment().diff(item?.birth, 'years')} Year`,
        `${item?.address != '' ? item?.address : ''}`,
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
  setLoading(true)
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
        setLoading(false);
      } else if (response.status == 'tokenError') {
        setLoading(false);
        props.navigation.replace('LoginScreen');
      }
      else
      {
        setLoading(false)
      }
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
        // setLoading(false);
      } 
      
    }))  
  }

    const onCallShowAllPostPullLoading = () => {
      setPullLoading(true)
      let data = {
        mobile_type: 'ios',
      };
      dispatch(
        ShowAllPostRequest(data, response => {
          console.log('SHOW ALL POST RES', response);
          if (response.status == 'success') {
            setAllVideoPostList(response?.Post);
            setPullLoading(false)
          } else if (response.status == 'tokenError') {
            setPullLoading(false);
            props.navigation.replace('LoginScreen');
          }
          else
          {
          setPullLoading(false);
          }
        }),
      );
    };

  const onChangeIndex = ({index}) => {
    console.log("INDEX ITEM",index)
    setVideoPlayPause(false);
    setCurrIndex(index)
    setSliderValue(0);
    console.log("AllPostInfo",allVideoPostList)
  }

  

  const onCallVideoRatingAPI = (PercentLike,PostId,index1,userId,userType) => {
    setLoading(true)
    let data1 = {
      id: PostId,
      percentage_like: `${PercentLike}`,
      user_id: userId,
      user_type: userType
    };
    let headerToken = {
      token: props.authToken,
    };
    console.log('LikeData', data1);
    console.log(
      'PERCENT LIKE',
      PercentLike,
    );
    
    axios({
      method: 'POST',
      url: `${Config.API_URL}${Config.videoRatingAPI}`,
      data: data1,
      headers: headerToken,
    }).then(res => {
      console.log('LIKE RES', res);
      if (res.data.status == 'success') {
        // Toast.show(res.data.message, Toast.SHORT);
        // onCallShowAllPost();
        setAllVideoPostList([
          ...allVideoPostList,
          {
            total_likes: allVideoPostList[index1].total_likes++,
            total_rating: allVideoPostList[index1].total_likes + PercentLike,
          },
        ]);
        const dummyData = allVideoPostList;
        let arr = dummyData.map((item, index) => {
          if (index1 == index) {
            // item.total_likes = item.total_likes++;
            // item.total_rating =  item.total_likes + PercentLike,
            item.postInfo = [...item.postInfo,{percentage_like:PercentLike}]
          }
          return {...item};
        });
        console.log('saved post return', arr);
        setAllVideoPostList(arr);

        
        
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      }
    });
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
    console.log('PROFILESUB', props.userProfile?.Profile?.subscription);
    
    props.userProfile?.Profile?.subscription != 0
      ? props.navigation.navigate('ConnectedProfileScreen', {
          profileId: item?.profileID,
          myUserId: props.userProfile?.Profile?.user_id,
          tailentPost: item,
        })
      : props.navigation.navigate('SubscriptionScreen');
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
    setReportDetailModalPicker(true)
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
    setLoading(true)
   
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
         setLoading(false);
      }
      else
      {
        Toast.show(response?.message, Toast.SHORT);
        setLoading(false);
      }
    }))
  }

  const onCallRemoveSavePost = (postId,ind) => {
    let data = {
      post_id: postId,
    };
    setLoading(true);
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
          setLoading(false);

        } else {
          Toast.show(response?.message, Toast.SHORT);
          setLoading(false);
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

  const onCallReportPostAPI = () => {
    let data = {
        user_id: reportUserId,
        post_id:reportPostId,
        descritpion: reportDesc
    }
    console.log('ReportData', data)
    dispatch(ReportPostRequest(data, response => {
      console.log("Report Response",response)
      if(response.status == 'success')
      {
        // Toast.show(response.message, Toast.SHORT)
        onCallClosedReportDetailModal()
        onCallShowAllPost();
        setReportDesc('')
        setReportOkModal(true)
      }
      else
      {
        Toast.show(response.message, Toast.SHORT);
        setReportDesc('');
      }
    }))
  }


  const onCallBlockUser = () => {
    let data = {
      blockId: reportUserId,
    };
    setLoading(true)
    dispatch(BlockUserRequest(data, response => {
      console.log("BLOCK USER RESPONSE",response)
      if(response.status == 'success')
      {
        // Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        onCallShowAllPost()
        setLoading(false);

      }
      else
      {
        Toast.show(response.message, Toast.SHORT)
        onCallClosedReportDetailModal();
        setLoading(false)
      }
    }))
  }

  const onCallBlockPost = () => {
    let data = {
      postId: reportPostId
    };
    setLoading(true);

    dispatch(BlockPostRequest(data, response =>{
      console.log('BLOCK POST RESPONSE', response);

      if (response.status == 'success') {
        // Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        onCallShowAllPost();
        setLoading(false);

      } else {
        Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        setLoading(false);
      }
    }))
  }

  const onProgress = (data: OnProgressData) => {
    console.log('OnProgress', data.currentTime);
   setVideoCurrentTime(data.currentTime);
  };

 const onLoad = data => {
   console.log('ONLOAD START', data);
 };

  const onSeek = (data: OnSeekData) => {
    console.log("Seektimem",data.seekTime)
    videoRef?.seek(data.seekTime);
  };
  
  const updateIndex = ({ viewableItems }) => {
  console.log("index",viewableItems[0]?.index)
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
        />

        <View style={{flex: 1}}>
          <SwiperFlatList
            ref={listRef}
            index={currIndex}
            refreshing={pullLoading}
            onRefresh={onCallShowAllPostPullLoading}
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
              // console.log('USER PROFILE', props.userProfile?.Profile?.user_id);
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
                      eyeonPress={() => onCallModal('videoDetailModal', item)}
                      eyeIcon={R.images.eyeIcon}
                      videoUrl={`${Config.API_URL}${item?.post?.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userImage={`${Config.API_URL}${item?.avatar?.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userName={item?.username}
                      videoCat={item?.address != '' ? item?.address : ''}
                      bottomTitle={item?.title}
                      bottomDiscription={item?.description}
                      usdPrice={`USD ${item?.amount}`}
                      onLoad={onLoad}
                      paused={currIndex !== index || videoPlayPause}
                      onPressSave={() => {
                        item?.post_save
                          ? onCallRemoveSavePost(item?.postID, index)
                          : onCallSavePost(item?.postID, index);
                      }}
                      saveIcon={
                        item?.post_save
                          ? R.images.removeSavedIcon
                          : R.images.bookmarkIcon
                      }
                      saveTitle={item?.post_save ? '' : 'Save'}
                      onPressShare={() =>
                        myCustomShare(
                          `${Config.API_URL}${item?.post.replace(
                            'http://localhost:8080/',
                            '',
                          )}`,
                        )
                      }
                      reportHidden={
                        item?.user_id == props.userProfile?.Profile?.user_id &&
                        true
                      }
                      onPressReport={() =>
                        onCallReportModal(item?.postID, item?.user_id)
                      }
                    />
                  </Pressable>
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
                            item.postInfo[0]?.percentage_like != null
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
                                backgroundColor: R.colors.placeholderTextColor,
                                borderRadius: R.fontSize.Size5,
                              }}
                            />
                          }
                          minimumTrackTintColor={R.colors.white}
                          maximumTrackTintColor={R.colors.white}
                          onValueChange={val => setSliderValue(val)}
                          onSlidingComplete={value => {
                            console.log('SLIDE COMPLETE', value.toFixed(0));
                            onCallVideoRatingAPI(
                              value.toFixed(0),
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
                            {item?.total_likes != '' ? item?.total_likes : '0'}
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
                              ? `${(
                                  item?.total_rating /
                                  (item?.total_likes * 20)
                                ).toFixed(1)}%`
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
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
      <Modal
        visible={modalPicker}
        transparent={true}
        onRequestClose={() => setModalPicker(false)}>
        <View style={Styles.modalMainView}>
          <View style={Styles.modalView}>
            <View style={Styles.modalViewReverse}>
              <Pressable
                onPress={() => setModalPicker(false)}
                style={({pressed}) => [
                  {
                    padding: R.fontSize.Size6,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}>
                <Image
                  source={R.images.cancleIcon}
                  style={{height: R.fontSize.Size10, width: R.fontSize.Size10}}
                  resizeMode={'contain'}
                />
              </Pressable>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: R.fontSize.Size20,
                    }}>
                    <View style={{flex: 1}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={Styles.videoModalMainView}>
                          <Image
                            source={{
                              uri: `${
                                Config.API_URL
                              }${videoModalDetail?.avatar.replace(
                                'http://localhost:8080/',
                                '',
                              )}`,
                            }}
                            style={{
                              height: R.fontSize.Size60,
                              width: R.fontSize.Size60,
                            }}
                            resizeMode={'cover'}
                          />
                        </View>
                        <Text style={Styles.videoModalTitleText}>
                          {videoModalDetail?.username}
                        </Text>
                      </View>
                      {videoModalDetail?.bio != '' && (
                        <View style={{marginTop: R.fontSize.Size20}}>
                          <Text style={Styles.videoModalDescText}>
                            {videoModalDetail?.bio}
                          </Text>
                        </View>
                      )}
                      <View style={Styles.videoModalMapMainView}>
                        {videoModalPersonalDetail.map((item, index) => {
                          return (
                            <View key={index} style={Styles.videoModalMapView}>
                              {item != '' && (
                                <View
                                  style={Styles.videoModalPersonalDetailView}
                                />
                              )}
                              <Text style={Styles.videoModalPersonalDetailText}>
                                {item}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      <View style={Styles.videoModalMapMainView}>
                        {videoModalTalentDetail.map((item, index) => {
                          console.log('ITEM', item);
                          return (
                            <View
                              key={index}
                              style={Styles.videoModalTalentView}>
                              <Text
                                style={Styles.videoModalTalentText}
                                numberOfLines={1}>
                                {item}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      <View
                        style={{
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                          marginLeft: -R.fontSize.Size14,
                          marginTop: R.fontSize.Size20,
                        }}>
                        {videoModalAvailableDetail.map((item, index) => {
                          return (
                            <View key={index}>
                              {item?.amount != '' && item?.amount != null ? (
                                <CustomTimeRow
                                  leftTitle={item?.type}
                                  rightText={item?.amount}
                                  rightDayHours={
                                    item?.type == 'Full Time' ? '/day' : '/hrs'
                                  }
                                />
                              ) : null}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
            <View style={{paddingVertical: R.fontSize.Size10}}>
              <AppButton
                onPress={() => {
                  onCallConnectNow(videoModalDetail);
                }}
                title={'Connect'}
                marginHorizontal={R.fontSize.Size55}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ReportModal
        visible={reportModalPicker}
        onRequestClose={() => setReportModalPicker(false)}
        closeModal={() => setReportModalPicker(false)}
        onPress1={() => onCallReportModalPress1('cutVideo')}
        onPress2={() => onCallReportModalPress2('dontRecommend')}
        onPress3={() => onCallReportModalPress3('report')}
      />
      <ReportDetailModal
        visible={reportDetailModalPicker}
        onRequestClose={() => onCallClosedReportDetailModal()}
        closeModal={() => onCallClosedReportDetailModal()}
        onPressCancel={() => onCallClosedReportDetailModal()}
        onPressReport={() => {
          selectTypeReport == 'report'
            ? onCallReportPost()
            : selectTypeReport == 'dontRecommend'
            ? onCallBlockUser()
            : onCallBlockPost();
        }}
        reportTitle={selectTypeReport == 'report' ? 'Proceed' : 'Proceed'}
        title={
          selectTypeReport == 'report'
            ? 'Why are you reporting this post? '
            : selectTypeReport == 'dontRecommend'
            ? 'Are you sure you want to block?'
            : 'Are you sure to Hide this video?'
        }
        ReportContent={
          <View>
            {selectTypeReport == 'report' && (
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                {ReportList.map((item, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => OnCallSelectReport(index, item)}
                      style={({pressed}) => [
                        {
                          marginVertical: R.fontSize.Size4,
                          borderBottomWidth: 0.5,
                          borderColor: R.colors.lightWhite,
                          height: R.fontSize.Size40,
                          borderRadius: R.fontSize.Size8,
                          alignItems: 'center',
                          opacity: pressed ? 0.5 : 1,
                          flexDirection: 'row',
                        },
                      ]}>
                      <Image
                        source={
                          selectReport == index
                            ? R.images.checkRadioIcon
                            : R.images.unCheckRadioIcon
                        }
                        style={{
                          height: R.fontSize.Size22,
                          width: R.fontSize.Size22,
                          paddingHorizontal: R.fontSize.Size20,
                        }}
                        resizeMode={'contain'}
                      />
                      <View style={{flex: 1, marginLeft: R.fontSize.Size10}}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            color: R.colors.lightBlack,
                            fontWeight: '700',
                            fontSize: R.fontSize.Size14,
                          }}
                          numberOfLines={2}>
                          {item.title}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            )}
            {selectTypeReport == 'cutVideo' && (
              <View
                style={{
                  marginHorizontal: R.fontSize.Size10,
                  paddingBottom: R.fontSize.Size30,
                  marginTop: R.fontSize.Size10,
                }}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontWeight: '500',
                    color: R.colors.lightBlack,
                    fontSize: R.fontSize.Size16,
                    textAlign: 'center',
                  }}>
                  {
                    'We have hidden this video and will not recommend similar content in the future.'
                  }
                </Text>
              </View>
            )}
            {selectTypeReport == 'dontRecommend' && (
              <View
                style={{
                  marginHorizontal: R.fontSize.Size10,
                  paddingBottom: R.fontSize.Size30,
                  marginTop: R.fontSize.Size10,
                }}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontWeight: '500',
                    color: R.colors.lightBlack,
                    fontSize: R.fontSize.Size16,
                    textAlign: 'center',
                  }}>
                  {`Blocking someone on BDiskovered hides your profile and videos without notification.`}
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
        title={`Your feedback is important to us.\nWe'll review your request and take appropriate action, if required.`}
        onPress={() => setReportOkModal(false)}
      />
    </StoryScreen>
  );
};

const mapStateToProps = (state, props) => ({
  loading:
    state.auth.loading ||
    state.getProfileDetailsRoot.loading ||
    state.savedPostRoot.loading,
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});


export default connect(mapStateToProps)(HomeScreen);
