import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable,
  TextInput,
  Modal,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {CustomTextInput, StoryScreen, AppButton, Header, ShadowHeader, CustomCardView, CustomCardLine, VideoCard, CustomLineTextInput} from '../../components';
import Toast from 'react-native-simple-toast';
import Slider from 'react-native-custom-slider';
import {useDispatch, connect} from 'react-redux';
import SwiperFlatList from 'react-native-swiper-flatlist';
import R from '../../res/R';
import Styles from './styles';
import { ShowAllPostRequest } from '../../actions/showAllPost.action';
import { Config } from '../../config';
import { VideoRatingRequest } from '../../actions/videoRating.action';
import axios from 'axios';
import moment from 'moment';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import DeviceInfo from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserLocationRequest } from '../../actions/userLocation.action';
import Geocoder from 'react-native-geocoder-reborn';
import Share from 'react-native-share';
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';



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

const HomeScreen = (props) => {


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
  const [userLat, setUserLat] = useState('');
  const [userLong, setUserLong] = useState('');
  const [tailentLocation, setTailentLocation] = useState('');
  const [deviceName, setDeviceName] = useState('')
  const [fullScreenDevice, setFullScreenDevice] = useState(false)
  const [ratingVideoInfo, setRatingVideoInfo] = useState({})



  const [allVideoPostList, setAllVideoPostList] = useState([])

  
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
    onCallLatitudeLongitude();
    onCallProfile();
    onCallDeviceName();
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
     let deviceNotch = DeviceInfo.hasNotch();
     console.log("DEVICE NOTCH",DeviceInfo.hasNotch())
     setLoading(false)
  }

  const onCallLatitudeLongitude = () => { 
    AsyncStorage.getItem('userLongitude', (err, result) => {
      console.log('RESULT LONGITUDE', result);
      const myArray = result.split(",")
      console.log("Result1",myArray[0])
      console.log('Result2', myArray[1]);
      onCallLatLong(myArray[0], myArray[1]);
    });
  }

  const onCallProfile = () => {
   dispatch(
     GetProfileDetailsRequest(response => {
       console.log('PROFILE DETAIL ON APP NAVIGATOR', response);
     }),
   );
  }

  const onCallLatLong = (lat,long) => {
    let data = {
      latitude: lat,
      longitude: long,
    };
    console.log("DATA",data)
    dispatch(UserLocationRequest(data,response=>{
      console.log("UserLOC RES",response)
    }))
  }

  const screenFocus = () => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(R.colors.appColor, true);
    StatusBar.setBarStyle('dark-content', true);
    onCallShowAllPost();
    onCallProfile();
  };

   const onCallSelectedTailent = (item, ind) => {
     const dummyData = tailentList;
     let arr = dummyData.map((item, index) => {
       if (ind == index) {
         item.selected = !item.selected;
       }
       return {...item};
     });
     console.log('arr return', arr);
     setTailentList(arr);
   };

  const onCallModal = (type,item) => {
    setModalType(type)
    setModalPicker(true);
    if(type == 'videoDetailModal')
    {
      setVideoModalDetail(item)
     
      onCallGoogleAPI(item)
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

const onCallGoogleAPI = profileDetails => {
  setLoading(true);
  console.log('PROFILE DETAILS ON GAPI', profileDetails);

  fetch(
    `${Config.Google_URL}${profileDetails?.latitude},${profileDetails?.longitude}&key=${Config.GoogleAPIKEY}`,
  )
    .then(res => res.json())
    .then(response => {
      console.log('ADDRESS RESPONSE BY LAT LONG', response?.results);
      let temparray = [];
      temparray = response?.results;
      let tempLength = temparray.length;
      let arrayAdd = temparray[tempLength - 3]?.formatted_address;
      let arrayAddress = arrayAdd.split(',');
      let arrAddLength = arrayAddress.length;
      console.log('FORMAT ADDRESS LENGTH', arrAddLength);

      console.log('FORMAT ADDRESS', arrayAddress[arrAddLength - 1]);
      setVideoModalPersonalDetail([
        profileDetails?.gender,
        `${moment().diff(profileDetails?.birth, 'years')} Year`,
        `${arrayAddress[arrAddLength - 3]}`,
      ]);
      setLoading(false);
    });
};

//  const onCallModalUserLocation = item => {
//    setLoading(true);

//    console.log('profile Data', item);
//    var NY = {
//      lat: parseInt(item?.latitude),
//      lng: parseInt(item?.longitude),
//    };
//    Geocoder.geocodePosition(NY)
//      .then(res => {
//        console.log('response', res);
//        setVideoModalPersonalDetail([
//          `${moment().diff(item?.birth, 'years')} Year`,
//          item?.gender,
//          `${res[0].locality}, ${res[0].country}`,
//        ]);
//      })
//      .catch(err => console.log('ERROR', err));
//    setLoading(false);
//  };

  const onCallShowAllPost = () => {
    setLoading(true)

    dispatch(ShowAllPostRequest(response => {
      console.log('SHOW ALL POST RES', response)
      if(response.status=='success')
      {
        setAllVideoPostList(response?.Post)
        setLoading(false);
      }
    }))  
  }

  const onChangeIndex = ({index}) => {
    setCurrIndex(index)
  }

  const onCallVideoRatingAPI = (PercentLike,PostId) => {
    setLoading(true)
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
        headers: headerToken
      }).then(res => {
        console.log("LIKE RES",res)
        if(res.data.status == 'success')
        {
          Toast.show(res.data.message, Toast.SHORT);
          onCallShowAllPost();
          setTimeout(()=>{
          setSliderValue(0);
          },3000)
          setLoading(false);
        }
        else
        {
          setLoading(false);
          Toast.show(res.data.message, Toast.SHORT);
        }
      })

    // setLoading(true)
    // let data = {
    //   id:PostId,
    //   percentage_like:`${PercentLike}`
    // }
    // console.log('LIKE DATA',data)
    // dispatch(VideoRatingRequest(data,response=>{
    //   console.log('VIDEO RATING RES', response);
    //   if(response.status == 'success')
    //   {
    //     Toast.show(response.message, Toast.SHORT)
    //     onCallShowAllPost();
    //     setLoading(false);
    //   }
    //   else
    //   {
    //     Toast.show(response.message, Toast.SHORT);
    //     setLoading(false);

    //   }
    // }))
  }

 
  const onLoad = (data) => {
    console.log('ONLOAD',data)
  }

  const onCallConnectNow = (profileID) => 
  {
    setModalPicker(false)
     props.userProfile?.Profile?.subscription != 0
       ? props.navigation.navigate('ConnectedProfileScreen', {
           profileId: profileID,
           myUserId: props.userProfile?.Profile?.user_id,
         })
       : props.navigation.navigate('SubscriptionScreen');
  }


  const onPressOrangeAppIcon = (profileID) => {
    console.log('PROFILESUB', props.userProfile?.Profile?.subscription);
    props.userProfile?.Profile?.subscription != 0
      ? props.navigation.navigate('ConnectedProfileScreen', {
          profileId: profileID,
          myUserId: props.userProfile?.Profile?.user_id,
        })
      : props.navigation.navigate('SubscriptionScreen');
  }

  const onCallUserLocation = (lat, long) => {
    fetch(
      `${Config.Google_URL}${lat},${long}&key=${Config.GoogleAPIKEY}`,
    )
      .then(res => res.json())
      .then(response => {
        console.log('ADDRESS RESPONSE BY LAT LONG', response?.results);
        let temparray = [];
        temparray = response?.results;
        let tempLength = temparray.length;
        let arrayAdd = temparray[tempLength - 3]?.formatted_address;
        let arrayAddress = arrayAdd.split(',');
        let arrAddLength = arrayAddress.length;
        console.log('FORMAT ADDRESS LENGTH', arrAddLength);
        console.log('FORMAT ADDRESS', arrayAddress[arrAddLength - 1]);
        setTailentLocation(arrayAddress[arrAddLength - 3]);     
      });
  };

  const myCustomShare = async () => {
    const shareOptions = {
      title: 'App Link',
      message: `Hey, have you tried Bdiskovered? 
AppLink :https://mir-s3-cdn-cf.behance.net/projects/404/fe8316130815503.Y3JvcCw4MzEsNjUwLDQ1LDA.jpg`,
      url: `https://mir-s3-cdn-cf.behance.net/projects/404/fe8316130815503.Y3JvcCw4MzEsNjUwLDQ1LDA.jpg`,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };
  
  return (
    <StoryScreen loading={loading}>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.toggleDrawer()}
          headerHeight={R.fontSize.Size50}
          leftSource={R.images.menuIcon}
          // rightSource={R.images.filterIcon}
          // rightSourceOnPress={() => onCallModal('filterModal')}
          rightSource2={R.images.bellIcon}
          rightSourceOnPress2={() =>
            props.navigation.navigate('NotificationScreen')
          }
        />
        <View style={{flex: 1}}>
          <SwiperFlatList
            vertical={true}
            style={{flex: 1}}
            nestedScrollEnabled
            data={allVideoPostList}
            keyExtractor={(item, index) => index.toString()}
            onChangeIndex={onChangeIndex}
            renderItem={({item, index}) => {

              
                if (currIndex == index)
                {
                    onCallUserLocation(item?.latitude, item?.longitude);
                }
              
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                  }}>
                  <View
                    style={{
                      height: DeviceInfo.hasNotch()
                        ? screenHeight - R.fontSize.Size279
                        : screenHeight - R.fontSize.Size254,
                    }}>
                    <VideoCard
                      poster={`${Config.API_URL}${item?.avatar.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      eyeonPress={() => onCallModal('videoDetailModal', item)}
                      eyeIcon={R.images.eyeIcon}
                      videoUrl={`${Config.API_URL}${item?.post.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userImage={`${Config.API_URL}${item?.avatar.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userName={item?.username}
                      videoCat={tailentLocation != '' ? tailentLocation : ''}
                      bottomTitle={item?.title}
                      bottomDiscription={item?.bio}
                      usdPrice={`USD ${item?.amount}`}
                      // onProgress={onProgress}
                      onLoad={onLoad}
                      paused={currIndex !== index || videoPlayPause}
                      // paused={true}
                      shareFiled={
                        <View
                          style={{
                            marginRight: R.fontSize.Size10,
                            alignItems: 'center',
                          }}>
                          <Pressable
                            onPress={() => myCustomShare()}
                            style={({pressed}) => [
                              {
                                opacity: pressed ? 0.3 : 0.8,
                                height: R.fontSize.Size50,
                                width: R.fontSize.Size50,
                                borderRadius: R.fontSize.Size8,
                                backgroundColor: R.colors.lightBlack,
                                alignItems: 'center',
                                justifyContent: 'center',
                              },
                            ]}>
                            <Image
                              source={R.images.shareIcon}
                              style={{
                                height: R.fontSize.Size30,
                                width: R.fontSize.Size30,
                              }}
                              resizeMode={'contain'}
                            />
                          </Pressable>
                          <Text
                            style={{
                              color: R.colors.lightWhite,
                              fontSize: R.fontSize.Size14,
                              fontFamily: R.fonts.regular,
                              fontWeight: '400',
                            }}>
                            Share
                          </Text>
                        </View>
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
                          disabled={(item?.postInfo != 'undefined' && item?.postInfo!= null)&&  item.postInfo[0]?.percentage_like != null
                              ? true
                              : false
                          }
                          value={ (item?.postInfo != 'undefined' && item?.postInfo!= null) &&
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
                              <ImageBackground
                                source={R.images.redHeartIcon}
                                style={{
                                  width: R.fontSize.Size35,
                                  height: R.fontSize.Size35,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                resizeMode={'contain'}>
                                <Text
                                  style={{
                                    color: R.colors.white,
                                    fontSize: R.fontSize.Size8,
                                    height: R.fontSize.Size20,
                                  }}>
                                  {
                                  (item?.postInfo != 'undefined' && item?.postInfo!= null) &&
                                  item.postInfo[0]?.percentage_like != null
                                    ? parseInt(
                                        item.postInfo[0]?.percentage_like,
                                      )
                                    : sliderValue.toFixed(0)}
                                </Text>
                              </ImageBackground>
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
                            {item?.total_rating != ''
                              ? `${(
                                  item?.total_rating /
                                  (item?.total_likes * 20)
                                ).toFixed(1)}%`
                              : '0%'}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <Pressable
                      onPress={() => onPressOrangeAppIcon(item?.profileID)}
                      style={({pressed}) => [
                        {
                          marginHorizontal: R.fontSize.Size15,
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
                        {
                          videoModalDetail?.bio != ''&&
                          <View style={{marginTop: R.fontSize.Size20}}>
                          <Text style={Styles.videoModalDescText}>
                            {videoModalDetail?.bio}
                          </Text>
                        </View>}
                        <View style={Styles.videoModalMapMainView}>
                          {videoModalPersonalDetail.map((item, index) => {
                            return (
                              <View
                                key={index}
                                style={Styles.videoModalMapView}>
                                <View
                                  style={Styles.videoModalPersonalDetailView}
                                />
                                <Text
                                  style={Styles.videoModalPersonalDetailText}>
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
                                <Text style={Styles.videoModalTalentText} numberOfLines={1}>
                                  {item}
                                </Text>
                              </View>
                            )
                          })}
                        </View>
                        <View style={{flexWrap:'wrap', flexDirection:'row',marginLeft:-R.fontSize.Size14, marginTop:R.fontSize.Size20}}>
                          {videoModalAvailableDetail.map((item, index) => {
                            return (
                              <View key={index}>
                                {item?.amount != '' &&
                                item?.amount != null ? (
                                  <CustomTimeRow
                                    leftTitle={item?.type}
                                    rightText={item?.amount}
                                    rightDayHours={item?.type == 'Full Time'?'/day':'/hrs'}
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
                onPress={() => {onCallConnectNow(videoModalDetail?.profileID);
                }}
                title={'Connect'}
                marginHorizontal={R.fontSize.Size55}
              />
            </View>
          </View>
        </View>
      </Modal>
    </StoryScreen>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});


export default connect(mapStateToProps)(HomeScreen);
