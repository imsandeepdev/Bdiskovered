import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, TextInput, Pressable, Image, Text, ScrollView, SafeAreaView, Dimensions,Modal, Platform} from 'react-native';
import {AppButton, CustomCardView, CustomLineTextInput, Header, StoryScreen}from '../../components'
import R from '../../res/R';
import CalendarPicker from 'react-native-calendar-picker';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import {connect, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import { GetProfileDetailsRequest, ProfileUpdateRequest } from '../../actions/getProfile.action';
import { Config } from '../../config';
const screenWidth = Dimensions.get('screen').width
const screenHeight = Dimensions.get('screen').height;



const UpdateProfileScreen = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [actualName, setActualName] = useState('')
    const [userName, setUserName] = useState('');
    const [userDob, setUserDob] = useState('');
    const [userMail, setUserMail] = useState('');
    const [mobNo, setMobNo] = useState('');
    const [userBio, setUserBio] = useState('');
    const [calPickerModal, setCalPickerModal] = useState(false)
    const [profilePic, setProfilePic] = useState([])
    const [pickerModal, setPickerModal] = useState(false)

    useEffect(()=>{

      onCallProfileDetails()
    },[props.navigation])

    const onCallProfileDetails = () => {
      setLoading(true);
      dispatch(
        GetProfileDetailsRequest(response => {
          console.log('Get Profile Res', response);
          if (response.status == 'success') {
            setActualName(response.Profile?.name)
            setUserName(response.Profile?.username)
            setUserDob(response.Profile?.birth)
            setMobNo(response.Profile?.mobile)
            setUserBio(response.Profile?.bio)
            setUserMail(response.Profile?.email)
              setProfilePic({
                path:  `${Config.API_URL}${response.Profile?.avatar.slice(22)}`,
                mime: 'profile/jpeg',
                filename: 'profile.jpeg',
              });
            setLoading(false);
          } else {
            setLoading(false);
            Toast.show(response.message, Toast.SHORT);
          }
        }),
      );
    };

    const onDateChange = date => {
      // setDOB(date)
      console.log(date);
      let dateFormat = moment(date).format('L');
      setUserDob(dateFormat);
      setCalPickerModal(false);
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

     const onCallUpdateProfile = () => {
      setLoading(true)
      let formData = new FormData()
      let dataType = 'formdata';
      formData.append('name', actualName);
      formData.append('email', userMail);
      formData.append('bio', userBio);
      formData.append(
        'avatar',
        profilePic.path == null || profilePic?.path == null
          ? ''
          : {
              uri:
                Platform.OS === 'android'
                  ? profilePic.path
                  : profilePic.path?.replace('file://', ''),
              type: profilePic.mime,
              name: profilePic.filename ?? 'image.jpg',
            },
      );
      dispatch(ProfileUpdateRequest(formData,dataType,response=>{
        console.log('UpDate Profile RES',response)
        if(response.status == 'success')
        {
          setActualName(response.Profile?.name);
          setUserName(response.Profile?.username);
          setUserDob(response.Profile?.birth);
          setMobNo(response.Profile?.mobile);
          setUserBio(response.Profile?.bio);
          setUserMail(response.Profile?.email);
          setProfilePic({
            path: `${Config.API_URL}${response.Profile?.avatar.slice(22)}`,
            mime: 'profile/jpeg',
            filename: 'profile.jpeg',
          });
          Toast.show(response.message,Toast.SHORT)
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
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
            title={'Update Profile'}
          />

          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
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
                    onPress={() => onCallUpdateProfile()}
                    title={'Update Profile'}
                    textColor={R.colors.white}
                    paddingHorizontal={R.fontSize.Size30}
                  />
                </View>
              </View>
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
                <CustomLineTextInput
                  value={userName}
                  onChangeText={uname => setUserName(uname)}
                  placeholder={'User Name'}
                />
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

                <CustomLineTextInput
                  value={mobNo}
                  onChangeText={mob => setMobNo(mob)}
                  placeholder={'Contact Number'}
                />
                <CustomLineTextInput
                  value={userBio}
                  onChangeText={bio => setUserBio(bio)}
                  placeholder={'Bio'}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
                  minDate={new Date('1920,1,1')}
                  maxDate={new Date(moment().format('YYYY,MM,DD'))}
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
}

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps) (UpdateProfileScreen);