import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Image, Pressable, Text, ImageBackground, SafeAreaView, Dimensions} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { FullViewStoryScreen, Header, StoryScreen, VideoCard } from '../../components';
import R from '../../res/R';
import {connect,useDispatch} from 'react-redux';
import { Config } from '../../config';
import Slider from 'react-native-custom-slider';

const screenHeight = Dimensions.get('screen').height;


const TailentVideoList = (props) => {

const dispatch = useDispatch();
const [loading, setLoading] = useState(false);
const [currIndex, setCurrIndex] = useState(0);
const [videoPlayPause, setVideoPlayPause] = useState(false);
const [videoList, setVideoList] = useState([])


useEffect(()=>{
    const blur = props.navigation.addListener('blur', () => {
    setVideoPlayPause(true);
    });

    const focus = props.navigation.addListener('focus', () => {
    setVideoPlayPause(false);
    });

    return blur, focus;
},[props.navigation])

useEffect(()=>{
    setLoading(true)
    setVideoList(props.route.params?.videoItems);
    setCurrIndex(props.route.params?.playIndex);
    setLoading(false)
},[props.navigation])



const onChangeIndex = ({index}) => {
  setCurrIndex(index);
};

  const onLoad = data => {
    console.log('ONLOAD', data);
  };

    return (
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
                      height: screenHeight,
                    }}>
                    <VideoCard
                      poster={`${Config.API_URL}${item?.post.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      videoUrl={`${Config.API_URL}${item?.post.replace(
                        'http://localhost:8080/',
                        '',
                      )}`}
                      videoCat={item?.category}
                      bottomTitle={item?.title}
                      bottomDiscription={item?.caption}
                      onLoad={onLoad}
                      paused={currIndex !== index || videoPlayPause}
                      // paused={true}
                    />
                  </View>
                  {/* <View
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
                    </View> */}
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
            onPress={()=> props.navigation.goBack()}
            style={({pressed}) => [
              {
                height: R.fontSize.Size50,
                width: R.fontSize.Size50,
                borderRadius: R.fontSize.Size4,
                backgroundColor: R.colors.modelBackground,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed?0.5:1
              }
            ]}>
            <Image
              source={R.images.chevronBack}
              style={{height: R.fontSize.Size24, width: R.fontSize.Size24}}
              resizeMode={'contain'}
            />
          </Pressable>
        </View>
      </View>
    );
}

export default TailentVideoList;