import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, TextInput, Pressable, Image, Text, ScrollView, SafeAreaView, Dimensions, StatusBar, Platform,Alert,Modal} from 'react-native';
import {AppButton, CustomCardLine, CustomCardView, CustomLineTextInput, ShadowHeader, StoryScreen, VideoCard}from '../../components'
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import { GetProfileDetailsRequest, ProfileUpdateRequest } from '../../actions/getProfile.action';
import { Config } from '../../config';
import { PostDeleteRequest } from '../../actions/uploadNewVideo.action';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import CalendarPicker from 'react-native-calendar-picker';

let currYear = moment().subtract(16, 'years').calendar();
let maxDate = moment(currYear).format('YYYY-MM-DD');

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const persnalDetails = [
    {
        id:'1',
        title: 'Age 24'
    },
    {
        id:'2',
        title: 'Female'
    },
    {
        id:'3',
        title: 'Gurugram'
    }
]

const tailentDetails = [
    {
        id:'1',
        title: 'Music'
    },
    {
        id:'2',
        title: 'Dance'
    },
    {
        id:'3',
        title: 'Fashion'
    }
]

const timeDetails = [
    {
        id:'1',
        title: 'Gigs'
    },
    {
        id:'2',
        title: 'Full Time'
    },
    {
        id:'3',
        title: 'Internship'
    }
]

const CustomTimeRow = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: R.fontSize.Size10,
        marginLeft:R.fontSize.Size14
      }}>
      <View
        style={{
            alignItems: 'center',
            width: screenWidth / 3.8,
            height:R.fontSize.Size35,
            backgroundColor:R.colors.appColor,
            justifyContent:'center',
            borderRadius:R.fontSize.Size8
          }}>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: R.colors.lightWhite,
            marginHorizontal: R.fontSize.Size12,
          }}>
          {props.leftTitle}
        </Text>
      </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'center',
            marginTop:R.fontSize.Size5
          }}>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              color: R.colors.primaryTextColor,
              fontSize: R.fontSize.Size14,
              fontWeight: '700',
            }}>
            {'USD'}
          </Text>
          <Text
            style={{
              // height: R.fontSize.Size20,
              marginHorizontal: R.fontSize.Size4,
              textAlign: 'center',
              borderBottomWidth: 1,
              borderColor: R.colors.appColor,
              fontFamily:R.fonts.regular,
              fontSize:R.fontSize.Size14,
              fontWeight:'700',
              color:R.colors.primaryTextColor
            }}
          >
            {props.rightText}
            </Text>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              color: R.colors.primaryTextColor,
              fontSize: R.fontSize.Size14,
              fontWeight: '700',
            }}>
            {props.rightDayHours}
          </Text>
        </View>
    
    </View>
  );
};



