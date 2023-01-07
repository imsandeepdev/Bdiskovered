import * as React from 'react'
import {useState, useEffect} from 'react'
import {View, Text, Image,Dimensions} from 'react-native'
import { Header, StoryScreen } from '../../components'
import R from '../../res/R'
import {
  ProcessingManager,
  Trimmer,
  VideoPlayer,
} from 'react-native-video-processing';
const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width;


const CompressVideo = (props) => {

    useEffect(()=>{
    console.log(`VIDEOPATHONCOMPRESS${props.route.params?.videoPath}`);

    })

    return (
      <StoryScreen>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
        />
        <View style={{flex: 1, borderWidth: 1}}>
          <View style={{height: 500}}>
            <VideoPlayer
              // ref={ref => this.videoPlayerRef = ref}
              startTime={30} // seconds
              endTime={120} // seconds
              play={true} // default false
              replay={true} // should player play video again if it's ended
              rotate={true} // use this prop to rotate video if it captured in landscape mode iOS only
              source={props.route.params?.videoPath}
              playerWidth={screenWidth} // iOS only
              playerHeight={500} // iOS only
              resizeMode={'cover'}
            //   resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
              onChange={({nativeEvent}) => console.log({nativeEvent})} // get Current time on every second
            />
            <Trimmer
              source={props.route.params?.videoPath}
              height={80}
              width={screenWidth}
              onTrackerMove={e => console.log(e.currentTime)} // iOS only
              // currentTime={this.video.currentTime} // use this prop to set tracker position iOS only
              themeColor={R.colors.appColor} // iOS only
              thumbWidth={20} // iOS only
              trackerColor={R.colors.appColor} // iOS only
              onChange={e => console.log(e.startTime, e.endTime)}
            />
          </View>
        </View>
      </StoryScreen>
    );
}

export default CompressVideo
