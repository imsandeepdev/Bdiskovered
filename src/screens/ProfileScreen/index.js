import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, TextInput, Pressable, Image, Text, ScrollView, SafeAreaView, Dimensions, StatusBar, Platform,Alert} from 'react-native';
import {CustomCardLine, CustomCardView, ShadowHeader, StoryScreen, VideoCard}from '../../components'
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';
import { Config } from '../../config';
import { PostDeleteRequest } from '../../actions/uploadNewVideo.action';
import moment from 'moment';
import Geocoder from 'react-native-geocoder-reborn';

const screenWidth = Dimensions.get('screen').width

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
        marginLeft:R.fontSize.Size10
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
              color:R.colors.black
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

  const onCallProfileAPI = () => {
    setLoading(true)
    dispatch(GetProfileDetailsRequest(response => {
      console.log('Get Profile Res', response)
      if (response.status == 'success' && props.userType == 'Talent') {
        setProfileDetails(response.Profile);
        let tempTalentArray = response.Profile?.category;
         let useTalentArray = tempTalentArray.split(',');
         console.log('useTalentArray', useTalentArray);
          setTalentArray(useTalentArray)
          setTailentPostVideo(response.Profile?.post)
        setPersonalArray([
          response.Profile?.gender,
          `${moment().diff(response.Profile?.birth, 'years')} Year`,
          'Guru',
        ]);
        setProfilePic({
          path: `${Config.API_URL}${response.Profile?.avatar.replace(
            'http://localhost:8080/',
            '',
          )}`,
          mime: 'profile/jpeg',
          filename: 'profile.jpeg',
        });
        onCallUserLocation(
          response.Profile
        );
        setLoading(false);
      }
      else if (response.status == 'success' && props.userType != 'Talent'){
        setProfileDetails(response.Profile);
        setProfilePic({
          path: `${Config.API_URL}${response.Profile?.avatar.replace(
            'http://localhost:8080/','')}`,
          mime: 'profile/jpeg',
          filename: 'profile.jpeg',
        });
        console.log('PROFILE PIC', profilePic)
        setLoading(false);
      }
      else {
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
      // dispatch(PostDeleteRequest(data,response =>{
      //   console.log('DeletePost Resp',response)
      //   if(response.status == 'success')
      //   {
      //     onCallProfileAPI();
      //     Toast.show(response.message, Toast.SHORT);
      //     setLoading(false)
      //   }
      //   else
      //   {
      //     Toast.show(response.message, Toast.SHORT)
      //     setLoading(false);
      //   }
      // }))
    };

    const onCallUserLocation = (profileData) => {

      console.log("profile Data", profileData)
      var NY = {
        lat: parseInt(profileData?.latitude),
        lng: parseInt(profileData?.longitude),
      };
      Geocoder.geocodePosition(NY)
        .then(res => {
          console.log("response",res)
          setPersonalArray([
            profileData?.gender,
            `${moment().diff(profileData?.birth, 'years')} Year`,
            `${res[0].locality}, ${res[0].country}`,
          ]);
        })
        .catch(err => console.log("ERROR",err));
    }

    return (
      <StoryScreen loading={loading}>
        <SafeAreaView style={{flex: 1}}>
          <ShadowHeader
            onPress={() => props.navigation.toggleDrawer()}
            leftSource={R.images.menuIcon}
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
                    flexDirection: 'row',
                    marginVertical: R.fontSize.Size20,
                  }}>
                  <View style={{marginRight: R.fontSize.Size30}}>
                    <View
                      style={{
                        height: R.fontSize.Size80,
                        width: R.fontSize.Size80,
                        borderRadius: R.fontSize.Size50,
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: R.colors.placeHolderColor,
                        backgroundColor: R.colors.lightWhite,
                      }}>
                      {profilePic?.path != '' ? (
                        <Image
                          source={{
                            uri: profilePic?.path,
                          }}
                          style={{
                            height: R.fontSize.Size80,
                            width: R.fontSize.Size80,
                          }}
                          resizeMode={'cover'}
                        />
                      ) : (
                        <View
                          style={{
                            height: R.fontSize.Size80,
                            width: R.fontSize.Size80,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontWeight: '700',
                              color: R.colors.appColor,
                              fontSize: R.fontSize.Size50,
                            }}>
                            {(
                              (profileDetails?.name[0] ?? '#') + ''
                            ).toUpperCase()}
                          </Text>
                        </View>
                      )}
                    </View>
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
                      marginHorizontal: R.fontSize.Size20,
                    }}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size24,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                      }}
                      numberOfLines={1}>
                      {props.userType != 'Business'
                        ? profileDetails?.name
                        : profileDetails?.company_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                      }}
                      numberOfLines={1}>
                      {props.userType != 'Business'
                        ? profileDetails?.username
                        : profileDetails?.company_type}
                    </Text>
                  </View>
                </View>
                <View style={{marginTop: R.fontSize.Size10}}>
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
                        borderWidth: 1,
                        borderColor: R.colors.placeHolderColor,
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
                        backgroundColor: R.colors.white,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        color: R.colors.primaryTextColor,
                        fontWeight: '400',
                        marginHorizontal: R.fontSize.Size5,
                      }}>
                      {'Edit Profile'}
                    </Text>
                  </Pressable>
                </View>
                {props.userType != 'Business' ? (
                  <View style={{marginTop: R.fontSize.Size30, flex: 1}}>
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.name}
                    />
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.mobile}
                    />
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.gender}
                    />
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.birth}
                    />
                    <CustomCardLine disabled={true} title={'Gurugram'} />
                  </View>
                ) : (
                  <View style={{marginTop: R.fontSize.Size30, flex: 1}}>
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.company_name}
                    />
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.mobile}
                    />
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.owner_name}
                    />
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.email}
                    />
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.company_registration_id}
                    />
                    <CustomCardLine
                      disabled={true}
                      title={profileDetails?.license_number}
                    />
                    {profileDetails?.company_address != '' && (
                      <CustomCardLine
                        disabled={true}
                        title={profileDetails?.company_address}
                      />
                    )}
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
                  <View style={{flex: 1, justifyContent: 'space-around'}}>
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
                        fontSize: R.fontSize.Size14,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                      }}
                      numberOfLines={1}>
                      {profileDetails?.name}
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
                        fontSize: R.fontSize.Size14,
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
                        borderWidth: 1,
                        borderColor: R.colors.placeHolderColor,
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
                        backgroundColor: R.colors.white,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        color: R.colors.primaryTextColor,
                        fontWeight: '400',
                        marginHorizontal: R.fontSize.Size5,
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
                        fontSize: R.fontSize.Size12,
                        fontWeight: '400',
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
                    marginTop: R.fontSize.Size30,
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
                    height: R.fontSize.Size80,
                    justifyContent: 'center',
                    paddingHorizontal: R.fontSize.Size20,
                  }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      alignItems: 'center',
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
                            backgroundColor: R.colors.placeholderTextColor,
                            borderRadius: R.fontSize.Size8,
                            marginBottom: R.fontSize.Size6,
                          }}>
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
                  </ScrollView>
                </View>

                {profileDetails?.full_time_amount != '' ||
                profileDetails?.part_time_amount != '' ||
                profileDetails?.gigs_amount != '' ? (
                  <View
                    style={{
                      marginTop: R.fontSize.Size2,
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
                ) : null}

                <View
                  style={{
                    marginTop: R.fontSize.Size20,
                    borderWidth: 1,
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    paddingHorizontal: R.fontSize.Size10,
                  }}>
                  {profileDetails?.full_time_amount != '' &&
                    profileDetails?.full_time_amount != null && (
                      <CustomTimeRow
                        leftTitle={profileDetails?.job_type1}
                        rightText={profileDetails?.full_time_amount}
                        rightDayHours={'/Day'}
                      />
                    )}
                  {profileDetails?.part_time_amount != '' &&
                    profileDetails?.part_time_amount != null && (
                      <CustomTimeRow
                        leftTitle={profileDetails?.job_type2}
                        rightText={profileDetails?.part_time_amount}
                        rightDayHours={'/Hours'}
                      />
                    )}
                  {profileDetails?.gigs_amount != '' &&
                  profileDetails?.gigs_amount != null ? (
                    <CustomTimeRow
                      leftTitle={profileDetails?.job_type3}
                      rightText={profileDetails?.gigs_amount}
                      rightDayHours={'/Hours'}
                    />
                  ) : null}
                </View>

                <View
                  style={{
                    marginTop: R.fontSize.Size45,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}>
                  {tailentPostVideo.map((item, index) => {
                    return (
                      <View key={index}>
                        <Pressable
                          onPress={() =>
                            props.navigation.navigate('TailentVideoList', {
                              videoItems: tailentPostVideo,
                              playIndex: index,
                            })
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
      </StoryScreen>
    );
}

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType
});

export default connect(mapStatetoProps) (ProfileScreen);