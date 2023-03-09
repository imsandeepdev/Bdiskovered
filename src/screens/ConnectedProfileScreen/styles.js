import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;


const styles = StyleSheet.create({
  customTimeMainView: {
    alignItems: 'center',
    marginBottom: R.fontSize.Size10,
    marginLeft: R.fontSize.Size14,
  },
  customTimeLeftView: {
    alignItems: 'center',
    width: screenWidth / 3.8,
    height: R.fontSize.Size35,
    backgroundColor: R.colors.appColor,
    justifyContent: 'center',
    borderRadius: R.fontSize.Size8,
  },
  customTimeLeftText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.lightWhite,
    marginHorizontal: R.fontSize.Size12,
  },
  customTimeRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: R.fontSize.Size5,
  },
  customTimeUsdText: {
    fontFamily: R.fonts.regular,
    color: R.colors.primaryTextColor,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
  },
  customTimeRightText: {
    marginHorizontal: R.fontSize.Size4,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: R.colors.appColor,
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
  },
  customTimeRightDayText: {
    fontFamily: R.fonts.regular,
    color: R.colors.primaryTextColor,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
  },
  mainView: {
    flex: 1,
    paddingHorizontal: R.fontSize.Size20,
  },
  dotIconImage: {
    height: R.fontSize.Size24,
    width: R.fontSize.Size24,
  },
  topMainView: {
    marginTop: R.fontSize.Size4,
    flexDirection: 'row',
    paddingVertical: R.fontSize.Size10,
  },
  topView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topProfileView: {
    height: R.fontSize.Size60,
    width: R.fontSize.Size60,
    borderRadius: R.fontSize.Size35,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: R.colors.placeholderTextColor,
  },
  topProfileImage: {
    height: R.fontSize.Size60,
    width: R.fontSize.Size60,
  },
  topUserText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
  },
  topViewLine: {
    height: R.fontSize.Size80,
    width: 1,
    backgroundColor: R.colors.placeholderTextColor,
  },
  topRightView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topRightText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size24,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
  },
  topRightPostText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
  },
  editPressButton: {
    paddingVertical: R.fontSize.Size8,
    borderRadius: R.fontSize.Size8,
    backgroundColor: R.colors.placeholderTextColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editViewButton: {
    height: R.fontSize.Size10,
    width: R.fontSize.Size10,
    borderRadius: R.fontSize.Size10,
    backgroundColor: R.colors.placeHolderColor,
  },
  editTextButton: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    color: R.colors.primaryTextColor,
    fontWeight: '600',
    marginHorizontal: R.fontSize.Size8,
  },
  bioText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size12,
    fontWeight: '400',
    color: R.colors.primaryTextColor,
  },
  personalView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: R.fontSize.Size20,
  },
  personalUnderView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: R.fontSize.Size14,
  },
  personalDotView: {
    height: R.fontSize.Size10,
    width: R.fontSize.Size10,
    backgroundColor: R.colors.appColor,
    borderRadius: R.fontSize.Size10,
  },
  personalText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
    marginLeft: R.fontSize.Size8,
  },
  talentView: {
    alignItems: 'center',
    marginRight: R.fontSize.Size14,
    justifyContent: 'center',
    paddingHorizontal: R.fontSize.Size6,
    paddingVertical: R.fontSize.Size6,
    backgroundColor: R.colors.appColor,
    borderRadius: R.fontSize.Size8,
    marginBottom: R.fontSize.Size10,
    width: screenWidth / 3.8,
    height: R.fontSize.Size35,
  },
  talentText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.white,
    marginLeft: R.fontSize.Size8,
  },
  timeMainView: {
    marginTop: R.fontSize.Size20,
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: R.fontSize.Size10,
    marginLeft: -R.fontSize.Size22,
  },
  talentVideoView: {
    marginTop: R.fontSize.Size10,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  talentVideoPress: {
    width: screenWidth / 3.7,
    height: screenWidth / 3,
    borderRadius: R.fontSize.Size8,
    margin: R.fontSize.Size5,
    overflow: 'hidden',
  },
});
export default styles;
