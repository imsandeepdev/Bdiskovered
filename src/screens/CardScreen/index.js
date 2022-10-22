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
import {CustomCardView, Header, StoryScreen,AppButton, CustomCardTextInput, PaymentScreen}from '../../components'
import CarouselCards from '../../components/CarouselCard';
import R from '../../res/R';
import {CardField, useStripe, initStripe, confirmPayment} from '@stripe/stripe-react-native';
import { Config } from '../../config';
import {connect, useDispatch} from 'react-redux';
import { PayPaymentRequest } from '../../actions/stripePayment.action';

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

const getHiddenCardNumber = item => {
  let number = '';
  let tempitem = item.replace(/ /g, '');
  for (let i = 0; i < tempitem.length; i++) {
    if (i < tempitem.length - 4) {
      number += 'X' + ((i + 1) % 4 == 0 ? '  ' : ' ');
    } else {
      number += tempitem[i];
    }
  }
  return number;
};

const CarouselCardItem = ({item, index}) => {
  return (
    <View
      style={{
        borderRadius: R.fontSize.Size8,
        width: screenWidth / 1.4,
        height: screenWidth / 2.2,
        paddingHorizontal: R.fontSize.Size16,
        paddingVertical: R.fontSize.Size20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        // borderWidth:R.fontSize.Size2,
        // borderColor:R.colors.whatsAppColor,
        backgroundColor: index % 2 ? R.colors.cardColor1 : R.colors.cardColor,
      }}
      key={index}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAMAAACcwCSMAAAAY1BMVEX///+wJ2Dds8GsD1euHVv++/zHcpKvI16tGFnbpLmqAFDFao2sAFP05Ovz3+fBXYT58PTlvs3Tkaq9Unzfr8G1Nmu3PW/RjKbrztnLfJrw2eK6SnbPhqL36u/YnLPCY4fnxdFFAJqbAAADwUlEQVRoge1bbXuCMAw0UmyniCCCqEP5/79yiPgClPbYs5R94D5PjpQkvVy7xWLGjBkz/i1CfzpuP/majvzgpdupuKNMqtNU5EdFUuTTcIdKEondNOQbQRWCwxTccc1N8lJMQJ7Jmpy8o3vuq0cNgrNr7iKVT3Kxcd3nTope8GK33KWUb3KZRU7JE0EfUFeX3IeAWggctvjiItvkYuUu546KOlClK+6zkl1ymbkKfSW63FXojmRFGfS5SUonLT5Keoteh+5EVnz1sq0J3YGsKHSLXrOn/OTf+sDJhazIB7mrcuPOuURTZq5ybjkc+D3nWGVFlGrL7AleKbv3TNyVrGDMuTMZA79LWT5ZsTNk2wN8OVdaFr1e+JCHO7pYA+cL/QoEzqVkC3OZPSAuLNyLlam/NJDEs7WdkUVn+uK+vcz45MwBWHQuIefbelsdOJOE3SOBM5VZCMTNNiojZUZrns4aA5lO6puF+2W/mMCl4KCmzqRdt0jgIuHJttOEZZZD2bZh4fZvCDnxiObl0GzWWvQ9C3fPftFBEo9oxZo6z262XQPcYsdSZr7OfumByYpClDqJFQu3D2Wb4LEfIe3k8exmBbLoXLPhsP3yGTjPbpZLaDdj4V4gcyGX+7aERhSeMosg7ZTyaKcjFPh14QMYyx1CIwqdVgjGampkLqyaeukJO7yRDpnWU+9C3PzmNNeCoBzDHZlczhe8SjuFHtIMdmO6IKTUHyPK9a/VRoRkGz2cAOhvx+gsTKk30WDNCN76IPtFJE0wkLaWAtTWkP1C69eIkkM6D5wqIAkhbu8fQF9JQPMUZL/Qp+EWIvagzBBym6deo51AX5AxCpRbCDynu5tBPUlmdqG5+U3TiP+m3GIoeXr2LlRuNtXjI9pJM6LkwK+s5Qaljk47QWm6NpZbiGgnUhpxgLX4xNTioXahtPeRBg6X2zCVG9Qoh27FQBIgGAzdh2TJ0IhiOOJ9Q79qd3Rvv2gx7ARg32xgd4OUOgWDxRr1L5Ho3l3/Y8h+MdUqVG763W2LLLo03TXFWnyq+WyY/WI23KAW72lucZUIt0zNQhBq8Zr5DhEEpJZG7sUZeIbGp4UalN0J+FW5FZB2sl/vhcr1PmaNf2NAfEONqm3OW+8j1AgQJyBDcq7lYGESArrpCNlInxULTTyo4QYddavXIoJNHTxFgU4f32fd/SuNGnRTdBhY1eYjXpUUbLhBI8+zZUAHpWPsXUzF15okXnt2BGP+c8LfBMgT7/lbLhGMcjlD5IkHpus8M2bMmPEv8AMWYDVHA7+S2wAAAABJRU5ErkJggg==',
          }}
          style={{
            height: R.fontSize.Size35,
            width: R.fontSize.Size35,
          }}
          resizeMode={'contain'}
        />
        <View style={{flex: 1, marginLeft: R.fontSize.Size15}}>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              fontSize: R.fontSize.Size14,
              fontWeight: '700',
              color: R.colors.white,
            }}>
            {`${item?.bankName} Account`}
          </Text>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              fontSize: R.fontSize.Size12,
              fontWeight: '400',
              color: R.colors.white,
            }}>
            {getHiddenCardNumber(item?.cardNo)}
          </Text>
        </View>
      </View>
      <View
      style={{flex:1,justifyContent:'flex-end'}}
      >
        <Text
          style={{
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size12,
            fontWeight: '400',
            color: R.colors.white,
          }}>
          {item?.cardType}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: R.fontSize.Size15,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              fontSize: R.fontSize.Size12,
              fontWeight: '700',
              color: R.colors.white,
            }}>
            {item?.holderName}
          </Text>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              fontSize: R.fontSize.Size12,
              fontWeight: '700',
              color: R.colors.white,
            }}>
            {item?.expDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

const CardScreen = (props) => {

const dispatch = useDispatch();

const stripe = useStripe()
const name ='sandeep'
const [modalPicker, setModalPicker] = useState(false)
const [cardNo, setCardNo] = useState('')
const [cardHolderName, setCardHolderName] = useState('');
const [cardCVV, setCardCVV] = useState('');
const [cardExpiry, setCardExpiry] = useState('');
const [cardName, setCardName] = useState('')
const [cardVisible, setCardVisible] = useState(false)
const [subPlanItem, setSubPlanItem] = useState({})


useEffect(()=>{

  console.log('SUB PLAN ITEM', props.route.params?.SubPlanItem);
  setSubPlanItem(props.route.params?.SubPlanItem);
  console.log('PROFILE DETAILS', props.userProfile);

// initStripe({
//   publishableKey:
//     'pk_live_51LHlAaKGqRlE9chSdPqWWpAEHyL0bNjvAnhobShTKIJUEdKbc3PVYWwdxFQsaZ9wojTayZTvvE2KzIHtoFTebonm00oT7QkoTp',
//   // merchantIdentifier: 'merchant.identifier',
//   urlScheme: 'your-url-scheme',
// });

},[props.navigate])


 const onCallPayment = () => {
   setModalPicker(false);
   onCallStripePayPayment();
 };

 const onSelectCard = (card) => {
  setCardVisible(true)
  setCardName(card)
 }

const getCreditCardAPI = async() => {

    const response = await fetch(`${Config.API_URL}create-payment-intent`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentMethodType: 'card',
        currency: 'usd'
      })
    })
   
    const {clientSecret} = await response.json()

    const {error,paymentIntent} = await confirmPayment(clientSecret,{
      type:'Card',
      billingDetails:{name}
    })
    if(error){
      Alert.alert(`ErrorCode:${error.code}`,error.message)
    } else if(paymentIntent) {
      Alert.alert('Success',`Payment Successful:${paymentIntent.id}`)
    }
}

