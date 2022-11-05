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
        poster={props.poster}
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
        //   onError={this.videoError} // Callback when video cannot be loaded
        // setControls={true}
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
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                // source={R.images.musicIcon}
                source={props.musicIcon}
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
            </View> */}
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
          <View style={{marginRight: R.fontSize.Size10,alignItems:'center'}}>
            <Pressable
            style={({pressed})=>[{
              opacity: pressed?0.3:0.8,
              height:R.fontSize.Size50,
              width:R.fontSize.Size50,
              borderRadius:R.fontSize.Size8,
              backgroundColor:R.colors.lightBlack,
              alignItems:'center',
              justifyContent:'center'
            }]}
            >
              <Image
                source={R.images.shareIcon}
                style={{height:R.fontSize.Size35, width:R.fontSize.Size35}}
                resizeMode={'contain'}
              />
            </Pressable>
            <Text
            style={{color:R.colors.lightWhite, fontSize:R.fontSize.Size14, fontFamily:R.fonts.regular, fontWeight:'400'}}
            >Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default VideoCard;
