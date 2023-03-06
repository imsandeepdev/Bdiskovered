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
  ActivityIndicator,
  
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
  purchaseErrorListener,
  purchaseUpdatedListener,
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
import axios from 'axios';
import { InAppPaymentRequest } from '../../actions/inAppPayment.action';
import { Config } from '../../config';
import { GetProfileDetailsRequest } from '../../actions/getProfile.action';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;



const SubscriptionScreen = props => {

  let purchaseUpdateSubscription=null;
  let purchaseErrorSubscription=null;
  
  const dispatch = useDispatch();
  const [modalPicker, setModalPicker] = useState(false);
  const [profileSubStatus, setProfileSubStatus] = useState(0)
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
  const [selectForPurchase, setSelectForPurchase] = useState({});
  const [checkForPurchase, setCheckForPurchase] = useState('');
  const [restoreModal, setRestoreModal] = useState(false);
  const [inAppReceipt, setInAppReceipt] = useState('');
  const [inAppLoading, setInAppLoading] = useState(false)



  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onCallProfile();
    onCallCheckSubActive();
    onCallSubGetPlan();
    onCallgetSubGetPlan();
    initConnection();
    getSubscription();
    getProduct();
    return () => {
      endConnection();
    };

  }, [props.navigation]);




  const onCallInAppPurchase = (item) => {
    setLoading(true)
    console.log("ITEM OF SELECT PLAN",item)
    let data = {
      receiptdata: item?.transactionReceipt,
      amount: selectForPurchase.price,
      plan_type:
        item?.productId == 'addon.connections' ||
        item?.productId == 'addon.boost'
          ? 'Custom'
          : '',
      type:
        selectForPurchase.plan == 'SubScription_Plan'
          ? ''
          : selectForPurchase.plan,
    };
    console.log("Data Log ===>",data)
    axios
      .post(
        `${Config.API_URL}${Config.inAppPurchaseAPI}`,
        {data},
        {
          headers: {
            token: props.authToken,
          },
        },
      )
      .then(response => {
        console.log('Response Post', response.data);
        console.log('Response Post status', response);

        if (response.data.status == 'success') {
          onCallProfile();
          onCallCheckSubActive();
          onCallSubGetPlan();
          onCallgetSubGetPlan();
        } else {
          Toast.show(response.data?.message, Toast.SHORT);
          setLoading(false);
          setModalPicker(false);
        }
      });
      
   

  }

  const onCallProfile = () => {
    setLoading(true)
    dispatch(
      GetProfileDetailsRequest(response => {
        console.log(
          'PROFILE DETAIL ON APP NAVIGATOR',
          response.Profile?.subscription,
        );
          setProfileSubStatus(response.Profile?.subscription),
            response.Profile?.subscription != 0
              ? setCheckSubActive(true)
              : setCheckSubActive(false);
            setLoading(false);
      }),
    );
  };

  const restorePurchase = async () => {
    setLoading(true)
    try{
      const availablePurchases = await getAvailablePurchases();
      console.log('AVAILABLE PURCHASE RESPONSE', availablePurchases);

    if (availablePurchases.length > 0) {
      const sortedAvailablePurchases = availablePurchases.sort(
        (a, b) => b.transactionDate - a.transactionDate,
      );
      const latestAvailableReceipt =
        sortedAvailablePurchases[0].transactionReceipt;
      console.log('latestAvailableReceipt_RESPONSE', latestAvailableReceipt);
      setLoading(false);

      onCallRestorePuchaseAPI(latestAvailableReceipt);
    }
    }
    catch(err){
      console.log("Error",err)
      setLoading(false)
    }
  }

  const onCallRestorePuchaseAPI = transactionReceipt => {

    let data = {
      "receiptdata": transactionReceipt,
    };
    console.log('RestoreData',data)
     axios
       .post(
         `${Config.API_URL}${Config.restorePurchaseAPI}`,
         {data},
         {
           headers: {
             token: props.authToken,
           },
         },
       )
       .then(response => {
         console.log('Restore Response Post', response.data);
          if(response.data.message == 'true')
          {
            console.log("You have no subscription plan Please Purchase our Subscription")
            setRestoreModal();
          }
          else
          {
            onCallProfile();
            onCallCheckSubActive();
            onCallSubGetPlan();
            onCallgetSubGetPlan();
          }
          setLoading(false);
        
       });

  };

  const getSubscription = async () => {
    setInAppLoading(true)
    try {
    

      let sku =
        props.userType == 'Talent'
          ? 'talentuser.monthly'
          : (props.userType == 'Business'
          ? 'Businessuser.monthly'
          : 'vieweruser.monthly');
      const subscription = await getSubscriptions({skus: [sku]});
      console.log(' Subscription Products => ', subscription);
      setSubGetPlan(subscription);
      setInAppLoading(false);

    } catch (err) {
      console.warn('Error in getSubscriptions: ', err.code, err.message);
     setInAppLoading(false);
    }
  };

  const getProduct = async () => {
    setInAppLoading(true);
    try{
    
      let skus =
        props.userType == 'Talent'
          ? ['addon.connections', 'addon.boost']
          : ['addon.connections'];
      const products = await getProducts({skus});
      console.log('Addon Products => ', products);
      let sortedProduct = products.sort(
        (a, b) => a.price > b.price
      );
      setGetCustomPlan(sortedProduct);
      setInAppLoading(false);
    } catch(err) {
       console.warn('Error in add-On: ', err.code, err.message);
      setInAppLoading(false);
    }
    

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
            response?.description?.feature_5,
            // props.userType == '!Talent'
            //   ? response?.description?.feature_5
            //   : response?.description?.feature_6,
            // props.userType == '!Talent' && response?.description?.feature_6,
            response?.description?.feature_6,
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
            response.data[0]?.description[0]?.feature_5,
            // props.userType == '!Talent'
            //   ? response.data[0]?.description[0]?.feature_5
            //   : response.data[0]?.description[0]?.feature_6,
            // props.userType == '!Talent' && response.data[0]?.description[0]?.feature_6,
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

  

  const onCheckModal = item => {
    console.log('ADD ON PLAN', item);
    
    setAddOnPlanDetail(item);
    if (profileSubStatus != 0) {
      setCheckForPurchase('AddOn');
      setSelectForPurchase({
        ...item,
        plan: item?.productId == 'addon.boost' ? 'boost' : 'connection',
      });
      setCheckForPurchase('AddOn');
      setCustomModalPicker(true);
    } else {
      setAlartModalPicker(true);
    }
  };

  const onOpenPaymentModal = item => {
    console.log('ITEM', item);
    setSubPlanItem(item);
    setSelectForPurchase({...item, plan:'SubScription_Plan'});
    setCheckForPurchase('SubScription');

    setModalPicker(true);
  };

  const onCallAddOnPackage = async() => {
      setCustomModalPicker(false);
      try{
      setLoading(true)   
      let addOnData = await requestPurchase({
        sku: selectForPurchase?.productId,
      });
      console.log("AddOnData",addOnData)
      if (addOnData?.transactionReceipt != '')
      {
      onCallInAppPurchase(addOnData);
      }
      setLoading(false);
      }
      catch(err){
        console.log("Error",err)
        setLoading(false);
      }  
  };

  const onCallSubscriptionPackage = async () => {
      let skus = props.userType == 'Talent'
        ? 'talentuser.monthly'
        : props.userType == 'Business'
        ? 'Businessuser.monthly'
        : 'vieweruser.monthly';
      setModalPicker(false);
      try{
        setLoading(true);
        let subData = await requestSubscription({
          sku: skus,
        });
        console.log('SubData', subData);
        if (subData?.transactionReceipt != '') {
          onCallInAppPurchase(subData);
        }
        setLoading(false);        
      } catch (err) {
        console.log('Error',err)
        setLoading(false)
      }
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
              {profileSubStatus != 0 && (
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
                                    numberOfLines={3}>
                                    {`${item}`}
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
                            height: R.fontSize.Size18,
                            width: R.fontSize.Size18,
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

              {
                inAppLoading ? 
                <View style={{position:'absolute', top: screenHeight/2.7, bottom:0, left:0,right:0}}>
                  <ActivityIndicator size={'large'} color={R.colors.appColor}/>
                </View> 
                : 
              
              <View style={{marginTop: R.fontSize.Size45}}>
                {profileSubStatus == 0 && (
                  <View>
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
                          disabled={checkSubActive}
                          disabledIcon={!checkSubActive ? true : false}
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
                          onPressIcon={() => {
                            Toast.show(
                              'Subscription Already Taken',
                              Toast.SHORT,
                            );
                          }}
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
                  </View>
                )}

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
                      month={item?.title == '1 Boost' ?`${item?.title}` :`${item?.title}s`}
                      onPressAdd={() => onCheckModal(item)}
                    />
                  );
                })}
              </View>
              }

              {
              profileSubStatus == 0 &&
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginBottom: R.fontSize.Size20,
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontFamily: R.fonts.regular,
                      fontSize: R.fontSize.Size14,
                      color: R.colors.placeholderTextColor,
                    }}>{`If You have already subscription plan`}</Text>
                  <Pressable
                    onPress={() => restorePurchase()}
                    style={({pressed}) => [
                      {
                        marginTop: R.fontSize.Size5,
                        opacity: pressed ? 0.5 : 1,
                        height: R.fontSize.Size35,
                        width: R.fontSize.Size150,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        color: R.colors.placeHolderColor,
                        fontWeight: '500',
                      }}>
                      {'Restore Purchase'}
                    </Text>
                  </Pressable>
                </View>
              </View>
              } 
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
                    onPress={() => onCallSubscriptionPackage()}
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
        title={`Add-on services can only be purchased by customers who have an active subscription plan.`}
        onPress={() => setAlartModalPicker(false)}
      />

      <AlartModal
        visible={customModalPicker}
        onRequestClose={() => setCustomModalPicker(false)}
        title={`Your Add-on plan will expire on ${expDate} ${expMonth}`}
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
      <AlartModal
        visible={restoreModal}
        onRequestClose={() => setRestoreModal(false)}
        title={`There are no subscription plan available \nto restore at this time.`}
        onPress={() => setRestoreModal(false)}
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
