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
        // ref={ref => {
        //   this.player = ref;
        // }}
        ref={videoRef}
        onBuffer={onBuffer}
        onProgress={props.onProgress}
        paused={props.paused}
        onLoad={props.onLoad}
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

     

      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
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
            {props.shareFiled}
          </View>
        </View>
      </View>
    </View>
  );
};
export default VideoCard;
