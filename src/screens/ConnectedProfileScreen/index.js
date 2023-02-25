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
  Alert
} from 'react-native';
import { ConnectTailentProfileRequest} from '../../actions/getProfile.action';
import { CustomTimeRow, ReportModal, ShadowHeader, StoryScreen, VideoCard} from '../../components';
import R from '../../res/R';
import { connect,useDispatch } from 'react-redux';
import { Config } from '../../config';
import Toast from 'react-native-simple-toast';
const screenWidth = Dimensions.get('screen').width;
import moment from 'moment';
import { BlockUserRequest } from '../../actions/block.action';
import styles from './styles';
import { DeactivateAccountRequest } from '../../actions/signUp.action';



const ConnectedProfileScreen = props => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [profileDetails, setProfileDetails] = useState({});
  const [tailentPostVideo, setTailentPostVideo] = useState([]);
  const [taletArray, setTalentArray] = useState([]);
  const [personalArray, setPersonalArray] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const [editModalPicker, setEditModalPicker] = useState(false);
  const [blockModalPicker, setblockModalPicker] = useState(false);

  const [userProfileId, setUserProfileId] = useState('')
  const [talentUserId, setTalentUserId] = useState('');

  useEffect(()=>{
    console.log('Tailent Post D', props.route.params?.tailentPost?.user_id);
    console.log('PROFILE ID', props.userProfile?.Profile?.user_id);
    setUserProfileId(props.userProfile?.Profile?.user_id);
    setTalentUserId(props.route.params?.tailentPost?.user_id);
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
            `${moment().diff(response.Profile?.birth, 'years')} Year`,
            `${
              response.Profile?.address != '' ? response.Profile?.address : ''
            }`,
          ]);
        
        setProfilePic({
          path: `${Config.API_URL}${response.Profile?.avatar.replace('http://localhost:8080/','')}`,
          mime: 'profile/jpeg',
          filename: 'profile.jpeg',
        });
        setLoading(false);
      }
    }))
  }

