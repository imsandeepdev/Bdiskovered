import * as React from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {CustomCardView, ShadowHeader, StoryScreen} from '../../components';
import R from '../../res/R';

const screenWidth = Dimensions.get('screen').width;

const persnalDetails = [
  {
    id: '1',
    title: 'Age 24',
  },
  {
    id: '2',
    title: 'Female',
  },
  {
    id: '3',
    title: 'Gurugram',
  },
];

const tailentDetails = [
  {
    id: '1',
    title: 'Music',
  },
  {
    id: '2',
    title: 'Dance',
  },
  {
    id: '3',
    title: 'Fashion',
  },
];

const timeDetails = [
  {
    id: '1',
    title: 'Gigs',
  },
  {
    id: '2',
    title: 'Full Time',
  },
  {
    id: '3',
    title: 'Internship',
  },
];

const ConnectedProfileScreen = props => {
  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          rightSource={R.images.chatIcon}
          rightSourceOnPress={() => console.log('chat')}
          marginRightSource={R.fontSize.Size6}
          rightTitle={
            <Text
              style={{
                marginRight: R.fontSize.Size10,
                color: R.colors.primaryTextColor,
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size14,
                fontWeight: '700',
              }}>
              {'Send Message'}
            </Text>
          }
          rightSource2={R.images.bellIcon}
          rightSourceOnPress2={() => console.log('Bell')}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
            <View
              style={{
                marginTop: R.fontSize.Size30,
                flexDirection: 'row',
                paddingVertical: R.fontSize.Size10,
              }}>
              <View style={{flex: 1, justifyContent: 'space-around'}}>
                <View
                  style={{
                    height: R.fontSize.Size40,
                    width: R.fontSize.Size40,
                    borderRadius: R.fontSize.Size25,
                    overflow: 'hidden',
                    borderWidth: 1,
                  }}>
                  <Image
                    source={{
                      uri: 'https://xsgames.co/randomusers/assets/avatars/male/63.jpg',
                    }}
                    style={{
                      height: R.fontSize.Size40,
                      width: R.fontSize.Size40,
                    }}
                    resizeMode={'cover'}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    fontWeight: '700',
                    color: R.colors.primaryTextColor,
                  }}
                  numberOfLines={1}>
                  {'Random Name'}
                </Text>
              </View>
              <View
                style={{
                  height: R.fontSize.Size80,
                  width: 1,
                  backgroundColor: R.colors.placeholderTextColor,
                }}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size24,
                    fontWeight: '700',
                    color: R.colors.primaryTextColor,
                  }}
                  numberOfLines={1}>
                  {'7'}
                </Text>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    fontWeight: '700',
                    color: R.colors.primaryTextColor,
                  }}
                  numberOfLines={1}>
                  {'Posts'}
                </Text>
              </View>
            </View>
            <View style={{marginTop: R.fontSize.Size10}}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: R.colors.appColor,
                    paddingVertical: R.fontSize.Size8,
                    borderRadius: R.fontSize.Size8,
                    opacity: pressed ? 0.5 : 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <View
                  style={{
                    height: R.fontSize.Size10,
                    width: R.fontSize.Size10,
                    borderRadius: R.fontSize.Size10,
                    backgroundColor: R.colors.white,
                  }}
                />
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    color: R.colors.white,
                    fontWeight: '400',
                    marginHorizontal: R.fontSize.Size5,
                  }}>
                  {'Connected'}
                </Text>
              </Pressable>
            </View>
            <View style={{marginTop: R.fontSize.Size30}}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size12,
                  fontWeight: '400',
                  color: R.colors.primaryTextColor,
                }}>
                {`BioBioBioBioBioBioBioBioBioBioBioBiooBiooBiooBiooBioBioBioBioBioBioBioBioBioBioBioBioBiooBiooBiooBi`}
              </Text>
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: R.fontSize.Size30,
              }}>
              {persnalDetails.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: R.fontSize.Size14,
                    }}>
                    <View
                      style={{
                        height: R.fontSize.Size10,
                        width: R.fontSize.Size10,
                        backgroundColor: R.colors.appColor,
                        borderRadius: R.fontSize.Size10,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                        marginLeft: R.fontSize.Size8,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: R.fontSize.Size20,
              }}>
              {tailentDetails.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      alignItems: 'center',
                      marginRight: R.fontSize.Size14,
                      justifyContent: 'center',
                      paddingHorizontal: R.fontSize.Size20,
                      paddingVertical: R.fontSize.Size6,
                      backgroundColor: R.colors.placeholderTextColor,
                      borderRadius: R.fontSize.Size8,
                      marginBottom: R.fontSize.Size6,
                    }}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                        marginLeft: R.fontSize.Size8,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View style={{marginTop: R.fontSize.Size30}}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontWeight: '700',
                  fontSize: R.fontSize.Size18,
                  color: R.colors.primaryTextColor,
                }}>
                {'Available for :'}
              </Text>
            </View>

            <View
              style={{
                marginTop: R.fontSize.Size30,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                {timeDetails.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        alignItems: 'center',
                        marginRight: R.fontSize.Size10,
                        justifyContent: 'center',
                        paddingHorizontal: R.fontSize.Size20,
                        paddingVertical: R.fontSize.Size6,
                        backgroundColor: R.colors.appColor,
                        borderRadius: R.fontSize.Size8,
                        marginBottom: R.fontSize.Size6,
                      }}>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size14,
                          fontWeight: '700',
                          color: R.colors.white,
                          marginLeft: R.fontSize.Size8,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    fontWeight: '700',
                    color: R.colors.primaryTextColor,
                    alignItems: 'center',
                  }}>
                  {'35-50 $'}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: R.fontSize.Size45,
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {[1, 2, 3, 4, 5, 6].map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: screenWidth / 3.7,
                      height: screenWidth / 3,
                      backgroundColor: R.colors.placeholderTextColor,
                      borderRadius: R.fontSize.Size8,
                      margin: R.fontSize.Size5,
                    }}></View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </StoryScreen>
  );
};

export default ConnectedProfileScreen;
