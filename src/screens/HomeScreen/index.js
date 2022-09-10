import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import {CustomTextInput, StoryScreen, AppButton, Header, ShadowHeader} from '../../components';

import R from '../../res/R';
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;

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

const PopularList = [
  {
    id: '1',
    name: 'bhishmasurgghgffr',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '2',
    name: 'Priya',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '3',
    name: 'RiyaD',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '4',
    name: 'Dimple',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
];

const HomeScreen = (props) => {

  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.toggleDrawer()}
          leftSource={R.images.menuIcon}
        />
        <View style={{flex: 1, marginHorizontal: R.fontSize.Size20}}>
          <View
            style={{
              marginTop: R.fontSize.Size45,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size18,
                fontWeight: '700',
                color: R.colors.primaryTextColor,
              }}>
              {'Connected User'}
            </Text>
            <Pressable>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size12,
                  color: R.colors.appColor,
                  fontWeight: '700',
                }}>
                {'View All'}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: R.fontSize.Size30,
              flexDirection: 'row',
            }}>
            {ConnectedUsers.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: R.fontSize.Size20,
                  }}>
                  <View
                    style={{
                      height: R.fontSize.Size60,
                      width: R.fontSize.Size60,
                      overflow: 'hidden',
                      borderRadius: R.fontSize.Size30,
                    }}>
                    <Image
                      source={{
                        uri: item?.source,
                      }}
                      style={{
                        height: R.fontSize.Size60,
                        width: R.fontSize.Size60,
                      }}
                      resizeMode={'cover'}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size14,
                      color: R.colors.placeholderTextColor,
                      fontWeight: '400',
                      textAlign: 'center',
                      marginTop: R.fontSize.Size10,
                    }}
                    numberOfLines={1}>
                    {item?.name}
                  </Text>
                </View>
              );
            })}
          </View>
          <View
            style={{
              marginTop: R.fontSize.Size45,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size18,
                fontWeight: '700',
                color: R.colors.primaryTextColor,
              }}>
              {'Most Popular'}
            </Text>
            <Pressable>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size12,
                  color: R.colors.appColor,
                  fontWeight: '700',
                }}>
                {'View All'}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: R.fontSize.Size30,
              flexDirection: 'row',
            }}>
            {PopularList.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: R.fontSize.Size20,
                  }}>
                  <View
                    style={{
                      height: R.fontSize.Size130,
                      width: R.fontSize.Size140,
                      overflow: 'hidden',
                      borderRadius: R.fontSize.Size8,
                    }}>
                    <Image
                      source={{
                        uri: item?.videoImg,
                      }}
                      style={{
                        height: R.fontSize.Size130,
                        width: R.fontSize.Size140,
                      }}
                      resizeMode={'cover'}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: R.fontSize.Size15,
                    }}>
                    <Image
                      source={{uri: item.source}}
                      style={{
                        height: R.fontSize.Size25,
                        width: R.fontSize.Size25,
                        borderRadius: R.fontSize.Size15,
                      }}
                      resizeMode={'cover'}
                    />
                    <Text
                      style={{
                        flex: 1,
                        marginLeft: R.fontSize.Size10,
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        color: R.colors.placeholderTextColor,
                        fontWeight: '400',
                      }}
                      numberOfLines={1}>
                      {item?.name}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View
            style={{
              marginTop: R.fontSize.Size45,
            }}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size18,
                fontWeight: '700',
                color: R.colors.primaryTextColor,
              }}>
              {'Suggested Post'}
            </Text>
          </View>
          <View
          style={{marginTop:R.fontSize.Size30}}
          >
            <Image
              source={{
                uri: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
              }}
              style={{height:screenHeight/3.5,width:'100%'}}
              resizeMode={'cover'}
            />
          </View>
        </View>
      </SafeAreaView>
    </StoryScreen>
  );
};
export default HomeScreen;
