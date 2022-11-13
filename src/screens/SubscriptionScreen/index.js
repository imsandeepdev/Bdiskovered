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
  AlartModal
} from '../../components';
import { connect, useDispatch } from 'react-redux';
import Toast from 'react-native-simple-toast';
import moment from 'moment';


import R from '../../res/R';
import { GetCustomPlanRequest, GetSubscruberGetRequest, SubscriberGetPlanRequest } from '../../actions/subGetPlan.action';
import { concat } from 'react-native-reanimated';
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

  const dispatch = useDispatch()
  const [modalPicker, setModalPicker] = useState(false);
  const [customModalPicker, setCustomModalPicker] = useState(false);

  const [alartModalPicker, setAlartModalPicker] = useState(false);
  const [subGetPlan, setSubGetPlan] = useState([])
  const [getPlanDesc, setGetPlanDesc] = useState([]);
  const [getCustomPlan, setGetCustomPlan] = useState([])
  const [getSubData, setGetSubData] = useState({})
  const [getSubDesc, setGetSubDesc] = useState([]);
  const [getSubDescActive, setGetSubDescActive] = useState(false)
  const [checkSubActive, setCheckSubActive] = useState(true)
  const [subPlanItem, setSubPlanItem] = useState({})
  const [expDate, setExpDate] = useState('')
  const [addOnPlanDetail,setAddOnPlanDetail] = useState({})

  const [loading, setLoading] = useState(false)

  useEffect(()=>{

    onCallCheckSubActive()
    onCallSubGetPlan()
    onCallGetCustomPlan()
    onCallgetSubGetPlan()
  },[props.navigation])


  const onCallCheckSubActive = () => {
    setLoading(true)
    console.log('SUB STATUS ON SCREEN', props.userProfile.Profile?.subscription);
    props.userProfile.Profile?.subscription != 0 ?
    setCheckSubActive(true) : setCheckSubActive(false)
    setLoading(false)
  }

  const onCallgetSubGetPlan = () => {
    dispatch(GetSubscruberGetRequest(response =>{
      console.log('GetSubGet Res',response)
      if(response.status == 'success')
      {
        
        setGetSubData(response?.data);
        setExpDate(response.data?.exp_date);
        setGetSubDesc([
          response?.description?.feature_1,
          response?.description?.feature_2,
          response?.description?.feature_3,
          response?.description?.feature_4,
          response?.description?.feature_5,
          response?.description?.feature_6,
          response?.description?.feature_7,
          response?.description?.feature_8,
          response?.description?.feature_9,
          response?.description?.feature_10,
          response?.description?.feature_11,
          response?.description?.feature_12,
        ]);
        console.log("GETSUBDESC",getSubDesc)
      }
    }))
  }

  const onCallSubGetPlan = () => {
    setLoading(true)
    dispatch(
      SubscriberGetPlanRequest(response => {
        console.log('SUB GET PLAN RES', response);
        if (response.status == 'success') {
          setSubGetPlan(response.data)
          setGetPlanDesc([
            response.data[0]?.description[0]?.feature_1,
            response.data[0]?.description[0]?.feature_2,
            response.data[0]?.description[0]?.feature_3,
            response.data[0]?.description[0]?.feature_4,
            response.data[0]?.description[0]?.feature_5,
            response.data[0]?.description[0]?.feature_6,
            response.data[0]?.description[0]?.feature_7,
            response.data[0]?.description[0]?.feature_8,
            response.data[0]?.description[0]?.feature_9,
            response.data[0]?.description[0]?.feature_10,
            response.data[0]?.description[0]?.feature_11,
            response.data[0]?.description[0]?.feature_12,
          ]);
          setLoading(false)
        }
        else
        {
          Toast.show(response.message, Toast.SHORT)
          setLoading(false)
        }
      }),
    );
  }

  const onCallGetCustomPlan = () => {
    setLoading(true);
    dispatch(
      GetCustomPlanRequest(response => {
        console.log('GET CUSTOM PLAN RES', response);
        if (response.status == 'success') {
          setGetCustomPlan(response.data)
          setLoading(false);
        } else {
          Toast.show(response.message, Toast.SHORT);
          setLoading(false);
        }
      }),
    );
  };

  const onCallPayment = () => {
    setModalPicker(false)
    props.navigation.navigate('CardScreen',{
      SubPlanItem: subPlanItem
    });
  }

  const onCheckModal = (item) => {
    console.log("ADD ON PLAN",item)
    setAddOnPlanDetail(item)
     props.userProfile.Profile?.subscription != 0 ?
     setCustomModalPicker(true) :
     setAlartModalPicker(true)
  }

  const onOpenPaymentModal = (item) => {
    console.log("ITEM",item)
    setSubPlanItem(item)
    setModalPicker(true);

  }

  const onCallAddOnPackage = () => {
    console.log('PLANNAME', addOnPlanDetail?.plan_name);
    props.navigation.navigate('CardScreen', {
      SubPlanItem: {plan_name:addOnPlanDetail?.plan_name ,price:addOnPlanDetail?.price, type:'AddOn'},
    });
    setCustomModalPicker(false);
  }
  
  return (
    <StoryScreen loading={loading}>
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
              {getSubDesc.length != 0 && (
                <View style={{marginTop: R.fontSize.Size45}}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size16,
                      fontWeight: '700',
                      color: R.colors.primaryTextColor,
                    }}>
                    {'Your Balance'}
                  </Text>
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
                            textAlign: 'center',
                          }}
                          numberOfLines={1}>
                          {moment(getSubData?.exp_date).format('Do')}
                        </Text>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size14,
                            color: R.colors.primaryTextColor,
                            fontWeight: '400',
                            textAlign: 'center',
                          }}
                          numberOfLines={1}>
                          {moment(getSubData?.exp_date).format('MMMM')}
                        </Text>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size14,
                            color: R.colors.primaryTextColor,
                            fontWeight: '400',
                            textAlign: 'center',
                          }}
                          numberOfLines={1}>
                          {moment(getSubData?.exp_date).format('YYYY')}
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
                            {getSubData?.total_connection}
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
                          {/* <TouchableOpacity style={{padding: R.fontSize.Size5}}>
                            <Image
                              source={R.images.activeAddIcon}
                              style={{
                                height: R.fontSize.Size10,
                                width: R.fontSize.Size10,
                              }}
                              resizeMode={'contain'}
                            />
                          </TouchableOpacity> */}
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
                            {getSubData?.boost}
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
                          {/* <TouchableOpacity style={{padding: R.fontSize.Size5}}>
                            <Image
                              source={R.images.activeAddIcon}
                              style={{
                                height: R.fontSize.Size10,
                                width: R.fontSize.Size10,
                              }}
                              resizeMode={'contain'}
                            />
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    </View>

                    {getSubDescActive && (
                      <View
                        style={{
                          paddingVertical: R.fontSize.Size10,
                          flexWrap: 'wrap',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        {getSubDesc.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                width: screenWidth / 2.6,
                                paddingBottom: R.fontSize.Size2,
                              }}>
                              {item != '' && (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <View
                                    style={{
                                      height: R.fontSize.Size10,
                                      width: R.fontSize.Size10,
                                      borderRadius: R.fontSize.Size6,
                                      backgroundColor: R.colors.appColor,
                                    }}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: R.fonts.regular,
                                      fontWeight: '400',
                                      color: R.colors.primaryTextColor,
                                      fontSize: R.fontSize.Size12,
                                      marginLeft: R.fontSize.Size10,
                                    }}
                                    numberOfLines={1}>
                                    {item}
                                  </Text>
                                </View>
                              )}
                            </View>
                          );
                        })}
                      </View>
                    )}

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: R.fontSize.Size15,
                      }}>
                      <Pressable
                        onPress={() => setGetSubDescActive(!getSubDescActive)}
                        style={({pressed}) => [
                          {
                            padding: R.fontSize.Size5,
                            opacity: pressed ? 0.5 : 1,
                            paddingHorizontal: R.fontSize.Size15,
                            paddingVertical: R.fontSize.Size10,
                          },
                        ]}>
                        <Image
                          source={R.images.chevronDown}
                          style={{
                            height: R.fontSize.Size5,
                            width: R.fontSize.Size8,
                            transform: [
                              {rotate: getSubDescActive ? '180deg' : '0deg'},
                            ],
                          }}
                          resizeMode={'contain'}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              )}

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

                {subGetPlan.map((item, index) => {
                  return (
                    <SubscriptionCard
                      disabled={checkSubActive}
                      key={index}
                      marginTop={R.fontSize.Size28}
                      borderWidth={R.fontSize.Size2}
                      borderColor={
                        !checkSubActive
                          ? R.colors.appColor
                          : R.colors.placeholderTextColor
                      }
                      priceTextColor={
                        !checkSubActive
                          ? R.colors.appColor
                          : R.colors.placeholderTextColor
                      }
                      // topTitle={
                      //   <Text
                      //     style={{
                      //       fontFamily: R.fonts.regular,
                      //       fontWeight: '700',
                      //       fontSize: R.fontSize.Size14,
                      //       color: R.colors.primaryTextColor,
                      //       marginTop: R.fontSize.Size20,
                      //     }}>
                      //     {item?.plan_name}
                      //   </Text>
                      // }
                      price={`${item?.price}`}
                      month={item?.validity}
                      rightIcon={R.images.balaceIcon}
                      onPressAdd={() => onOpenPaymentModal(item)}
                    />
                  );
                })}

                {getCustomPlan.map((item, index) => {
                  return (
                    <SubscriptionCard
                      key={index}
                      borderWidth={R.fontSize.Size2}
                      borderColor={
                        checkSubActive
                          ? R.colors.appColor
                          : R.colors.placeholderTextColor
                      }
                      priceTextColor={
                        checkSubActive
                          ? R.colors.appColor
                          : R.colors.placeholderTextColor
                      }
                      slashTextColor={
                        checkSubActive
                          ? R.colors.appColor
                          : R.colors.placeholderTextColor
                      }
                      noTextColor={
                        checkSubActive
                          ? R.colors.appColor
                          : R.colors.placeholderTextColor
                      }
                      monthTextColor={
                        checkSubActive
                          ? R.colors.appColor
                          : R.colors.placeholderTextColor
                      }
                      rightIcon={checkSubActive? R.images.plusIconOrage: R.images.plusIconGrey}
                      marginTop={R.fontSize.Size15}
                      price={`USD ${item?.price}`}
                      // noText={'5'}
                      month={item?.validity}
                      onPressAdd={() => onCheckModal(item)}
                    />
                  );
                })}
                {/* <SubscriptionCard
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
                /> */}
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
                      height: R.fontSize.Size200,
                      width: R.fontSize.Size220,
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
                      fontSize: R.fontSize.Size16,
                      textAlign: 'center',
                      marginTop: R.fontSize.Size15,
                    }}>
                    {`Get connections and Boosts \n to expand your reach.`}
                  </Text>
                  <View
                    style={{
                      marginTop: R.fontSize.Size20,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {getPlanDesc.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            width: screenWidth / 2.3,
                            paddingBottom: R.fontSize.Size4,
                          }}>
                          {item != '' && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  height: R.fontSize.Size12,
                                  width: R.fontSize.Size12,
                                  borderRadius: R.fontSize.Size6,
                                  backgroundColor: R.colors.appColor,
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: R.fonts.regular,
                                  fontWeight: '400',
                                  color: R.colors.primaryTextColor,
                                  fontSize: R.fontSize.Size14,
                                  marginLeft: R.fontSize.Size10,
                                }}
                                numberOfLines={1}>
                                {item}
                              </Text>
                            </View>
                          )}
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
      <AlartModal
        visible={alartModalPicker}
        onRequestClose={() => setAlartModalPicker(false)}
        title={`First buy the subscription plan after that you can buy add-on services.`}
        onPress={() => setAlartModalPicker(false)}
      />

      <AlartModal
        visible={customModalPicker}
        onRequestClose={() => setCustomModalPicker(false)}
        title={`Your Add on plan will expire on ${moment(getSubData?.exp_date).format('Do MMMM YYYY')}.`}
        customButton={
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable
              onPress={()=> setCustomModalPicker(false)}
              style={({pressed}) => [
                {
                  flex: 1,
                  marginVertical: R.fontSize.Size4,
                  backgroundColor: R.colors.appColor,
                  height: R.fontSize.Size45,
                  borderRadius: R.fontSize.Size8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.5 : 1,
                  marginHorizontal: R.fontSize.Size10,
                },
              ]}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  color: R.colors.white,
                  fontWeight: '700',
                  fontSize: R.fontSize.Size16,
                }}>
                {'Cancel'}
              </Text>
            </Pressable>
            <Pressable
              onPress={()=> onCallAddOnPackage()}
              style={({pressed}) => [
                {
                  flex: 1,
                  marginVertical: R.fontSize.Size4,
                  backgroundColor: R.colors.appColor,
                  height: R.fontSize.Size45,
                  borderRadius: R.fontSize.Size8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.5 : 1,
                  marginHorizontal: R.fontSize.Size10,
                },
              ]}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  color: R.colors.white,
                  fontWeight: '700',
                  fontSize: R.fontSize.Size16,
                }}>
                {'Proceed'}
              </Text>
            </Pressable>
          </View>
        }
      />
    </StoryScreen>
  );
};


const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps) (SubscriptionScreen);
