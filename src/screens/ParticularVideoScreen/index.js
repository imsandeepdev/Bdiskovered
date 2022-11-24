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
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  AlartModal,
  AppButton,
  FullViewStoryScreen,
  Header,
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
import Toast from 'react-native-simple-toast';
import Styles from './styles';
import { PlayParticularVideoRequest } from '../../actions/showAllPost.action';
import { BoostPostRequest } from '../../actions/boostPost.action';
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
    console.log('VIDEO POST ID', props.route.params?.videoPostId);
    onCallParticularVideoPostAPI()
  }, [props.navigation]);

  const onCallParticularVideoPostAPI = () => {

   setLoading(true);
   let headerAuth = {
     token: props.authToken,
   };

   let data = {
      post_id: props.route.params?.videoPostId,
    };
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
   const headers = headerAuth;
   const config = {
     method: 'POST',
     headers,
     body: formBody
   };

   console.log("FORM CONFIG", config)

   fetch(`${Config.API_URL}${Config.showAllPostAPI}`, config)
     .then(res => res.json())
     .then(response => {
       console.log('PLAY PARTICULAR VIDEO RES', response);
           if(response.status == 'success')
           {
           setVideoList(response?.Post);
           setLoading(false);
           }
           else{
           Toast.show(response.message, Toast.SHORT);
           setLoading(false);
           }
     })
     .catch(error => {
       console.log('ERRORONAPI', error);
       setLoading(false);
     });


    // setLoading(true)
    // let data = {
    //   post_id: props.route.params?.videoPostId,
    // };
    // dispatch(PlayParticularVideoRequest(data, response =>{
    //     console.log("PLAY PARTICULAR VIDEO RES", response)
    //     if(response.status == 'success')
    //     {
    //     setVideoList(response?.Post);
    //     setLoading(false);
    //     }
    //     else{
    //     Toast.show(response.message, Toast.SHORT);
    //     setLoading(false);
    //     }
    // }))
  }

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
        Toast.show(res.data.message, Toast.SHORT);
      
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      }
    });
  };


 

 

  const onPressBoostAPI = (postId) => {
    setLoading(true)
    let data = {
        post_id: postId
    }
    dispatch(BoostPostRequest(data,response => {
        console.log("BOOST POST RES",response)
        if(response.status == 'success')
        {
          if(response.message == 'boost success')
          {
            Toast.show(response.message, Toast.SHORT);
            setBoostMsg(response.message);
            setBoostStatus(true);
            // setModalPicker(true);
            setLoading(false);
          }
        else
        {
            // Toast.show(response.message, Toast.SHORT);
            setBoostMsg(response.message);
            setBoostStatus(false);
            setLoading(false);
            setModalPicker(true);

        }
      }
    }))
  };

  const onCallSubScription = () => {
    setModalPicker(false)
    props.navigation.navigate('SubscriptionScreen')
    
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
                      <View
                        style={{
                          height: screenHeight - R.fontSize.Size100,
                        }}>
                        <VideoCard
                          // poster={`${Config.API_URL}${item?.post.replace(
                          //   'http://localhost:8080/',
                          //   '',
                          // )}`}
                          // userImage={`${Config.API_URL}${item?.avatar.replace(
                          //   'http://localhost:8080/',
                          //   '',
                          // )}`}
                          // userName={item?.username}
                          // videoCat={'Gurugram'}
                          videoUrl={`${Config.API_URL}${item?.post.replace(
                            'http://localhost:8080/',
                            '',
                          )}`}
                          bottomTitle={item?.title}
                          bottomDiscription={item?.bio}
                          usdPrice={`USD ${item?.amount}`}
                          onLoad={onLoad}
                          paused={currIndex !== index || videoPlayPause}
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
                                {'Share'}
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
                          {/* <View>
                            <Slider
                              disabled={
                                (item?.postInfo != 'undefined' && item?.postInfo!= null &&  item.postInfo[0]?.percentage_like != null)
                                  ? true
                                  : false
                              }
                              value={
                                (item?.postInfo != 'undefined' && item?.postInfo!= null &&  item.postInfo[0]?.percentage_like != null)
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
                                      {item?.postInfo[0]?.percentage_like !=
                                      null
                                        ? parseInt(
                                            item.postInfo[0]?.percentage_like,
                                          )
                                        : sliderValue.toFixed(0)}
                                    </Text>
                                  </ImageBackground>
                                </View>
                              }
                            />
                          </View> */}
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
                                {item?.total_rating != '' || item?.total_rating != null
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
                          disabled={
                            props.route.params?.from == 'ProfileScreen'
                              ? false
                              : true
                          }
                          onPress={() => onPressBoostAPI(item?.postID)}
                          style={({pressed}) => [
                            {
                              marginHorizontal: R.fontSize.Size15,
                              alignItems: 'center',
                              opacity: pressed ? 0.5 : 1,
                            },
                          ]}>
                          <Image
                            source={
                              props.route.params?.from == 'ProfileScreen'
                                ? R.images.boostIcon
                                : R.images.orangeAppIcon
                            }
                            style={{
                              height: R.fontSize.Size40,
                              width: R.fontSize.Size30,
                              marginBottom: R.fontSize.Size6,
                            }}
                            resizeMode={'contain'}
                          />
                          {props.route.params?.from == 'ProfileScreen' && (
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
                          )}
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
              onPress={() => setModalPicker(false)}
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

export default connect(mapStateToProps)(ParticularVideoScreen);
