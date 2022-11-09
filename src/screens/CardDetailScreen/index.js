import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
  SafeAreaView,
  Modal,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import {
  CustomCardView,
  Header,
  StoryScreen,
  AppButton,
  CustomCardTextInput,
  PaymentScreen,
} from '../../components';
import CarouselCards from '../../components/CarouselCard';
import R from '../../res/R';
import {
  CardField,
  useStripe,
  initStripe,
  confirmPayment,
} from '@stripe/stripe-react-native';
import {Config} from '../../config';
import {connect, useDispatch} from 'react-redux';
import {
  CardDeleteRequest,
  CardListRequest,
  PayPaymentRequest,
  SaveCardRequest,
} from '../../actions/stripePayment.action';
import Toast from 'react-native-simple-toast';
import CommonFunctions from '../../utils/CommonFuntions';
import moment from 'moment';
import {PaymentIcon} from 'react-native-payment-icons';

const currentMonth = moment().format('MM');
const currentYear = moment().format('YYYY');
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const cardListData = [
  {
    id: '1',
    bankName: 'Axis Bank',
    cardNo: '2232332332232345',
    cardType: 'Credit Card',
    holderName: 'Sandeep',
    expDate: '08/33',
  },
  {
    id: '2',
    bankName: 'Axis Bank',
    cardNo: '2232332332232345',
    cardType: 'Credit Card',
    holderName: 'Sandeep',
    expDate: '08/33',
  },
  {
    id: '3',
    bankName: 'Axis Bank',
    cardNo: '2232332332232345',
    cardType: 'Credit Card',
    holderName: 'Sandeep',
    expDate: '08/33',
  },
];

