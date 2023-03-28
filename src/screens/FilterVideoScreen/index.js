import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  Dimensions,
  ScrollView,
  AppState,
  Animated
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  AlartModal,
  AppButton,
  CustomTimeRow,
  EyeViewModal,
  ReportDetailModal,
  ReportModal,
  StoryScreen,
  VideoCard,
} from '../../components';
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import {Config} from '../../config';
import Slider from 'react-native-custom-slider';
import Share from 'react-native-share';
import moment from 'moment';
import axios from 'axios';
import Toast from 'react-native-simple-toast'
import Styles from './styles';
import { DeleteSavedPostRequest, SavedPostListRequest, SavedPostRequest } from '../../actions/savedPost.action';
import { BlockPostRequest, BlockUserRequest, ReportPostRequest } from '../../actions/block.action';
import CommonFunctions from '../../utils/CommonFuntions';
import AppContent from '../../utils/Content';
import { VideoRatingRequest } from '../../actions/videoRating.action';
import { BottomTabRequest } from '../../actions/bottomtab.action';
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';
import { BoostPostRequest } from '../../actions/boostPost.action';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import Lottie from 'lottie-react-native';
import { Easing } from 'react-native';
const rocketPath = require('../../res/rocket.json');


const FilterVideoScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [videoPlayPause, setVideoPlayPause] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [sliderValue, setSliderValue] = useState(0); 
  const [modalPicker, setModalPicker] = useState(false);
  const [boostStatus, setBoostStatus] = useState(false);
  const [boostMsg, setBoostMsg] = useState('');


  const [alartModalPicker, setAlartModalPicker] = useState(false);

  const [videoModalDetail, setVideoModalDetail] = useState();
  const [videoModalPersonalDetail, setVideoModalPersonalDetail] = useState([]);
  const [videoModalTalentDetail, setVideoModalTalentDetail] = useState([]);
  const [videoModalAvailableDetail, setVideoModalAvailableDetail] = useState([]);
  const [userProfileId, setUserProfileId] = useState('');

  const animationProgress = React.useRef(new Animated.Value(0));

useEffect(() => {
  const listener = status => {
    if (status === 'background' || status === 'inactive') {
      setVideoPlayPause(true);
      console.log('STOPVIDEO');
    }
  };
  AppState.addEventListener('change', listener);
  return () => {
    AppState.removeEventListener('change', listener);
  };
}, []);

  useEffect(() => {
    const blur = props.navigation.addListener('blur', () => {
      setVideoPlayPause(true);
    });

    const focus = props.navigation.addListener('focus', () => {
      setVideoPlayPause(false);
    });

    return blur, focus;
  }, [props.navigation]);

  useEffect(() => {
    setLoading(true);
    console.log('POST INFO', props.route.params?.videoItems);
    console.log('MY PROFILE DETAILS USER ID', props.userProfile?.Profile?.user_id);
    onCallProfile();
    onCheckFromScreen()
    setLoading(false);
  }, [props.navigation]);


