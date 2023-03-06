import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  Dimensions,
  ScrollView,
  AppState
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
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;



const FilterVideoScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [videoPlayPause, setVideoPlayPause] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [sliderValue, setSliderValue] = useState(0); 
  const [modalPicker, setModalPicker] = useState(false);
  const [videoModalDetail, setVideoModalDetail] = useState();
  const [videoModalPersonalDetail, setVideoModalPersonalDetail] = useState([]);
  const [videoModalTalentDetail, setVideoModalTalentDetail] = useState([]);
  const [videoModalAvailableDetail, setVideoModalAvailableDetail] = useState([]);
  const [reportModalPicker, setReportModalPicker] = useState(false);
  const [reportDetailModalPicker, setReportDetailModalPicker] = useState(false);
  const [selectReport, setSelectReport] = useState();
  const [selectTypeReport, setSelectTypeReport] = useState('');
  const [reportPostId, setReportPostId] = useState('');
  const [reportUserId, setReportUserId] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportOkModal, setReportOkModal] = useState(false);
  const [userProfileId, setUserProfileId] = useState('');


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
          setVideoList([
            ...videoList,
            {
              total_likes: videoList[index1].total_likes++,
              total_rating: videoList[index1].total_likes + PercentLike,
            },
          ]);
          const dummyData = videoList;
          let arr = dummyData.map((item, index) => {
            if (index1 == index) {
              item.postInfo = [
                ...item.postInfo,
                {percentage_like: PercentLike},
              ];
            }
            return {...item};
          });
          console.log('saved post return', arr);
          setVideoList(arr);
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show(response.message, Toast.SHORT);
        }
      }))

    // setLoading(true);
    // let data1 = {
    //   id: PostId,
    //   percentage_like: `${PercentLike}`,
    // };
    // let headerToken = {
    //   token: props.authToken,
    // };
    // axios({
    //   method: 'POST',
    //   url: `${Config.API_URL}${Config.videoRatingAPI}`,
    //   data: data1,
    //   headers: headerToken,
    // }).then(res => {
    //   console.log('LIKE RES', res);
    //   if (res.data.status == 'success') {
    //     setVideoList(videoList);
    //     setTimeout(() => {
    //       setSliderValue(0);
    //     }, 2000);
    //     setLoading(false);
    //   } else {
    //     setLoading(false);
    //     Toast.show(res.data.message, Toast.SHORT);
    //   }
    // });
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


// const onCallReportModal = (postId, userId) => {
//   setReportPostId(postId);
//   setReportUserId(userId);
//   setReportModalPicker(true);
// };

// const onCallReportModalPress1 = reportType => {
//   setReportModalPicker(false);
//   setSelectTypeReport(reportType);
//   setReportDetailModalPicker(true);
// };
// const onCallReportModalPress2 = reportType => {
//   setReportModalPicker(false);
//   setSelectTypeReport(reportType);
//   setReportDetailModalPicker(true);
// };
// const onCallReportModalPress3 = reportType => {
//   setReportModalPicker(false);
//   setSelectTypeReport(reportType);
//   setReportDetailModalPicker(true);
// };

// const OnCallSelectReport = (index, item) => {
//   setSelectReport(index);
//   setReportDesc(item.title);
//   console.log('ReportDetail', item.title);
//   console.log('ReportIndex', index);
// };

// const onCallClosedReportDetailModal = () => {
//   setSelectTypeReport('');
//   setReportDetailModalPicker(false);
//   setSelectReport('');
// };

