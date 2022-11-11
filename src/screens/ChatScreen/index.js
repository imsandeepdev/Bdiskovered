import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView,ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard  } from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {GiftedChat,Bubble,InputToolbar,Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'

// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// const insets = useSafeAreaInsets();

const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // console.log('TAILENT USER ID', props.route.params?.tailentUserId);
    // console.log('MY USER ID', props.route.params?.MyUserId);
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
    // getAllMessages()
    getOnSnapMessage()
  }, [props.navigation]);

   const getOnSnapMessage =  () => {
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
      })
   };

  const getAllMessages = async ()=> {

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
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          title={props.route.params?.userName}
        />
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
        <View
          style={{
            flex: 1,
            backgroundColor: R.colors.lightWhite,
            // paddingTop: insets.top,
            // paddingLeft: insets.left,
            // paddingRight: insets.right,
            // paddingBottom: insets.bottom,
          }}>
          <GiftedChat
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
        {/* </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView> */}
      </SafeAreaView>
    </StoryScreen>
  );
};

export default ChatScreen;
