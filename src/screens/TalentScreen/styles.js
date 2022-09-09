import {StyleSheet,Dimensions} from 'react-native';
import R from '../../res/R';

const Styles = StyleSheet.create({
  mainView: {
    flex:1,
    marginHorizontal:R.fontSize.Size15
  },
  titleText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    color: R.colors.placeHolderColor,
    fontWeight: '700',
  },
  userselectionText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    color: R.colors.placeHolderColor,
    fontWeight: '400',
  },
  accountTypeText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size18,
    color: R.colors.primaryTextColor,
    fontWeight: '700',
    marginTop:R.fontSize.Size10
  },
  termsText:{
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size12,
    color: R.colors.placeHolderColor,
    fontWeight: '400'
  }
});

export default Styles