import * as React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const Styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    backgroundColor: R.colors.modelBackground,
    justifyContent: 'flex-end',
  },
  modalView: {
    height: screenHeight / 2,
    backgroundColor: R.colors.white,
    borderTopLeftRadius: R.fontSize.Size8,
    borderTopRightRadius: R.fontSize.Size8,
    paddingVertical: R.fontSize.Size30,
  },
  modalViewReverse: {
    flexDirection: 'row-reverse',
    marginHorizontal: R.fontSize.Size20,
  },
  modalFilterText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size18,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
  },
  videoModalTitleText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size24,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
    flex: 1,
    marginHorizontal: R.fontSize.Size14,
  },
  videoModalDescText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size12,
    fontWeight: '400',
    color: R.colors.primaryTextColor,
  },
  videoModalMainView: {
    height: R.fontSize.Size60,
    width: R.fontSize.Size60,
    overflow: 'hidden',
    borderRadius: R.fontSize.Size30,
    borderWidth: 1,
    borderColor: R.colors.placeholderTextColor,
  },
  videoModalMapMainView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: R.fontSize.Size20,
  },
  videoModalMapView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: R.fontSize.Size14,
  },
  videoModalPersonalDetailView: {
    height: R.fontSize.Size10,
    width: R.fontSize.Size10,
    backgroundColor: R.colors.appColor,
    borderRadius: R.fontSize.Size10,
  },
  videoModalPersonalDetailText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
    marginLeft: R.fontSize.Size8,
  },
  videoModalTalentView: {
    alignItems: 'center',
    marginRight: R.fontSize.Size14,
    justifyContent: 'center',
    paddingVertical: R.fontSize.Size6,
    backgroundColor: R.colors.appColor,
    borderRadius: R.fontSize.Size8,
    marginBottom: R.fontSize.Size10,
    width: screenWidth / 3.8,
  },
  videoModalTalentText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.white,
    textAlign: 'center',
  },
  videoModalAvailableText: {
    fontFamily: R.fonts.regular,
    fontWeight: '700',
    fontSize: R.fontSize.Size18,
    color: R.colors.primaryTextColor,
  },
  videoModalAvailView: {
    alignItems: 'center',
    marginRight: R.fontSize.Size10,
    justifyContent: 'center',
    paddingHorizontal: R.fontSize.Size20,
    paddingVertical: R.fontSize.Size6,
    borderRadius: R.fontSize.Size8,
    marginBottom: R.fontSize.Size6,
  },
  videoModalAvailItemText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.white,
    marginLeft: R.fontSize.Size8,
  },
  sliderView: {
    flexDirection: 'row',
    marginHorizontal: R.fontSize.Size12,
    alignItems: 'center',
    height: R.fontSize.Size100,
    justifyContent: 'center',
  },
  sliderMinTrack: {
    height: R.fontSize.Size8,
    backgroundColor: R.colors.appColor,
    borderRadius: R.fontSize.Size5,
  },
  sliderMaxTrack: {
    height: R.fontSize.Size8,
    backgroundColor: R.colors.placeholderTextColor,
    borderRadius: R.fontSize.Size5,
  },
  customThumView: {
    overflow: 'hidden',
    top: 5,
    left: 0,
    right: 0,
  },
  customThumImage: {
    width: R.fontSize.Size35,
    height: R.fontSize.Size35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likedView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likedByText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size12,
    fontWeight: '700',
    color: R.colors.placeHolderColor,
  },
  avgLikeView: {
    width: 1,
    height: R.fontSize.Size14,
    backgroundColor: R.colors.placeHolderColor,
    marginHorizontal: R.fontSize.Size10,
  },
  avgLikeText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size12,
    fontWeight: '700',
    color: R.colors.placeHolderColor,
  },
  sliderValueView: {
    paddingHorizontal: R.fontSize.Size5,
    height: R.fontSize.Size26,
  },
  sliderValueText: {
    color: R.colors.appColor,
    fontSize: R.fontSize.Size12,
    fontWeight: '700',
  },
  orangeAppIcon: {
    height: R.fontSize.Size30,
    width: R.fontSize.Size30,
    marginBottom: R.fontSize.Size6,
  },
  connectText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '500',
    color: R.colors.placeHolderColor,
  },
  backButtonView: {
    position: 'absolute',
    top: R.fontSize.Size50,
    left: R.fontSize.Size10,
  },
  backButtonPress: {
    height: R.fontSize.Size50,
    width: R.fontSize.Size50,
    borderRadius: R.fontSize.Size4,
    backgroundColor: R.colors.modelBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },

  reportContentView: {
    marginVertical: R.fontSize.Size4,
    borderBottomWidth: 0.5,
    borderColor: R.colors.lightWhite,
    height: R.fontSize.Size40,
    borderRadius: R.fontSize.Size8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  reportContentCheckIcon: {
    height: R.fontSize.Size22,
    width: R.fontSize.Size22,
    paddingHorizontal: R.fontSize.Size20,
  },
  reportContentTitle: {
    fontFamily: R.fonts.regular,
    color: R.colors.lightBlack,
    fontWeight: '700',
    fontSize: R.fontSize.Size14,
  },
  cutVideoView: {
    marginHorizontal: R.fontSize.Size10,
    paddingBottom: R.fontSize.Size30,
    marginTop: R.fontSize.Size10,
  },
  cutVideoText: {
    fontFamily: R.fonts.regular,
    fontWeight: '500',
    color: R.colors.lightBlack,
    fontSize: R.fontSize.Size16,
    textAlign: 'center',
  },
  dontRecView: {
    marginHorizontal: R.fontSize.Size10,
    paddingBottom: R.fontSize.Size30,
    marginTop: R.fontSize.Size10,
  },
  dontRecText: {
    fontFamily: R.fonts.regular,
    fontWeight: '500',
    color: R.colors.lightBlack,
    fontSize: R.fontSize.Size16,
    textAlign: 'center',
  },
});

export default Styles;
