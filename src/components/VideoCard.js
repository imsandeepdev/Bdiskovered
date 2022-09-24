import * as React from 'react';
import { useState, useRef } from 'react';
import {View, Text, Image, Pressable, Dimensions, TouchableOpacity} from 'react-native';

import Video from 'react-native-video';
import R from '../res/R';
const screenWidth = Dimensions.get('screen').width

const videoData =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoCard = props => {
  const videoRef = useRef(null)

  const [play, setPlay] = useState(true);


  const onBuffer = (e) => {
    console.log('Buffering',e)
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
        source={{
          uri: props.videoUrl,
        }}
        // ref={ref => {
        //   this.player = ref;
        // }}
        ref={videoRef}
        onBuffer={onBuffer}
        //   onError={this.videoError} // Callback when video cannot be loaded
        // setControls={true}
        paused={props.paused}
        controls={true}
        resizeMode={'cover'}
        repeat
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: R.colors.lightBlack,
        }}
      />
      <View style={{position: 'absolute', top: 0, left: 0, right: 0}}>
        <View
          style={{
            marginHorizontal: R.fontSize.Size20,
            marginTop: R.fontSize.Size20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: R.fontSize.Size30,
              width: R.fontSize.Size30,
              overflow: 'hidden',
              borderRadius: R.fontSize.Size20,
            }}>
            <Image
              source={{
                uri: props.userImage,
              }}
              style={{
                height: R.fontSize.Size30,
                width: R.fontSize.Size30,
              }}
              resizeMode={'cover'}
            />
          </View>
          <View style={{flex: 1, marginHorizontal: R.fontSize.Size10}}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size14,
                fontWeight: '700',
                color: R.colors.white,
              }}
              numberOfLines={1}>
              {props.userName}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={R.images.musicIcon}
                style={{
                  height: R.fontSize.Size10,
                  width: R.fontSize.Size10,
                }}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontWeight: '400',
                  fontSize: R.fontSize.Size10,
                  color: R.colors.lightWhite,
                  marginHorizontal: R.fontSize.Size5,
                }}>
                {props.videoCat}
              </Text>
            </View>
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

      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <TouchableOpacity
          style={{
            height: R.fontSize.Size50,
            width: R.fontSize.Size50,
            borderRadius: R.fontSize.Size30,
            backgroundColor: R.colors.placeHolderColor,
          }}
          onPress={handlePlayPause}>
          {play ? (
            <Image
              source={R.images.paymentFailedIcon}
              style={{height: 42, width: 42}}
            />
          ) : (
            <Image
              source={R.images.paymentSuccessIcon}
              style={{height: 45, width: 45}}
            />
          )}
        </TouchableOpacity>
      </View> */}

      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <View
          style={{
            marginVertical: R.fontSize.Size20,
            marginHorizontal: R.fontSize.Size20,
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
              width: screenWidth / 1.2,
            }}
            numberOfLines={3}>
            {props.bottomDiscription}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default VideoCard;
