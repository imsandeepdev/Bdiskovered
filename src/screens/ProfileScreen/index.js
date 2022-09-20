import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, TextInput, Pressable, Image, Text, ScrollView, SafeAreaView, Dimensions, StatusBar, Platform} from 'react-native';
import {CustomCardView, ShadowHeader, StoryScreen}from '../../components'
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';
import { Config } from '../../config';

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
            justifyContent:'center'
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
const [taletArray, setTalentArray] = useState([])
const [personalArray, setPersonalArray] = useState([])

  useEffect(()=>{

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
      if(response.status=='success')
      {
        setProfileDetails(response.Profile)
        setTalentArray([response.Profile?.category])
        setPersonalArray([response.Profile?.gender, response.Profile?.birth, 'Guru']);
        setLoading(false);
      }
      else
      {
        setLoading(false)
        Toast.show(response.message, Toast.SHORT)
      }
    }))
  }

    return (
      <StoryScreen loading={loading}>
        <SafeAreaView style={{flex: 1}}>
          <ShadowHeader
            onPress={() => props.navigation.toggleDrawer()}
            leftSource={R.images.menuIcon}
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
            rightSourceOnPress2={() => console.log('Bell')}
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
                      height: R.fontSize.Size40,
                      width: R.fontSize.Size40,
                      borderRadius: R.fontSize.Size25,
                      overflow: 'hidden',
                      borderWidth: 1,
                    }}>
                    {profileDetails?.avatar != '' ? (
                      <Image
                        source={{
                          uri: `https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000`,
                        }}
                        style={{
                          height: R.fontSize.Size40,
                          width: R.fontSize.Size40,
                        }}
                        resizeMode={'cover'}
                      />
                    ) : (
                      <View
                        style={{
                          height: R.fontSize.Size40,
                          width: R.fontSize.Size40,
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
                    {'7'}
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
                  onPress={() =>
                    props.navigation.navigate('UpdateProfileScreen',{
                      profileDetail: profileDetails
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
              {
                profileDetails?.bio != '' &&
                <View style={{marginTop: R.fontSize.Size30}}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size12,
                      fontWeight: '400',
                      color: R.colors.primaryTextColor,
                    }}>
                    { profileDetails?.bio }
                  </Text>
                </View>
              }

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

              <View
                style={{
                  marginTop: R.fontSize.Size20,
                  alignItems: 'center',
                }}>
                {profileDetails?.job_type1 != '' && (
                  <CustomTimeRow
                    leftTitle={profileDetails?.job_type1}
                    rightText={profileDetails?.full_time_amount}
                    rightDayHours={'/ Day'}
                  />
                )}
                {profileDetails?.job_type2 != '' && (
                  <CustomTimeRow
                    leftTitle={profileDetails?.job_type2}
                    rightText={profileDetails?.part_time_amount}
                    rightDayHours={'/ Hours'}
                  />
                )}
                {profileDetails?.job_type3 != '' && (
                  <CustomTimeRow
                    leftTitle={profileDetails?.job_type3}
                    rightText={profileDetails?.gigs_amount}
                    rightDayHours={'/ Hours'}
                  />
                )}
              </View>

              <View
                style={{
                  marginTop: R.fontSize.Size45,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: screenWidth / 3.7,
                        height: screenWidth / 3,
                        backgroundColor: R.colors.placeholderTextColor,
                        borderRadius: R.fontSize.Size8,
                        margin: R.fontSize.Size5,
                      }}></View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </StoryScreen>
    );
}

export default ProfileScreen;