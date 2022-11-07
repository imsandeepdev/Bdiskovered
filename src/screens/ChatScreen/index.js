import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore'

const ChatScreen = props => {
  const [messages, setMessages] = useState([]);

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
    getAllMessages()
  }, []);


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

      // 6340226f07b271105185eafe-6340230607b271105185eb1a
      // 6340226f07b271105185eafe-6340230607b271105185eb1a
      firestore().collection('chatrooms')
      .doc(docid)
      .collection('message')
      .add({...mymsg, createdAt:firestore.FieldValue.serverTimestamp()})
  };

  return (
    <StoryScreen>
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={'Chat Screen'}
      />
      <View style={{flex: 1, borderWidth: 1}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: props.route.params?.MyUserId,
          }}
        />
      </View>
    </StoryScreen>
  );
};

export default ChatScreen;
