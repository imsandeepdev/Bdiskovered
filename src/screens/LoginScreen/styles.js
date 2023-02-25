import {StyleSheet,Dimensions} from 'react-native';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;

const Styles = StyleSheet.create({
  titleText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    color: R.colors.placeHolderColor,
    fontWeight: '700',
  },
  welcomeText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    color: R.colors.placeHolderColor,
    fontWeight: '400',
  },
  phoneText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size18,
    color: R.colors.primaryTextColor,
    fontWeight: '700',
    marginTop: R.fontSize.Size10,
  },
  beleaveMainView: {
    alignItems: 'center',
    paddingTop: R.fontSize.Size30,
    height: screenHeight / 4,
  },
  accountView: {
    marginTop: R.fontSize.Size45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size12,
    color: R.colors.appColor,
    fontWeight: '700',
  },
});

export default Styles