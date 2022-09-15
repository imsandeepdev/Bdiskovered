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
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import {CustomTextInput, StoryScreen, AppButton, Header, ShadowHeader, CustomCardView, CustomCardLine, VideoCard, CustomLineTextInput} from '../../components';
// import Video from 'react-native-video';
import R from '../../res/R';
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;

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

const SuggestedList = [
  {
    id: '1',
    url: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
  },
  {
    id: '2',
    url: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
  },
  {
    id: '3',
    url: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
  },
  {
    id: '4',
    url: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
  },
];


const TailentList = [
  {
    id: '1',
    name: 'Music',
  },
  {
    id: '2',
    name: 'Dance',
  },
  {
    id: '3',
    name: 'Fashion',
  },
  {
    id: '4',
    name: 'Music',
  },
  
];

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

const CustomHeading = (props) => {
  return (
    <View
      style={{
        marginTop: R.fontSize.Size45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: R.fontSize.Size20,
      }}>
      <Text
        style={{
          fontFamily: R.fonts.regular,
          fontSize: R.fontSize.Size18,
          fontWeight: '700',
          color: R.colors.primaryTextColor,
        }}>
        {props.leftTitle}
      </Text>
      <Pressable
        onPress={props.rightOnPress}
        style={({pressed}) => [
          {
            padding: R.fontSize.Size4,
            opacity: pressed ? 0.5 : 1,
          },
        ]}>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size12,
            color: R.colors.appColor,
            fontWeight: '700',
          }}>
          {props.buttonTitle}
        </Text>
      </Pressable>
    </View>
  );
}