const CardDetailScreen = props => {
  const dispatch = useDispatch();

  const stripe = useStripe();
  const name = 'sandeep';
  const [loading, setLoading] = useState(false);
  const [modalPicker, setModalPicker] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardVisible, setCardVisible] = useState(false);
  const [subPlanItem, setSubPlanItem] = useState({});
  const [stripeCardList, setStripeCardList] = useState([]);
  const [saveCardStatus, setSaveCardStatus] = useState(false);
  const cardNoRef = React.createRef();
  const cardholderNameRef = React.createRef();
  const cardCvvRef = React.createRef();
  const cardExpiryRef = React.createRef();

  useEffect(() => {
   
  }, [props.navigate]);

 
  const onCallPayment = () => {
    onCallValidCardPayment();
  };

  const onCheckValid = () => {
    return checkMonthLength() && checkExpYear();
  };

  const checkMonthLength = () => {
    let expMonth = cardExpiry.substring(0, 2);
    if (expMonth > 12) {
      CommonFunctions.showToast('Please Enter Valid Month');
      return false;
    }
    return true;
  };

  const checkExpYear = () => {
    let expMonth = cardExpiry.substring(0, 2);
    let expYear = cardExpiry.substring(3, 7);
    console.log(expMonth, expYear);
    console.log(currentYear);

    if (expYear < currentYear) {
      CommonFunctions.showToast('Please Enter Valid Exp Date');
      return false;
    } else if (expYear === currentYear) {
      if (expMonth < currentMonth) {
        CommonFunctions.showToast('Please Enter Valid Exp Date');
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const onCallValidCardPayment = () => {
    if (onCheckValid()) {
      onCallStripePayPayment();
      setModalPicker(false);
    }
  };

  const onCallStripePayPayment = () => {
    let expMonthSplit = cardExpiry.split('/');
    let expMonth = expMonthSplit[0];
    let expYear = expMonthSplit[1];

    let data = {
      cardNumber: cardNo,
      month: expMonth,
      year: expYear,
      cvv: cardCVV,
      currency: 'inr',
      name: cardHolderName,
      email: props.userProfile?.Profile?.email,
      amount: subPlanItem?.price.replace('USD ', ''),
      subscription_plan: subPlanItem?.plan_name,
    };
    const headerAuth = {
      token: props.authToken,
    };
    const headers = headerAuth;

    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const config = {
      method: 'POST',
      headers,
      body: formBody,
    };

    const requestUrl = Config.API_URL + Config.stripePaymentAPI;

    console.log('DATA', data);
    console.log('DATA FORM DATA', config);
    console.log('REQUEST URL', requestUrl);
    setLoading(true);
    fetch(requestUrl, config)
      .then(res => res.json())
      .then(response => {
        console.log(' PAYMENT RESPONSE', response);
        if (response.status == 'success') {
          Toast.show(response.message, Toast.SHORT);
          props.navigation.navigate('PaymentResultScreen', {
            paymentStatus: 'Success',
          });
          if (saveCardStatus) {
            onCallSaveCardAPI(data);
          }
          setLoading(false);
        } else {
          Toast.show(response.message, Toast.SHORT);
          props.navigation.navigate('PaymentResultScreen', {
            paymentStatus: 'Failed',
          });
          setLoading(false);
        }
      });
  };

  const onCallSaveCardAPI = data => {
    let dataValue = {
      holder_name: data?.name,
      card_number: data?.cardNumber,
      expire_month: data?.month,
      expire_year: data?.year,
      cvv_number: data?.cvv,
      bank_name: data?.name,
    };
    setLoading(true);
    console.log('SAVE CARD DATA', dataValue);
    dispatch(
      SaveCardRequest(dataValue, response => {
        console.log('SAVE CARD RED', response);
        Toast.show('Successfully! Save Card', Toast.SHORT);
        setLoading(false);
      }),
    );
  };

  const expCardDate = number => {
    let tempNumber = number;
    if (number.match(/^\d{2}$/) !== null) {
      tempNumber = number + '/';
    }
    console.log('TEMP NO', tempNumber);
    setCardExpiry(tempNumber);
  };

  

  return (

        <View
          style={{
            flex: 1,
            backgroundColor: R.colors.modelBackground,
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
            style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  {/* <View
                  style={{height:screenHeight/2}}
                  /> */}

                  <View
                    style={{
                      backgroundColor: R.colors.white,
                      borderTopLeftRadius: R.fontSize.Size8,
                      borderTopRightRadius: R.fontSize.Size8,
                      paddingVertical: R.fontSize.Size20,
                      // borderRadius: R.fontSize.Size8,
                      // marginHorizontal: R.fontSize.Size10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row-reverse',
                        marginHorizontal: R.fontSize.Size20,
                      }}>
                      <Pressable
                        onPress={() => props.navigation.goBack()}
                        style={({pressed}) => [
                          {
                            padding: R.fontSize.Size6,
                            opacity: pressed ? 0.5 : 1,
                          },
                        ]}>
                        <Image
                          source={R.images.cancleIcon}
                          style={{
                            height: R.fontSize.Size10,
                            width: R.fontSize.Size10,
                          }}
                          resizeMode={'contain'}
                        />
                      </Pressable>
                    </View>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          flex: 1,
                          marginHorizontal: R.fontSize.Size20,
                        }}>
                        <View>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              color: R.colors.primaryTextColor,
                              fontWeight: '400',
                              fontSize: R.fontSize.Size15,
                            }}>
                            {'Card Details'}
                          </Text>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              color: R.colors.primaryTextColor,
                              fontWeight: '700',
                              fontSize: R.fontSize.Size18,
                              marginTop: R.fontSize.Size10,
                            }}>
                            {`Enter your card details ( ${props.route.params?.cardType} )`}
                          </Text>
                        </View>
                        <View style={{flex: 1, marginTop: R.fontSize.Size30}}>
                          <CustomCardTextInput
                            ref={cardNoRef}
                            value={cardNo}
                            onChangeText={cardNo => setCardNo(cardNo)}
                            placeholder={'Enter Card Number'}
                            keyboardType={'number-pad'}
                            maxLength={16}
                            onSubmitEditing={() =>
                              cardholderNameRef.current?.focus()
                            }
                            returnKeyType={'next'}
                          />
                          <CustomCardTextInput
                            ref={cardholderNameRef}
                            value={cardHolderName}
                            onChangeText={holderName =>
                              setCardHolderName(holderName)
                            }
                            placeholder={'Enter Card Holder Name'}
                            maxLength={30}
                            onSubmitEditing={() => cardCvvRef.current?.focus()}
                            returnKeyType={'next'}
                          />
                          <CustomCardTextInput
                            ref={cardCvvRef}
                            value={cardCVV}
                            onChangeText={cvv => setCardCVV(cvv)}
                            placeholder={'Enter CVV'}
                            keyboardType={'number-pad'}
                            maxLength={3}
                            onSubmitEditing={() =>
                              cardExpiryRef.current?.focus()
                            }
                            returnKeyType={'next'}
                          />
                          <CustomCardTextInput
                            ref={cardExpiryRef}
                            value={cardExpiry}
                            onChangeText={expiryDate => expCardDate(expiryDate)}
                            placeholder={'MM/YYYY'}
                            keyboardType={'number-pad'}
                            maxLength={7}
                            returnKeyType={'done'}
                          />
                          {stripeCardList.length < 3 ? (
                            <Pressable
                              onPress={() => setSaveCardStatus(!saveCardStatus)}
                              style={({pressed}) => [
                                {
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingBottom: R.fontSize.Size10,
                                  opacity: pressed ? 0.5 : 1,
                                },
                              ]}>
                              <Image
                                source={
                                  saveCardStatus
                                    ? R.images.checkTermsIcon
                                    : R.images.unCheckTermsIcon
                                }
                                style={{
                                  height: R.fontSize.Size30,
                                  width: R.fontSize.Size30,
                                }}
                                resizeMode={'contain'}
                              />
                              <Text
                                style={{
                                  fontFamily: R.fonts.regular,
                                  color: R.colors.primaryTextColor,
                                  fontSize: R.fontSize.Size14,
                                  marginLeft: R.fontSize.Size10,
                                }}
                                numberOfLines={1}>
                                {'Save card for future payments'}
                              </Text>
                            </Pressable>
                          ) : null}
                        </View>
                      </View>
                    </View>
                    <View style={{paddingVertical: R.fontSize.Size10}}>
                      <AppButton
                        onPress={() => onCallPayment()}
                        title={'Make Payment'}
                        marginHorizontal={R.fontSize.Size55}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps)(CardDetailScreen);
