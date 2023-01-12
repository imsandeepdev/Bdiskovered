import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import {
  Modal,
  View,
  Pressable,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  ProcessingManager,
  Trimmer,
  VideoPlayer,
} from 'react-native-video-processing';
import R from '../res/R';
import Slider from 'react-native-custom-slider';
import Video from 'react-native-video';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const VideoCompressModal = React.forwardRef((props,ref)=> {
  return (
    <Modal
      visible={props.modalVisible}
      transparent={true}
      onRequestClose={props.onRequestClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: R.colors.modelBackground,
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: screenHeight,
            backgroundColor: R.colors.white,
            paddingVertical: R.fontSize.Size45,
          }}>
          <View
            style={{
              height: R.fontSize.Size40,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <Pressable
              onPress={props.closeOnPress}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  padding: R.fontSize.Size4,
                  borderWidth: 2,
                  borderRadius: R.fontSize.Size4,
                  borderColor: R.colors.lightBlack,
                },
              ]}>
              <Image
                source={R.images.cancleIcon}
                style={{height: R.fontSize.Size20, width: R.fontSize.Size20}}
                resizeMode={'contain'}
              />
            </Pressable>
          </View>
          {props.videoLoader ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={'large'} color={R.colors.appColor} />
            </View>
          ) : (
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <VideoPlayer
                  ref={!props.refStatus ? ref: null}
                  play={false}
                  replay={false}
                  startTime={props.startTime}
                  endTime={props.endTime}
                  source={props.source}
                  playerWidth={R.fontSize.Size100}
                  playerHeight={R.fontSize.Size100}
                  resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                />
                <View style={{height: screenHeight / 1.5}}>
                  <Video
                    ref={props.refStatus ? ref: null}
                    source={{uri: props.sourceUrl}}
                    onLoad={props.onLoadEnd}
                    onProgress={props.onProgress}
                    onEnd={props.onEnd}
                    controls={false}
                    resizeMode={'cover'}
                    repeat
                    style={{
                      backgroundColor: R.colors.lightBlack,
                      height: screenHeight / 1.5,
                    }}
                    paused={props.paused}
                    bufferConfig={{
                      minBufferMs: 15000,
                      maxBufferMs: 50000,
                      bufferForPlaybackMs: 2500,
                      bufferForPlaybackAfterRebufferMs: 5000,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: props.playPauseBackgroundColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity onPress={props.handlePlayPauseOnPress}>
                        {props.playPauseContent}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <Trimmer
                  source={props.source}
                  height={R.fontSize.Size70}
                  width={screenWidth}
                  onTrackerMove={props.trimmeronTrackerMove}
                  currentTime={props.trimmerCurrentTime}
                  themeColor={R.colors.appColor}
                  thumbWidth={R.fontSize.Size15}
                  trackerColor={R.colors.white}
                  onChange={props.trimmerOnChange}
                />
              </View>

              <View
                style={{
                  height: R.fontSize.Size80,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: R.fontSize.Size10,
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View
                    style={{
                      paddingHorizontal: R.fontSize.Size6,
                      paddingVertical: R.fontSize.Size2,
                      borderWidth: 1,
                      borderColor: R.colors.appColor,
                      backgroundColor: R.colors.lightWhite,
                      borderRadius: R.fontSize.Size4,
                    }}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        color: R.colors.appColor,
                        fontSize: R.fontSize.fontSize10,
                        fontWeight: '500',
                        textAlign: 'center',
                      }}>
                      {props.durationText}
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      color: R.colors.lightBlack,
                      fontSize: R.fontSize.Size12,
                      marginTop: R.fontSize.Size2,
                      fontWeight: '400',
                      textAlign: 'center',
                    }}>
                    {`Note: Can't be upload more then 60 seconds video`}
                  </Text>
                </View>
                <Pressable
                  onPress={props.onPressNext}
                  style={({pressed}) => [
                    {
                      width: R.fontSize.Size80,
                      height: R.fontSize.Size55,
                      backgroundColor: R.colors.appColor,
                      marginHorizontal: R.fontSize.Size10,
                      borderRadius: R.fontSize.Size4,
                      opacity: pressed ? 0.5 : 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <Image
                    source={R.images.nextPaperIcon}
                    style={{
                      height: R.fontSize.Size40,
                      width: R.fontSize.Size40,
                    }}
                    resizeMode={'contain'}
                  />
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
});

export default VideoCompressModal;
