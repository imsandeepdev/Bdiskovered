import * as React from 'react';
import {View,Text,Dimensions} from 'react-native'
import R from '../res/R';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CustomTimeRow = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginBottom: R.fontSize.Size10,
        marginLeft: R.fontSize.Size14,
      }}>
      <View
        style={{
          alignItems: 'center',
          width: screenWidth / 3.8,
          height: R.fontSize.Size30,
          backgroundColor: R.colors.appColor,
          justifyContent: 'center',
          borderRadius: R.fontSize.Size8,
        }}>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: R.colors.lightWhite,
            marginHorizontal: R.fontSize.Size12,
          }}>
          {props.leftTitle}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: R.fontSize.Size5,
        }}>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            color: R.colors.primaryTextColor,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
          }}>
          {'USD'}
        </Text>
        <Text
          style={{
            marginHorizontal: R.fontSize.Size4,
            textAlign: 'center',
            borderBottomWidth: 1,
            borderColor: R.colors.appColor,
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: R.colors.black,
          }}>
          {props.rightText}
        </Text>
        <Text
          style={{
            fontFamily: R.fonts.regular,
            color: R.colors.primaryTextColor,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
          }}>
          {props.rightDayHours}
        </Text>
      </View>
    </View>
  );
};

export default CustomTimeRow
