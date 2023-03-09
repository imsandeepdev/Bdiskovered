import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  topLineView: {
    height: R.fontSize.Size2,
    backgroundColor: R.colors.placeholderTextColor,
    width: '100%',
  },
  flatView: {
    flex: 1,
    paddingHorizontal: R.fontSize.Size20,
  },
  IconView: {
    height: R.fontSize.Size55,
    width: R.fontSize.Size55,
    borderRadius: R.fontSize.Size30,
    borderWidth: 1,
    borderColor: R.colors.placeholderTextColor,
    overflow: 'hidden',
    alignItems:'center',
    justifyContent:'center'
  },
  iconImage: {
    height: R.fontSize.Size55,
    width: R.fontSize.Size55,
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: R.fontSize.Size15,
  },
  userNameText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: screenHeight / 1.2,
    width: '100%',
  },
  emptyText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.placeHolderColor,
  },
});
export default styles;
