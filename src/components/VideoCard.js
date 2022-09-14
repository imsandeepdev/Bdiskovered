// import * as React from 'react';
// import {View, Text} from 'react-native';
// import R from '../res/R';
// import Video from 'react-native-video';


//  const videoData = 'https://player.vimeo.com/external/661385850.hd.mp4?s=7396285f5abe144cf52ec81d39f0170c757f163c&profile_id=175'


// const VideoCard = (props) => {

//     let videoRef;
//     return (
//       <View style={{marginTop: R.fontSize.Size30, borderWidth: 1}}>
//         <Video
//           ref={ref => {
//             videoRef = ref;
//           }}
//           key={videoData}
//           source={{uri: videoData}}
//           resizeMode={'contain'}
//         //   onLoad={onLoadEnd}
//         //   onProgress={onProgress}
//         //   onEnd={onEnd}
//         //   paused={!play}
//         //   controls={Platform.OS === 'ios'}
//           style={{
//               width: '100%',
//               height: '100%',
//               backgroundColor: '#f1f1f1',
            
//           }}
          
//           bufferConfig={{
//             minBufferMs: 15000,
//             maxBufferMs: 50000,
//             bufferForPlaybackMs: 2500,
//             bufferForPlaybackAfterRebufferMs: 5000,
//           }}
//         />
//       </View>
//     );
// }
// export default VideoCard