const onCallStripePayPayment = () => {

  let expMonthSplit = cardExpiry.split("/")
  let expMonth = expMonthSplit[0]
  let expYear = expMonthSplit[1]

  let data = {
    cardNumber: cardNo,
    month: expMonth,
    year: expYear,
    cvv: cardCVV,
    currency: 'usd',
    name: cardHolderName,
    email: props.userProfile?.Profile?.email,
    amount: subPlanItem?.price.replace('USD ',''),
    subscription_plan: subPlanItem?.plan_name,
  };

  const headerAuth = {
    Accept: 'application/json',
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    token: props.authToken,
  };
  const config = {
    method: 'POST',
    headerAuth,
    body: data,
  };

  const requestUrl = Config.API_URL + Config.stripePaymentAPI

  console.log("DATA",data)
  
  fetch(requestUrl,config)
  .then(res => console.log("RESPONSE",res))

}

const expCardDate = number => {
  let tempNumber = number;
  if (number.match(/^\d{2}$/) !== null) {
    tempNumber = number + '/';
  }
  console.log("TEMP NO",tempNumber)
  setCardExpiry(tempNumber)
  // setExpDate(tempNumber);
};



    return (
      <StoryScreen>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
          />
          <View style={{flex: 1}}>
            <View style={{marginTop: R.fontSize.Size45}}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size18,
                  fontWeight: '700',
                  color: R.colors.primaryTextColor,
                  marginHorizontal: R.fontSize.Size20,
                }}
                numberOfLines={1}>
                {'Your Previous Cards'}
              </Text>

              <View style={{marginTop: R.fontSize.Size20}}>
                <CarouselCards
                  cardData={cardListData}
                  cardDataLength={cardListData.length}
                  renderItem={CarouselCardItem}
                />
              </View>
            </View>
            {/* {cardVisible && (
              <View
                style={{
                  marginTop: R.fontSize.Size45,
                  marginHorizontal: R.fontSize.Size20,
                }}>
                <PaymentScreen cardType={cardName} />

                <Pressable
                  onPress={() => getCreditCardAPI()}
                  style={({pressed}) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      height: 50,
                      width: 200,
                      backgroundColor: R.colors.appColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text>Pay</Text>
                </Pressable>
              </View>
            )} */}
            <View
              style={{
                paddingHorizontal: R.fontSize.Size20,
                flex: 1,
                marginTop: R.fontSize.Size10,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size15,
                    fontWeight: '400',
                    color: R.colors.primaryTextColor,
                  }}>
                  {'Select Payment Type'}
                </Text>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size18,
                    fontWeight: '700',
                    color: R.colors.primaryTextColor,
                    marginTop: R.fontSize.Size10,
                  }}>
                  {'Choose type of card payment'}
                </Text>
              </View>
              <View style={{marginTop: R.fontSize.Size30}}>
                <CustomCardView
                  onPress={() => setModalPicker(true)}
                  title={'Debit Card'}
                  cardHeight={R.fontSize.Size80}
                  fontWeight={'400'}
                  TextColor={R.colors.primaryTextColor}
                  rightIcon={R.images.activeAddIcon}
                  fontSize={R.fontSize.Size18}
                  Iconwidth={R.fontSize.Size18}
                  Iconheight={R.fontSize.Size18}
                />
                <CustomCardView
                  onPress={() => onSelectCard('Credit Card')}
                  cardHeight={R.fontSize.Size80}
                  title={'Credit Card'}
                  fontWeight={'400'}
                  TextColor={R.colors.primaryTextColor}
                  rightIcon={R.images.activeAddIcon}
                  fontSize={R.fontSize.Size18}
                  Iconwidth={R.fontSize.Size18}
                  Iconheight={R.fontSize.Size18}
                />
              </View>
            </View>
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
                    style={{
                      height: R.fontSize.Size10,
                      width: R.fontSize.Size10,
                    }}
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
                          {`Enter your card details ( Debit Card )`}
                        </Text>
                      </View>
                      <View style={{flex: 1, marginTop: R.fontSize.Size30}}>
                        <CustomCardTextInput
                          value={cardNo}
                          onChangeText={cardNo => setCardNo(cardNo)}
                          placeholder={'Enter Card Number'}
                          keyboardType={'number-pad'}
                          maxLength={16}
                        />
                        <CustomCardTextInput
                          value={cardHolderName}
                          onChangeText={holderName =>
                            setCardHolderName(holderName)
                          }
                          placeholder={'Enter Card Holder Name'}
                          maxLength={30}
                        />
                        <CustomCardTextInput
                          value={cardCVV}
                          onChangeText={cvv => setCardCVV(cvv)}
                          placeholder={'Enter CVV'}
                          keyboardType={'number-pad'}
                          maxLength={3}
                        />
                        <CustomCardTextInput
                          value={cardExpiry}
                          onChangeText={expiryDate => expCardDate(expiryDate)}
                          placeholder={'MM/YYYY'}
                          keyboardType={'number-pad'}
                          maxLength={7}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
              </KeyboardAvoidingView>
              <View style={{paddingVertical: R.fontSize.Size10}}>
                <AppButton
                  onPress={() => onCallPayment()}
                  title={'Make Payment'}
                  marginHorizontal={R.fontSize.Size55}
                />
              </View>
            </View>
          </View>
        </Modal>
      </StoryScreen>
    );
}


const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps)(CardScreen);