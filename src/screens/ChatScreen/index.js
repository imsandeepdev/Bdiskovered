import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatScreen = props => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('TAILENT USER ID', props.route.params?.tailentUserId);
    console.log('MY USER ID', props.route.params?.MyUserId);

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

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
            _id: 1,
          }}
        />
      </View>
    </StoryScreen>
  );
};

export default ChatScreen;
