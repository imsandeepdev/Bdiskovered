import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ActivityIndicator ,FlatList, TextInput } from 'react-native';
import {AlartModal, Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {GiftedChat,Bubble,InputToolbar,Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// const insets = useSafeAreaInsets();
import {isIphoneX,getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import { connect, useDispatch } from 'react-redux';
import { ConnectRequestRequest } from '../../actions/connectRequest.action';
import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Config } from '../../config';
// import Aes from 'react-native-aes-crypto';
import {AES,enc} from 'react-native-crypto-js'
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';

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

  useEffect(() => {
    setConReqStatus(false);
    console.log('MY USER ID', props.route.params?.MyUserId);
    console.log('TAILENT USER ID', props.route.params?.tailentUserId);
    // getAllMessages()
    // getOnSnapMessage()
    // onReadOneTime()
    // const reference = database().ref(
    //   `one_to_one/${props.route.params?.fireID}`,
    // );
    // reference.set(true).then(() => console.log('Online presence set'));
    // console.log("REF",reference)
    onCallProfileAPI();

  }, [props.navigation]);
  
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
        let bytes = snapshot.val().chat_message;
        let decryptMsg =  AES.decrypt(bytes, key);
        const msg = decryptMsg.toString(enc.Utf8);
       
        let msgData = {
          chat_message: msg,
          chatSenderId: snapshot.val().chatSenderId,
          chatReceiverId: snapshot.val().chatReceiverId,
          chat_receiver: snapshot.val().chat_receiver,
          chat_receiver_img: snapshot.val().chat_receiver_img,
          chat_sender: snapshot.val().chat_sender,
          chat_sender_img: snapshot.val().chat_sender_img,
          type: 'text',
          chat_time: snapshot.val().chat_time,
        };
        console.log("MESSAGEDATA",msgData)
        setAllChat(state => [msgData, ...state]);
      });
    return () => database().ref(`/one_to_one/${props.route.params?.fireID}`).off('child_added', onValueChange);
  }, [props.route.params?.fireID]);


  

