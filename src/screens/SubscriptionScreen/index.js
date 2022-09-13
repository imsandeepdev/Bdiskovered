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
  Modal,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  CustomTextInput,
  StoryScreen,
  AppButton,
  Header,
  ShadowHeader,
  CustomCardView,
  CustomCardLine,
  SubscriptionCard,
} from '../../components';

import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;


const paymentList = [
  {
    id: '1',
    title: 'View Profile Talent',
  },
  {
    id: '2',
    title: 'Get 20 Connections',
  },
  {
    id: '3',
    title: 'Multiple location access',
  },
  {
    id: '4',
    title: '1 month add free',
  },
  {
    id: '5',
    title: 'Advance search filter',
  },
  {
    id: '6',
    title: 'Access 2 device',
  },
];


const SubscriptionScreen = props => {
  const [modalPicker, setModalPicker] = useState(false);

  const onCallPayment = () => {
    setModalPicker(false)
    props.navigation.navigate('CardScreen');
  }
  
  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
        />
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              marginHorizontal: R.fontSize.Size20,
            }}>
            <View style={{flex: 1}}>
              <View style={{marginTop: R.fontSize.Size45}}>
                <Text>{'Your Balance'}</Text>
                <View
                  style={{
                    marginTop: R.fontSize.Size30,
                    paddingTop: R.fontSize.Size10,
                    paddingBottom: R.fontSize.Size5,
                    paddingHorizontal: R.fontSize.Size20,
                    borderWidth: R.fontSize.Size2,
                    borderRadius: R.fontSize.Size8,
                    borderColor: R.colors.appColor,
                    backgroundColor: R.colors.white,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: R.fontSize.Size10,
                    }}>
                    <View
                      style={{
                        width: screenWidth / 5,
                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size14,
                          color: R.colors.primaryTextColor,
                          fontWeight: '700',
                        }}
                        numberOfLines={1}>
                        {'Valid Till'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size35,
                          color: R.colors.appColor,
                          fontWeight: '700',
                        }}
                        numberOfLines={1}>
                        {'4th'}
                      </Text>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size14,
                          color: R.colors.primaryTextColor,
                          fontWeight: '400',
                        }}
                        numberOfLines={1}>
                        {'September'}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginHorizontal: R.fontSize.Size10,
                        height: R.fontSize.Size80,
                        width: 1,
                        backgroundColor: R.colors.placeholderTextColor,
                      }}
                    />

                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            textAlign: 'center',
                            fontSize: R.fontSize.Size18,
                            fontWeight: '700',
                            color: R.colors.appColor,
                          }}>
                          {'10'}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: R.fonts.regular,
                            textAlign: 'center',
                            fontSize: R.fontSize.Size18,
                            fontWeight: '400',
                            color: R.colors.primaryTextColor,
                          }}
                          numberOfLines={1}>
                          {'Connections'}
                        </Text>
                        <TouchableOpacity style={{padding: R.fontSize.Size5}}>
                          <Image
                            source={R.images.activeAddIcon}
                            style={{
                              height: R.fontSize.Size10,
                              width: R.fontSize.Size10,
                            }}
                            resizeMode={'contain'}
                          />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            textAlign: 'center',
                            fontSize: R.fontSize.Size18,
                            fontWeight: '700',
                            color: R.colors.appColor,
                          }}>
                          {'2'}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: R.fonts.regular,
                            textAlign: 'center',
                            fontSize: R.fontSize.Size18,
                            fontWeight: '400',
                            color: R.colors.primaryTextColor,
                          }}
                          numberOfLines={1}>
                          {'Boots'}
                        </Text>
                        <TouchableOpacity style={{padding: R.fontSize.Size5}}>
                          <Image
                            source={R.images.activeAddIcon}
                            style={{
                              height: R.fontSize.Size10,
                              width: R.fontSize.Size10,
                            }}
                            resizeMode={'contain'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: R.fontSize.Size15,
                    }}>
                    <Pressable style={{padding: R.fontSize.Size5}}>
                      <Image
                        source={R.images.chevronDown}
                        style={{
                          height: R.fontSize.Size5,
                          width: R.fontSize.Size8,
                        }}
                        resizeMode={'contain'}
                      />
                    </Pressable>
                  </View>
                </View>
              </View>

              {/* Subscription Selection */}

              <View style={{marginTop: R.fontSize.Size45}}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.primaryTextColor,
                    fontSize: R.fontSize.Size15,
                    fontWeight: '400',
                  }}
                  numberOfLines={1}>
                  {'Subscription Selection'}
                </Text>
                <Text
                  style={{
                    marginTop: R.fontSize.Size10,
                    fontFamily: R.fonts.regular,
                    color: R.colors.primaryTextColor,
                    fontSize: R.fontSize.Size18,
                    fontWeight: '700',
                  }}>
                  {'Choose a subscription plan'}
                </Text>

                <SubscriptionCard
                  marginTop={R.fontSize.Size28}
                  topTitle={
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontWeight: '700',
                        fontSize: R.fontSize.Size14,
                        color: R.colors.primaryTextColor,
                        marginTop: R.fontSize.Size20,
                      }}>
                      {'One Month Subscription'}
                    </Text>
                  }
                  price={'59$'}
                  month={'Month'}
                  onPressAdd={() => setModalPicker(true)}
                />
                <SubscriptionCard
                  borderWidth={R.fontSize.Size2}
                  marginTop={R.fontSize.Size45}
                  price={'30$'}
                  noText={'5'}
                  month={'Connections'}
                  onPressAdd={() => setModalPicker(true)}
                />
                <SubscriptionCard
                  borderWidth={R.fontSize.Size2}
                  marginTop={R.fontSize.Size20}
                  price={'10$'}
                  noText={'1'}
                  month={'Boost'}
                  onPressAdd={() => setModalPicker(true)}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      <Modal
        visible={modalPicker}
        transparent={true}
        onRequestClose={() => setModalPicker(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: R.colors.modelBackground,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: screenHeight / 1.6,
              backgroundColor: R.colors.white,
              borderTopLeftRadius: R.fontSize.Size8,
              borderTopRightRadius: R.fontSize.Size8,
              paddingVertical: R.fontSize.Size30,
            }}>
            <View
              style={{
                flexDirection: 'row-reverse',
                marginHorizontal: R.fontSize.Size20,
              }}>
              <Pressable
                onPress={() => setModalPicker(false)}
                style={({pressed}) => [
                  {
                    padding: R.fontSize.Size6,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}>
                <Image
                  source={R.images.cancleIcon}
                  style={{height: R.fontSize.Size10, width: R.fontSize.Size10}}
                  resizeMode={'contain'}
                />
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: R.fontSize.Size20,
                }}>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Image
                    source={R.images.makePaymentIcon}
                    style={{
                      height: R.fontSize.Size220,
                      width: R.fontSize.Size250,
                    }}
                    resizeMode={'contain'}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      color: R.colors.primaryTextColor,
                      fontWeight: '700',
                      fontSize: R.fontSize.Size18,
                      textAlign: 'center',
                      marginTop: R.fontSize.Size30,
                    }}>
                    {`Get connections and boost to grow\n your reach beyond whatyou ever have`}
                  </Text>
                  <View
                    style={{
                      marginTop: R.fontSize.Size20,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                    }}>
                    {paymentList.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: R.fontSize.Size20,
                            marginBottom: R.fontSize.Size15,
                          }}>
                          <View
                            style={{
                              height: R.fontSize.Size10,
                              width: R.fontSize.Size10,
                              borderRadius: R.fontSize.Size5,
                              backgroundColor: R.colors.appColor,
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size14,
                              fontWeight: '700',
                              color: R.colors.primaryTextColor,
                              marginLeft: R.fontSize.Size5,
                            }}>
                            {item?.title}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View>
                  <AppButton
                    onPress={() => onCallPayment()}
                    title={'Make Payment'}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </StoryScreen>
  );
};
export default SubscriptionScreen;
