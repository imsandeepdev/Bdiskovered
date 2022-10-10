import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { ConnectTailentProfileRequest, GetProfileDetailsRequest } from '../../actions/getProfile.action';
import {CustomCardView, ShadowHeader, StoryScreen, VideoCard} from '../../components';
import R from '../../res/R';
import { connect, Connect,useDispatch } from 'react-redux';
import { Config } from '../../config';

const screenWidth = Dimensions.get('screen').width;

const persnalDetails = [
  {
    id: '1',
    title: 'Age 24',
  },
  {
    id: '2',
    title: 'Female',
  },
  {
    id: '3',
    title: 'Gurugram',
  },
];

const tailentDetails = [
  {
    id: '1',
    title: 'Music',
  },
  {
    id: '2',
    title: 'Dance',
  },
  {
    id: '3',
    title: 'Fashion',
  },
];

const timeDetails = [
  {
    id: '1',
    title: 'Gigs',
  },
  {
    id: '2',
    title: 'Full Time',
  },
  {
    id: '3',
    title: 'Internship',
  },
];


const CustomTimeRow = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: R.fontSize.Size10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: screenWidth / 2.5,
        }}>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: R.colors.appColor,
            marginHorizontal: R.fontSize.Size12,
          }}>
          {props.leftTitle}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
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
            height: R.fontSize.Size20,
            marginHorizontal: R.fontSize.Size8,
            textAlign: 'center',
            borderBottomWidth: 1,
            borderColor: R.colors.appColor,
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: R.colors.black,
          }}>
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

const ConnectedProfileScreen = props => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [profileDetails, setProfileDetails] = useState({});
  const [tailentPostVideo, setTailentPostVideo] = useState([]);
  const [taletArray, setTalentArray] = useState([]);
  const [personalArray, setPersonalArray] = useState([]);
  const [profilePic, setProfilePic] = useState([]);

  useEffect(()=>{

    onCallConnectTailentProfileAPI(props.route.params?.profileId);

  },[props.navigation])

    const onCallConnectTailentProfileAPI = (profileId) => {
    setLoading(true)
    let data = {
      id: profileId
    }
    dispatch(ConnectTailentProfileRequest(data,response => {
      console.log('Get Profile Res', response)
      if (response.status == 'success') {
        setProfileDetails(response.Profile);
        let tempTalentArray = response.Profile?.category;
         let useTalentArray = tempTalentArray.split(',');
         console.log('useTalentArray', useTalentArray);
          setTalentArray(useTalentArray)
          setTailentPostVideo(response.Profile?.post)
        setPersonalArray([
          response.Profile?.gender,
          response.Profile?.birth,
          'Guru',
        ]);
        setProfilePic({
          path: `${Config.API_URL}${response.Profile?.avatar.slice(22)}`,
          mime: 'profile/jpeg',
          filename: 'profile.jpeg',
        });
        setLoading(false);
      }
    }))
  }



  return (
    <StoryScreen loading={loading}>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          rightSource={R.images.chatIcon}
          rightSourceOnPress={() => console.log('chat')}
          marginRightSource={R.fontSize.Size6}
          rightTitle={
            <Text
              style={{
                marginRight: R.fontSize.Size10,
                color: R.colors.primaryTextColor,
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size14,
                fontWeight: '700',
              }}>
              {'Send Message'}
            </Text>
          }
          rightSource2={R.images.bellIcon}
          rightSourceOnPress2={() =>
            props.navigation.navigate('NotificationScreen')
          }
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
            <View
              style={{
                marginTop: R.fontSize.Size30,
                flexDirection: 'row',
                paddingVertical: R.fontSize.Size10,
              }}>
              <View style={{flex: 1, justifyContent: 'space-around'}}>
                <View
                  style={{
                    height: R.fontSize.Size50,
                    width: R.fontSize.Size50,
                    borderRadius: R.fontSize.Size25,
                    overflow: 'hidden',
                    borderWidth: 2,
                    borderColor: R.colors.appColor,
                  }}>
                  <Image
                    source={{
                      uri: profilePic?.path,
                    }}
                    style={{
                      height: R.fontSize.Size45,
                      width: R.fontSize.Size45,
                    }}
                    resizeMode={'cover'}
                  />
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
            <View style={{marginTop: R.fontSize.Size10}}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: R.colors.appColor,
                    paddingVertical: R.fontSize.Size8,
                    borderRadius: R.fontSize.Size8,
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <View
                  style={{justifyContent:'center'}}
                >
                  <Image
                      source={R.images.chatIcon}
                      style={{height:R.fontSize.Size20,width:R.fontSize.Size20}}
                      resizeMode={'contain'}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    color: R.colors.white,
                    fontWeight: '700',
                    marginHorizontal: R.fontSize.Size5,
                  }}>
                  {'Send Message'}
                </Text>
              </Pressable>
            </View>
            <View style={{marginTop: R.fontSize.Size30}}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size12,
                  fontWeight: '400',
                  color: R.colors.primaryTextColor,
                }}>
                {`${profileDetails?.bio}`}
              </Text>
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: R.fontSize.Size30,
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
            </View>

            {profileDetails?.job_type1 != null &&
            profileDetails?.job_type2 != null &&
            profileDetails?.job_type3 != null ? (
              <View style={{marginTop: R.fontSize.Size30}}>
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
                alignItems: 'center',
              }}>
              {profileDetails?.job_type1 != '' &&
                profileDetails?.job_type1 != null && (
                  <CustomTimeRow
                    leftTitle={profileDetails?.job_type1}
                    rightText={profileDetails?.full_time_amount}
                    rightDayHours={'/ Day'}
                  />
                )}
              {profileDetails?.job_type2 != '' &&
                profileDetails?.job_type2 != null && (
                  <CustomTimeRow
                    leftTitle={profileDetails?.job_type2}
                    rightText={profileDetails?.part_time_amount}
                    rightDayHours={'/ Hours'}
                  />
                )}
              {profileDetails?.job_type3 != '' &&
              profileDetails?.job_type3 != null ? (
                <CustomTimeRow
                  leftTitle={profileDetails?.job_type3}
                  rightText={profileDetails?.gigs_amount}
                  rightDayHours={'/ Hours'}
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
                        poster={`${Config.API_URL}${item?.post.slice(22)}`}
                        videoUrl={`${Config.API_URL}${item?.post.slice(22)}`}
                        paused={true}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </StoryScreen>
  );
};

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStatetoProps) (ConnectedProfileScreen);
