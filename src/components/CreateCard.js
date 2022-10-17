import * as React from 'react';
import {View,Text} from 'react-native';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import R from '../res/R';

const PaymentScreen = (props) => {

  const {confirmPayment} = useStripe();
  return (
    <View
      style={{
        height: R.fontSize.Size220,
        borderWidth: 1,
        borderRadius: R.fontSize.Size8,
        backgroundColor: R.colors.cardColor,
        paddingHorizontal:R.fontSize.Size10
      }}>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <View
      style={{flex:1,justifyContent:'flex-end',marginVertical:R.fontSize.Size20}}
      >
        <Text
        style={{fontFamily:R.fonts.regular, fontSize:R.fontSize.Size14, color:R.colors.lightWhite, fontWeight:'700'}}>{props.cardType}</Text>
      </View>
    </View>
  );
}
export default PaymentScreen
