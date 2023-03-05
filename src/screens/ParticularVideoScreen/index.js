import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  AppState
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  AlartModal,
  AppButton,
  FullViewStoryScreen,
  Header,
  ReportModal,
  StoryScreen,
  VideoCard,
  ReportDetailModal,
  CustomLineTextInput
} from '../../components';
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import {Config} from '../../config';
import Slider from 'react-native-custom-slider';
import Share from 'react-native-share';
import moment from 'moment';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Styles from './styles';
import { PlayParticularVideoRequest } from '../../actions/showAllPost.action';
import { BoostPostRequest } from '../../actions/boostPost.action';
import { DeleteSavedPostRequest, SavedPostRequest } from '../../actions/savedPost.action';
import { EditPostRequest, PostDeleteRequest } from '../../actions/uploadNewVideo.action';
import CommonFunctions from '../../utils/CommonFuntions';
import { VideoRatingRequest } from '../../actions/videoRating.action';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;



const ParticularVideoScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [videoPlayPause, setVideoPlayPause] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  const [modalPicker, setModalPicker] = useState(false)
  const [boostMsg, setBoostMsg] = useState('')
  const [boostStatus, setBoostStatus] = useState(false)
  const [videoPostID, setVideoPostID] = useState()
  const [editModalPicker, setEditModalPicker] = useState(false);
  const [editVideoPicker, setEditVideoPicker] = useState(false);
  const [playVideo, setPlayVideo] = useState(false)
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoPrice, setVideoPrice] = useState('');
  const [videoTypes, setVideoTypes] = useState([]);
  
  const [postId, setPostId] = useState('')
  const [videoTypeList, setVideoTypeList] = useState([
    {
      id: '1',
      title: 'Music',
    },
    {
      id: '2',
      title: 'Art',
    },
    {
      id: '3',
      title: 'Dance',
    },
    {
      id: '4',
      title: 'Fashion',
    },
  ]);
  const [selectNegotiable, setSelectNegotiable] = useState(false);


   useEffect(() => {
     const listener = status => {
       if (status === 'background' || status === 'inactive') {
       setPlayVideo(true);
       }
     };
     AppState.addEventListener('change', listener);
     return () => {
       AppState.removeEventListener('change', listener);
     };
   }, []); 

 

  useEffect(() => {
    console.log('VIDEO POST ID', props.route.params?.videoPostId);
    onCallParticularVideoPostAPI()
  }, [props.navigation]);

  const onCallParticularVideoPostAPI = () => {
    console.log('POSTID', props.route.params?.videoPostId);
    setLoading(true)
    let data = {
      post_id: props.route.params?.videoPostId,
    };
    dispatch(PlayParticularVideoRequest(data, response =>{
        console.log("PLAY PARTICULAR VIDEO RES", response)
        if(response.status == 'success')
        {
        setVideoList([...response?.Post]);
        setVideoTitle(response.Post[0]?.title);
        setVideoDesc(response.Post[0]?.description);
        setVideoPrice(response.Post[0]?.amount);

        let resCategory = response.Post[0]?.category;
        console.log('ResCategory', resCategory);

        let arr = videoTypeList.map((item, index) => {
          console.log(resCategory.includes(item.title));
          if (resCategory.includes(item.title)) {
            console.log('TRUE', item?.title);
            item.selected = true;
          } else {
            console.log('FALSE', item?.title);
            item.selected = false;
          }
          return {...item};
        });
        console.log('VideoListArray', arr);
        setVideoTypeList(arr);
        setVideoTypes(resCategory.split(','));
        setLoading(false);
        }
        else{
        Toast.show(response.message, Toast.SHORT);
        setLoading(false);
        }
    }))
  }

  const myCustomShare = async videoURL => {
    const shareOptions = {
      title: 'BDiskovered',
      message: `Hey, have you tried Bdiskovered? 
      VideoLink :${videoURL}`,
      url: `${videoURL}`,
    }
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
    setLoading(true)
    console.log('ONLOAD', data);
    setLoading(false)
  };

  const onCallVideoRatingAPI = (PercentLike, PostId,userId,userType) => {
    // setLoading(true);
    let data = {
      id: PostId,
      percentage_like: `${PercentLike}`,
      user_id: userId,
      user_type: userType,
    };
    dispatch(VideoRatingRequest(data,response =>{
      console.log('LIKE RES', response);
      if (response.status == 'success') {
        // Toast.show(response.message, Toast.SHORT);
        onCallParticularVideoPostAPI();

        // setLoading(false);
      } else {
        // setLoading(false);
        Toast.show(response.message, Toast.SHORT);
      }
    }))
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
    //     Toast.show(res.data.message, Toast.SHORT);
    //     onCallParticularVideoPostAPI()
      
    //     // setLoading(false);
    //   } else {
    //     setLoading(false);
    //     Toast.show(res.data.message, Toast.SHORT);
    //   }
    // });
  };

