import {StyleSheet,Dimensions} from 'react-native';
import R from '../../res/R';

const Styles = StyleSheet.create({
  titleText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    color: R.colors.placeHolderColor,
    fontWeight: '700',
  },
  detailsText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    color: R.colors.placeHolderColor,
    fontWeight: '400',
  },
  titleDetailText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size18,
    color: R.colors.primaryTextColor,
    fontWeight: '700',
    marginTop:R.fontSize.Size10
  },
});

export default Styles