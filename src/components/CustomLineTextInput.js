import * as React from 'react';
import {Pressable, Text, Image,TextInput} from 'react-native';
import R from '../res/R';

const CustomLineTextInput = props => {
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
      <TextInput
        style={{
          flex:1,
          fontFamily: R.fonts.regular,
          fontSize: R.fontSize.Size15,
          color: R.colors.primaryTextColor,
          fontWeight: '700',
          height: '100%',
        }}
        placeholder={props.placeholder}
        placeholderTextColor={R.colors.placeholderTextColor}
        value={props.value}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType ?? 'default'}
      />
      <Image
        source={props.rightIcon}
        style={{height: R.fontSize.Size10, width: R.fontSize.Size10}}
        resizeMode={'contain'}
      />
    </Pressable>
  );
};
export default CustomLineTextInput;
