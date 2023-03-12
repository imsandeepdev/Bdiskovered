import * as React from 'react';
import {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Video from 'react-native-video';
import R from '../res/R';
const screenWidth = Dimensions.get('screen').width;


const PlayVideoCard = React.forwardRef((props, ref) => {
  

  const onBuffer = e => {
    // console.log('Buffering',e)
  };

 

  return (
    <Pressable
      onPress={props.playPausePress}
      style={({pressed}) => [{
        opacity: pressed ? 0.5:1,
        flex: 1}]}>
      <Video
        posterResizeMode={'cover'}
        source={props.videoUrl}
        ref={ref}
        onBuffer={onBuffer}
        onProgress={props.onProgress}
        paused={props.paused}
        onLoad={props.onLoad}
        onSeek={props.onSeek}
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
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Image
              source={props.playIcon}
              style={{height: R.fontSize.Size28, width: R.fontSize.Size28}}
              resizeMode={'contain'}
            />
          </View>
        </View>
    </Pressable>
  );
});
export default PlayVideoCard;
