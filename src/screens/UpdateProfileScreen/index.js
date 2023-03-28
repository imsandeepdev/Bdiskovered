import * as React from 'react';
import { useState, useEffect } from 'react';
import {View, TextInput, Pressable, Image, Text, ScrollView, SafeAreaView, Dimensions,Modal, Platform} from 'react-native';
import {AppButton, CustomCardLine, CustomCardView, CustomLineTextInput, CustomOpenForRow, Header, StoryScreen}from '../../components'
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
    const [userName, setUserName] = useState('')
    const [userDob, setUserDob] = useState('')
    const [userMail, setUserMail] = useState('');
    const [mobNo, setMobNo] = useState('');
    const [userBio, setUserBio] = useState('');
    const [calPickerModal, setCalPickerModal] = useState(false)
    const [profilePic, setProfilePic] = useState([])
    const [pickerModal, setPickerModal] = useState(false)
    const [selectFullTime, setSelectFullTime] = useState(false);
    const [fullTimePrice, setFullTimePrice] = useState('');
    const [selectPartTime, setSelectPartTime] = useState(false);
    const [partTimePrice, setPartTimePrice] = useState('');
    const [selectGigs, setSelectGigs] = useState(false);
    const [gigsPrice, setGigsPrice] = useState('');
    const [videoTypes, setVideoTypes] = useState([]);
    const [videoTypeList, setVideoTypeList] = useState([
      {
        id: '1',
        title: 'Music',
      },
      {
        id: '2',
        title: 'Art',
      },
      {
        id: '3',
        title: 'Dance',
      },
      {
        id: '4',
        title: 'Fashion',
      },
    ]);



    useEffect(()=>{

      onCallProfileDetails()
    },[props.navigation])

    const onCallProfileDetails = () => {
      setLoading(true);
      dispatch(
        GetProfileDetailsRequest(response => {
          console.log('Get Profile Res', response);
          console.log('USERTYPE', props.userType);
          if (response.status == 'success' && props.userType != 'Business') {
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
            let resCategory = response.Profile?.category
            console.log('ResCategory', resCategory);

            let arr = videoTypeList.map((item, index) => {
              console.log(resCategory.includes(item.title));
              if(resCategory.includes(item.title))
              {
                console.log("TRUE", item?.title)
                item.selected = true;
              }
              else
              {
                console.log('FALSE', item?.title);
                item.selected = false;
              }
              return {...item};
            });
            console.log('VideoListArray', arr);
            setVideoTypeList(arr);
            setVideoTypes(resCategory.split(','));
            setFullTimePrice(response.Profile?.full_time_amount);
            setPartTimePrice(response.Profile?.part_time_amount);
            setGigsPrice(response.Profile?.gigs_amount);
            setSelectFullTime(response.Profile?.full_time_amount != '' ?? true);
            setSelectPartTime(response.Profile?.part_time_amount != '' ?? true);
            setSelectGigs(response.Profile?.gigs_amount != '' ?? true);

            setLoading(false);
          } else {
            setLoading(false);
            Toast.show(response.message, Toast.SHORT);
          }
        }),
      );
    };


    const onCallVideoSelect = (item, ind) => {
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
    };

    const onDateChange = date => {
      // setDOB(date)
      console.log(date);
      let dateFormat = moment(date).format('YYYY-MM-DD');
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


     const onCheckValidity = () => {
      return onCheckFullTime() && onCheckPartTime() && onCheckGigs()
     }
    
    const spaceValid = txt => txt && txt.replace(/\s/g, '').length;
    const zeroValid = txt => txt && txt.replace(/0/g, '').length;


     const onCheckFullTime = () => {
      if (
        selectFullTime &&
        (fullTimePrice == '' ||
          spaceValid(fullTimePrice) == 0 ||
          zeroValid(fullTimePrice) == 0)
      ) {
        Toast.show('Please enter valid full time price', Toast.SHORT);
        return false;
      } else {
        return true;
      }
     }

     const onCheckPartTime = () => {
       if (
         selectPartTime &&
         (partTimePrice == '' ||
           spaceValid(partTimePrice) == 0 ||
           zeroValid(partTimePrice) == 0)
       ) {
         Toast.show('Please enter valid part time price', Toast.SHORT);
         return false;
       } else {
         return true;
       }
     };

      const onCheckGigs = () => {
        if (
          selectGigs &&
          (gigsPrice == '' ||
            spaceValid(gigsPrice) == 0 ||
            zeroValid(gigsPrice) == 0)
        ) {
          Toast.show('Please enter valid gigs price', Toast.SHORT);
          return false;
        } else {
          return true;
        }
      };

     const onCallUpdateProfile = () => {
      if(onCheckValidity())
      {
      console.log('PROFILE PATH', profilePic.path);
      setLoading(true)
      let formData = new FormData()
      let dataType = 'formdata';
      formData.append('name', actualName);
      formData.append('email', userMail);
      formData.append('bio', userBio);
      formData.append('mobile', mobNo);
      formData.append('birth', userDob);
      formData.append('job_type1', selectFullTime ? 'Full Time' : null);
      formData.append('job_type2', selectPartTime ? 'Part Time': null);
      formData.append('job_type3', selectGigs ? 'Gigs' : null);
      formData.append('full_time_amount', fullTimePrice);
      formData.append('part_time_amount', partTimePrice);
      formData.append('gigs_amount', gigsPrice);
      formData.append('type', videoTypes.toString());

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
              // name: profilePic.filename ?? 'image.jpg',
            },
      );
      console.log("UpdateProfileFormData",formData)
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
            path: `${Config.API_URL}${response.Profile?.avatar.replace(
                        'http://localhost:8080/',
                        '',
                      )}`,
            mime: 'profile/jpeg',
            filename: 'profile.jpeg',
          });

           let resCategory = response.Profile?.category;
           let arr = videoTypeList.map((item, index) => {
             if (resCategory.includes(item.title)) {
               console.log('TRUE', item?.title);
               item.selected = true;
             } else {
               console.log('FALSE', item?.title);
               item.selected = false;
             }
             return {...item};
           });
           console.log('VideoListArray', arr);
           setVideoTypeList(arr);

          setFullTimePrice(response.Profile?.full_time_amount);
          setPartTimePrice(response.Profile?.part_time_amount);
          setGigsPrice(response.Profile?.gigs_amount);
          setSelectFullTime(response.Profile?.full_time_amount != '' ?? true);
          setSelectPartTime(response.Profile?.part_time_amount != '' ?? true);
          setSelectGigs(response.Profile?.gigs_amount != '' ?? true);
          Toast.show(response.message,Toast.SHORT)
          onCallProfileDetails();
          setLoading(false)
        }
        else
        {
          Toast.show(response.message, Toast.SHORT);
          setLoading(false);
        }
      }))
    }
    }



     const onCallFullTimeRow = () => {
       setSelectFullTime(!selectFullTime);
       setFullTimePrice('');
     };

     const onCallPartTimeRow = () => {
       setSelectPartTime(!selectPartTime);
       setPartTimePrice('');
     };

     const onCallGigsRow = () => {
       setSelectGigs(!selectGigs);
       setGigsPrice('');
     };


    return (
      <StoryScreen loading={loading}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
            title={'Edit Profile'}
            title_justifyContent={'center'}
            title_marginRight={R.fontSize.Size70}
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

                {/* <CustomLineTextInput
                  value={userBio}
                  onChangeText={bio => setUserBio(bio)}
                  placeholder={'Bio'}
                /> */}

                <View
                  style={{
                    backgroundColor: R.colors.white,
                    borderBottomWidth: 1,
                    borderColor: R.colors.placeholderTextColor,
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
                </View>

                <View
                  style={{
                    marginTop: R.fontSize.Size10,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontWeight: '900',
                        fontSize: R.fontSize.Size15,
                        color: R.colors.primaryTextColor,
                      }}>
                      {'Open For'}
                    </Text>
                    <View style={{marginTop: R.fontSize.Size10}}>
                      <CustomOpenForRow
                        leftOnPress={() => onCallFullTimeRow()}
                        leftImageSource={
                          selectFullTime
                            ? R.images.checkTermsIcon
                            : R.images.unCheckTermsIcon
                        }
                        leftTitle={'Full Time'}
                        leftTextColor={
                          selectFullTime
                            ? R.colors.appColor
                            : R.colors.placeholderTextColor
                        }
                        rightStatus={selectFullTime}
                        rightValue={fullTimePrice}
                        rightOnChangeText={price => setFullTimePrice(price)}
                        rightDayHours={'/ day'}
                      />
                      <CustomOpenForRow
                        leftOnPress={() => onCallPartTimeRow()}
                        leftImageSource={
                          selectPartTime
                            ? R.images.checkTermsIcon
                            : R.images.unCheckTermsIcon
                        }
                        leftTitle={'Part Time'}
                        leftTextColor={
                          selectPartTime
                            ? R.colors.appColor
                            : R.colors.placeholderTextColor
                        }
                        rightStatus={selectPartTime}
                        rightValue={partTimePrice}
                        rightOnChangeText={price => setPartTimePrice(price)}
                        rightDayHours={'/ hrs'}
                      />
                      <CustomOpenForRow
                        leftOnPress={() => onCallGigsRow()}
                        leftImageSource={
                          selectGigs
                            ? R.images.checkTermsIcon
                            : R.images.unCheckTermsIcon
                        }
                        leftTitle={'Gigs'}
                        leftTextColor={
                          selectGigs
                            ? R.colors.appColor
                            : R.colors.placeholderTextColor
                        }
                        rightStatus={selectGigs}
                        rightValue={gigsPrice}
                        rightOnChangeText={price => setGigsPrice(price)}
                        rightDayHours={'/ hrs'}
                      />
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: R.fontSize.Size10,
                  }}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontWeight: '900',
                      fontSize: R.fontSize.Size15,
                      color: R.colors.primaryTextColor,
                    }}>
                    {'Video Type'}
                  </Text>

                  <View
                    style={{
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      marginLeft: -R.fontSize.Size14,
                    }}>
                    {videoTypeList.map((item, index) => {
                      return (
                        <Pressable
                          onPress={() => onCallVideoSelect(item, index)}
                          key={index}
                          style={({pressed}) => [
                            {
                              opacity: pressed ? 0.5 : 1,
                              width: screenWidth / 3.8,
                              marginVertical: R.fontSize.Size8,
                              marginLeft: R.fontSize.Size14,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: item?.selected
                                ? R.colors.appColor
                                : R.colors.white,
                              borderWidth: 1,
                              paddingVertical: R.fontSize.Size10,
                              borderRadius: R.fontSize.Size20,
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