import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
  SafeAreaView,
  Modal,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from 'react-native';
import {
  CustomCardView,
  Header,
  StoryScreen,
  AppButton,
  CustomCardTextInput,
  ShadowHeader,
  CustomCardLine,
  CustomLineTextInput,
} from '../../components';
import { connect, useDispatch} from 'react-redux';
import R from '../../res/R';
import ImagePicker from 'react-native-image-crop-picker';
import { Video as VideoCompressor, Image as ImageCompressor ,backgroundUpload} from 'react-native-compressor';
import { UploadNewVideoRequest } from '../../actions/uploadNewVideo.action';
import Toast from 'react-native-simple-toast';
import CommonFunctions from '../../utils/CommonFuntions';
import { ProcessingManager } from 'react-native-video-processing';


const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const VideoType = [
  {
    id: '1',
    title: 'Dance',
  },
  {
    id: '2',
    title: 'Fashon',
  },
  {
    id: '3',
    title: 'Dance',
  },
  {
    id: '4',
    title: 'Dance',
  },
];


const UploadVideoScreen = props => {


  const dispatch = useDispatch();
  const [modalPicker, setModalPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [profilePic, setProfilePic] = useState([]);
  const [pickerModal, setPickerModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoPrice, setVideoPrice] = useState('');
  const [videoTypes, setVideoTypes] = useState([])
  const [videoPath, setVideoPath] = useState([])

  const [videoTypeList, setVideoTypeList] = useState(
    [
  {
    id: '1',
    title: 'Dance',
  },
  {
    id: '2',
    title: 'Fashon',
  },
  {
    id: '3',
    title: 'Music',
  },
  {
    id: '4',
    title: 'Sing',
  },
]
  )


useEffect(()=>{

  let arr = videoTypeList.map((item, index) => {
    item.selected = false;
    return {...item};
  });
  console.log('VideoListArray', arr);
  setVideoTypeList(arr)
},[props.navigation])

const onCallVideoSelect = (item,ind) => {
  const dummyData = videoTypeList;
  let arr = dummyData.map((item, index) => {
    if (ind == index) {
      item.selected = !item.selected;
    }
    return {...item};
  });
  console.log('arr return', arr);
   let tempArray = [];
   for (let i = 0; i < arr.length; i++) {
     if (arr[i].selected) {
       tempArray.push(arr[i].title);
     }
   }
   console.log(tempArray);
   setVideoTypes(tempArray);
   setVideoTypeList(arr);
}

const onCallPayment = () => {
  setModalPicker(false);
  props.navigation.navigate('PaymentResultScreen');
};

const onSelectPicker = params => {
  if (params == 'camera') {
    ImagePicker.openCamera({
      mediaType:'video',
      width: screenWidth,
      height: screenHeight,
      cropping: false,
    }).then(video => {
      console.log('VIDEODETAILS', video);
      setVideoPath({
        uri:
          Platform.OS === 'android'
            ? video.path
            : video.path?.replace('file://', ''),
        type: video.mime,
        name: video.filename ?? 'video.MP4',
      });
      setPickerModal(false);
    });
  } else if (params == 'gallery') {
    ImagePicker.openPicker({
      mediaType: 'video',
      width: screenWidth,
      height: screenHeight,
      cropping: false,
      videoQuality: 'medium',
      durationLimit: 30,
      thumbnail: true,
      allowsEditing: true,
    }).then(video => {
      console.log('VIDEODETAILS', video);
      let videoURL = video.path;
      console.log('VIDEOP', videoURL);
      // setVideoPath(video)
      // setVideoPath({
      //   uri:
      //     Platform.OS === 'android'
      //       ? video.path
      //       : video.path?.replace('file://', ''),
      //   type: video.mime,
      //   name: video.filename ?? 'video.MP4',
      // });
      // setPickerModal(false);

      onCallVideoCompress(videoURL);
      // onCallCompressVideo(videoURL)
    });
  }
};


// const onCallCompressVideo = (source) => {
//    const options = {
//      startTime: 0,
//      endTime: 10, // iOS only
//      saveToCameraRoll: true, // default is false // iOS only
//      saveWithCurrentDate: true, // default is false // iOS only
//    };
//    ProcessingManager.trim(source, options) // like VideoPlayer trim options
//      .then(data => console.log('Compress video data',data));
// }

const onCallVideoCompress = async (videoURL) => {
  console.log('URL', videoURL);
  const result = await VideoCompressor.compress(
    videoURL,
    {
      compressionMethod: 'auto',
    },
  
  );
  console.log('RESULT', result);
 
  setVideoPath({
    uri:
      Platform.OS === 'android'
        ? result
        : result?.replace('file://', ''),
    type: 'video/mp4',
    name: 'video.MP4',
  });
  console.log("VIDEOPATH", videoPath)
  setPickerModal(false);
};

const checkValid = () => {
  console.log('VIDEOPA',videoPath)
  return (
    onCheckVideo() &&
    CommonFunctions.isBlank(videoTitle.trim(), 'Please Enter Video Title') &&
    CommonFunctions.isBlank(
      videoDesc.trim(),
      'Please Enter Video Description',
    ) &&
    CommonFunctions.isBlank(videoPrice.trim(), 'Please Enter Price') &&
    onCheckVideoType()
  );
}

const onCheckVideo = () => {
  if(videoPath.length == 0)
  {
    Toast.show('Please Select Video',Toast.SHORT)
    return false
  }
  return true
}
const onCheckVideoType = () => {
  if (videoTypes.length == 0) {
    Toast.show('Please Select Video Type', Toast.SHORT);
    return false;
  }
  return true;
};

const oncheckValidVideo = () => {
  if(checkValid())
  {
    onCallVideoPostAPI()
  }
}

const onCallVideoPostAPI = () => {
  
  setLoading(true)
  let formdata = new FormData();

  formdata.append('title', videoTitle);
  formdata.append('latitude', '22222');
  formdata.append('longitude', '22222');
  formdata.append('caption', videoDesc);
  formdata.append('amount', videoPrice);
  formdata.append('category', videoTypes);
  formdata.append(
    'post',
    videoPath.uri == null || videoPath?.uri == null
      ? ''
      : {
          uri:
            Platform.OS === 'android'
              ? videoPath.uri
              : videoPath.uri?.replace('file://', ''),
          type: videoPath.type,
          name: 'video.mp4',
          // name: videoPath.filename ?? 'video.mp4',
        },
  );
console.log("FORMD",formdata)

  let dataType = 'formdata';

  // Alert.alert('FORMDATA',JSON.stringify(formdata))
  dispatch(UploadNewVideoRequest(formdata,dataType, response =>{
    console.log('UPLOAD VIDEO RES', response);
    if(response.status == 'success')
    {
      Toast.show(response.message, Toast.SHORT)
      setLoading(false)
    }
    else
    {
      Toast.show(response.message, Toast.SHORT);
      setLoading(false);
    }
  }))
  
}


  return (
    <StoryScreen loading={loading}>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.toggleDrawer()}
          leftSource={R.images.menuIcon}
          rightSource2={R.images.bellIcon}
          rightSourceOnPress2={() =>
            props.navigation.navigate('NotificationScreen')
          }
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              {props.userType != 'Talent' ? (
                <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                    }}>
                    <Text>{'Only Talent User Can Create a Video'}</Text>
                    <Text>{'On Progress'}</Text>
                  </View>
                </View>
              ) : (
                <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
                  <View style={{marginTop: R.fontSize.Size45}}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size15,
                        fontWeight: '400',
                        color: R.colors.primaryTextColor,
                      }}>
                      {'Create Section'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size18,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                        marginTop: R.fontSize.Size10,
                      }}>
                      {'Select Type of Talent to View'}
                    </Text>
                  </View>
                  <View style={{marginTop: R.fontSize.Size50}}>
                    <Pressable
                      onPress={() => setPickerModal(true)}
                      style={({pressed}) => [
                        {
                          height: R.fontSize.Size35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          borderWidth: 1,
                          borderRadius: R.fontSize.Size8,
                          borderColor: R.colors.placeHolderColor,
                          opacity: pressed ? 0.5 : 1,
                        },
                      ]}>
                      <Image
                        source={R.images.activeAddIcon}
                        style={{
                          height: R.fontSize.Size10,
                          width: R.fontSize.Size10,
                        }}
                        resizeMode={'contain'}
                      />
                      <Text
                        style={{
                          marginHorizontal: R.fontSize.Size10,
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size14,
                          fontWeight: '400',
                          color: R.colors.primaryTextColor,
                        }}>
                        {'Add Video'}
                      </Text>
                    </Pressable>
                  </View>
                  <View
                  style={{marginVertical:R.fontSize.Size4}}
                  >
                    <Text
                    style={{fontFamily:R.fonts.regular, fontSize:R.fontSize.Size10, color:R.colors.placeHolderColor, fontWeight:'300'}}
                    >{videoPath?.uri}</Text>
                  </View>
                  <View style={{marginTop: R.fontSize.Size20, flex: 1}}>
                    <CustomLineTextInput
                      value={videoTitle}
                      onChangeText={title => setVideoTitle(title)}
                      placeholder={'Video Title'}
                    />
                    <CustomLineTextInput
                      value={videoDesc}
                      onChangeText={desc => setVideoDesc(desc)}
                      placeholder={'Description'}
                    />
                    <CustomLineTextInput
                      value={videoPrice}
                      onChangeText={price => setVideoPrice(price)}
                      placeholder={'Price in USD'}
                      keyboardType={'number-pad'}
                    />

                    <View style={{marginVertical: R.fontSize.Size8}}>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size16,
                          fontWeight: '700',
                          color: R.colors.primaryTextColor,
                        }}>
                        {'Video Type'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      {videoTypeList.map((item, index) => {
                        return (
                          <Pressable
                            onPress={() => onCallVideoSelect(item, index)}
                            key={index}
                            style={({pressed}) => [
                              {
                                opacity: pressed ? 0.5 : 1,
                                width: screenWidth / 4,
                                marginVertical: R.fontSize.Size10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: item?.selected
                                  ? R.colors.appColor
                                  : R.colors.white,
                                borderWidth: 1,
                                paddingVertical: R.fontSize.Size10,
                                borderRadius: R.fontSize.Size5,
                                borderColor: R.colors.placeHolderColor,
                              },
                            ]}>
                            <Text
                              style={{
                                fontFamily: R.fonts.regular,
                                fontSize: R.fontSize.Size14,
                                fontWeight: '700',
                                color: item?.selected
                                  ? R.colors.white
                                  : R.colors.placeHolderColor,
                              }}
                              numberOfLines={1}>
                              {item.title}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </View>
                  <View style={{paddingVertical: R.fontSize.Size30}}>
                    <AppButton
                      onPress={() => oncheckValidVideo()}
                      title={'Create Post'}
                    />
                  </View>
                </View>
              )}
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* {props.userType == 'Talent' && (
          <View style={{paddingVertical: R.fontSize.Size30}}>
            <AppButton
              onPress={() => onCallVideoPostAPI()}
              title={'Create Post'}
            />
          </View>
        )} */}
      </SafeAreaView>
      <Modal
        visible={pickerModal}
        transparent={true}
        onRequestClose={() => setPickerModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: R.colors.modelBackground,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              paddingVertical: R.fontSize.Size25,
              paddingHorizontal: R.fontSize.Size20,
              backgroundColor: R.colors.white,
              paddingBottom: R.fontSize.Size20,
            }}>
            <View
              style={{alignItems: 'center', marginBottom: R.fontSize.Size5}}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size14,
                  color: R.colors.primaryTextColor,
                  fontWeight: '700',
                }}>
                {'Select Profile From Camera / Gallery'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: R.fontSize.Size10,
              }}>
              <Pressable
                onPress={() => onSelectPicker('gallery')}
                style={({pressed}) => [
                  {
                    width: R.fontSize.Size140,
                    height: R.fontSize.Size45,
                    borderRadius: R.fontSize.Size4,
                    opacity: pressed ? 0.5 : 1,
                    backgroundColor: R.colors.appColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: R.fontSize.Size20,
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.white,
                    fontSize: R.fontSize.Size14,
                    fontWeight: '700',
                  }}>
                  {'Gallery'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onSelectPicker('camera')}
                style={({pressed}) => [
                  {
                    width: R.fontSize.Size140,
                    height: R.fontSize.Size45,
                    borderRadius: R.fontSize.Size4,
                    opacity: pressed ? 0.5 : 1,
                    backgroundColor: R.colors.appColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: R.fontSize.Size20,
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.white,
                    fontSize: R.fontSize.Size14,
                    fontWeight: '700',
                  }}>
                  {'Camera'}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginBottom: R.fontSize.Size30,
                marginTop: R.fontSize.Size10,
              }}>
              <Pressable
                onPress={() => setPickerModal(false)}
                style={({pressed}) => [
                  {
                    width: R.fontSize.Size320,
                    height: R.fontSize.Size45,
                    borderRadius: R.fontSize.Size4,
                    opacity: pressed ? 0.5 : 1,
                    borderWidth: 1,
                    borderColor: R.colors.appColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: R.fontSize.Size20,
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.appColor,
                    fontSize: R.fontSize.Size14,
                    fontWeight: '700',
                  }}>
                  {'Cancel'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </StoryScreen>
  );
};

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStatetoProps) (UploadVideoScreen);
