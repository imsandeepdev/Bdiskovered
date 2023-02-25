import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import R from '../../res/R';
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  headerView: {
    height: R.fontSize.Size40,
    width: R.fontSize.Size40,
    borderRadius: R.fontSize.Size30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -R.fontSize.Size20,
    marginRight: R.fontSize.Size10,
  },
  headerViewImage: {
    height: R.fontSize.Size40,
    width: R.fontSize.Size40,
    borderRadius: R.fontSize.Size30,
  },
  loadView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    flex: 1,
    backgroundColor: R.colors.lightWhite,
  },
  chatView: {
    marginHorizontal: R.fontSize.Size10,
    minWidth: R.fontSize.Size80,
    maxWidth: '80%',
    paddingHorizontal: R.fontSize.Size10,
    marginVertical: R.fontSize.Size5,
    paddingTop: R.fontSize.Size5,
    borderRadius: R.fontSize.Size8,
  },
  chatText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size15,
    color: R.colors.lightWhite,
    fontWeight: '400',
  },
  chatDate: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size10,
    color: R.colors.lightWhite,
  },
  textInputMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: R.fontSize.Size10,
    paddingVertical: R.fontSize.Size5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: R.colors.white,
  },
  textInputView: {
    height: R.fontSize.Size50,
    flex: 1,
    borderColor: R.colors.appColor,
    borderWidth: 1,
    borderRadius: R.fontSize.Size30,
    paddingHorizontal: R.fontSize.Size15,
    justifyContent: 'center',
  },
  textInput: {
    color: R.colors.black,
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    height: R.fontSize.Size50,
    paddingTop: R.fontSize.Size14,
  },
  pressSendButton: {
    width: R.fontSize.Size45,
    height: R.fontSize.Size45,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: R.fontSize.Size10,
    borderWidth: 1,
    borderRadius: R.fontSize.Size30,
  },
  modelButton: {
    flex: 1,
    marginVertical: R.fontSize.Size4,
    backgroundColor: R.colors.appColor,
    height: R.fontSize.Size45,
    borderRadius: R.fontSize.Size8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: R.fontSize.Size10,
  },
  modelButtonText: {
    fontFamily: R.fonts.regular,
    color: R.colors.white,
    fontWeight: '700',
    fontSize: R.fontSize.Size16,
  },
});
export default styles;
