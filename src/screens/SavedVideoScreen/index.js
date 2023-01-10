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
  ScrollView
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  FullViewStoryScreen,
  Header,
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
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import Toast from 'react-native-simple-toast'
import { DeleteSavedPostRequest } from '../../actions/savedPost.action';



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





const SavedVideoScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [videoPlayPause, setVideoPlayPause] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);
  
  const [reportModalPicker, setReportModalPicker] = useState(false);
  const [reportDetailModalPicker, setReportDetailModalPicker] = useState(false);
  const [selectReport, setSelectReport] = useState('');
  const [selectTypeReport, setSelectTypeReport] = useState('');



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
    console.log('VIDEO LIST', props.route.params?.videoItems);
    setVideoList(props.route.params?.videoItems);
    setCurrIndex(props.route.params?.playIndex);
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

        setLoading(false);
      } else {
        setLoading(false);
        Toast.show(res.data.message, Toast.SHORT);
      }
    });
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

   const OnCallSelectReport = index => {
     setSelectReport(index);
   };

   const onCallClosedReportDetailModal = () => {
     setSelectTypeReport('');
     setReportDetailModalPicker(false);
     setSelectReport('');
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
           Toast.show(response?.message, Toast.SHORT);
           setLoading(false);
         } else {
           Toast.show(response?.message, Toast.SHORT);
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
                      videoUrl={`${Config.API_URL}${item?.post.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      userImage={`${Config.API_URL}${item?.post.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      fromTop={R.fontSize.Size35}
                      fromLeft={R.fontSize.Size14}
                      eyeIcon={R.images.eyeIcon}
                      userName={item?.username}
                      videoCat={'Gurugram'}
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
                            onPress={() => onCallRemoveSavePost(item?.postID)}
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
                              source={R.images.removeSavedIcon}
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
                            Remove Save
                          </Text>
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
                          <Pressable
                            onPress={() => setReportModalPicker(true)}
                            style={({pressed}) => [
                              {
                                opacity: pressed ? 0.3 : 0.8,
                                height: R.fontSize.Size20,
                                width: R.fontSize.Size50,
                                borderRadius: R.fontSize.Size8,
                                backgroundColor: R.colors.lightBlack,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginVertical: R.fontSize.Size15,
                              },
                            ]}>
                            <Image
                              source={R.images.oragneDotsIcon}
                              style={{
                                height: R.fontSize.Size30,
                                width: R.fontSize.Size30,
                              }}
                              resizeMode={'contain'}
                            />
                          </Pressable>
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
            left: R.fontSize.Size20,
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
        onPressReport={() => console.log('Report')}
        reportTitle={selectTypeReport == 'report' ? 'Report' : 'Yes'}
        title={selectTypeReport == 'report' ? 'Why are you reporting this post? ' : null}
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
                      onPress={() => OnCallSelectReport(index)}
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
                }}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontWeight: '500',
                    color: R.colors.lightBlack,
                    fontSize: R.fontSize.Size16,
                  }}>
                  {
                    'Are you sure to cut this video?\nwe does not show this video to you in future'
                  }
                </Text>
              </View>
            )}
            {selectTypeReport == 'dontRecommend' && (
              <View
                style={{
                  marginHorizontal: R.fontSize.Size10,
                  paddingBottom: R.fontSize.Size30,
                }}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontWeight: '500',
                    color: R.colors.lightBlack,
                    fontSize: R.fontSize.Size16,
                  }}>
                  {`Are you sure don't want to recommend this channel for future purpose?`}
                </Text>
              </View>
            )}
          </View>
        }
      />
    </View>
  );
};

export default SavedVideoScreen;
