import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ActivityIndicator ,FlatList, TextInput } from 'react-native';
import {Header, StoryScreen} from '../../components';
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
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Config } from '../../config';
import Aes from 'react-native-aes-crypto';

const algorithm = 'aes-256-cbc';
const key = 'bdiskovered@_2023_secretkeysecretkey';
// const iv = Buffer.alloc(16, 0);



const ChatScreen = props => {

  const dispatch = useDispatch()
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [allChat, setAllChat] = useState([]);

  const [loading, setLoading] = useState(false);
  const [connReqStatus, setConReqStatus] = useState(false);

  useEffect(() => {
    setConReqStatus(false);
    console.log('MY USER ID', props.route.params?.MyUserId);
    console.log('TAILENT USER ID', props.route.params?.tailentUserId);
    // getAllMessages()
    // getOnSnapMessage()
    onReadRealTime()

    console.log('Profile Details', props.userProfile.Profile);
  }, [props.navigation]);
  
  let tempList = [];

  useEffect(() => {
    const onValueChange = database()
      .ref(`/one_to_one/${props.route.params?.fireID}`)
      .on('child_added', snapshot => {
        console.log('User data: ', snapshot.val());
        setAllChat(state => [snapshot.val(), ...state]);
      });
    return () => database().ref(`/one_to_one/${props.route.params?.fireID}`).off('child_added', onValueChange);
  }, [props.route.params?.fireID]);



  const onReadRealTime = () => {
    const fire_id =
      props.route.params?.tailentUserId > props.route.params?.MyUserId
        ? props.route.params?.MyUserId + '+' + props.route.params?.tailentUserId
        : props.route.params?.tailentUserId +
          '+' +
          props.route.params?.MyUserId;
   
    database()
      .ref(`/one_to_one/${fire_id}`)
      .once('child_added')
      .then(snapshot => {
        console.log('User data ON TIME: ', snapshot.val());
        let value = JSON.stringify(snapshot.val());
        console.log('VALUE', value);
      });
  }

   const getOnSnapMessage =  () => {
      setLoading(true);

     const docid =
       props.route.params?.tailentUserId > props.route.params?.MyUserId
         ? props.route.params?.MyUserId +
           '-' +
           props.route.params?.tailentUserId
         : props.route.params?.tailentUserId +
           '-' +
           props.route.params?.MyUserId;
       const messageRef = firestore().collection('chatrooms')
       .doc(docid)
       .collection('message')
       .orderBy('createdAt', 'desc')
       
      messageRef.onSnapshot((quarySnap) => {
      let quaryDoc = quarySnap?._docs;
      if (quaryDoc.length < 1) {
        setConReqStatus(true);
      }
      console.log('QUARY SNAP ON SNAP', quarySnap);
      const allmsg = quarySnap.docs.map(docSnap => {
      const data = docSnap.data()
      if(data.createdAt)
      {
        return {
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt.toDate(),
          
        };
      }
      else
      {
        return {
          ...docSnap.data(),
          createdAt: new Date()
        };
      }
       
     });
     setMessages(allmsg);
     setLoading(false);

      })
   };

  const getAllMessages = async ()=> {
      setLoading(true)
      const docid =
        props.route.params?.tailentUserId > props.route.params?.MyUserId
          ? props.route.params?.MyUserId +
            '-' +
            props.route.params?.tailentUserId
          : props.route.params?.tailentUserId +
            '-' +
            props.route.params?.MyUserId;
      const quarySnap = await firestore().collection('chatrooms')
        .doc(docid)
        .collection('message')
        .orderBy('createdAt','desc')
        .get();
      let quaryDoc = quarySnap?._docs
      if (quaryDoc.length < 1)
      {
        setConReqStatus(true)
      }
      
      console.log('QUARY DOC LENGTH', quaryDoc.length);
      console.log("QUARY SNAP ON ALL Message",quarySnap)
      const allmsg = quarySnap.docs.map(docSnap=>{
        return {
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt.toDate(),
        };
      });
      setMessages(allmsg);
      setLoading(false)
  }



  const msgValid = txt => txt && txt.replace(/\s/g, '').length;
  const onSend = () => {
    if(msg == "" || msgValid(msg)==0)
    {
      Toast.show('Enter Something....')
    }
    let cipyerValue = Aes.randomKey(16).then(iv => {
      return Aes.encrypt(msg, key, iv, 'aes-256-cbc').then(cipher => {
       return cipher
       
      });
    });

    console.log('ENCYPTCYPHER', cipyerValue);
    

    const mymsg = {
      chat_message: msg,
      chatSenderId: props.route.params?.MyUserId,
      chatReceiverId: props.route.params?.tailentUserId,
      chat_receiver: props.route.params?.userItem?.username,
      chat_receiver_img: props.route.params?.userItem?.avatar,
      chat_sender: props.userProfile.Profile?.username,
      chat_sender_img: props.userProfile.Profile?.avatar,
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




  return (
    <SafeAreaView style={{flex: 1, backgroundColor: R.colors.white}}>
      <View style={{flex: 1}}>
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
                marginLeft:-R.fontSize.Size20,
                marginRight:R.fontSize.Size10
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
                      backgroundColor: R.colors.appColor,
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
                    paddingVertical: R.fontSize.Size10,
                    color: R.colors.black,
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
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
                <Image source={R.images.shareIcon} resizeMode={'contain'} />
              </Pressable>
            </View>
            {/* <GiftedChat
            isAnimated
            bottomOffset={ DeviceInfo.hasNotch() ? R.fontSize.Size70:0}
            scrollToBottom
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
              _id: props.route.params?.MyUserId,
            }}
            renderBubble={props => {
              return (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    right: {
                      backgroundColor: R.colors.appColor,
                    },
                    left: {
                      backgroundColor: R.colors.placeholderTextColor,
                    },
                  }}
                />
              );
            }}
            renderInputToolbar={props => {
              return (
                <InputToolbar
                  {...props}
                  containerStyle={{
                    borderTopColor: R.colors.appColor,
                  }}
                  textInputStyle={{color: R.colors.primaryTextColor}}
                />
              );
            }}
            renderSend={props => {
              return (
                <Send {...props}>
                  <View
                    style={{
                      width: 50,
                      height: 45,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={R.images.shareIcon}
                      resizeMode={'contain'}
                      style={{
                        height: R.fontSize.Size30,
                        width: R.fontSize.Size30,
                      }}
                    />
                  </View>
                </Send>
              );
            }}
          /> */}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state, props) => ({
  loading: state.getProfileDetailsRoot.loading,
  userProfile: state.getProfileDetailsRoot.getProfileInit,

})

export default connect(mapStateToProps) (ChatScreen);
