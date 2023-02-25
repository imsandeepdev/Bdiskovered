import * as React from 'react';
import {StyleSheet,Dimensions} from 'react-native';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  mainView: {
    height: R.fontSize.Size2,
    backgroundColor: R.colors.placeholderTextColor,
    width: '100%',
  },
  flatStyle: {
    flex: 1,
    paddingHorizontal: R.fontSize.Size20,
  },
  pressView: {
    paddingVertical: R.fontSize.Size6,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: R.colors.placeholderTextColor,
  },
  imageView: {
    height: R.fontSize.Size50,
    width: R.fontSize.Size50,
    borderRadius: R.fontSize.Size30,
    borderWidth: 1,
    borderColor: R.colors.placeholderTextColor,
    overflow: 'hidden',
  },
  image: {
    height: R.fontSize.Size50,
    width: R.fontSize.Size50,
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: R.fontSize.Size15,
  },
  text: {
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
export default styles