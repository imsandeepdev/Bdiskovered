import * as React from 'react';
import {Pressable, Text,Image} from 'react-native';
import R from '../res/R';

const CustomCardLine = (props) => {
    return (
      <Pressable
        onPress={props.onPress}
        disabled={props.disabled}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.5 : 1,
            borderBottomWidth: 1,
            borderColor: R.colors.placeholderTextColor,
            flexDirection: 'row',
            height: R.fontSize.Size45,
            alignItems: 'center',
            marginBottom: props.marginBottom ?? R.fontSize.Size12,
          },
        ]}>
        <Text
          style={{
            flex: 1,
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: R.colors.primaryTextColor,
          }}
          numberOfLines={1}>
          {props.title}
        </Text>
        <Pressable
          onPress={props.onPressSecondRight}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.5 : 1,
              padding:R.fontSize.Size5,
            },
          ]}>
          {/* <Image
            source={props.secondrightIcon}
            style={{height: R.fontSize.Size10, width: R.fontSize.Size10}}
            resizeMode={'contain'}
          /> */}
          {/* <Text
            style={{
              color: R.colors.placeHolderColor,
              fontFamily: R.fonts.regular,
              fontSize: R.fontSize.Size14,
              fontWeight: '400',
            }}>
            {props.secondRightText}
          </Text> */}
          <Image
            source={props.rightIcon}
            style={{height: R.fontSize.Size10, width: R.fontSize.Size10}}
            resizeMode={'contain'}
          />
        </Pressable>
      </Pressable>
    );
}
export default CustomCardLine