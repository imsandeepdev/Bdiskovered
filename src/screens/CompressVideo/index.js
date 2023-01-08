import * as React from 'react'
import {useState, useEffect,useRef} from 'react'
import {View, Text, Image,Dimensions,Pressable,FlatList,TouchableOpacity} from 'react-native'
import { Header, StoryScreen } from '../../components'
import R from '../../res/R'
import {
  ProcessingManager,
  Trimmer,
  VideoPlayer,
} from 'react-native-video-processing';
const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width;
// import Slider from '@react-native-community/slider';
import Slider from 'react-native-custom-slider';
import Video from 'react-native-video';
import { duration } from 'moment'




const CompressVideo = (props) => {

  const videoRef = useRef();
  const [videoStartTime, setVideoStartTime] = useState()
  const [videoEndTime, setVideoEndTime] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [encodedBase64Image, setEncodedBase64Image] = useState('')
  const [videoTime, setVideoTime] = useState([]);
  const [imageUrlList, setImageUrlList] = useState([]);
  const [play, setPlay] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  



  var VideoDuration = 5000


    useEffect(()=>{
    console.log(`VIDEOPATHONCOMPRESS${props.route.params?.videoPath}`);
    OnCallVideoDetails(props.route.params?.videoPath);
    setVideoUrl(props.route.params?.videoPath);
    },[props.navigation])

    const OnCallVideoDetails = (source) => {

      ProcessingManager.getVideoInfo(source).then(
        ({duration, size, frameRate, bitrate}) =>
          {
            console.log(duration, size, frameRate, bitrate)
            let tempVideoDur = duration.toFixed()
            console.log(tempVideoDur)
            setVideoTime(tempVideoDur)
            // onCallGetPreviewSecond(source, tempVideoDur);
        }
      );
    }

    const onCallGetPreviewSecond = (source, TotalSecond) => {
      let tempImageUrl=[]
      const maximumSize = {width: 100, height: 200};

      for(let i=0; i<TotalSecond;i++)
      {
           ProcessingManager.getPreviewForSecond(
             source,
             i,
             maximumSize,
             'base64',
           ).then(data => {
            console.log(data);
            tempImageUrl.push(data);
           });
      }

      setImageUrlList(tempImageUrl)
      
    };
   
  

    

    const TrimVideo = (startTime, endTime) => {
      let tempVideoDur = endTime - startTime
      setVideoTime(tempVideoDur.toFixed());

      setVideoStartTime(startTime)
      setVideoEndTime(endTime)
        const options = {
            startTime: startTime,
            endTime: endTime,
            quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
            saveToCameraRoll: false, // default is false // iOS only
            saveWithCurrentDate: true, // default is false // iOS only
        };
        console.log(`USEREF`,videoRef);

        console.log(videoRef.current.trim());
        console.log(options);
        setPlay(false)
        videoRef.current.trim(options)
          .then(newSource => {
            console.log(newSource)
            setVideoUrl(newSource)
          })
          .catch(console.warn);
    }

   

    const getPreviewImageForSecond = (second) => {
        const maximumSize = { width: 640, height: 1024 }; // default is { width: 1080, height: 1080 } iOS only
        videoRef.current
          .getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
          .then(
            base64String =>
             { console.log('This is BASE64 of image', base64String),
            setEncodedBase64Image(base64String)}
          )
          .catch(console.warn);
    }

     const onLoadEnd = (data: OnLoadData) => {
         setCurrentTime(data.currentTime);
       console.log('OnLoad End video data', data);
     };

     const onProgress = (data: OnProgressData) => {
       setCurrentTime(data.currentTime);
       // console.log('OnProgress Data Video', data)
     };
     const onEnd = () => {
       setPlay(false);
       videoRef?.seek(0);
     };
   
     const handlePlayPause = () => {
       if (play) {
         return setPlay(false)
       }
       setPlay(true);
     };

    return (
      <StoryScreen>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
        />
        <View style={{flex: 1, borderWidth: 1}}>
          <View style={{}}>
            <VideoPlayer
              ref={ref => (videoRef.current = ref)}
              startTime={videoStartTime} // seconds
              endTime={videoEndTime} // seconds
              play={false} // default false
              replay={false} // should player play video again if it's ended
              source={props.route.params?.videoPath}
              playerWidth={400} // iOS only
              playerHeight={400} // iOS only
              // resizeMode={'cover'}
              // style={{backgroundColor: 'black'}}
              resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
              // onChange={({nativeEvent}) => console.log(`NATIVE${nativeEvent}`)} // get Current time on every second
            />
            <View
              style={{
                borderWidth: 1,
                height: screenHeight / 1.5,
              }}>
              <Video
                source={{uri: videoUrl}}
                onLoad={onLoadEnd}
                onProgress={onProgress}
                controls={false}
                resizeMode={'cover'}
                repeat
                style={{
                  backgroundColor: R.colors.lightBlack,
                  height: screenHeight / 1.5,
                }}
                paused={!play}
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
                  backgroundColor: play ? null : R.colors.modelBackground,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity onPress={handlePlayPause}>
                    {play ? (
                      <Image
                        source={R.images.phoneIcon}
                        style={{height: 42, width: 42}}
                      />
                    ) : (
                      <Image
                        source={R.images.bellIcon}
                        style={{height: 45, width: 45}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Trimmer
              source={props.route.params?.videoPath}
              height={70}
              width={screenWidth}
              onTrackerMove={e => console.log(`currentTime${e.currentTime}`)} // iOS only
              currentTime={currentTime} // use this prop to set tracker position iOS only
              themeColor={R.colors.appColor} // iOS only
              thumbWidth={15} // iOS only
              trackerColor={R.colors.appColor} // iOS only
              // onChange={e => console.log(`STARTTIME${e.startTime}ENDTIME${e.endTime}`)}
              onChange={e => TrimVideo(e.startTime, e.endTime)}
            />
          </View>
          <View style={{flex: 1, marginTop: 20, borderWidth: 1}}>
            <Text>{`Video Duration ${videoTime} Seconds`}</Text>

            <View style={{height: 50, width: screenWidth}}>
              <Slider
                value={currentTime}
                minimumValue={0}
                maximumValue={videoTime}
                minimumTrackTintColor={'#999999'}
                maximumTrackTintColor={'#333333'}
                onValueChange={value => console.log(value)}
                
                customThumb={
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      overflow: 'hidden',
                      borderRadius: 4,
                      backgroundColor: 'gold',
                    }}
                  />
                }
              />
            </View>
          </View>

          {/* <View style={{height: 80}}>
            <View
              style={{
                flexDirection: 'row',
                width: screenWidth,
                borderWidth: 1,
                height: 80,
              }}>
              {imageUrlList.map((item, index) => {
                console.log(`IMAGE${item}`);
                console.log('WIDTH', screenWidth / videoTime);
                let WidthImage = screenWidth / videoTime;
                return (
                  <View
                    key={index}
                    style={{
                      height: 80,
                      width: WidthImage,
                      borderWidth: 1,
                    }}>
                    <Image
                      source={{uri: `data:image/png;base64,${item}`}}
                      style={{height: '100%', width: '100%'}}
                      resizeMode={'cover'}
                    />
                  </View>
                );
              })}
            </View>
            
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent: 'center',
              }}>
              <View style={{height: 50, width: screenWidth}}>
                <Slider
                  value={15}
                  minimumValue={0}
                  maximumValue={50}
                  minimumTrackTintColor={'ffffff'}
                  maximumTrackTintColor={'ffffff'}
                  onValueChange={value => console.log(value)}
                  customMinimumTrack={
                    <View
                      style={{
                        marginTop: -34,
                        backgroundColor: R.colors.modelBackground,
                        height: 80,
                      }}
                    />
                  }
                  customThumb={
                    <View
                      style={{
                        marginTop:8,
                        width: 10,
                        height: 80,
                        overflow: 'hidden',
                        borderRadius:4,
                        backgroundColor: 'gold',
                      }}
                    />
                  }
                />
              </View>
            </View>
          </View> */}
        </View>
      </StoryScreen>
    );
}

export default CompressVideo
