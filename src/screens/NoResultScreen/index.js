import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';
import {
  StoryScreen,
  Header,
  AppButton,
  CustomCardView,
  CustomTimeCard,
} from '../../components';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import {connect, useDispatch} from 'react-redux';


const NoResultScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
 

    const onCallProcess = () => {
        props.navigation.replace('HomeMenu')
    }


  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {
            props.route.params?.from == 'SearchScreen' ?
            <Text
            style={{
              fontFamily: R.fonts.regular,
              fontSize: R.fontSize.Size16,
              color: R.colors.placeHolderColor,
              fontWeight: '500',
              textAlign: 'center',
            }}>{`No Result Found`}
            </Text>
            :
          <View
          style={{
            alignItems:'center',
            justifyContent:'center',
            marginHorizontal:R.fontSize.Size20
          }}
          >
            <Image
              source={R.images.paymentSuccessIcon}
              style={{height: R.fontSize.Size140, width: R.fontSize.Size140}}
              resizeMode={'contain'}
            />
            <Text
              style={{
                marginTop:R.fontSize.Size10,
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size16,
                color: R.colors.primaryTextColor,
                fontWeight: '500',
                textAlign: 'center',
              }}>
              {`Your video is sent for review and will be published once approved`}
            </Text>
          </View>
            }
        </View>
        {
         props.route.params?.from != 'SearchScreen'   &&  
        <View style={{paddingVertical: R.fontSize.Size16}}>
          <AppButton
            onPress={() => onCallProcess()}
            marginHorizontal={R.fontSize.Size35}
            title={'Proceed'}
          />
        </View>}
      </SafeAreaView>
    </StoryScreen>
  );
};
export default NoResultScreen;
