import * as React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;



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
    width: R.fontSize.Size160,
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
    marginHorizontal: R.fontSize.Size10,
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    color: R.colors.placeholderTextColor,
    fontWeight: '400',
  },
  modalMainView: {
    flex: 1,
    backgroundColor: R.colors.modelBackground,
    justifyContent: 'flex-end',
  },
  modalView: {
    height: screenHeight / 1.6,
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
    borderWidth:1,
    borderColor:R.colors.placeholderTextColor
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
    marginBottom: R.fontSize.Size14,
    width: screenWidth/3.8
  },
  videoModalTalentText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.white,
    marginLeft: R.fontSize.Size8,
    textAlign:'center'
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
});

export default Styles