import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView
} from 'react-native';
import { BottomTabRequest } from '../../actions/bottomtab.action';
import { StoryScreen, AppButton} from '../../components';
import R from '../../res/R';
import {useDispatch} from 'react-redux'

const PaymentResultScreen = props => {

  const dispatch  = useDispatch()
  useEffect(()=>{
    console.log('PAYMENT STATUS', props.route.params?.paymentStatus);
  },[props.navigation])

const onCallProceed = () => {
    props.navigation.navigate('HomeMenu');
    dispatch(BottomTabRequest('HomeScreen'));
}


  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View>
            <Image
              source={
                props.route.params?.paymentStatus == 'Success'
                  ? R.images.paymentSuccessIcon
                  : R.images.paymentFailedIcon
              }
              style={{height: R.fontSize.Size220, width: R.fontSize.Size220}}
              resizeMode={'contain'}
            />
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size20,
                color: R.colors.primaryTextColor,
                fontWeight: '700',
                marginTop: R.fontSize.Size25,
                textAlign: 'center',
              }}>
              {props.route.params?.paymentStatus == 'Success'
                ? 'Payment Completed'
                : `Payment Not Completed\n Please Try Again`}
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: R.fontSize.Size20, marginVertical:R.fontSize.Size25}}>
          <AppButton
            onPress={() => onCallProceed()}
            title={'Proceed'}
          />
        </View>
      </SafeAreaView>
    </StoryScreen>
  );
};
export default PaymentResultScreen;