const ProfileScreen = (props) => {

const dispatch = useDispatch()
const [loading, setLoading] = useState(false)
const [profileDetails, setProfileDetails] = useState({})
const [tailentPostVideo,setTailentPostVideo] = useState([])
const [taletArray, setTalentArray] = useState([])
const [personalArray, setPersonalArray] = useState([])
const [profilePic, setProfilePic] = useState([]);
const [pickerModal, setPickerModal] = useState(false);


const [actualName, setActualName] = useState('');
const [userName, setUserName] = useState('');
const [userDob, setUserDob] = useState('');
const [userMail, setUserMail] = useState('');
const [mobNo, setMobNo] = useState('');
const [userBio, setUserBio] = useState('');
const [calPickerModal, setCalPickerModal] = useState(false);


const [companyName, setCompanyName] = useState('');
const [companyType, setCompanyType] = useState('');
const [companyEmail, setCompanyEmail] = useState('');
const [companyContact, setCompanyContact] = useState('');
const [companyAddress, setCompanyAddress] = useState('');
const [comLicenceNo, setComLicenceNo] = useState('');
const [comOwnerName, setComOwnerName] = useState('');

const [userLocation, setUserLocation] = useState('')


  useEffect(()=>{

    console.log("USER TYPE", props.userType)
    const unsubscribe = props.navigation.addListener('focus', () => {
      screenFocus();
    });
    return unsubscribe;
    

  },[props.navigation])

  const screenFocus = () => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(R.colors.appColor, true);
    StatusBar.setBarStyle('dark-content', true);
    onCallProfileAPI();
  };

   const onCallGoogleAPI = (profileDetails) => {
   setLoading(true)
    console.log("PROFILE DETAILS ON GAPI", profileDetails)

     
     fetch(
       `${Config.Google_URL}${profileDetails?.latitude},${profileDetails?.longitude}&key=${Config.GoogleAPIKEY}`,
     )
       .then(res => res.json())
       .then(response => {
         console.log('ADDRESS RESPONSE BY LAT LONG', response?.results);
         let temparray = [];
         temparray = response?.results;
         let tempLength = temparray.length;
         let arrayAdd = temparray[tempLength - 3]?.formatted_address;
         let arrayAddress = arrayAdd.split(',');
         let arrAddLength = arrayAddress.length;
         console.log('FORMAT ADDRESS LENGTH', arrAddLength);

         console.log('FORMAT ADDRESS', arrayAddress[arrAddLength - 1]);
         setPersonalArray([
           profileDetails?.gender,
           `${moment().diff(profileDetails?.birth, 'years')} Year`,
           `${arrayAddress[arrAddLength - 3]}`,
         ]);
         setLoading(false);
       });
   };

  const onCallProfileAPI = () => {
    setLoading(true)
    dispatch(GetProfileDetailsRequest(response => {
      console.log('Get Profile Res', response)
      if (response.status == 'success' && props.userType == 'Talent') {
        onCallGoogleAPI(response.Profile);
        setProfileDetails(response.Profile);
        let tempTalentArray = response.Profile?.category;
        let useTalentArray = tempTalentArray.split(',');
        console.log('useTalentArray', useTalentArray);
        setTalentArray(useTalentArray);
        setTailentPostVideo(response.Profile?.post);
       
        
        setProfilePic({
          path: `${Config.API_URL}${response.Profile?.avatar.replace(
            'http://localhost:8080/',
            '',
          )}`,
          mime: 'profile/jpeg',
          filename: 'profile.jpeg',
        });

        setLoading(false);
      } else if (response.status == 'success' && props.userType == 'Business') {
        console.log('BUSINESS');
        
        setCompanyName(response.Profile?.company_name);
        setCompanyAddress(response.Profile?.company_address);
        setCompanyType(response.Profile?.company_type);
        setCompanyEmail(response.Profile?.email);
        setCompanyContact(response.Profile?.mobile);
        setComLicenceNo(response.Profile?.license_number);
        setComOwnerName(response.Profile?.owner_name);
        setProfilePic({
          path: `${Config.API_URL}${response.Profile?.avatar.replace(
            'http://localhost:8080/',
            '',
          )}`,
          mime: 'profile/jpeg',
          filename: 'profile.jpeg',
        });
        setLoading(false);
      } else if (response.status == 'success' && props.userType == 'Viewer') {
        setActualName(response.Profile?.name);
        setUserName(response.Profile?.username);
        setUserDob(response.Profile?.birth);
        setMobNo(response.Profile?.mobile);
        setUserBio(response.Profile?.bio);
        setUserMail(response.Profile?.email);
        setProfilePic({
          path: `${Config.API_URL}${response.Profile?.avatar.replace(
            'http://localhost:8080/',
            '',
          )}`,
          mime: 'profile/jpeg',
          filename: 'profile.jpeg',
        });
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show(response.message, Toast.SHORT);
      }
    }))
  }

    const onDeleteVideoAlart = (postId) => {
      Alert.alert(
        'Delete Video!',
        'Are you sure want to delete this video?',
        [
          {
            text: 'Yes',
            onPress: () => onCallDeletevideoAPI(postId),
          },
          {
            text: 'No',
          },
        ],
        {
          cancelable: true,
        },
      );
    };

    const onCallDeletevideoAPI = postId => {
      // setLoading(true)
      let data ={
        postId: postId
      }
      console.log('PostId',data)
      
    };

   

    const onSelectPicker = params => {
      if (params == 'camera') {
        ImagePicker.openCamera({
          width: 400,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log('IMAGE', image);
          setProfilePic(image);
          setPickerModal(false);
        });
      } else if (params == 'gallery') {
        ImagePicker.openPicker({
          width: 400,
          height: 400,
          cropping: true,
        }).then(image => {
          console.log('IMAGE', image);
          setProfilePic(image);
          setPickerModal(false);
        });
      }
    };

    const onCallUpdateBusinessProfile = () => {
      setLoading(true);
      let formData = new FormData();
      let dataType = 'formdata';
      formData.append('company_type', companyType);
      formData.append('company_email', companyEmail);
      formData.append('company_contact', companyContact);
      formData.append('company_address', companyAddress);
      formData.append('license_number', comLicenceNo);
      formData.append('owner_name', comOwnerName);
      formData.append(
        'avatar',
        profilePic.path == null ||
          profilePic?.path == 'https://disk.shunyaekai.com/profile/user.png'
          ? ''
          : {
              uri:
                Platform.OS === 'android'
                  ? profilePic.path
                  : profilePic.path?.replace('file://', ''),
              type: profilePic.mime,
              name: 'image.jpg',
            },
      );
      dispatch(
        ProfileUpdateRequest(formData, dataType, response => {
          console.log('UpDate Profile BUSINESS RES', response);
          if (response.status == 'success') {
            setCompanyName(response.Profile?.company_name);
            setCompanyAddress(response.Profile?.company_address);
            setCompanyType(response.Profile?.company_type);
            setCompanyEmail(response.Profile?.email);
            setCompanyContact(response.Profile?.mobile);
            setComLicenceNo(response.Profile?.license_number);
            setComOwnerName(response.Profile?.owner_name);
            setProfilePic({
              path: `${
                Config.API_URL
              }${response.Profile?.avatar.slice(22)}`,
              mime: 'profile/jpeg',
              filename: 'profile.jpeg',
            });
            Toast.show(response.message, Toast.SHORT);
            setLoading(false);
          } else {
            Toast.show(response.message, Toast.SHORT);
            setLoading(false);
          }
        }),
      );
    };

     const onDateChange = date => {
       // setDOB(date)
       console.log(date);
       let dateFormat = moment(date).format('YYYY-MM-DD');
       setUserDob(dateFormat);
       setCalPickerModal(false);
     };

          const onCallUpdateViewerProfile = () => {
            console.log('PROFILE PATH', profilePic.path);
            setLoading(true);
            let formData = new FormData();
            let dataType = 'formdata';
            formData.append('name', actualName);
            formData.append('email', userMail);
            formData.append('bio', userBio);
            formData.append('mobile', mobNo);
            formData.append('birth',userDob);


            formData.append(
              'avatar',
              profilePic.path == null ||
                profilePic?.path ==
                  'https://disk.shunyaekai.com/profile/user.png'
                ? ''
                : {
                    uri:
                      Platform.OS === 'android'
                        ? profilePic.path
                        : profilePic.path?.replace('file://', ''),
                    type: profilePic.mime,
                    name: 'image.jpg',
                    // name: profilePic.filename ?? 'image.jpg',
                  },
            );
            dispatch(
              ProfileUpdateRequest(formData, dataType, response => {
                console.log('UpDate Profile RES', response);
                if (response.status == 'success') {
                  setActualName(response.Profile?.name);
                  setUserName(response.Profile?.username);
                  setUserDob(response.Profile?.birth);
                  setMobNo(response.Profile?.mobile);
                  setUserBio(response.Profile?.bio);
                  setUserMail(response.Profile?.email);
                  setProfilePic({
                    path: `${Config.API_URL}${response.Profile?.avatar.replace(
                      'http://localhost:8080/',
                      '',
                    )}`,
                    mime: 'profile/jpeg',
                    filename: 'profile.jpeg',
                  });
                 
                  Toast.show(response.message, Toast.SHORT);
                  setLoading(false);
                } else {
                  Toast.show(response.message, Toast.SHORT);
                  setLoading(false);
                }
              }),
            );
          };



    return (
      <StoryScreen loading={loading}>
        <SafeAreaView style={{flex: 1}}>
          <ShadowHeader
            onPress={() => props.navigation.toggleDrawer()}
            leftSource={R.images.menuIcon}
            headerBottomWidth={0.5}
            // rightSource={R.images.chatIcon}
            // rightSourceOnPress={() => console.log('chat')}
            // marginRightSource={R.fontSize.Size6}
            // rightTitle={
            //   <Text
            //     style={{
            //       marginRight: R.fontSize.Size10,
            //       color: R.colors.primaryTextColor,
            //       fontFamily: R.fonts.regular,
            //       fontSize: R.fontSize.Size14,
            //       fontWeight: '700',
            //     }}>
            //     {'Send Message'}
            //   </Text>
            // }
            rightSource2={R.images.bellIcon}
            rightSourceOnPress2={() =>
              props.navigation.navigate('NotificationScreen')
            }
          />
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            {props.userType != 'Talent' ? (
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: R.fontSize.Size20,
                }}>
                <View
                  style={{
                    marginTop: R.fontSize.Size30,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: R.fontSize.Size110,
                      width: R.fontSize.Size110,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {profilePic.path != null || profilePic.path != '' ? (
                      <Image
                        source={{
                          uri: profilePic?.path,
                        }}
                        style={{
                          height: R.fontSize.Size100,
                          width: R.fontSize.Size100,
                          borderRadius: R.fontSize.Size50,
                          borderWidth: 2,
                          borderColor: R.colors.appColor,
                        }}
                        resizeMode={'cover'}
                      />
                    ) : (
                      <View
                        style={{
                          height: R.fontSize.Size100,
                          width: R.fontSize.Size100,
                          borderRadius: R.fontSize.Size50,
                          borderWidth: 2,
                          borderColor: R.colors.appColor,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: R.colors.lightWhite,
                        }}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size50,
                            fontWeight: '900',
                            color: R.colors.appColor,
                          }}>
                          {((actualName[0] ?? '#') + '').toUpperCase()}
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        position: 'absolute',
                        top: -2,
                        right: -15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Pressable
                        onPress={() => setPickerModal(true)}
                        style={({pressed}) => [
                          {
                            padding: R.fontSize.Size5,
                            opacity: pressed ? 0.5 : 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}>
                        <Image
                          source={R.images.profileEditIcon}
                          style={{
                            height: R.fontSize.Size22,
                            width: R.fontSize.Size22,
                          }}
                          resizeMode={'contain'}
                        />
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <AppButton
                      onPress={() =>
                        props.userType == 'Business'
                          ? onCallUpdateBusinessProfile()
                          : onCallUpdateViewerProfile()
                      }
                      title={'Update Profile'}
                      textColor={R.colors.white}
                      paddingHorizontal={R.fontSize.Size30}
                    />
                  </View>
                </View>

                {props.userType == 'Business' && (
                  <View
                    style={{
                      marginTop: R.fontSize.Size5,
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontWeight: '700',
                        color: R.colors.black,
                        fontSize: R.fontSize.Size18,
                      }}>
                      {companyName}
                    </Text>
                    <View
                      style={{
                        marginTop: R.fontSize.Size20,
                        flex: 1,
                      }}>
                      <CustomLineTextInput
                        value={comOwnerName}
                        onChangeText={ownerName => setComOwnerName(ownerName)}
                        placeholder={'Company Owner Name'}
                      />

                      <CustomCardLine disabled={true} title={companyEmail} />
                      <CustomLineTextInput
                        value={companyType}
                        onChangeText={cType => setCompanyType(cType)}
                        placeholder={'Company Type'}
                      />
                      <CustomLineTextInput
                        value={comLicenceNo}
                        onChangeText={LicNo => setComLicenceNo(LicNo)}
                        placeholder={'Company Licence Number'}
                      />

                      <CustomCardLine disabled={true} title={companyContact} />

                      <CustomLineTextInput
                        value={companyAddress}
                        onChangeText={cAdd => setCompanyAddress(cAdd)}
                        placeholder={'Company Address'}
                      />
                    </View>
                  </View>
                )}

                {props.userType == 'Viewer' && (
                  <View
                    style={{
                      marginTop: R.fontSize.Size40,
                      flex: 1,
                    }}>
                    <CustomLineTextInput
                      value={actualName}
                      onChangeText={name => setActualName(name)}
                      placeholder={'Actual Name'}
                    />

                    <CustomCardLine disabled={true} title={userName} />

                    <CustomLineTextInput
                      value={userMail}
                      onChangeText={mail => setUserMail(mail)}
                      placeholder={'Email'}
                    />
                    <Pressable
                      onPress={() => setCalPickerModal(!calPickerModal)}
                      style={({pressed}) => [
                        {
                          height: R.fontSize.Size50,
                          justifyContent: 'center',
                          opacity: pressed ? 0.5 : 1,
                          marginBottom: R.fontSize.Size12,
                          borderBottomWidth: 1,
                          borderColor: R.colors.placeholderTextColor,
                        },
                      ]}>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size15,
                          color: R.colors.primaryTextColor,
                          fontWeight: '700',
                        }}>
                        {userDob != '' ? userDob : 'Date of Birth'}
                      </Text>
                    </Pressable>

                    <CustomCardLine disabled={true} title={mobNo} />

                    {/* <View
                      style={{
                        backgroundColor: R.colors.white,
                        borderBottomWidth: 1,
                        borderColor: R.colors.placeholderTextColor,
                        paddingBottom:R.fontSize.Size2
                      }}>
                      <TextInput
                        style={{
                          minHeight: R.fontSize.Size40,
                          padding: 0,
                          color: R.colors.primaryTextColor,
                          textAlignVertical: 'top',
                          fontSize: R.fontSize.Size15,
                          fontFamily: R.fonts.regular,
                          fontWeight: '700',
                        }}
                        value={userBio}
                        placeholder="Bio"
                        placeholderTextColor={R.colors.placeholderTextColor}
                        onChangeText={bio => setUserBio(bio)}
                        numberOfLines={3}
                        multiline={true}
                      />
                    </View> */}

                    {/* <CustomLineTextInput
                      value={userBio}
                      onChangeText={bio => setUserBio(bio)}
                      placeholder={'Bio'}
                    /> */}
                  </View>
                )}
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  // paddingHorizontal: R.fontSize.Size20,
                }}>
                <View
                  style={{
                    marginTop: R.fontSize.Size30,
                    flexDirection: 'row',
                    paddingVertical: R.fontSize.Size10,
                    paddingHorizontal: R.fontSize.Size20,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: R.fontSize.Size50,
                        width: R.fontSize.Size50,
                        borderRadius: R.fontSize.Size25,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: R.colors.placeHolderColor,
                        backgroundColor: R.colors.lightWhite,
                      }}>
                      {profilePic?.path != '' || profilePic?.path != null ? (
                        <Image
                          source={{
                            uri: profilePic?.path,
                          }}
                          style={{
                            height: R.fontSize.Size50,
                            width: R.fontSize.Size50,
                          }}
                          resizeMode={'cover'}
                        />
                      ) : (
                        <View
                          style={{
                            height: R.fontSize.Size50,
                            width: R.fontSize.Size50,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontWeight: '700',
                              color: R.colors.appColor,
                              fontSize: R.fontSize.Size20,
                            }}>
                            {(
                              (profileDetails?.name[0] ?? '#') + ''
                            ).toUpperCase()}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size15,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                      }}
                      numberOfLines={1}>
                      {profileDetails?.username}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: R.fontSize.Size80,
                      width: 1,
                      backgroundColor: R.colors.placeholderTextColor,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size24,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                      }}
                      numberOfLines={1}>
                      {tailentPostVideo.length}
                    </Text>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size15,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                      }}
                      numberOfLines={1}>
                      {'Posts'}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: R.fontSize.Size10,
                    paddingHorizontal: R.fontSize.Size20,
                  }}>
                  <Pressable
                    onPress={() =>
                      props.navigation.navigate('UpdateProfileScreen', {
                        profileDetail: profileDetails,
                      })
                    }
                    style={({pressed}) => [
                      {
                        paddingVertical: R.fontSize.Size8,
                        borderRadius: R.fontSize.Size8,
                        backgroundColor: R.colors.placeholderTextColor,
                        opacity: pressed ? 0.5 : 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <View
                      style={{
                        height: R.fontSize.Size10,
                        width: R.fontSize.Size10,
                        borderRadius: R.fontSize.Size10,
                        backgroundColor: R.colors.placeHolderColor,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size15,
                        color: R.colors.primaryTextColor,
                        fontWeight: '600',
                        marginHorizontal: R.fontSize.Size8,
                      }}>
                      {'Edit Profile'}
                    </Text>
                  </Pressable>
                </View>
                {profileDetails?.bio != '' && (
                  <View
                    style={{
                      marginTop: R.fontSize.Size30,
                      paddingHorizontal: R.fontSize.Size20,
                    }}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        fontWeight: '500',
                        color: R.colors.primaryTextColor,
                      }}>
                      {profileDetails?.bio}
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: R.fontSize.Size20,
                    paddingHorizontal: R.fontSize.Size20,
                  }}>
                  {personalArray.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginRight: R.fontSize.Size14,
                        }}>
                        <View
                          style={{
                            height: R.fontSize.Size10,
                            width: R.fontSize.Size10,
                            backgroundColor: R.colors.appColor,
                            borderRadius: R.fontSize.Size10,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size14,
                            fontWeight: '700',
                            color: R.colors.primaryTextColor,
                            marginLeft: R.fontSize.Size8,
                          }}>
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: R.fontSize.Size20,
                    paddingHorizontal: R.fontSize.Size20,
                  }}>
                  {taletArray.map((item, index) => {
                    console.log('ITEM', item);
                    return (
                      <View
                        key={index}
                        style={{
                          alignItems: 'center',
                          marginRight: R.fontSize.Size14,
                          justifyContent: 'center',
                          paddingHorizontal: R.fontSize.Size20,
                          paddingVertical: R.fontSize.Size6,
                          backgroundColor: R.colors.appColor,
                          borderRadius: R.fontSize.Size8,
                          marginBottom: R.fontSize.Size10,
                          width: screenWidth / 3.8,
                          height: R.fontSize.Size35,
                        }}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size14,
                            fontWeight: '700',
                            color: R.colors.white,
                            marginLeft: R.fontSize.Size8,
                          }}>
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {/* {profileDetails?.full_time_amount != '' ||
                profileDetails?.part_time_amount != '' ||
                profileDetails?.gigs_amount != '' ? (
                  <View
                    style={{
                      marginTop: R.fontSize.Size20,
                      paddingHorizontal: R.fontSize.Size20,
                    }}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontWeight: '700',
                        fontSize: R.fontSize.Size18,
                        color: R.colors.primaryTextColor,
                      }}>
                      {'Available for :'}
                    </Text>
                  </View>
                ) : null} */}

                <View
                  style={{
                    marginTop: R.fontSize.Size20,
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    paddingHorizontal: R.fontSize.Size10,
                    marginLeft: -R.fontSize.Size2,
                  }}>
                  {profileDetails?.full_time_amount != '' &&
                    profileDetails?.full_time_amount != null && (
                      <CustomTimeRow
                        leftTitle={profileDetails?.job_type1}
                        rightText={profileDetails?.full_time_amount}
                        rightDayHours={'/day'}
                      />
                    )}
                  {profileDetails?.part_time_amount != '' &&
                    profileDetails?.part_time_amount != null && (
                      <CustomTimeRow
                        leftTitle={profileDetails?.job_type2}
                        rightText={profileDetails?.part_time_amount}
                        rightDayHours={'/hrs'}
                      />
                    )}
                  {profileDetails?.gigs_amount != '' &&
                  profileDetails?.gigs_amount != null ? (
                    <CustomTimeRow
                      leftTitle={profileDetails?.job_type3}
                      rightText={profileDetails?.gigs_amount}
                      rightDayHours={'/hrs'}
                    />
                  ) : null}
                </View>

                <View
                  style={{
                    marginTop: R.fontSize.Size10,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    paddingHorizontal: R.fontSize.Size20,
                  }}>
                  {tailentPostVideo.map((item, index) => {
                    return (
                      <View key={index}>
                        <Pressable
                          onPress={
                            () =>
                              props.navigation.navigate(
                                'ParticularVideoScreen',
                                {
                                  videoPostId: item?._id,
                                  from: 'ProfileScreen',
                                },
                              )
                            // props.navigation.navigate('TailentVideoList', {
                            //   videoItems: tailentPostVideo,
                            //   playIndex: index,
                            // })
                          }
                          style={({pressed}) => [
                            {
                              opacity: pressed ? 0.5 : 1,
                              width: screenWidth / 3.7,
                              height: screenWidth / 3,
                              borderRadius: R.fontSize.Size8,
                              margin: R.fontSize.Size5,
                              overflow: 'hidden',
                            },
                          ]}>
                          <VideoCard
                            poster={`${Config.API_URL}${item?.post.replace(
                              'http://localhost:8080/',
                              '',
                            )}`}
                            videoUrl={`${Config.API_URL}${item?.post.slice(
                              22,
                            )}`}
                            paused={true}
                          />
                        </Pressable>
                        <Pressable
                          onPress={() => onDeleteVideoAlart(item?._id)}
                          style={({pressed}) => [
                            {
                              position: 'absolute',
                              bottom: 10,
                              right: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: pressed ? 0.5 : 1,
                            },
                          ]}>
                          <View
                            style={{
                              height: R.fontSize.Size30,
                              width: R.fontSize.Size25,
                              backgroundColor: R.colors.modelBackground,
                              borderWidth: 0.5,
                              borderColor: R.colors.lightWhite,
                              borderRadius: R.fontSize.Size5,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Image
                              source={R.images.deleteIcon}
                              style={{
                                height: R.fontSize.Size15,
                                width: R.fontSize.Size15,
                              }}
                              resizeMode={'contain'}
                            />
                          </View>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </ScrollView>
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
        <Modal
          visible={calPickerModal}
          transparent={true}
          onRequestClose={() => setCalPickerModal(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.modelBackground,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                height: screenHeight / 2,
                backgroundColor: R.colors.white,
                borderTopLeftRadius: R.fontSize.Size8,
                borderTopRightRadius: R.fontSize.Size8,
                paddingVertical: R.fontSize.Size15,
              }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  marginHorizontal: R.fontSize.Size20,
                  marginBottom: R.fontSize.Size10,
                }}>
                <Pressable
                  onPress={() => setCalPickerModal(false)}
                  style={({pressed}) => [
                    {
                      padding: R.fontSize.Size6,
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}>
                  <Image
                    source={R.images.cancleIcon}
                    style={{
                      height: R.fontSize.Size10,
                      width: R.fontSize.Size10,
                    }}
                    resizeMode={'contain'}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: R.fontSize.Size20,
                }}>
               
                <CalendarPicker
                  startFromMonday={true}
                  onDateChange={onDateChange}
                  selectedDayColor={R.colors.appColor}
                  todayBackgroundColor={R.colors.appColor}
                  todayTextStyle={{color: R.colors.white, fontWeight: '700'}}
                  minDate={new Date('1920-01-01')}
                  initialDate={maxDate}
                  maxDate={maxDate}
                  textStyle={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.primaryTextColor,
                    fontSize: R.fontSize.Size12,
                    fontWeight: '400',
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </StoryScreen>
    );
}

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType
});

export default connect(mapStatetoProps) (ProfileScreen);