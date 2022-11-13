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
  TouchableWithoutFeedback
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
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
import Toast from 'react-native-simple-toast'
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;


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
    setVideoList(props.route.params?.videoItems);
    setLoading(false);
  }, [props.navigation]);

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
        setVideoList(props.route.params?.videoItems);
        setTimeout(() => {
          setSliderValue(0);
        }, 3000);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      }
    });
  };

  const onCallModal = (item) => {

    console.log("MODAL")
    setModalPicker(true);
      setVideoModalDetail(item);
      setVideoModalPersonalDetail([
        `${moment().diff(item?.birth, 'years')} Year`,
        item?.gender,
        'gurugram',
      ]);
    //   let tempTalentArray = item?.category;
    //   let useTalentArray = tempTalentArray?.split(',');
    //   console.log('useTalentArray', useTalentArray);
    //   setVideoModalTalentDetail(useTalentArray);
      setVideoModalAvailableDetail([
        {type: item?.job_type1, amount: item?.full_time_amount},
        {type: item?.job_type2, amount: item?.part_time_amount},
        {type: item?.job_type3, amount: item?.gigs_amount},
      ]); 
  };

   const onCallConnectNow = profileID => {
     setModalPicker(false);
     props.userProfile?.Profile?.subscription != 0
       ? props.navigation.navigate('ConnectedProfileScreen', {
           profileId: profileID,
           myUserId: props.userProfile?.Profile?.user_id,
         })
       : props.navigation.navigate('SubscriptionScreen');
   };


    const onPressOrangeAppIcon = profileID => {
      console.log('PROFILESUB', props.userProfile?.Profile?.subscription);
      props.userProfile?.Profile?.subscription != 0
        ? props.navigation.navigate('ConnectedProfileScreen', {
            profileId: profileID,
            myUserId: props.userProfile?.Profile?.user_id,
          })
        : props.navigation.navigate('SubscriptionScreen');
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
                      poster={`${Config.API_URL}${item?.post.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      videoUrl={`${Config.API_URL}${item?.post.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userImage={`${Config.API_URL}${item?.avatar.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      eyeonPress={() => onCallModal(item)}
                      eyeIcon={R.images.eyeIcon}
                      userName={item?.username}
                      videoCat={'Gurugram'}
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
                              <View
                                style={Styles.videoModalPersonalDetailView}
                              />
                              <Text style={Styles.videoModalPersonalDetailText}>
                                {item}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      {/* <View style={Styles.videoModalMapMainView}>
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
                      </View> */}
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
                  onCallConnectNow(videoModalDetail?.profileID);
                }}
                title={'Connect'}
                marginHorizontal={R.fontSize.Size55}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps) (FilterVideoScreen);
