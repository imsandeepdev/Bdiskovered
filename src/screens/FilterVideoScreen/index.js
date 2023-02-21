import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  AlartModal,
  AppButton,
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
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

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
            // height: R.fontSize.Size20,
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
  const [saveVideoList, setSaveVideoList] = useState([])

  const [reportModalPicker, setReportModalPicker] = useState(false);
  const [reportDetailModalPicker, setReportDetailModalPicker] = useState(false);
  const [selectReport, setSelectReport] = useState();
  const [selectTypeReport, setSelectTypeReport] = useState('');
  const [reportPostId, setReportPostId] = useState('');
  const [reportUserId, setReportUserId] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportOkModal, setReportOkModal] = useState(false);

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
    console.log('MY PROFILE DETAILS USER ID', props.userProfile?.Profile?.user_id);
    onCheckFromScreen()
    setLoading(false);
  }, [props.navigation]);

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

  const onCallVideoRatingAPI = (PercentLike, PostId) => {
    setLoading(true);
    let data1 = {
      id: PostId,
      percentage_like: `${PercentLike}`,
    };
    let headerToken = {
      token: props.authToken,
    };
    axios({
      method: 'POST',
      url: `${Config.API_URL}${Config.videoRatingAPI}`,
      data: data1,
      headers: headerToken,
    }).then(res => {
      console.log('LIKE RES', res);
      if (res.data.status == 'success') {
        // Toast.show(res.data.message, Toast.SHORT);
        setVideoList(videoList);
        setTimeout(() => {
          setSliderValue(0);
        }, 2000);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      }
    });
  };

  const onCallModal = (item) => {
    setModalPicker(true);
      setVideoModalDetail(item);
      setVideoModalPersonalDetail([
        `${moment().diff(item?.birth, 'years')} Year`,
        item?.gender,
        `${item?.address != '' ? item?.address : ''}`,
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
     
      props.userProfile?.Profile?.subscription != 0
        ? props.navigation.navigate('ConnectedProfileScreen', {
            profileId: item.profileID,
            myUserId: props.userProfile?.Profile?.user_id,
            tailentPost: item,
          })
        : props.navigation.navigate('SubscriptionScreen');
    };


const onCallReportModal = (postId, userId) => {
  setReportPostId(postId);
  setReportUserId(userId);
  setReportModalPicker(true);
};

const onCallReportModalPress1 = reportType => {
  setReportModalPicker(false);
  setSelectTypeReport(reportType);
  setReportDetailModalPicker(true);
};
const onCallReportModalPress2 = reportType => {
  setReportModalPicker(false);
  setSelectTypeReport(reportType);
  setReportDetailModalPicker(true);
};
const onCallReportModalPress3 = reportType => {
  setReportModalPicker(false);
  setSelectTypeReport(reportType);
  setReportDetailModalPicker(true);
};

const OnCallSelectReport = (index, item) => {
  setSelectReport(index);
  setReportDesc(item.title);
  console.log('ReportDetail', item.title);
  console.log('ReportIndex', index);
};

const onCallClosedReportDetailModal = () => {
  setSelectTypeReport('');
  setReportDetailModalPicker(false);
  setSelectReport('');
};

const onCallSavePost = postId => {
  let data = {
    post_id: postId,
  };
  setLoading(true);
  dispatch(
    SavedPostRequest(data, response => {
      console.log('Saved Post Response', response);
      if (response.status == 'success') {
        // Toast.show(response?.message, Toast.SHORT);
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
        //  Toast.show(response?.message, Toast.SHORT);
         onCallSavedPostAPI();
        //  setLoading(false);
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
       // console.log('SAVED POST LIST RESPONSE', response?.Post)
       if (response.status == 'success') {
         setVideoList(response?.Post);
         setLoading(false);
       }
     }),
   );
 };

const onCallReportPostValidation = () => {
  return CommonFunctions.isBlank(reportDesc.trim(), 'Select any report reason');
};

const onCallReportPost = () => {
  if (onCallReportPostValidation()) {
    onCallReportPostAPI();
  }
};

const onCallReportPostAPI = () => {
  let data = {
    user_id: reportUserId,
    post_id: reportPostId,
    descritpion: reportDesc,
  };
  console.log('ReportData', data);
  dispatch(
    ReportPostRequest(data, response => {
      console.log('Report Response', response);
      if (response.status == 'success') {
        Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        setReportDesc('');
        setReportOkModal(true);
      } else {
        Toast.show(response.message, Toast.SHORT);
        setReportDesc('');
      }
    }),
  );
};

const onCallBlockUser = () => {
  let data = {
    blockId: reportUserId,
  };
  setLoading(true);
  dispatch(
    BlockUserRequest(data, response => {
      console.log('BLOCK USER RESPONSE', response);
      if (response.status == 'success') {
        Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        props.navigation.replace('HomeMenu');

      } else {
        Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        setLoading(false);
      }
    }),
  );
};

const onCallBlockPost = () => {
  let data = {
    postId: reportPostId,
  };
  setLoading(true);

  dispatch(
    BlockPostRequest(data, response => {
      console.log('BLOCK POST RESPONSE', response);

      if (response.status == 'success') {
        Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        props.navigation.replace('HomeMenu')
      } else {
        Toast.show(response.message, Toast.SHORT);
        onCallClosedReportDetailModal();
        setLoading(false);
      }
    }),
  );
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
                  <View
                    style={{
                      height: screenHeight - R.fontSize.Size100,
                    }}>
                    <VideoCard
                      fromTop={R.fontSize.Size35}
                      fromLeft={R.fontSize.Size50}
                      videoUrl={`${Config.API_URL}${item?.post.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userImage={`${Config.API_URL}${item?.avatar.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      eyeonPress={() => {props.route.params?.fromScreen != 'SavedPostListScreen' && onCallModal(item)}}
                      eyeIcon={props.route.params?.fromScreen != 'SavedPostListScreen' && R.images.eyeIcon}
                      userName={item?.username}
                      videoCat={item?.address != '' ? item?.address : ''}
                      bottomTitle={item?.title}
                      bottomDiscription={item?.description}
                      usdPrice={`USD ${item?.amount}`}
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
                          `${Config.API_URL}${item?.post.replace(
                            'http://localhost:8080/',
                            '',
                          )}`,
                        )
                      }
                      onPressReport={() =>
                        onCallReportModal(item?.postID, item?.user_id)
                      }
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: R.fontSize.Size12,
                      alignItems: 'center',
                      height: R.fontSize.Size100,
                      justifyContent: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <View>
                        <Slider
                          disabled={
                            item.postInfo[0]?.percentage_like != null
                              ? true
                              : false
                          }
                          value={
                            item?.postInfo[0]?.percentage_like != null
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
                        item.postInfo[0]?.percentage_like != null
                          ? `${parseInt(item.postInfo[0]?.percentage_like)}%`
                          : `${sliderValue.toFixed(0)}%`}
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
        <View
          style={{
            position: 'absolute',
            top: R.fontSize.Size50,
            left: R.fontSize.Size10,
          }}>
          <Pressable
            onPress={() => props.navigation.goBack()}
            style={({pressed}) => [
              {
                height: R.fontSize.Size50,
                width: R.fontSize.Size50,
                borderRadius: R.fontSize.Size4,
                backgroundColor: R.colors.modelBackground,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <Image
              source={R.images.chevronBack}
              style={{height: R.fontSize.Size24, width: R.fontSize.Size24}}
              resizeMode={'contain'}
            />
          </Pressable>
        </View>
      </View>
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
        title={`Your feedback is important to us.\nWe'll review your request and take appropriate action, if required`}
        onPress={() => setReportOkModal(false)}
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