const onCallSavePost = (postId,ind) => {
  let data = {
    post_id: postId,
  };
  // setLoading(true);
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
        // Toast.show(response?.message, Toast.SHORT);
        // setLoading(false);
      } else {
        Toast.show(response?.message, Toast.SHORT);
        // setLoading(false);
      }
    }),
  );
};

const onCallRemoveSavePost = (postId,ind)=>{
  let data = {
    post_id: postId,
  };
  // setLoading(true);
  dispatch(
    DeleteSavedPostRequest(data, response => {
      console.log('Delete Post Response', response);
      if (response.status == 'success') {
        const dummyData = videoList;
        let arr = dummyData.map((item, index) => {
          if (ind == index) {
            item.post_save = !item.post_save;
          }
          return {...item};
        });
        console.log('delete post return', arr);
        setVideoList(arr);
        // Toast.show(response?.message, Toast.SHORT);
        // setLoading(false);
      } else {
        Toast.show(response?.message, Toast.SHORT);
        // setLoading(false);
      }
    }))
}
 const onPressBoostAPI = (postId) => {
    // setLoading(true)
    let data = {
        post_id: postId
    }
    dispatch(BoostPostRequest(data,response => {
        console.log("BOOST POST RES",response)
        if(response.status == 'success')
        {
          // setBoostMsg(response.message);
          // setBoostStatus(false);
          // setModalPicker(true);
          if(response.message == 'Boost successfully')
          {
            Toast.show(response.message, Toast.SHORT);
            setBoostMsg(response.message);
            setBoostStatus(true);
          }
          else
          {
              setPlayVideo(true);
              setBoostMsg(response.message);
              setBoostStatus(false);
              setModalPicker(true);
          }
      }
    }))
  };

  const onCallSubScription = () => {
    setModalPicker(false)
    props.navigation.navigate('SubscriptionScreen')
    
  }

    const onDeleteVideoAlart = () => {
        Alert.alert(
          'Delete Video!',
          'Are you sure want to delete this video?',
          [
            {
              text: 'Proceed',
              onPress: () => onCallDeletevideoAPI(),
            },
            {
              text: 'No',
            },
          ],
          {
            cancelable: true,
          }
        )
      }

      const onCallDeletevideoAPI = () => {
        setLoading(true);
        let data = {
          id: postId,
        };
        console.log('PostId', data);
        dispatch(
          PostDeleteRequest(data, response => {
            console.log('Postdelete Response', response);
            if (response.status) {
              setLoading(false);
              setEditModalPicker(false)
              Toast.show(response.message, Toast.SHORT);
              props.navigation.goBack()
            } else {
              Toast.show(response.message, Toast.SHORT);
              setEditModalPicker(false);
              setLoading(false);
            }
          })
        )
      }

  const onCallEditVideoModal = () => {
    setEditModalPicker(false)
    setPlayVideo(true)
    setEditVideoPicker(true)
  }

  const onCallRequestClose = () => {
    setPlayVideo(false)
    setEditVideoPicker(false);
  }

  const onCallVideoSelect = (item, ind) => {
    const dummyData = videoTypeList;
    let arr = dummyData.map((item, index) => {
      if (ind == index) {
        item.selected = !item.selected;
      }
      return {...item};
    });
    console.log('arr return', arr);
    let tempArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].selected) {
        tempArray.push(arr[i].title);
      }
    }
    console.log('TempArray', tempArray);
    setVideoTypes(tempArray);
    setVideoTypeList(arr);
  };

  const checkValid = () => {
    return (
      CommonFunctions.isBlank(videoTitle.trim(), 'Please Enter Video Title') &&
      CommonFunctions.isBlank(
        videoDesc.trim(),
        'Please Enter Video Description',
      ) &&
      onCheckVideoType()
    )
  }

  const onCheckVideoType = () => {
    if (videoTypes.length == 0) {
      Toast.show('Please Select Video Type', Toast.SHORT);
      return false;
    }
    return true;
  };

  const oncheckValidVideo = () => {
    if (checkValid()) {
      onCallPostUpdateAPI();
    }
  }

  const onCallPostUpdateAPI = () => {
    let data = {
      post_id:postId,
      title:videoTitle,
      caption:videoDesc,
      amount:videoPrice,
      category:videoTypes.toString(),
      negotiable:selectNegotiable
    }
    setLoading(true)
    console.log("EDIT VIDEO DATA",data)
    dispatch(EditPostRequest(data, response=>{
      console.log("Edit Video Response",response)
      if(response.status)
      {
        Toast.show(response.message, Toast.SHORT);
        setLoading(false)
        onCallRequestClose()
        props.navigation.goBack()
      }
      else
      {
        setLoading(false);
        onCallRequestClose();
        Toast.show(response.message, Toast.SHORT);
      }
    }))
  }

  const onCallOpenEditVideoModal = (postId) => {
    setEditModalPicker(true)
    setPostId(postId)
  }

  const onCallOkBoost = () => {
    setPlayVideo(false)
    setModalPicker(false);
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        {!loading ? (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <SwiperFlatList
                // index={currIndex}
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
                        onPress={() => setPlayVideo(!playVideo)}
                        style={({pressed}) => [
                          {
                            opacity: pressed ? 0.8 :1,
                            height: screenHeight - R.fontSize.Size100,
                          },
                        ]}>
                        <VideoCard
                          videoUrl={`${Config.API_URL}${item?.post.replace(
                            'http://localhost:8080/',
                            '',
                          )}`}
                          bottomTitle={item?.title}
                          bottomDiscription={item?.description}
                          usdPrice={`USD ${item?.amount}`}
                          onLoad={onLoad}
                          eyeMarginTop={R.fontSize.Size40}
                          eyeonPress={() => {
                            props.route.params?.from == 'ProfileScreen' &&
                              onCallOpenEditVideoModal(item.postID);
                          }}
                          eyeIcon={
                            props.route.params?.from == 'ProfileScreen' &&
                            R.images.greyDotsIcon
                          }
                          paused={playVideo}
                          reportHidden={true}
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
                        />
                      </Pressable>
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
                                  : sliderValue
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
                                console.log('SLIDE COMPLETE', value.toFixed(0));
                                onCallVideoRatingAPI(
                                  value.toFixed(0),
                                  item?.postID,
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
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
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
                                {item?.total_rating != '0' &&
                                item?.total_rating != null
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
                              ? `${parseInt(
                                  item.postInfo[0]?.percentage_like,
                                )}%`
                              : `${sliderValue.toFixed(0)}%`}
                          </Text>
                        </View>
                        {props.route.params?.from == 'ProfileScreen' && (
                          <Pressable
                            disabled={
                              props.route.params?.from == 'ProfileScreen'
                                ? false
                                : true
                            }
                            onPress={() => onPressBoostAPI(item?.postID)}
                            style={({pressed}) => [
                              {
                                marginHorizontal: R.fontSize.Size8,
                                alignItems: 'center',
                                opacity: pressed ? 0.5 : 1,
                              },
                            ]}>
                            <Image
                              source={R.images.boostIcon}
                              style={{
                                height: R.fontSize.Size40,
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
                              {'Boost'}
                            </Text>
                          </Pressable>
                        )}
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
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={R.colors.appColor} />
          </View>
        )}
      </View>
      <AlartModal
        visible={modalPicker}
        onRequestClose={() => setModalPicker(false)}
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
      <ReportModal
        visible={editModalPicker}
        onRequestClose={() => setEditModalPicker(false)}
        closeModal={() => setEditModalPicker(false)}
        title1={`Delete`}
        title2={`Edit Video`}
        icon1={R.images.grayDeleteIcon}
        icon2={R.images.profileEditIcon}
        optionThird={true}
        onPress1={() => onDeleteVideoAlart()}
        onPress2={() => onCallEditVideoModal()}
      />
      <ReportDetailModal
        visible={editVideoPicker}
        onRequestClose={() => onCallRequestClose()}
        closeModal={() => onCallRequestClose()}
        title={'Edit Video'}
        buttonHidden={true}
        ReportContent={
          <View>
            <View
              style={{
                marginTop: R.fontSize.Size2,
                backgroundColor: R.colors.white,
              }}>
              <CustomLineTextInput
                value={videoTitle}
                onChangeText={title => setVideoTitle(title)}
                placeholder={'Title'}
              />
              <CustomLineTextInput
                value={videoDesc}
                onChangeText={desc => setVideoDesc(desc)}
                placeholder={'Description'}
              />
              <CustomLineTextInput
                value={videoPrice}
                onChangeText={price => setVideoPrice(price)}
                placeholder={'Price in USD'}
                keyboardType={'number-pad'}
              />

              <View style={{marginVertical: R.fontSize.Size10}}>
                <Pressable
                  onPress={() => setSelectNegotiable(!selectNegotiable)}
                  style={({pressed}) => [
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}>
                  <Image
                    source={
                      selectNegotiable
                        ? R.images.checkTermsIcon
                        : R.images.unCheckTermsIcon
                    }
                    style={{
                      height: R.fontSize.Size20,
                      width: R.fontSize.Size20,
                    }}
                    resizeMode={'contain'}
                  />
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      color: R.colors.primaryTextColor,
                      fontSize: R.fontSize.Size12,
                      fontWeight: '500',
                      marginLeft: R.fontSize.Size10,
                    }}>
                    {'Negotiable'}
                  </Text>
                </Pressable>
              </View>

              <View style={{marginVertical: R.fontSize.Size8}}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    fontWeight: '700',
                    color: R.colors.primaryTextColor,
                  }}>
                  {'Video Type'}
                </Text>
              </View>
              <View
                style={{
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  marginLeft: -R.fontSize.Size14,
                }}>
                {videoTypeList.map((item, index) => {
                  return (
                    <Pressable
                      onPress={() => onCallVideoSelect(item, index)}
                      key={index}
                      style={({pressed}) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          width: screenWidth / 4,
                          marginVertical: R.fontSize.Size4,
                          marginLeft: R.fontSize.Size14,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: item?.selected
                            ? R.colors.appColor
                            : R.colors.white,
                          borderWidth: 1,
                          paddingVertical: R.fontSize.Size8,
                          borderRadius: R.fontSize.Size20,
                          borderColor: R.colors.placeHolderColor,
                        },
                      ]}>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size14,
                          fontWeight: '700',
                          color: item?.selected
                            ? R.colors.white
                            : R.colors.placeHolderColor,
                        }}
                        numberOfLines={1}>
                        {item.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <View style={{paddingTop: R.fontSize.Size10}}>
              <AppButton
                onPress={() => oncheckValidVideo()}
                buttonHeight={R.fontSize.Size40}
                title={'Update Post'}
                marginHorizontal={R.fontSize.Size50}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  loading:
    state.uploadNewVideoRoot.loading ||
    state.videoRateRoot.loading ||
    state.savedPostRoot.loading ||
    state.getProfileDetailsRoot.loading ||
    state.blockRoot.loading ||
    state.boostPostRoot.loading,
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps)(ParticularVideoScreen);