const onCallSavePost = postId => {
  let data = {
    post_id: postId,
  };
  setLoading(true);
  dispatch(
    SavedPostRequest(data, response => {
      console.log('Saved Post Response', response);
      if (response.status == 'success') {
        setLoading(false);
      } else {
        Toast.show(response?.message, Toast.SHORT);
        setLoading(false);
      }
    }),
  );
};





 const onCallRemoveSavePost = postId => {
   let data = {
     post_id: postId,
   };
   setLoading(true);
   dispatch(
     DeleteSavedPostRequest(data, response => {
       console.log('Saved Post Response', response);
       if (response.status == 'success') {
         onCallSavedPostAPI();
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

// const onCallReportPostValidation = () => {
//   return CommonFunctions.isBlank(reportDesc.trim(), 'Select any report reason');
// };

// const onCallReportPost = () => {
//   if (onCallReportPostValidation()) {
//     onCallReportPostAPI();
//   }
// };

// const onCallReportPostAPI = () => {
//   let data = {
//     user_id: reportUserId,
//     post_id: reportPostId,
//     descritpion: reportDesc,
//   };
//   console.log('ReportData', data);
//   dispatch(
//     ReportPostRequest(data, response => {
//       console.log('Report Response', response);
//       if (response.status == 'success') {
//         Toast.show(response.message, Toast.SHORT);
//         onCallClosedReportDetailModal();
//         setReportDesc('');
//         setReportOkModal(true);
//       } else {
//         Toast.show(response.message, Toast.SHORT);
//         setReportDesc('');
//       }
//     }),
//   );
// };

// const onCallBlockUser = () => {
//   let data = {
//     blockId: reportUserId,
//   };
//   setLoading(true);
//   dispatch(
//     BlockUserRequest(data, response => {
//       console.log('BLOCK USER RESPONSE', response);
//       if (response.status == 'success') {
//         Toast.show(response.message, Toast.SHORT);
//         onCallClosedReportDetailModal();
//         props.navigation.replace('HomeMenu');

//       } else {
//         Toast.show(response.message, Toast.SHORT);
//         onCallClosedReportDetailModal();
//         setLoading(false);
//       }
//     }),
//   );
// };

// const onCallBlockPost = () => {
//   let data = {
//     postId: reportPostId,
//   };
//   setLoading(true);

//   dispatch(
//     BlockPostRequest(data, response => {
//       console.log('BLOCK POST RESPONSE', response);

//       if (response.status == 'success') {
//         Toast.show(response.message, Toast.SHORT);
//         onCallClosedReportDetailModal();
//         props.navigation.replace('HomeMenu')
//       } else {
//         Toast.show(response.message, Toast.SHORT);
//         onCallClosedReportDetailModal();
//         setLoading(false);
//       }
//     }),
//   );
// };



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
                      fromLeft={R.fontSize.Size50}
                      userStatusBackgroundColor={
                        item?.user_status == 'available'
                          ? R.colors.whatsAppColor
                          : R.colors.redColor
                      }
                      videoUrl={`${Config.API_URL}${item?.post?.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userImage={`${Config.API_URL}${item?.avatar?.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
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
                        item?.amount == '0' ? null : `USD ${item?.amount}`
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
                        props.route.params?.fromScreen == 'SavedPostListScreen'
                          ? onCallRemoveSavePost(item?.postID)
                          : onCallSavePost(item?.postID)
                      }
                      saveIcon={
                        props.route.params?.fromScreen == 'SavedPostListScreen'
                          ? R.images.removeSavedIcon
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
                              ? `${(
                                  item?.total_rating /
                                  (item?.total_likes * 20)
                                ).toFixed(1)}%`
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
                      onPress={() => onPressOrangeAppIcon(item)}
                      style={({pressed}) => [
                        {
                          marginHorizontal: R.fontSize.Size8,
                          alignItems: 'center',
                          opacity: pressed ? 0.5 : 1,
                        },
                      ]}>
                      <Image
                        source={R.images.orangeAppIcon}
                        style={Styles.orangeAppIcon}
                        resizeMode={'contain'}
                      />
                      <Text style={Styles.connectText} numberOfLines={1}>
                        {'Connect'}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />
        </View>
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
        userProfile={{
          uri: `${Config.API_URL}${videoModalDetail?.avatar.replace(
            'http://localhost:8080/',
            '',
          )}`,
        }}
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

      {/* <ReportModal
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
                {AppContent.ReportList.map((item, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => OnCallSelectReport(index, item)}
                      style={({pressed}) => [
                        Styles.reportContentView,
                        {opacity: pressed ? 0.5 : 1},
                      ]}>
                      <Image
                        source={
                          selectReport == index
                            ? R.images.checkRadioIcon
                            : R.images.unCheckRadioIcon
                        }
                        style={Styles.reportContentCheckIcon}
                        resizeMode={'contain'}
                      />
                      <View style={{flex: 1, marginLeft: R.fontSize.Size10}}>
                        <Text
                          style={Styles.reportContentTitle}
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
              <View style={Styles.cutVideoView}>
                <Text style={Styles.cutVideoText}>
                  {AppContent.cutVideoContent}
                </Text>
              </View>
            )}
            {selectTypeReport == 'dontRecommend' && (
              <View style={Styles.dontRecView}>
                <Text style={Styles.dontRecText}>
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
      /> */}
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps) (FilterVideoScreen);