const HomeScreen = (props) => {


  const [modalPicker, setModalPicker] = useState(false);
  const [modalType, setModalType] = useState('')
  const [tailentList, setTailentList] = useState([
    {
      id: '1',
      name: 'Music',
    },
    {
      id: '2',
      name: 'Dance',
    },
    {
      id: '3',
      name: 'Fashion',
    },
    {
      id: '4',
      name: 'Music',
    },
  ]);

  useEffect(()=>{
      let arr = tailentList.map((item, index) => {
        item.selected = false;
        return {...item};
      });
      console.log('ARRNEWITEM', arr);
      setTailentList(arr);
  },[props.navigation])

   const onCallSelectedTailent = (item, ind) => {
     const dummyData = tailentList;
     let arr = dummyData.map((item, index) => {
       if (ind == index) {
         item.selected = !item.selected;
       }
       return {...item};
     });
     console.log('arr return', arr);
     setTailentList(arr);
   };

  const onCallModal = (type) => {
    setModalType(type)
    setModalPicker(true);
  }

  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.toggleDrawer()}
          leftSource={R.images.menuIcon}
          rightSource={R.images.filterIcon}
          rightSourceOnPress={() => onCallModal('filterModal')}
          rightSource2={R.images.bellIcon}
          rightSourceOnPress2={() => console.log('Bell')}
        />
        <View style={{flex: 1}}>
          <FlatList
            style={{flex: 1}}
            nestedScrollEnabled
            ListHeaderComponent={
              <View>
                <CustomHeading
                  leftTitle={'Connected User'}
                  buttonTitle={'View All'}
                  rightOnPress={() => console.log('view')}
                />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      marginTop: R.fontSize.Size30,
                      flexDirection: 'row',
                      marginHorizontal: R.fontSize.Size20,
                    }}>
                    {ConnectedUsers.map((item, index) => {
                      return (
                        <View key={index} style={Styles.connectedUserMainView}>
                          <View style={Styles.connectedUserView}>
                            <Image
                              source={{
                                uri: item?.source,
                              }}
                              style={Styles.connectedUserImage}
                              resizeMode={'cover'}
                            />
                          </View>
                          <Text
                            style={Styles.connectedUserText}
                            numberOfLines={1}>
                            {item?.name}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
                <CustomHeading
                  leftTitle={'Most Popular'}
                  buttonTitle={'View All'}
                  rightOnPress={() => console.log('view')}
                />

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      marginTop: R.fontSize.Size30,
                      flexDirection: 'row',
                      marginHorizontal: R.fontSize.Size20,
                    }}>
                    {PopularList.map((item, index) => {
                      return (
                        <View key={index} style={Styles.connectedUserMainView}>
                          <View style={Styles.mostPopularView}>
                            <Image
                              source={{
                                uri: item?.videoImg,
                              }}
                              style={Styles.mostPopularImage}
                              resizeMode={'cover'}
                            />
                          </View>
                          <View style={Styles.mostPopularBottomView}>
                            <Image
                              source={{uri: item.source}}
                              style={Styles.mostPopularBottomImage}
                              resizeMode={'cover'}
                            />
                            <Text
                              style={Styles.mostPopularBottomText}
                              numberOfLines={1}>
                              {item?.name}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
                <CustomHeading leftTitle={'Suggested Post'} />
              </View>
            }
            data={SuggestedList}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    marginTop: R.fontSize.Size30,
                    height: screenHeight / 2.5,
                  }}>
                  <VideoCard
                    eyeonPress={() => onCallModal('videoDetailModal')}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: R.fontSize.Size20,
                      marginHorizontal: R.fontSize.Size12,
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size12,
                            fontWeight: '700',
                            color: R.colors.placeHolderColor,
                          }}>
                          {'Liked By '}
                          <Text style={{color: R.colors.appColor}}>
                            {'455'}
                          </Text>
                        </Text>
                        <View
                          style={{
                            width: 1,
                            height: R.fontSize.Size14,
                            backgroundColor: R.colors.placeHolderColor,
                            marginHorizontal: R.fontSize.Size10,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size12,
                            fontWeight: '700',
                            color: R.colors.placeHolderColor,
                          }}>
                          {'Average Like '}
                          <Text style={{color: R.colors.appColor}}>
                            {'82%'}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginHorizontal: R.fontSize.Size15,
                        alignItems: 'center',
                      }}>
                      <Image
                        source={R.images.greyAppIcon}
                        style={{
                          height: R.fontSize.Size30,
                          width: R.fontSize.Size30,
                        }}
                        resizeMode={'contain'}
                      />
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size12,
                          fontWeight: '400',
                          color: R.colors.placeHolderColor,
                        }}
                        numberOfLines={1}>
                        {'Connect'}
                      </Text>
                    </View>
                  </View>
                  {/* <Image
                    source={{
                      uri: 'https://www.adgully.com/img/800/202003/mahabharat.png.jpg',
                    }}
                    style={{height: screenHeight / 2, width: '100%'}}
                    resizeMode={'cover'}
                  /> */}
                </View>
              );
            }}
          />
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
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: R.fontSize.Size20,
                    }}>
                    {modalType == 'filterModal' ? (
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size18,
                            fontWeight: '700',
                            color: R.colors.primaryTextColor,
                          }}>
                          {'Filter'}
                        </Text>

                        <View
                          style={{flex: 1, marginVertical: R.fontSize.Size20}}>
                          <CustomCardLine
                            onPress={() => console.log('down')}
                            title={'35 - 50 $'}
                            rightIcon={R.images.chevronDown}
                          />
                          <CustomLineTextInput placeholder={'Location'} />

                          <CustomCardLine
                            onPress={() => console.log('down')}
                            title={'Age 25 - 35'}
                            rightIcon={R.images.chevronDown}
                          />

                          <View
                            style={{
                              flexWrap: 'wrap',
                              flexDirection: 'row',
                              paddingVertical: R.fontSize.Size10,
                            }}>
                            {tailentList.map((item, index) => {
                              return (
                                <Pressable
                                  onPress={() =>
                                    onCallSelectedTailent(item, index)
                                  }
                                  key={index}
                                  style={({pressed}) => [
                                    {
                                      marginTop: R.fontSize.Size6,
                                      paddingHorizontal: R.fontSize.Size15,
                                      paddingVertical: R.fontSize.Size5,
                                      borderRadius: R.fontSize.Size8,
                                      backgroundColor: item.selected
                                        ? R.colors.appColor
                                        : R.colors.placeholderTextColor,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      marginRight: R.fontSize.Size10,
                                      opacity: pressed ? 0.5 : 1,
                                    },
                                  ]}>
                                  <Text
                                    style={{
                                      fontFamily: R.fonts.regular,
                                      color: item.selected
                                        ? R.colors.white
                                        : R.colors.placeHolderColor,
                                      fontSize: R.fontSize.Size14,
                                      fontWeight: '400',
                                    }}>
                                    {item?.name}
                                  </Text>
                                </Pressable>
                              );
                            })}
                          </View>
                          <CustomCardLine
                            onPress={() => console.log('down')}
                            title={'Above 3.5 Stars'}
                            rightIcon={R.images.chevronDown}
                          />
                        </View>
                      </View>
                    ) : (
                      <View style={{flex: 1}}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View
                            style={{
                              height: R.fontSize.Size30,
                              width: R.fontSize.Size30,
                              overflow: 'hidden',
                              borderRadius: R.fontSize.Size20,
                            }}>
                            <Image
                              source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3JYxD4c-TLNXds0sV9Nie80zzS_TxeWapkUpNrSVC1TxN5rzzsZjCOMzVfXkh2xYOvY&usqp=CAU',
                              }}
                              style={{
                                height: R.fontSize.Size30,
                                width: R.fontSize.Size30,
                              }}
                              resizeMode={'cover'}
                            />
                          </View>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size24,
                              fontWeight: '700',
                              color: R.colors.primaryTextColor,
                              flex: 1,
                              marginHorizontal: R.fontSize.Size14,
                            }}>
                            {'Video Title Heading'}
                          </Text>
                        </View>
                        <View style={{marginTop: R.fontSize.Size30}}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size12,
                              fontWeight: '400',
                              color: R.colors.primaryTextColor,
                            }}>
                            {`Video description Video descriptionVideo descriptionVidVideo description Video description Video description   `}
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
                          {tailentList.map((item, index) => {
                            return (
                              <View
                                key={index}
                                style={{
                                  alignItems: 'center',
                                  marginRight: R.fontSize.Size14,
                                  justifyContent: 'center',
                                  paddingHorizontal: R.fontSize.Size20,
                                  paddingVertical: R.fontSize.Size6,
                                  backgroundColor:
                                    R.colors.placeholderTextColor,
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
                                  {item.name}
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
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>

            <View style={{paddingVertical: R.fontSize.Size10}}>
              <AppButton
                title={modalType == 'filterModal' ? 'Apply' : 'Connect Now'}
                marginHorizontal={R.fontSize.Size55}
              />
            </View>
          </View>
        </View>
      </Modal>
    </StoryScreen>
  );
};
export default HomeScreen;