const onCallMyUserId = () => {
      console.log('MY USER ID', userProfileId);
      console.log('TAILENT USER ID', profileDetails?.user_id);
      console.log(
        'FIREID',
        profileDetails?.user_id > userProfileId
          ? userProfileId + '+' + profileDetails?.user_id
          : profileDetails?.user_id + '+' + userProfileId,
      );
       props.navigation.navigate('ChatScreen', {
         tailentUserId: profileDetails?.user_id,
         MyUserId: userProfileId,
         userName: profileDetails?.name,
         userItem: profileDetails,
         fireID:
           profileDetails?.user_id > userProfileId
             ? userProfileId + '+' + profileDetails?.user_id
             : profileDetails?.user_id + '+' + userProfileId,
       });
  }

  const onCallBlockUser = () => {
    let data = {
      blockId: profileDetails?.user_id,
    };
    setLoading(true);
    dispatch(
      BlockUserRequest(data, response => {
        console.log('BLOCK USER RESPONSE', response);
        if (response.status == 'success') {
          setLoading(false);
          setblockModalPicker(false);          
          props.navigation.replace('HomeMenu')
        } else {
          Toast.show(response.message, Toast.SHORT);
          setblockModalPicker(false)
          setLoading(false);
        }
      }),
    );
  };

  const onCallBlockUserScreen = () => {
   setblockModalPicker(false)
    props.navigation.navigate('BlockUserScreen');
  };

      const onDeleteAccountAlart = () => {
        Alert.alert(
          'Delete Account!',
          `\nAre you sure you want to delete your account? \n`,
          [
            {
              text: 'Proceed',
              onPress: () => onCallDeleteAccountAPI(),
            },
            {
              text: 'CANCEL',
              onPress: () => setEditModalPicker(false),
            },
          ],
          {
            cancelable: true,
          },
        );
      };

      const onCallDeleteAccountAPI = () => {
        setLoading(true);
        setEditModalPicker(false);
        dispatch(
          DeactivateAccountRequest(response => {
            console.log('Delete Account Response', response);
            if (response.status == 'success') {
              setLoading(false);
              props.navigation.replace('LoginScreen');
            } else {
              setLoading(false);
              Toast.show(response.message, Toast.SHORT);
            }
          }),
        );
      };

  return (
    <StoryScreen loading={loading}>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
            <View style={{alignItems: 'flex-end'}}>
              <Pressable
                onPress={() => {userProfileId == talentUserId ? setblockModalPicker(true) : setEditModalPicker(true)}}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    padding: R.fontSize.Size4,
                    paddingHorizontal: R.fontSize.Size2,
                  },
                ]}>
                <Image
                  source={R.images.greyDotsIcon}
                  style={styles.dotIconImage}
                  resizeMode={'contain'}
                />
              </Pressable>
            </View>
            <View style={styles.topMainView}>
              <View style={styles.topView}>
                <View style={styles.topProfileView}>
                  <Image
                    source={{
                      uri: profilePic?.path,
                    }}
                    style={styles.topProfileImage}
                    resizeMode={'cover'}
                  />
                </View>
                <Text style={styles.topUserText} numberOfLines={1}>
                  {profileDetails?.username}
                </Text>
              </View>
              <View style={styles.topViewLine} />
              <View style={styles.topRightView}>
                <Text style={styles.topRightText} numberOfLines={1}>
                  {tailentPostVideo.length}
                </Text>
                <Text style={styles.topRightPostText} numberOfLines={1}>
                  {'Posts'}
                </Text>
              </View>
            </View>
            <View style={{marginTop: R.fontSize.Size10}}>
              {userProfileId == talentUserId ? (
                <View
                  style={{
                    marginTop: R.fontSize.Size10,
                  }}>
                  <Pressable
                    onPress={() =>
                      props.navigation.navigate('UpdateProfileScreen')
                    }
                    style={({pressed}) => [
                      styles.editPressButton,
                      {opacity: pressed ? 0.5 : 1},
                    ]}>
                    <View style={styles.editViewButton} />
                    <Text style={styles.editTextButton}>{'Edit Profile'}</Text>
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  onPress={() => onCallMyUserId()}
                  style={({pressed}) => [
                    styles.editPressButton,
                    {
                      opacity: pressed ? 0.5 : 1,
                      backgroundColor: R.colors.appColor,
                    },
                  ]}>
                  <View style={{justifyContent: 'center'}}>
                    <Image
                      source={R.images.chatIconWhite}
                      style={styles.dotIconImage}
                      resizeMode={'contain'}
                    />
                  </View>
                  <Text
                    style={[styles.editTextButton, {color: R.colors.white}]}>
                    {'Send Message'}
                  </Text>
                </Pressable>
              )}
            </View>
            {profileDetails?.bio != '' && (
              <View style={{marginTop: R.fontSize.Size20}}>
                <Text style={styles.bioText}>{`${profileDetails?.bio}`}</Text>
              </View>
            )}

            <View style={styles.personalView}>
              {personalArray.map((item, index) => {
                return (
                  <View key={index} style={styles.personalUnderView}>
                    {item != '' && <View style={styles.personalDotView} />}
                    <Text style={styles.personalText}>{item}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.personalView}>
              {taletArray.map((item, index) => {
                return (
                  <View key={index} style={styles.talentView}>
                    <Text style={styles.talentText}>{item}</Text>
                  </View>
                );
              })}
            </View>

            <View style={styles.timeMainView}>
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
            <View style={styles.talentVideoView}>
              {tailentPostVideo.map((item, index) => {
                return (
                  <View key={index}>
                    <Pressable
                      onPress={() =>
                        props.navigation.navigate('ParticularVideoScreen', {
                          videoPostId: item?._id,
                          from: 'TailentProfileScreen',
                        })
                      }
                      style={({pressed}) => [
                        styles.talentVideoPress,
                        {opacity: pressed ? 0.5 : 1},
                      ]}>
                      <VideoCard
                        videoUrl={`${Config.API_URL}${item?.post.replace(
                          'http://localhost:8080/',
                          '',
                        )}`}
                        paused={true}
                        shareFiled={true}
                      />
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <ReportModal
        visible={editModalPicker}
        onRequestClose={() => setEditModalPicker(false)}
        closeModal={() => setEditModalPicker(false)}
        title2={`Block`}
        icon2={R.images.blockIcon}
        optionFirst={true}
        optionThird={true}
        onPress2={() => onCallBlockUser()}
      />
      <ReportModal
        visible={blockModalPicker}
        onRequestClose={() => setblockModalPicker(false)}
        closeModal={() => setblockModalPicker(false)}
        title1={`Blocked Users`}
        title2={`Delete Account`}
        icon1={R.images.blockIcon}
        icon2={R.images.grayDeleteIcon}
        optionThird={true}
        onPress1={() => onCallBlockUserScreen()}
        onPress2={() => onDeleteAccountAlart()}
      />
    </StoryScreen>
  );
};

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType,
  userProfile: state.getProfileDetailsRoot.getProfileInit,
});

export default connect(mapStatetoProps) (ConnectedProfileScreen);
