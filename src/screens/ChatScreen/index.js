import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, ActivityIndicator  } from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {GiftedChat,Bubble,InputToolbar,Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// const insets = useSafeAreaInsets();
import {isIphoneX,getBottomSpace} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';


const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    console.log("BOTTOM BAR S", getBottomSpace)
  
    console.log('MY USER ID', props.route.params?.MyUserId);
    console.log('TAILENT USER ID', props.route.params?.tailentUserId);

    getAllMessages()
    getOnSnapMessage()
  }, [props.navigation]);

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
      const allmsg = quarySnap.docs.map(docSnap=>{
        return {
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt.toDate(),
        };
      });
      setMessages(allmsg);
      setLoading(false)
  }

  const onSend = messagesArray => {
    console.log('MESSAGE', messagesArray);
    const msg = messagesArray[0];
    const mymsg = {
      ...msg,
      sentBy: props.route.params?.MyUserId,
      sentTo: props.route.params?.tailentUserId,
      createdAt: new Date()
    };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, mymsg),
      );

      const docid =
        props.route.params?.tailentUserId > props.route.params?.MyUserId
          ? props.route.params?.MyUserId + "-" + props.route.params?.tailentUserId
          : props.route.params?.tailentUserId + "-" + props.route.params?.MyUserId 

      console.log("DOC ID", docid)
      firestore().collection('chatrooms')
      .doc(docid)
      .collection('message')
      .add({...mymsg, createdAt:firestore.FieldValue.serverTimestamp()})
  };




  return (
    <SafeAreaView style={{flex: 1, backgroundColor: R.colors.white}}>
     
      <View style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          title={props.route.params?.userName}
        />
        {
        loading ?
        <View
        style={{flex:1, alignItems:'center',justifyContent:'center'}}
        >
          <ActivityIndicator size={'large'} color={R.colors.appColor} />
        </View>
      :
        <View
          style={{
            flex: 1,
            backgroundColor: R.colors.lightWhite,
           
          }}>
          <GiftedChat
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
          />
        </View>
}  
      </View>

     
    </SafeAreaView>
  );
};

export default ChatScreen;
