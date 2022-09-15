import * as React from 'react';
import {View, Text, Image, Pressable, Dimensions} from 'react-native';

import Video from 'react-native-video';
import R from '../res/R';
const screenWidth = Dimensions.get('screen').width

const videoData =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoCard = props => {
  let videoRef;

  const onBuffer = () => {};
  return (
    <View style={{flex: 1}}>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        ref={ref => {
          this.player = ref;
        }}
        onBuffer={onBuffer}
        //   onError={this.videoError} // Callback when video cannot be loaded
        setControls={true}
        controls={true}
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
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3JYxD4c-TLNXds0sV9Nie80zzS_TxeWapkUpNrSVC1TxN5rzzsZjCOMzVfXkh2xYOvY&usqp=CAU',
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
              {'Video Title'}
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
                {'Track Name . Artist Name'}
              </Text>
            </View>
          </View>
          <View>
            <Pressable>
              <Image
                source={R.images.eyeIcon}
                style={{height: R.fontSize.Size25, width: R.fontSize.Size25}}
                resizeMode={'contain'}
              />
            </Pressable>
          </View>
        </View>
      </View>
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
            {'Music'}
          </Text>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              fontSize: R.fontSize.Size12,
              fontWeight: '400',
              color: R.colors.lightWhite,
              marginTop: R.fontSize.Size5,
              width: screenWidth/2
            }}
            numberOfLines={3}
            >
            {`DEscriptionDEscriptionDEscriptionDEDEscriptionDEscriptionDEscription..`}
          </Text>
        </View>
      </View>
    </View>
  );
};
export default VideoCard;
