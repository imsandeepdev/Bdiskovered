import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions,
  ImageBackground
} from 'react-native';
import {Header, StoryScreen, VideoCard} from '../../components';
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import { ShowAllPostRequest } from '../../actions/showAllPost.action';
import Slider from 'react-native-custom-slider';

import SwiperFlatList from 'react-native-swiper-flatlist';
import { Config } from '../../config';
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


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

const PopularViewAllScreen = props => {

  const dispatch = useDispatch();
  const [currIndex, setCurrIndex] = useState(0);
  const [videoPlayPause, setVideoPlayPause] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allVideoPostList, setAllVideoPostList] = useState([]);
  const [sliderValue, setSliderValue] = useState(0); 


  useEffect(()=>{
    onCallShowAllPost()

     const blur = props.navigation.addListener('blur', () => {
       setVideoPlayPause(true);
     });

     const focus = props.navigation.addListener('focus', () => {
       setVideoPlayPause(false);
     });

     return blur, focus;

  },[props.navigation])

  const onCallShowAllPost = () => {
    setLoading(true);

    dispatch(
      ShowAllPostRequest(response => {
        console.log('SHOW ALL POST RES', response);
        if (response.status == 'success') {
          setAllVideoPostList(response?.Post);
          setLoading(false);
        }
      }),
    );
  };
  const onChangeIndex = ({index}) => {
    setCurrIndex(index);
  };

  const onCallVideoRatingAPI = (PercentLike, PostId) => {
    let data = {
      postId: PostId,
      percentage_like: `${PercentLike}%`,
    };
    dispatch(
      VideoRatingRequest(data, response => {
        console.log('VIDEO RATING RES', response);
      }),
    );
  };

  // const onProgress = (data) => {
  //       console.log("ON PROGRESS", data)
  //     }
  const onLoad = data => {
    console.log('ONLOAD', data);
  };

  return (
    <StoryScreen loading={loading}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          title={'Connected Users'}
        />

        <View
          style={{
            flex: 1,
            borderWidth:2,
            borderColor:R.colors.appColor
            
            // marginHorizontal: R.fontSize.Size20,
            // marginVertical: R.fontSize.Size10,
          }}>
          <SwiperFlatList
            vertical={true}
            style={{flexDirection:'column',flex:1}}
            data={allVideoPostList}
            keyExtractor={(item, index) => index.toString()}
            onChangeIndex={onChangeIndex}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    //  flex:1,
                    //  height: screenHeight/1.18
                    position: 'relative',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}>
                  <View style={{height: screenHeight / 2}}>
                    <View
                      style={{
                        flex: 1,
                        borderWidth: 2,
                      }}>
                      <VideoCard
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
                        videoCat={item?.category}
                        bottomTitle={item?.title}
                        bottomDiscription={item?.bio}
                        // onProgress={onProgress}
                        onLoad={onLoad}
                        paused={currIndex !== index || videoPlayPause}
                        // paused={true}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: R.fontSize.Size5,
                        marginHorizontal: R.fontSize.Size12,
                        alignItems: 'center',
                      }}>
                      <View style={{flex: 1}}>
                        <View style={{marginBottom: R.fontSize.Size6}}>
                          <Slider
                            value={sliderValue[index]}
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
                                    {sliderValue.toFixed(0)}
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
                              {item?.total_rating != ''
                                ? `${item?.total_rating}%`
                                : '0%'}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          marginHorizontal: R.fontSize.Size15,
                          alignItems: 'center',
                        }}>
                        <Image
                          source={R.images.greyAppIcon}
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
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </StoryScreen>
  );
};

export default PopularViewAllScreen;
