import * as React from 'react';
import { useState, useRef } from 'react';
import {View, Text, Image, Pressable, Dimensions, TouchableOpacity} from 'react-native';

import Video from 'react-native-video';
import R from '../res/R';
const screenWidth = Dimensions.get('screen').width

const videoData =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoCard = React.forwardRef((props,ref) => {
  const videoRef = useRef(null)

  const [play, setPlay] = useState(true);


  const onBuffer = (e) => {
    // console.log('Buffering',e)
  };

  const handlePlayPause = () => {
    if (play) {
      return setPlay(false)
    }
    setPlay(true)
  }

  return (
    <View style={{flex: 1}}>
      <Video
        posterResizeMode={'cover'}
        source={{
          uri: props.videoUrl,
        }}
        
        ref={ref}
        onBuffer={onBuffer}
        onProgress={props.onProgress}
        paused={props.paused}
        onLoad={props.onLoad}
        onSeek={props.onSeek}
        currentTime={props.currentTime}
        stop
        controls={false}
        resizeMode={'cover'}
        repeat
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: R.colors.lightBlack,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: props.fromTop ?? 0,
          left: props.fromLeft ?? 0,
          right: props.fromRight ?? 0,
        }}>
        <View
          style={{
            marginHorizontal: R.fontSize.Size20,
            marginTop: R.fontSize.Size20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: R.fontSize.Size35,
              width: R.fontSize.Size35,
              overflow: 'hidden',
              borderRadius: R.fontSize.Size20,
            }}>
            <Image
              source={{
                uri: props.userImage,
              }}
              style={{
                height: R.fontSize.Size35,
                width: R.fontSize.Size35,
              }}
              resizeMode={'cover'}
            />
          </View>
          <View style={{flex: 1, marginHorizontal: R.fontSize.Size10}}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size16,
                fontWeight: '700',
                color: R.colors.white,
              }}
              numberOfLines={1}>
              {props.userName}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontWeight: '400',
                fontSize: R.fontSize.Size12,
                color: R.colors.lightWhite,
              }}
              numberOfLines={1}>
              {props.videoCat}
            </Text>
          </View>
          <View>
            <Pressable
              onPress={props.eyeonPress}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
              ]}>
              <Image
                source={props.eyeIcon}
                style={{height: R.fontSize.Size25, width: R.fontSize.Size25}}
                resizeMode={'contain'}
              />
            </Pressable>
          </View>
        </View>
      </View>

      {props.playButtonVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Image
              source={R.images.playIcon}
              style={{height: R.fontSize.Size28, width: R.fontSize.Size28}}
              resizeMode={'contain'}
            />
          </View>
        </View>
      )}

      <View style={{position: 'absolute', bottom: 10, left: 0, right: 0}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              marginHorizontal: R.fontSize.Size20,
              alignItems: 'baseline',
              justifyContent:'flex-end'
            }}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size14,
                fontWeight: '700',
                color: R.colors.white,
              }}>
              {props.bottomTitle}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size12,
                fontWeight: '400',
                color: R.colors.lightWhite,
                marginTop: R.fontSize.Size5,
                // width: screenWidth / 1.2,
              }}
              numberOfLines={3}>
              {props.bottomDiscription}
            </Text>
            <Text
              style={{
                marginTop: R.fontSize.Size4,
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size14,
                fontWeight: '700',
                color: R.colors.white,
              }}>
              {props.usdPrice}
            </Text>
          </View>
          <View style={{marginRight: R.fontSize.Size10, alignItems: 'center'}}>
            {props.shareFiled ? null : (
              <View
                style={{
                  marginRight: R.fontSize.Size10,
                  alignItems: 'center',
                }}>
                {
                  props.saveHidden ? null : 
                <View>
                <Pressable
                  onPress={props.onPressSave}
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
                    source={props.saveIcon ?? R.images.bookmarkIcon}
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
                    textAlign:'center'
                  }}>
                  {props.saveTitle ?? 'Save'}
                </Text>
                </View>
                }
              {    
                props.shareHidden ? null :            
                <View>
                <Pressable
                  onPress={props.onPressShare}
                  style={({pressed}) => [
                    {
                      opacity: pressed ? 0.3 : 0.8,
                      height: R.fontSize.Size50,
                      width: R.fontSize.Size50,
                      borderRadius: R.fontSize.Size8,
                      backgroundColor: R.colors.lightBlack,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: R.fontSize.Size8,
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
                    textAlign:'center'
                  }}>
                  {'Share'}
                </Text>
                </View>}
                {props.reportHidden ? null : (
                  <Pressable
                    onPress={props.onPressReport}
                    style={({pressed}) => [
                      {
                        opacity: pressed ? 0.3 : 0.8,
                        height: R.fontSize.Size50,
                        width: R.fontSize.Size50,
                        borderRadius: R.fontSize.Size8,
                        backgroundColor: R.colors.lightBlack,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: R.fontSize.Size15,
                      },
                    ]}>
                    <Image
                      source={R.images.whiteDotIcon}
                      style={{
                        height: R.fontSize.Size30,
                        width: R.fontSize.Size30,
                      }}
                      resizeMode={'contain'}
                    />
                  </Pressable>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
});
export default VideoCard;
