import {StyleSheet, Dimensions} from 'react-native';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const Styles = StyleSheet.create({
  customMenuButtonPress: {
    paddingVertical: R.fontSize.Size5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: R.fontSize.Size25,
  },
  customMenuButtonText: {
    flex: 1,
    marginLeft: R.fontSize.Size30,
    fontFamily: R.fonts.regular,
    fontWeight: '700',
    fontSize: R.fontSize.Size18,
    color: R.colors.primaryTextColor,
  },
  mainView: {
    flex: 1,
    backgroundColor: R.colors.white,
    paddingHorizontal: R.fontSize.Size30,
  },
  goPremiumText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size24,
    fontWeight: '700',
    color: R.colors.appColor,
    marginHorizontal: R.fontSize.Size15,
  },
  iconStyle: {
    height: R.fontSize.Size20,
    width: R.fontSize.Size20,
  },
});

export default Styles;
