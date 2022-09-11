import * as React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import R from '../../res/R';

const Styles = StyleSheet.create({
  connectedUserMainView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: R.fontSize.Size20,
  },
  connectedUserView: {
    height: R.fontSize.Size60,
    width: R.fontSize.Size60,
    overflow: 'hidden',
    borderRadius: R.fontSize.Size30,
  },
  connectedUserImage: {
    height: R.fontSize.Size60,
    width: R.fontSize.Size60,
  },
  connectedUserText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    color: R.colors.placeholderTextColor,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: R.fontSize.Size10,
  },
  mostPopularView: {
    height: R.fontSize.Size130,
    width: R.fontSize.Size140,
    overflow: 'hidden',
    borderRadius: R.fontSize.Size8,
  },
  mostPopularImage: {
    height: R.fontSize.Size130,
    width: R.fontSize.Size140,
  },
  mostPopularBottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: R.fontSize.Size15,
  },
  mostPopularBottomImage: {
    height: R.fontSize.Size25,
    width: R.fontSize.Size25,
    borderRadius: R.fontSize.Size15,
  },
  mostPopularBottomText: {
    flex: 1,
    marginLeft: R.fontSize.Size10,
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    color: R.colors.placeholderTextColor,
    fontWeight: '400',
  },
});

export default Styles