const onCallProfile = () => {
  dispatch(
    GetProfileDetailsRequest(response => {
      console.log('PROFILE DETAIL ON APP NAVIGATOR', response);
      setUserProfileId(response.Profile?.user_id);
    }),
  );
};

  const onCheckFromScreen = () => {
    props.route.params?.fromScreen == 'SavedPostListScreen' ?
    onCallSavePostList()
    :
    setVideoList(props.route.params?.videoItems)
  }

  const onCallSavePostList = () => {
     setVideoList(props.route.params?.videoItems);
     setCurrIndex(props.route.params?.playIndex);
  }

  const myCustomShare = async videoURL => {
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

  const onChangeIndex = ({index}) => {
    setCurrIndex(index);
  };

  const onLoad = data => {
    console.log('ONLOAD', data);
  };

  const onCallVideoRatingAPI = (PercentLike, PostId,index1,userId,userType) => {
    let data = {
      id: PostId,
      percentage_like: `${PercentLike}`,
      user_id: userId,
      user_type: userType
    };
    console.log("VIDEORATE",data)

    


    setLoading(true)
    dispatch(VideoRatingRequest(data,response =>{
      console.log("VIDEO RATING RES ON HOME PAGE =>",response)
        if (response.status == 'success') {
         
          let tempDoc = videoList;
          let arr = tempDoc.map((item, index) => {
            if (index == index1) {
              item.total_likes = parseInt(item.total_likes) + parseInt(1);
              item.total_rating = parseInt(item.total_rating) + parseInt(PercentLike);
              item.postInfo = [
                ...item.postInfo,
                {percentage_like: PercentLike},
              ];
            }
            return {...item};
          });
          setVideoList(arr);
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show(response.message, Toast.SHORT);
        }
      }))

  };

  const onCallModal = (item) => {
    setModalPicker(true);
      setVideoModalDetail(item);
      setVideoModalPersonalDetail([
        `${moment().diff(item?.birth, 'years')} Year`,
        item?.gender,
        `${item?.profile_address != '' ? item?.profile_address : ''}`,
      ]);
       let tempTalentArray = item?.category;
       let useTalentArray = tempTalentArray.split(',');
       console.log('useTalentArray', useTalentArray);
       setVideoModalTalentDetail(useTalentArray);
      setVideoModalAvailableDetail([
        {type: item?.job_type1, amount: item?.full_time_amount},
        {type: item?.job_type2, amount: item?.part_time_amount},
        {type: item?.job_type3, amount: item?.gigs_amount},
      ]); 
  };

   const onCallConnectNow = (item) => {
    console.log(
      'PROFILE SUBSCRIPTION',
      props.userProfile?.Profile?.subscription,
    );
     setModalPicker(false);
    
     props.userProfile?.Profile?.subscription != 0
       ? props.navigation.navigate('ConnectedProfileScreen', {
           profileId: item.profileID,
           myUserId: props.userProfile?.Profile?.user_id,
           tailentPost: item,
         })
       : props.navigation.navigate('SubscriptionScreen');
   };


    const onPressOrangeAppIcon = (item) => {
      console.log('PROFILESUB', props.userProfile?.Profile?.subscription);
     
      // props.userProfile?.Profile?.subscription != 0
      //   ? props.navigation.navigate('ConnectedProfileScreen', {
      //       profileId: item.profileID,
      //       myUserId: props.userProfile?.Profile?.user_id,
      //       tailentPost: item,
      //     })
      //   : props.navigation.navigate('SubscriptionScreen');

         props.userProfile?.Profile?.subscription != 0
           ? userProfileId == item.user_id
             ? onCallProfileScreen()
             : props.navigation.navigate('ConnectedProfileScreen', {
                 profileId: item?.profileID,
                 myUserId: props.userProfile?.Profile?.user_id,
                 tailentPost: item,
               })
           : onCallSubscriptionScreen();
    };

     const onCallSubscriptionScreen = () => {
       props.navigation.navigate('SubscriptionScreen');
     };

     const onCallProfileScreen = () => {
       dispatch(BottomTabRequest('ProfileScreen'));
       props.navigation.navigate('ProfileScreen');
     };

const onCallSavePost = (postId,ind) => {
  let data = {
    post_id: postId,
  };
  setLoading(true);
  dispatch(
    SavedPostRequest(data, response => {
      console.log('Saved Post Response', response);
      if (response.status == 'success') {
        const dummyData = videoList;
        let arr = dummyData.map((item, index) => {
          if (ind == index) {
            item.post_save = !item.post_save;
          }
          return {...item};
        });
        console.log('saved post return', arr);
        setVideoList(arr);
        setCurrIndex(ind);
        setLoading(false);
      } else {
        Toast.show(response?.message, Toast.SHORT);
        setLoading(false);
      }
    }),
  );
};





 const onCallRemoveSavePost = (postId,ind) => {
   let data = {
     post_id: postId,
   };
   setLoading(true);
   dispatch(
     DeleteSavedPostRequest(data, response => {
       console.log('Saved Post Response', response);
       if (response.status == 'success') {
         const dummyData = videoList;
         let arr = dummyData.map((item, index) => {
           if (ind == index) {
             item.post_save = !item.post_save;
           }
           return {...item};
         });
         console.log('saved post return', arr);
          setVideoList(arr);
          setCurrIndex(ind);
         setLoading(false);

       } else {
         Toast.show(response?.message, Toast.SHORT);
         setLoading(false);
       }
     }),
   );
 };

 const onCallSavedPostAPI = () => {
   setLoading(true);
   dispatch(
     SavedPostListRequest(response => {
       if (response.status == 'success') {
         setVideoList(response?.Post);
         setLoading(false);
       }
     }),
   );
 };


const onCallSubScription = () => {
    setAlartModalPicker(false);
    props.navigation.navigate('SubscriptionScreen');
};

const onCallOkBoost = () => {
  setVideoPlayPause(false);
  setAlartModalPicker(false);
};

 const onPressBoostAPI = postId => {
   let data = {
     post_id: postId,
   };

   dispatch(
     BoostPostRequest(data, response => {
       console.log('BOOST POST RES', response);
       if (response.status == 'success') {
         if (response.message == 'Boost successfully') {
           setBoostStatus(true);
           setBoostMsg(response.message);
           onCallBoostAnimation();
         } else {
           setVideoPlayPause(true);
           setBoostMsg(response.message);
           setBoostStatus(false);
           setAlartModalPicker(true);
         }
       }
     }),
   );
 };


 const onCallBoostAnimation = () => {
   Animated.timing(animationProgress.current, {
     toValue: 1,
     duration: 5000,
     easing: Easing.linear,
     useNativeDriver: true,
   }).start();
   setTimeout(()=>{
    setBoostStatus(false)
    animationProgress.current.setValue(0)
   },5000)
   
 };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <SwiperFlatList
            index={currIndex}
            vertical={true}
            style={{flex: 1}}
            nestedScrollEnabled
            data={videoList}
            keyExtractor={(item, index) => index.toString()}
            onChangeIndex={onChangeIndex}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                  }}>
                  <Pressable
                    onPress={() => setVideoPlayPause(!videoPlayPause)}
                    style={({pressed}) => [
                      {
                        opacity: pressed ? 0.8 : 1,
                        height: screenHeight - R.fontSize.Size100,
                      },
                    ]}>
                    <VideoCard
                      fromTop={R.fontSize.Size35}
                      fromLeft={R.fontSize.Size40}
                      userStatusBackgroundColor={
                        item?.user_status == 'available'
                          ? R.colors.whatsAppColor
                          : R.colors.redColor
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
                      onPressUserIcon={() => {
                        userProfileId == item.user_id
                          ? onCallProfileScreen()
                          : onCallModal(item);
                      }}
                      // eyeonPress={() => {
                      //   props.route.params?.fromScreen !=
                      //     'SavedPostListScreen' && onCallModal(item);
                      // }}
                      // eyeIcon={
                      //   props.route.params?.fromScreen !=
                      //     'SavedPostListScreen' && R.images.eyeIcon
                      // }
                      userName={item?.username}
                      videoCat={
                        item?.profile_address != '' ? item?.profile_address : ''
                      }
                      bottomTitle={item?.title}
                      bottomDiscription={item?.description}
                      usdPrice={
                        item?.amount == '0'
                          ? null
                          : `USD ${item?.amount} ${
                              item.negotiable == 'Yes' ? '(Negotiable)' : ''
                            }`
                      }
                      onLoad={onLoad}
                      paused={currIndex !== index || videoPlayPause}
                      shareHidden={
                        props.route.params?.fromScreen == 'SavedPostListScreen'
                          ? true
                          : false
                      }
                      reportHidden={true}
                      saveHidden={
                        props.route.params?.fromScreen == 'SavedPostListScreen'
                          ? false
                          : true
                      }
                      onPressSave={() =>
                        item?.post_save
                          ? onCallRemoveSavePost(item?.postID, index)
                          : onCallSavePost(item?.postID, index)
                      }
                      saveIcon={
                        item?.post_save
                          ? R.images.orangeSaveIcon1
                          : R.images.bookmarkIcon
                      }
                      saveTitle={
                        props.route.params?.fromScreen == 'SavedPostListScreen'
                          ? ``
                          : ``
                      }
                      onPressShare={() =>
                        myCustomShare(
                          `${Config.API_URL}${item?.post?.replace(
                            'http://localhost:8080/',
                            '',
                          )}`,
                        )
                      }
                      // onPressReport={() =>
                      //   onCallReportModal(item?.postID, item?.user_id)
                      // }
                    />
                  </Pressable>
                  <View style={Styles.sliderView}>
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
                            item?.postInfo[0]?.percentage_like != null
                              ? parseInt(item.postInfo[0]?.percentage_like)
                              : sliderValue[index]
                          }
                          minimumValue={0}
                          maximumValue={100}
                          customMinimumTrack={
                            <View style={Styles.sliderMinTrack} />
                          }
                          customMaximumTrack={
                            <View style={Styles.sliderMaxTrack} />
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
                            <View style={Styles.customThumView}>
                              <Image
                                source={R.images.redHeartIcon}
                                style={Styles.customThumImage}
                                resizeMode={'contain'}
                              />
                            </View>
                          }
                        />
                      </View>
                      <View style={Styles.likedView}>
                        <Text style={Styles.likedByText}>
                          {'Liked By '}
                          <Text style={{color: R.colors.appColor}}>
                            {item?.total_likes != '' ? item?.total_likes : '0'}
                          </Text>
                        </Text>
                        <View style={Styles.avgLikeView} />
                        <Text style={Styles.avgLikeText}>
                          {'Average Like '}
                          <Text style={{color: R.colors.appColor}}>
                            {item?.total_rating != '' &&
                            item?.total_rating != '0'
                              ? `${parseInt(item?.total_rating / item?.total_likes)}%`
                              : '0%'}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={Styles.sliderValueView}>
                      <Text style={Styles.sliderValueText}>
                        {item?.postInfo != 'undefined' &&
                        item?.postInfo != null &&
                        item?.postInfo[0]?.percentage_like != null
                          ? `${parseInt(item?.postInfo[0]?.percentage_like)}%`
                          : `${sliderValue?.toFixed(0)}%`}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => {
                        userProfileId == item.user_id
                          ? onPressBoostAPI(item?.postID)
                          : onPressOrangeAppIcon(item);
                      }}
                      style={({pressed}) => [
                        {
                          marginHorizontal: R.fontSize.Size8,
                          alignItems: 'center',
                          opacity: pressed ? 0.5 : 1,
                        },
                      ]}>
                      <Image
                        source={
                          userProfileId == item.user_id
                            ? R.images.boostIcon
                            : R.images.orangeAppIcon
                        }
                        style={Styles.orangeAppIcon}
                        resizeMode={'contain'}
                      />
                      <Text style={Styles.connectText} numberOfLines={1}>
                        {userProfileId == item.user_id ? 'Boost' : 'Connect'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {boostStatus && (
          <View
            style={{
              position: 'absolute',
              bottom: R.fontSize.Size100,
              left: 0,
              height: R.fontSize.Size280,
              width: screenWidth,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Lottie source={rocketPath} progress={animationProgress.current} />
          </View>
        )}
        <View style={Styles.backButtonView}>
          <Pressable
            onPress={() => props.navigation.goBack()}
            style={({pressed}) => [
              Styles.backButtonPress,
              {opacity: pressed ? 0.5 : 1},
            ]}>
            <Image
              source={R.images.chevronBack}
              style={{height: R.fontSize.Size24, width: R.fontSize.Size24}}
              resizeMode={'contain'}
            />
          </Pressable>
        </View>
      </View>
      <EyeViewModal
        visible={modalPicker}
        onRequestClose={() => setModalPicker(false)}
        cancelOnPress={() => setModalPicker(false)}
        userProfile={
          (
            videoModalDetail?.avatar != Config.USER_PROFILE_URL &&
              videoModalDetail?.avatar != null
          )
            ? {
                uri: `${Config.API_URL}${videoModalDetail?.avatar.replace(
                  'http://localhost:8080/',
                  '',
                )}`,
              }
            : R.images.inActiveProfileIcon
        }
        userStatusBackgroundColor={
          videoModalDetail?.user_status == 'available'
            ? R.colors.whatsAppColor
            : R.colors.redColor
        }
        userName={videoModalDetail?.username}
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

      <AlartModal
        visible={alartModalPicker}
        onRequestClose={() => setAlartModalPicker(false)}
        title={boostMsg}
        customButton={
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable
              onPress={() => onCallOkBoost()}
              style={({pressed}) => [
                {
                  flex: 1,
                  marginVertical: R.fontSize.Size4,
                  backgroundColor: R.colors.appColor,
                  height: R.fontSize.Size45,
                  borderRadius: R.fontSize.Size8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.5 : 1,
                  marginHorizontal: R.fontSize.Size10,
                },
              ]}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  color: R.colors.white,
                  fontWeight: '700',
                  fontSize: R.fontSize.Size16,
                }}>
                {'Cancel'}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => onCallSubScription()}
              style={({pressed}) => [
                {
                  flex: 1,
                  marginVertical: R.fontSize.Size4,
                  backgroundColor: R.colors.appColor,
                  height: R.fontSize.Size45,
                  borderRadius: R.fontSize.Size8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.5 : 1,
                  marginHorizontal: R.fontSize.Size10,
                },
              ]}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  color: R.colors.white,
                  fontWeight: '700',
                  fontSize: R.fontSize.Size16,
                }}>
                {'Proceed'}
              </Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps) (FilterVideoScreen);
