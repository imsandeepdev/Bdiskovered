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
  mainView: {
    flex: 1,
    paddingHorizontal: R.fontSize.Size18,
  },
  quesText: {
    fontFamily: R.fonts.regular,
    color: R.colors.primaryTextColor,
    fontSize: R.fontSize.Size16,
    fontWeight: '700',
    marginTop: R.fontSize.Size10,
  },
  ansText: {
    fontFamily: R.fonts.regular,
    color: R.colors.primaryTextColor,
    fontSize: R.fontSize.Size16,
    marginTop: R.fontSize.Size8,
  },
  mainView1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: {
    fontFamily: R.fonts.regular,
    fontWeight: '700',
    fontSize: R.fontSize.Size18,
    color: R.colors.primaryTextColor,
    textAlign: 'center',
  },
  infoText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    color: R.colors.placeHolderColor,
    textAlign: 'center',
    marginTop: R.fontSize.Size8,
  },
  addressText: {
    fontFamily: R.fonts.regular,
    fontWeight: '700',
    fontSize: R.fontSize.Size16,
    color: R.colors.primaryTextColor,
    textAlign: 'center',
    marginTop: R.fontSize.Size8,
  },
});
export default styles;