useEffect(() => {
    const usersRef = firebase.database().ref('/one_to_one/');
    const adaRef = usersRef.child(`${props.route.params?.fireID}`); 

    console.log("AVAILABLE",adaRef)
    
    const onValueChange = database()
      .ref(`/one_to_one/${props.route.params?.fireID}`)
      .on('value', snapshot => {
        console.log('User data realtime Length : ', snapshot.val());
        if (snapshot.val() != null)
        {
          let MsgLength = Object.keys(snapshot.val()).length
        console.log('User data realtime Length : ', MsgLength);
          if(MsgLength == 1)
          {
            console.log("LENGTH",MsgLength)
            onCallFirstTimeAPI()
          }
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/one_to_one/${props.route.params?.fireID}`).off('value', onValueChange);
  }, [props.route.params?.fireID]);

  const onCallFirstTimeAPI = () => {
    let data = {
      id: props.route.params?.tailentUserId,
      chat_id: props.route.params?.fireID,
    };
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
        console.log('RESPONSEJSON', responseJson);

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


    // dispatch(
    //   ConnectRequestRequest(data, response => {
    //     if (response.status == 'success') {
    //       console.log('Connect Req Response', response);
    //     }
    //   }),
    // );
  }




  const msgValid = txt => txt && txt.replace(/\s/g, '').length;
  const onSend = () => {
    if(msg == "" || msgValid(msg)==0)
    {
      Toast.show('Enter Something....')
    }
   
     const ciphertext = AES.encrypt(msg, key).toString();
     console.log('Encrypted text:', ciphertext);

    const mymsg = {
      chat_message: ciphertext,
      chatSenderId: props.route.params?.MyUserId,
      chatReceiverId: props.route.params?.tailentUserId,
      chat_receiver: props.route.params?.userItem?.username,
      chat_receiver_img: props.route.params?.userItem?.avatar,
      chat_sender: profileDetail?.username,
      chat_sender_img: profileDetail?.avatar,
      type: 'text',
      chat_time: moment().format(),
    };
     
      const docid =
        props.route.params?.tailentUserId > props.route.params?.MyUserId
          ? props.route.params?.MyUserId + "+" + props.route.params?.tailentUserId
          : props.route.params?.tailentUserId + "+" + props.route.params?.MyUserId 

      console.log("DOC ID", docid)
     
  
      const newRef = database().ref(`/one_to_one/${docid}`).push()
        mymsg.id = newRef.key
        console.log('RefKey', newRef.key);
        newRef.set(mymsg)
        .then(snapshot => {
          console.log('USER SNAPSHOT', snapshot);
          setMsg('')
        })
        .catch(err => {
          console.log('Error on Snap', err);
        });

      // firestore().collection('chatrooms')
      // .doc(docid)
      // .collection('message')
      // .add({...mymsg, createdAt:firestore.FieldValue.serverTimestamp()})
      // if(connReqStatus)
      // {
      //   let data ={
      //     id: props.route.params?.tailentUserId,
      //     chat_id: docid
      //   }
      //   console.log("DATA",data)
      //   dispatch(ConnectRequestRequest(data, response => {
      //     if(response.status == 'success')
      //     {
      //       console.log('Connect Req Response', response);
      //       setConReqStatus(false)
      //     }
      //   }))
      // }
  };

  const onCallSubscription = () => {
    setCustomModalPicker(false)
    props.navigation.navigate('SubscriptionScreen');
  }


  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          title={props.route.params?.userName}
          headIcon={
            <View
              style={{
                height: R.fontSize.Size40,
                width: R.fontSize.Size40,
                borderRadius: R.fontSize.Size30,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: -R.fontSize.Size20,
                marginRight: R.fontSize.Size10,
              }}>
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
                style={{
                  height: R.fontSize.Size40,
                  width: R.fontSize.Size40,
                  borderRadius: R.fontSize.Size30,
                }}
              />
            </View>
          }
        />
        {props.loading || loading ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} color={R.colors.appColor} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.lightWhite,
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
              style={{flex: 1}}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: R.colors.lightWhite,
                  }}>
                  <FlatList
                    style={{flex: 1}}
                    data={allChat}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    inverted
                    renderItem={({item}) => {
                      return (
                        <View
                          style={{
                            alignSelf:
                              item?.chatSenderId == props.route.params?.MyUserId
                                ? 'flex-end'
                                : 'flex-start',
                            marginHorizontal: 10,
                            minWidth: 80,
                            maxWidth: '80%',
                            paddingHorizontal: 10,
                            marginVertical: 5,
                            paddingTop: 5,
                            borderRadius: 8,
                            backgroundColor:
                              item?.chatSenderId == props.route.params?.MyUserId
                                ? R.colors.appColor
                                : R.colors.placeHolderColor,
                          }}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size15,
                              color: R.colors.lightWhite,
                              fontWeight: '400',
                            }}>
                            {item?.chat_message}
                          </Text>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size10,
                              color: R.colors.lightWhite,
                            }}>
                            {moment(item?.chat_time).format('hh:mm A')}
                          </Text>
                        </View>
                      );
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: R.fontSize.Size10,
                      paddingVertical: R.fontSize.Size5,
                      shadowColor: '#000',

                      shadowOffset: {width: 0, height: -2},
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      backgroundColor: R.colors.white,
                    }}>
                    <View
                      style={{
                        height: R.fontSize.Size50,
                        flex: 1,
                        borderColor: R.colors.appColor,
                        borderWidth: 1,
                        borderRadius: R.fontSize.Size30,
                        paddingHorizontal: 15,
                        justifyContent: 'center',
                      }}>
                      <TextInput
                        style={{
                          color: R.colors.black,
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size14,
                          height: R.fontSize.Size50,
                          paddingTop:R.fontSize.Size14
                        }}
                        placeholder={'Type a message'}
                        placeholderTextColor={R.colors.black}
                        multiline={true}
                        value={msg}
                        onChangeText={val => setMsg(val)}
                      />
                    </View>
                    <Pressable
                      onPress={onSend}
                      style={({pressed}) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          width: 60,
                          height: R.fontSize.Size50,
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      ]}>
                      <Image
                        source={R.images.shareIcon}
                        resizeMode={'contain'}
                      />
                    </Pressable>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        )}

        <AlartModal
          visible={customModalPicker}
          onRequestClose={() => setCustomModalPicker(false)}
          title={`Your connection's limit has been exhausted, Please purchase add on plan`}
          customButton={
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Pressable
                onPress={() => props.navigation.goBack()}
                style={({pressed}) => [
                  {
                    flex: 1,
                    marginVertical: R.fontSize.Size4,
                    backgroundColor: R.colors.appColor,
                    height: R.fontSize.Size45,
                    borderRadius: R.fontSize.Size8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.5 : 1,
                    marginHorizontal: R.fontSize.Size10,
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.white,
                    fontWeight: '700',
                    fontSize: R.fontSize.Size16,
                  }}>
                  {'Cancel'}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onCallSubscription()}
                style={({pressed}) => [
                  {
                    flex: 1,
                    marginVertical: R.fontSize.Size4,
                    backgroundColor: R.colors.appColor,
                    height: R.fontSize.Size45,
                    borderRadius: R.fontSize.Size8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.5 : 1,
                    marginHorizontal: R.fontSize.Size10,
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.white,
                    fontWeight: '700',
                    fontSize: R.fontSize.Size16,
                  }}>
                  {'Proceed'}
                </Text>
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
