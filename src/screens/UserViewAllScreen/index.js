import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Header, StoryScreen } from '../../components';
import R from '../../res/R';

const ConnectedUsers = [
  {
    id: '1',
    name: 'ABCD',
    source:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: '2',
    name: 'Priya',
    source:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: '3',
    name: 'RiyaD',
    source:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  },
  {
    id: '4',
    name: 'Dimple',
    source:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80',
  },
];

const UserViewAllScreen = (props) => {
  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          title={'Connected Users'}
        />

        <View style={{flex: 1, marginHorizontal: R.fontSize.Size20}}>
        <FlatList
            data={ConnectedUsers}
            keyExtractor = {(item)=> item?.id}
            renderItem = {({item,index}) => {
                return (
                  <View
                  key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      paddingVertical: R.fontSize.Size5,
                      marginBottom: R.fontSize.Size10,
                      borderColor: R.colors.placeholderTextColor,
                    }}>
                    <View
                      style={{
                        height: R.fontSize.Size45,
                        width: R.fontSize.Size45,
                        borderRadius: R.fontSize.Size30,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: R.colors.placeholderTextColor,
                      }}>
                      <Image
                        source={{uri: item?.source}}
                        style={{
                          height: R.fontSize.Size45,
                          width: R.fontSize.Size45,
                        }}
                        resizeMode={'cover'}
                      />
                    </View>
                    <View
                      style={{
                        width: 1,
                        height: R.fontSize.Size30,
                        backgroundColor: R.colors.placeholderTextColor,
                        marginHorizontal: R.fontSize.Size10,
                      }}
                    />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginHorizontal: R.fontSize.Size10,
                      }}>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          color: R.colors.primaryTextColor,
                          fontSize: R.fontSize.Size14,
                          fontWeight: '700',
                        }}>
                        {item?.name}
                      </Text>
                    </View>
                  </View>
                );
            }}

        />
          
        </View>
      </SafeAreaView>
    </StoryScreen>
  );
};

export default UserViewAllScreen
