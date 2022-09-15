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
} from 'react-native';
import {CustomCardView, Header, StoryScreen,AppButton, CustomCardTextInput}from '../../components'
import R from '../../res/R';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const CardScreen = (props) => {

const [modalPicker, setModalPicker] = useState(false)
const [cardNo, setCardNo] = useState('')
const [cardHolderName, setCardHolderName] = useState('');
const [cardCVV, setCardCVV] = useState('');
const [cardExpiry, setCardExpiry] = useState('');

 const onCallPayment = () => {
   setModalPicker(false);
   props.navigation.navigate('PaymentResultScreen');
 };


    return (
      <StoryScreen>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
          />
          <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
            <View style={{marginTop: R.fontSize.Size45}}>
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
                onPress={() => setModalPicker(true)}
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
                        />
                        <CustomCardTextInput
                          value={cardHolderName}
                          onChangeText={holderName =>
                            setCardHolderName(holderName)
                          }
                          placeholder={'Enter Card Holder Name'}
                        />
                        <CustomCardTextInput
                          value={cardCVV}
                          onChangeText={cvv => setCardCVV(cvv)}
                          placeholder={'Enter CVV'}
                          keyboardType={'number-pad'}
                        />
                        <CustomCardTextInput
                          value={cardExpiry}
                          onChangeText={expiryDate => setCardExpiry(expiryDate)}
                          placeholder={'Enter Expiry MM/YY'}
                          keyboardType={'number-pad'}
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

export default CardScreen;