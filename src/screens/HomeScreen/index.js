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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserLocationRequest } from '../../actions/userLocation.action';
import Geocoder from 'react-native-geocoder-reborn';
import Share from 'react-native-share';


const persnalDetails = [
  {
    id: '1',
    title: 'Age 24',
  },
  {
    id: '2',
    title: 'Female',
  },
  {
    id: '3',
    title: 'Gurugram',
  },
];

const timeDetails = [
  {
    id: '1',
    title: 'Gigs',
  },
  {
    id: '2',
    title: 'Full Time',
  },
  {
    id: '3',
    title: 'Internship',
  },
];

const SuggestedList = [
  {
    id: '1',
    url: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
  },
  {
    id: '2',
    url: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
  },
  {
    id: '3',
    url: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
  },
  {
    id: '4',
    url: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
  },
];


const TailentList = [
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
  
];

const ConnectedUsers = [
  {
    id: '1',
    name: 'ABCD',
    source:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: '2',
    name: 'Priya',
    source:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: '3',
    name: 'RiyaD',
    source:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: '4',
    name: 'Dimple',
    source:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  },
];

const PopularList = [
  {
    id: '1',
    name: 'bhishmasurgghgffr',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '2',
    name: 'Priya',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '3',
    name: 'RiyaD',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '4',
    name: 'Dimple',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
];

const CustomHeading = (props) => {
  return (
    <View
      style={{
        marginTop: R.fontSize.Size45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: R.fontSize.Size20,
      }}>
      <Text
        style={{
          fontFamily: R.fonts.regular,
          fontSize: R.fontSize.Size18,
          fontWeight: '700',
          color: R.colors.primaryTextColor,
        }}>
        {props.leftTitle}
      </Text>
      <Pressable
        onPress={props.rightOnPress}
        style={({pressed}) => [
          {
            padding: R.fontSize.Size4,
            opacity: pressed ? 0.5 : 1,
          },
        ]}>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size12,
            color: R.colors.appColor,
            fontWeight: '700',
          }}>
          {props.buttonTitle}
        </Text>
      </Pressable>
    </View>
  );
}

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


  const onCallLatitudeLongitude = () => { 
    AsyncStorage.getItem('userLongitude', (err, result) => {
      console.log('RESULT LONGITUDE', result);
      const myArray = result.split(",")
      console.log("Result1",myArray[0])
      console.log('Result2', myArray[1]);
      onCallLatLong(myArray[0], myArray[1]);
    });
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
      setVideoModalPersonalDetail([
        `${moment().diff(item?.birth, 'years')} Year`,
        item?.gender,
        'gurugram',
      ]);
      onCallModalUserLocation(item);
      let tempTalentArray = item?.category;
      let useTalentArray = tempTalentArray.split(',');
      console.log('useTalentArray', useTalentArray);
      setVideoModalTalentDetail(useTalentArray);
      setVideoModalAvailableDetail([
        item?.job_type1,
        item?.job_type2,
        item?.job_type3,
      ]);
    }
  }

 const onCallModalUserLocation = item => {
   setLoading(true);

   console.log('profile Data', item);
   var NY = {
     lat: parseInt(item?.latitude),
     lng: parseInt(item?.longitude),
   };
   Geocoder.geocodePosition(NY)
     .then(res => {
       console.log('response', res);
       setVideoModalPersonalDetail([
         `${moment().diff(item?.birth, 'years')} Year`,
         item?.gender,
         `${res[0].locality}, ${res[0].country}`,
       ]);
     })
     .catch(err => console.log('ERROR', err));
   setLoading(false);
 };

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

  // const onProgress = (data) => {
  //       console.log("ON PROGRESS", data)
  //     }
  const onLoad = (data) => {
    console.log('ONLOAD',data)
  }

  const onCallConnectNow = (profileID) => 
  {
    setModalPicker(false)
     props.userProfile.Profile?.subscription != 0
       ? props.navigation.navigate('ConnectedProfileScreen', {
           profileId: profileID,
         })
       : props.navigation.navigate('SubscriptionScreen');
  }


  const onPressOrangeAppIcon = (profileID) => {
    console.log('PROFILESUB', props.userProfile.Profile?.subscription);
    props.userProfile.Profile?.subscription != 0
      ? props.navigation.navigate('ConnectedProfileScreen', {
          profileId: profileID,
        })
      : props.navigation.navigate('SubscriptionScreen');
  }

  const onCallUserLocation = (lat, long) => {
    var NY = {
      lat: parseInt(lat),
      lng: parseInt(long),
    };
    Geocoder.geocodePosition(NY)
      .then(res => {
        console.log('response', res);
        setTailentLocation(`${res[0]?.locality}, ${res[0]?.country}`);
       
      })
      .catch(err => console.log('ERROR', err));
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
            // ListHeaderComponent={
            //   <View>
            //     <CustomHeading
            //       leftTitle={'Connected User'}
            //       buttonTitle={'View All'}
            //       rightOnPress={() =>
            //         props.navigation.navigate('UserViewAllScreen')
            //       }
            //     />
            //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            //       <View
            //         style={{
            //           marginTop: R.fontSize.Size30,
            //           flexDirection: 'row',
            //           marginHorizontal: R.fontSize.Size20,
            //         }}>
            //         {ConnectedUsers.map((item, index) => {
            //           return (
            //             <Pressable
            //               key={index}
            //               onPress={() =>
            //                 props.navigation.navigate('ConnectedProfileScreen')
            //               }
            //               style={({pressed}) => [
            //                 Styles.connectedUserMainView,
            //                 {
            //                   opacity: pressed ? 0.5 : 1,
            //                 },
            //               ]}>
            //               <View style={Styles.connectedUserView}>
            //                 <Image
            //                   source={{
            //                     uri: item?.source,
            //                   }}
            //                   style={Styles.connectedUserImage}
            //                   resizeMode={'cover'}
            //                 />
            //               </View>
            //               <Text
            //                 style={Styles.connectedUserText}
            //                 numberOfLines={1}>
            //                 {item?.name}
            //               </Text>
            //             </Pressable>
            //           );
            //         })}
            //       </View>
            //     </ScrollView>
            //     <CustomHeading
            //       leftTitle={'Most Popular'}
            //       buttonTitle={'View All'}
            //       rightOnPress={() => props.navigation.navigate('PopularViewAllScreen')}
            //     />

            //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            //       <View
            //         style={{
            //           marginTop: R.fontSize.Size30,
            //           flexDirection: 'row',
            //           marginHorizontal: R.fontSize.Size20,
            //           alignItems:'center'
            //         }}>
            //         {allVideoPostList.map((item, index) => {
            //           return (
            //             <View key={index} style={Styles.connectedUserMainView}>
            //               <View style={Styles.mostPopularView}>
            //                 <VideoCard
            //                   videoUrl={`${Config.API_URL}${item?.post.slice(
            //                     22,
            //                   )}`}
            //                   paused={true}
            //                 />
            //               </View>
            //               <View style={Styles.mostPopularBottomView}>
            //                 <Image
            //                   source={{
            //                     uri: `${Config.API_URL}${item?.avatar.slice(
            //                       22,
            //                     )}`,
            //                   }}
            //                   style={Styles.mostPopularBottomImage}
            //                   resizeMode={'cover'}
            //                 />
            //                 <Text
            //                   style={Styles.mostPopularBottomText}
            //                   numberOfLines={1}>
            //                   {item?.name}
            //                 </Text>
            //               </View>
            //             </View>
            //           );
            //         })}
            //       </View>
            //     </ScrollView>
            //     <CustomHeading leftTitle={'Suggested Post'} />
            //   </View>
            // }
            data={allVideoPostList}
            keyExtractor={(item, index) => index.toString()}
            onChangeIndex={onChangeIndex}
            renderItem={({item, index}) => {


              onCallUserLocation(item?.latitude, item?.longitude);
              // var NY = {
              //   lat: parseInt(item?.latitude),
              //   lng: parseInt(item?.longitude),
              // };
              // Geocoder.geocodePosition(NY)
              //   .then(res => {
              //     console.log('response', res);
              //     setTailentLocation(`${res[0]?.locality}, ${res[0]?.country}`);
              //   })
              //   .catch(err => console.log('ERROR', err));

              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                  }}>
                  <View
                    style={{
                      height: screenHeight - R.fontSize.Size290,
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
                                height: R.fontSize.Size35,
                                width: R.fontSize.Size35,
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
                                  {item?.postInfo[0]?.percentage_like != null
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
                              ? `${item?.total_rating}%`
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
                          fontSize: R.fontSize.Size12,
                          fontWeight: '400',
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
                    {modalType == 'filterModal' ? (
                      <View style={{flex: 1}}>
                        <Text style={Styles.modalFilterText}>{'Filter'}</Text>
                        <View
                          style={{flex: 1, marginVertical: R.fontSize.Size20}}>
                          <CustomCardLine
                            onPress={() => console.log('down')}
                            title={'35 - 50 $'}
                            rightIcon={R.images.chevronDown}
                          />
                          <CustomLineTextInput placeholder={'Location'} />
                          <CustomCardLine
                            onPress={() => console.log('down')}
                            title={'Age 25 - 35'}
                            rightIcon={R.images.chevronDown}
                          />
                          <View
                            style={{
                              flexWrap: 'wrap',
                              flexDirection: 'row',
                              paddingVertical: R.fontSize.Size10,
                            }}>
                            {tailentList.map((item, index) => {
                              return (
                                <Pressable
                                  onPress={() =>
                                    onCallSelectedTailent(item, index)
                                  }
                                  key={index}
                                  style={({pressed}) => [
                                    {
                                      marginTop: R.fontSize.Size6,
                                      paddingHorizontal: R.fontSize.Size15,
                                      paddingVertical: R.fontSize.Size5,
                                      borderRadius: R.fontSize.Size8,
                                      backgroundColor: item.selected
                                        ? R.colors.appColor
                                        : R.colors.placeholderTextColor,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      marginRight: R.fontSize.Size10,
                                      opacity: pressed ? 0.5 : 1,
                                    },
                                  ]}>
                                  <Text
                                    style={{
                                      fontFamily: R.fonts.regular,
                                      color: item.selected
                                        ? R.colors.white
                                        : R.colors.placeHolderColor,
                                      fontSize: R.fontSize.Size14,
                                      fontWeight: '400',
                                    }}>
                                    {item?.name}
                                  </Text>
                                </Pressable>
                              );
                            })}
                          </View>
                          <CustomCardLine
                            onPress={() => console.log('down')}
                            title={'Above 3.5 Stars'}
                            rightIcon={R.images.chevronDown}
                          />
                        </View>
                      </View>
                    ) : (
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
                                height: R.fontSize.Size30,
                                width: R.fontSize.Size30,
                              }}
                              resizeMode={'cover'}
                            />
                          </View>
                          <Text style={Styles.videoModalTitleText}>
                            {videoModalDetail?.title}
                          </Text>
                        </View>
                        <View style={{marginTop: R.fontSize.Size30}}>
                          <Text style={Styles.videoModalDescText}>
                            {videoModalDetail?.description}
                          </Text>
                        </View>
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
                                <Text style={Styles.videoModalTalentText}>
                                  {item}
                                </Text>
                              </View>
                            );
                          })}
                        </View>

                        <View style={{marginTop: R.fontSize.Size30}}>
                          <Text style={Styles.videoModalAvailableText}>
                            {'Available for :'}
                          </Text>
                        </View>

                        <View style={Styles.videoModalMapMainView}>
                          {videoModalAvailableDetail.map((item, index) => {
                            return (
                              <View
                                key={index}
                                style={[
                                  Styles.videoModalAvailView,
                                  {
                                    backgroundColor:
                                      (item != '' || item != null) &&
                                      R.colors.appColor,
                                  },
                                ]}>
                                <Text style={Styles.videoModalAvailItemText}>
                                  {item}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>

            <View style={{paddingVertical: R.fontSize.Size10}}>
              <AppButton
                onPress={() => {
                  modalType == 'filterModal'
                    ? console.log('Filter')
                    : onCallConnectNow(videoModalDetail?.profileID);
                }}
                title={modalType == 'filterModal' ? 'Apply' : 'Connect Now'}
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
