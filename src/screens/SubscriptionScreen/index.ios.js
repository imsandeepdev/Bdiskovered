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
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
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
  AlartModal,
} from '../../components';
import {connect, useDispatch} from 'react-redux';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import RNIap, {
  endConnection,
  finishTransaction,
  getAvailablePurchases,
  getProducts,
  getSubscriptions,
  initConnection,
  requestPurchase,
  requestSubscription,
  validateReceiptIos,
} from 'react-native-iap';

import R from '../../res/R';
import {
  GetCustomPlanRequest,
  GetSubscruberGetRequest,
  SubscriberGetPlanRequest,
} from '../../actions/subGetPlan.action';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const SubscriptionScreen = props => {
  const dispatch = useDispatch();
  const [modalPicker, setModalPicker] = useState(false);
  const [customModalPicker, setCustomModalPicker] = useState(false);

  const [alartModalPicker, setAlartModalPicker] = useState(false);
  const [subGetPlan, setSubGetPlan] = useState([]);
  const [getPlanDesc, setGetPlanDesc] = useState([]);
  const [getCustomPlan, setGetCustomPlan] = useState([]);
  const [getSubData, setGetSubData] = useState({});
  const [getSubDesc, setGetSubDesc] = useState([]);
  const [getSubDescActive, setGetSubDescActive] = useState(false);
  const [checkSubActive, setCheckSubActive] = useState(true);
  const [subPlanItem, setSubPlanItem] = useState({});
  const [expDate, setExpDate] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [addOnPlanDetail, setAddOnPlanDetail] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onCallCheckSubActive();
    onCallSubGetPlan();
    onCallgetSubGetPlan();
    initConnections();
    getSubscription();
    getProduct();
    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
      endConnection();
    };
  }, [props.navigation]);

  const initConnections = () => {
    initConnection().then(() => {
      purchaseUpdateSubscription = purchaseUpdatedListener(purchase => {
        console.log('purchaseUpdatedListener', purchase);
        alert(JSON.stringify(purchase))
        const receipt = purchase.transactionReceipt;
        // console.warn('purchasereceipt', receipt);

        if (receipt) {
          const receiptBody = {
            'receipt-data': purchase.transactionReceipt,
            password: '081abc43e0594051bf41bb24f97cbb2c', // app shared secret, can be found in App Store Connect
          };

          // locally validation through in-app-purchases

          validateReceiptIos(receiptBody, false)
            .then(async result => {
              if (isSuccess(deliveryResult)) {
                // Tell the store that you have delivered what has been paid for.
                // Failure to do this will result in the purchase being refunded on Android and
                // the purchase event will reappear on every relaunch of the app until you succeed
                // in doing the below. It will also be impossible for the user to purchase consumables
                // again until you do this.
                // If consumable (can be purchased again)
                await finishTransaction({purchase, isConsumable: true});
                // If not consumable
                await finishTransaction({purchase, isConsumable: false});
              } else {
                // Retry / conclude the purchase is fraudulent, etc...
              }
            })
            .catch(err => {
              console.log('====> ', err.message);
            });

          // for web end through apis

          // yourAPI
          //   .deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
          //   .then(async deliveryResult => {
          //     if (isSuccess(deliveryResult)) {
          //       // Tell the store that you have delivered what has been paid for.
          //       // Failure to do this will result in the purchase being refunded on Android and
          //       // the purchase event will reappear on every relaunch of the app until you succeed
          //       // in doing the below. It will also be impossible for the user to purchase consumables
          //       // again until you do this.
          //       // If consumable (can be purchased again)
          //       await finishTransaction({purchase, isConsumable: true});
          //       // If not consumable
          //       await finishTransaction({purchase, isConsumable: false});
          //     } else {
          //       // Retry / conclude the purchase is fraudulent, etc...
          //     }
          //   });
        }
      });

      purchaseErrorSubscription = purchaseErrorListener(error => {
        console.warn('purchaseErrorListener', error);
      });
    });
  };

  const restorePurchase = async () => {
    const availablePurchases = await getAvailablePurchases();
    if (availablePurchases.length > 0) {
      const sortedAvailablePurchases = availablePurchases.sort(
        (a, b) => b.transactionDate - a.transactionDate,
      );
      const latestAvailableReceipt =
        sortedAvailablePurchases[0].transactionReceipt;
    }
  }

  const getSubscription = async () => {
    console.log('SUB IN APP');
    try {
      let sku =
        props.userType == 'Talent'
          ? 'talentuser.monthly'
          : 'viewer.business.monthly';
      const subscription = await getSubscriptions({skus: [sku]});
      console.log(' Subscription Products => ', subscription);
      setSubGetPlan(subscription);
    } catch (err) {
      console.warn('Error in getSubscriptions: ', err.code, err.message);
    }
  };

  const getProduct = async () => {
    let skus =
      props.userType == 'Talent'
        ? ['addon.connections', 'addon.boost']
        : ['addon.connections'];
    const products = await getProducts({skus});
    console.log('Addon Products => ', products);
    setGetCustomPlan(products);
  };

  const onCallCheckSubActive = () => {
    setLoading(true);
    console.log(
      'SUB STATUS ON SCREEN',
      props.userProfile?.Profile?.subscription,
    );
    props.userProfile?.Profile?.subscription != 0
      ? setCheckSubActive(true)
      : setCheckSubActive(false);
    setLoading(false);
  };

  const onCallgetSubGetPlan = () => {
    setLoading(true);

    dispatch(
      GetSubscruberGetRequest(response => {
        console.log('GetSubGet Res', response);
        if (response.status == 'success') {
          let MonthList = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ];

          let dataFormat = response?.data?.exp_date;
          let ArrayDate = dataFormat.split('-');
          let monthIndex = ArrayDate[0];
          let tempDate = ArrayDate[1];
          console.log('Month Name', MonthList[monthIndex - 1]);
          setExpMonth(MonthList[monthIndex - 1]);
          console.log('ONLY DATE', tempDate);
          if (tempDate < 9) {
            setExpDate(`0${tempDate}`);
          } else {
            setExpDate(tempDate);
          }
          setGetSubData(response?.data);
          console.log('DATE', response?.data?.exp_date);

          setGetSubDesc([
            response?.description?.feature_1,
            response?.description?.feature_2,
            response?.description?.feature_3,
            response?.description?.feature_4,
            props.userType == '!Talent'
              ? response?.description?.feature_5
              : response?.description?.feature_6,
            props.userType == '!Talent' && response?.description?.feature_6,
            response?.description?.feature_7,
            response?.description?.feature_8,
            response?.description?.feature_9,
            response?.description?.feature_10,
            response?.description?.feature_11,
            response?.description?.feature_12,
          ]);
          console.log('GETSUBDESC', getSubDesc);
          setLoading(false);
        }
      }),
    );
  };

  const onCallSubGetPlan = () => {
    setLoading(true);
    dispatch(
      SubscriberGetPlanRequest(response => {
        console.log('SUB GET PLAN RES', response);
        if (response.status == 'success') {
          //   setSubGetPlan(response.data);
          setGetPlanDesc([
            response.data[0]?.description[0]?.feature_1,
            response.data[0]?.description[0]?.feature_2,
            response.data[0]?.description[0]?.feature_3,
            response.data[0]?.description[0]?.feature_4,
            props.userType == '!Talent'
              ? response.data[0]?.description[0]?.feature_5
              : response.data[0]?.description[0]?.feature_6,
            props.userType == '!Talent' &&
              response.data[0]?.description[0]?.feature_6,
            response.data[0]?.description[0]?.feature_7,
            response.data[0]?.description[0]?.feature_8,
            response.data[0]?.description[0]?.feature_9,
            response.data[0]?.description[0]?.feature_10,
            response.data[0]?.description[0]?.feature_11,
            response.data[0]?.description[0]?.feature_12,
          ]);
          setLoading(false);
        } else {
          Toast.show(response.message, Toast.SHORT);
          setLoading(false);
        }
      }),
    );
  };

  const onCallPayment = () => {
    setModalPicker(false);
    props.navigation.navigate('CardScreen', {
      SubPlanItem: subPlanItem,
    });
  };

  const onCheckModal = item => {
    console.log('ADD ON PLAN', item);
    setAddOnPlanDetail(item);
    props.userProfile?.Profile?.subscription != 0
      ? setCustomModalPicker(true)
      : setAlartModalPicker(true);
  };

  const onOpenPaymentModal = item => {
    console.log('ITEM', item);
    setSubPlanItem(item);
    setModalPicker(true);
  };

  const onCallAddOnPackage = () => {
    console.log('PLANNAME', addOnPlanDetail?.plan_name);
    props.navigation.navigate('CardScreen', {
      SubPlanItem: {
        plan_name: addOnPlanDetail?.plan_name,
        price: addOnPlanDetail?.price,
        type: 'AddOn',
      },
    });
    setCustomModalPicker(false);
  };

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
              {/* {props.userProfile?.Profile?.subscription != 0 && (
                <View style={{marginTop: R.fontSize.Size45}}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size18,
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
                      paddingHorizontal: R.fontSize.Size10,
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
                        marginTop: R.fontSize.Size10,
                        justifyContent: 'space-between',
                      }}>
                    
                        <View
                          style={{
                            alignItems: 'center',
                            flex: 1,
                          }}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size15,
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
                            {expDate}
                          </Text>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size15,
                              color: R.colors.primaryTextColor,
                              fontWeight: '700',
                              textAlign: 'center',
                            }}
                            numberOfLines={1}>
                            {expMonth}
                          </Text>
                        </View>
                    

                      <View
                        style={{
                          justifyContent: 'flex-start',
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size15,
                            color: R.colors.primaryTextColor,
                            fontWeight: '700',
                            textAlign: 'center',
                          }}
                          numberOfLines={1}>
                          {'Connections'}
                        </Text>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            textAlign: 'center',
                            fontSize: R.fontSize.Size30,
                            fontWeight: '700',
                            color: R.colors.appColor,
                          }}>
                          {getSubData?.total_connection}
                        </Text>
                      </View>
                      {props.userType == 'Talent' && (
                        <View
                          style={{
                            alignItems: 'center',
                            flex: 1,
                          }}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size15,
                              color: R.colors.primaryTextColor,
                              fontWeight: '700',
                              textAlign: 'center',
                            }}
                            numberOfLines={1}>
                            {'Boost'}
                          </Text>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              textAlign: 'center',
                              fontSize: R.fontSize.Size30,
                              fontWeight: '700',
                              color: R.colors.appColor,
                            }}>
                            {getSubData?.boost}
                          </Text>
                        </View>
                      )}
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
              )} */}

              {/* Subscription Selection */}

              <View style={{marginTop: R.fontSize.Size45}}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    color: R.colors.primaryTextColor,
                    fontSize: R.fontSize.Size16,
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
                      disabledIcon={!checkSubActive ? true : false}
                      key={index}
                      marginTop={R.fontSize.Size28}
                      borderWidth={R.fontSize.Size2}
                      price={`${item?.currency} ${item?.price}`}
                      monthTextColor={
                        !checkSubActive
                          ? R.colors.primaryTextColor
                          : R.colors.placeholderTextColor
                      }
                      slashText={'/'}
                      slashTextColor={
                        !checkSubActive
                          ? R.colors.primaryTextColor
                          : R.colors.placeholderTextColor
                      }
                      month={'month'}
                      rightIcon={R.images.balaceIcon}
                      onPressAdd={() => onOpenPaymentModal(item)}
                    />
                  );
                })}

                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size18,
                    fontWeight: '700',
                    color: R.colors.primaryTextColor,
                    marginTop: R.fontSize.Size10,
                  }}>
                  {`Add-on`}
                </Text>
                {getCustomPlan.map((item, index) => {
                  return (
                    <SubscriptionCard
                      key={index}
                      borderWidth={R.fontSize.Size2}
                      DotValue={true}
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
                          ? R.colors.primaryTextColor
                          : R.colors.placeholderTextColor
                      }
                      rightIcon={
                        checkSubActive
                          ? R.images.plusIconOrage
                          : R.images.plusIconGrey
                      }
                      marginTop={R.fontSize.Size15}
                      price={`${item?.currency} ${item?.price}`}
                      month={item?.description}
                      onPressAdd={() => {
                        requestPurchase({
                          sku: item.productId,
                        });
                      }}
                    />
                  );
                })}
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
                                numberOfLines={2}>
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
                    onPress={() => {
                      let skus =
                        props.userType == 'Talent'
                          ? 'talentuser.monthly'
                          : 'viewer.business.monthly';
                      requestSubscription({
                        sku: skus,
                      });
                    }}
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
        title={`Your Add on plan will expire on ${expDate} ${expMonth}`}
        customButton={
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable
              onPress={() => setCustomModalPicker(false)}
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
              onPress={() => onCallAddOnPackage()}
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

export default connect(mapStateToProps)(SubscriptionScreen);
