import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,KeyboardAvoidingView, Platform, ActivityIndicator ,FlatList, TextInput } from 'react-native';
import {AlartModal, Header, StoryScreen} from '../../components';
import R from '../../res/R';
import { connect, useDispatch } from 'react-redux';
import database from '@react-native-firebase/database';
import moment from 'moment';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Config } from '../../config';
import {AES,enc} from 'react-native-crypto-js'
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';
import styles from './styles';
import { ConnectRequestRequest } from '../../actions/connectRequest.action';
const algorithm = 'aes-256-cbc';
const key = 'bdiskovered@_2023_secretkeysecretkey';

const ChatScreen = props => {
  const dispatch = useDispatch()
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [allChat, setAllChat] = useState([]);
  const [customModalPicker, setCustomModalPicker] = useState(false)
  const [profileDetail, setProfileDetail] = useState({})
  const [loading, setLoading] = useState(false);
  const [connReqStatus, setConReqStatus] = useState(false);
  const [diableSendIcon, setDiableSendIcon] = useState(true)

  useEffect(() => {
    setConReqStatus(false);
    console.log('FIREBASE CHAT ID', props.route.params?.fireID);
    console.log('TAILENT USER ID', props.route.params?.tailentUserId);
    console.log('USER TYPE', props.userProfile?.Profile?.role);
    onCallProfileAPI();
    onCheckConnectStatus();

  }, [props.navigation]);

  const onCheckConnectStatus = () => {
    console.log("CONNECTION STATUS",props.route.params?.userItem?.connect_status)
    setLoading(true);
    if(!props.route.params?.userItem?.connect_status)
    {
      onCallFirstTimeAPI();
    }
    setLoading(false);
  }
  
  const onCallProfileAPI = () => {
    setLoading(true)
    dispatch(GetProfileDetailsRequest(response => {
      console.log('Get Profile Res', response)
      setProfileDetail(response?.Profile)
      setLoading(false);

    }))
    }

  useEffect(() => {
    const onValueChange = database()
      .ref(`/one_to_one/${props.route.params?.fireID}`)
      .on('child_added', snapshot => {
        console.log('User data: ', snapshot.val());
        // let bytes = snapshot.val().chat_message;
        // let decryptMsg =  AES.decrypt(bytes, key);
        // const msg = decryptMsg.toString(enc.Utf8);
       
        // let msgData = {
        //   chat_message: msg,
        //   chatSenderId: snapshot.val().chatSenderId,
        //   chatReceiverId: snapshot.val().chatReceiverId,
        //   chat_receiver: snapshot.val().chat_receiver,
        //   chat_receiver_img: snapshot.val().chat_receiver_img,
        //   chat_sender: snapshot.val().chat_sender,
        //   chat_sender_img: snapshot.val().chat_sender_img,
        //   type: 'text',
        //   chat_time: snapshot.val().chat_time,
        // };
        // console.log("MESSAGEDATA",msgData)
        setAllChat(state => [snapshot.val(), ...state]);
      });
    return () => database().ref(`/one_to_one/${props.route.params?.fireID}`).off('child_added', onValueChange);
  }, [props.route.params?.fireID]);


  
  const onCallAfterChat = () => {
  database().ref(`/one_to_one/${props.route.params?.fireID}`)
      .on('value', snapshot => {
        console.log('Chat Data after Message ', snapshot.val());
        if (snapshot.val() != null)
        {
          let MsgLength = Object.keys(snapshot.val()).length
          console.log('Chat Length Length : ', MsgLength);
          if(MsgLength == 1)
          {
            console.log("LENGTH",MsgLength)
            onCallFirstTimeAPI()
          }
        }
      });

  }

  const onCallFirstTimeAPI = () => {
    // setLoading(true)
    let data = {
      id: props.route.params?.tailentUserId,
      communication_id: props.route.params?.fireID,
      user_type: props.userProfile?.Profile?.role,
    };
    // dispatch(ConnectRequestRequest(data, response => {
    //   console.log('Connection Response', response);
    //   if (response.status == 'success') {
    //     console.log('SUCCESS', response);
    //   } else if (
    //     response.message == 'You have already sent connection request'
    //   ) {
    //     console.log('ERROR', response);
    //   } else {
    //     setCustomModalPicker(true);
    //   }
    // }))
    console.log('DATA', data);
    const headerAuth = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      token: props.authToken,
    };
    const headers = headerAuth;
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const config = {
      method: 'POST',
      headers,
      body: formBody,
    };
    fetch(`${Config.API_URL}${Config.connectRequestAPI}`, config)
      .then(response => response.json())
      .then(responseJson => {
        console.log('RESPONSEJSONAPI FIRSTTIME', responseJson);
          setLoading(false);
        if (responseJson.status == 'success') {
          console.log("SUCCESS",responseJson)
        } else if (responseJson.message == 'You have already sent connection request') 
        {
          console.log('ERROR', responseJson);
        }
        else{
          setCustomModalPicker(true);
        }
      })
      .catch(error => {
        setCustomModalPicker(true);
        console.log('ERRORONAPI', error);
      });
  }

  const onSend = () => {
    const mymsg = {
      chat_message: msg,
      chatSenderId: props.route.params?.MyUserId,
      chatReceiverId: props.route.params?.tailentUserId,
      chat_receiver: props.route.params?.userItem?.username,
      chat_receiver_img: props.route.params?.userItem?.avatar,
      chat_sender: profileDetail?.username,
      chat_sender_img: profileDetail?.avatar,
      type: 'text',
      chat_time: moment().format(),
    };
      // const docid =
      //   props.route.params?.tailentUserId > props.route.params?.MyUserId
      //     ? props.route.params?.MyUserId + "+" + props.route.params?.tailentUserId
      //     : props.route.params?.tailentUserId + "+" + props.route.params?.MyUserId 

      console.log('FIRE ID', props.route.params?.fireID);
      const newRef = database()
        .ref(`/one_to_one/${props.route.params?.fireID}`)
        .push();
        mymsg.id = newRef.key
        console.log('RefKey', newRef.key);
        newRef.set(mymsg)
        .then(snapshot => {
          console.log('USER SNAPSHOT', snapshot);
          onCallAfterChat()
          setMsg('')
        })
        .catch(err => {
          console.log('Error on Snap', err);
        });
  };

  const onCallSubscription = () => {
    setCustomModalPicker(false)
    props.navigation.navigate('SubscriptionScreen');
  }
  const msgValid = txt => txt && txt.replace(/\s/g, '').length;
  const onCallMsg = (val) => {
    if (val == '' || msgValid(val) == 0) 
    {
      setDiableSendIcon(true);
      setMsg('')
    }
    else
    {
      setDiableSendIcon(false)
      setMsg(val);
    }
    console.log("MSG",val)
  }

  return (
    <StoryScreen loading={loading}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          title={props.route.params?.userName}
          headIcon={
            <View style={styles.headerView}>
              <Image
                source={{
                  uri: `${
                    Config.API_URL
                  }${props.route.params?.userItem?.avatar?.replace(
                    'http://localhost:8080/',
                    '',
                  )}`,
                }}
                resizeMode={'cover'}
                style={styles.headerViewImage}
              />
            </View>
          }
        />
        {props.loading || loading ? (
          <View style={styles.loadView}>
            <ActivityIndicator size={'large'} color={R.colors.appColor} />
          </View>
        ) : (
          <View style={styles.mainView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
              style={{flex: 1}}>
              <View style={styles.mainView}>
                <FlatList
                  style={{flex: 1}}
                  data={allChat}
                  keyExtractor={(item, index) => index}
                  inverted
                  renderItem={({item}) => {
                    return (
                      <View
                        style={[
                          styles.chatView,
                          {
                            alignSelf:
                              item?.chatSenderId == props.route.params?.MyUserId
                                ? 'flex-end'
                                : 'flex-start',
                            backgroundColor:
                              item?.chatSenderId == props.route.params?.MyUserId
                                ? R.colors.appColor
                                : R.colors.placeHolderColor,
                          },
                        ]}>
                        <Text style={styles.chatText}>
                          {item?.chat_message}
                        </Text>
                        <Text style={styles.chatDate}>
                          {moment(item?.chat_time).format('hh:mm A')}
                        </Text>
                      </View>
                    );
                  }}
                />

                <View style={styles.textInputMainView}>
                  <View style={styles.textInputView}>
                    <TextInput
                      style={styles.textInput}
                      placeholder={'Type a message'}
                      placeholderTextColor={R.colors.black}
                      multiline={true}
                      value={msg}
                      onChangeText={val => onCallMsg(val)}
                    />
                  </View>
                  <Pressable
                    disabled={diableSendIcon || msg == '' ? true : false}
                    onPress={onSend}
                    style={({pressed}) => [
                      styles.pressSendButton,
                      {
                        opacity: pressed ? 0.5 : 1,
                        borderColor:
                          diableSendIcon || msg == ''
                            ? R.colors.lightWhite
                            : R.colors.appColor,
                      },
                    ]}>
                    <Image
                      source={
                        diableSendIcon || msg == ''
                          ? R.images.lightSentIcon
                          : R.images.sentIcon
                      }
                      resizeMode={'contain'}
                      style={{
                        height: R.fontSize.Size35,
                        width: R.fontSize.Size35,
                      }}
                    />
                  </Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        )}

        <AlartModal
          visible={customModalPicker}
          onRequestClose={() => setCustomModalPicker(false)}
          title={`You have reached your connections limit. Purchase Add-on plan?`}
          customButton={
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                onPress={() => props.navigation.goBack()}
                style={({pressed}) => [
                  styles.modelButton,
                  {opacity: pressed ? 0.5 : 1},
                ]}>
                <Text style={styles.modelButtonText}>{'Cancel'}</Text>
              </Pressable>
              <Pressable
                onPress={() => onCallSubscription()}
                style={({pressed}) => [
                  styles.modelButton,
                  {opacity: pressed ? 0.5 : 1},
                ]}>
                <Text style={styles.modelButtonText}>{'Proceed'}</Text>
              </Pressable>
            </View>
          }
        />
      </SafeAreaView>
    </StoryScreen>
  );
};

const mapStateToProps = (state, props) => ({
  loading: state.getProfileDetailsRoot.loading,
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
});

export default connect(mapStateToProps) (ChatScreen);
