import * as React from 'react';
import {View, Text, Dimensions,Pressable,Image,TextInput} from 'react-native';
import R from '../res/R';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CustomOpenForRow = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: R.fontSize.Size10,
      }}>
      <Pressable
        onPress={props.leftOnPress}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.5 : 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: screenWidth / 2.5,
          },
        ]}>
        <Image
          source={props.leftImageSource}
          style={{
            height: R.fontSize.Size30,
            width: R.fontSize.Size30,
          }}
          resizeMode={'contain'}
        />
        <Text
          style={{
            fontFamily: R.fonts.regular,
            fontSize: R.fontSize.Size14,
            fontWeight: '700',
            color: props.leftTextColor,
            marginHorizontal: R.fontSize.Size12,
          }}>
          {props.leftTitle}
        </Text>
      </Pressable>

      {props.rightStatus && (
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              color: R.colors.primaryTextColor,
              fontSize: R.fontSize.Size14,
              fontWeight: '400',
            }}>
            {'USD'}
          </Text>
          <View style={{width: R.fontSize.Size70, alignItems: 'center'}}>
            <TextInput
              style={{
                width: R.fontSize.Size60,
                height: R.fontSize.Size40,
                paddingVertical: R.fontSize.Size6,
                marginHorizontal: R.fontSize.Size6,
                textAlign: 'center',
                borderBottomWidth: 1,
                borderColor: R.colors.appColor,
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size12,
                color: R.colors.primaryTextColor,
                fontWeight: '400',
              }}
              maxLength={5}
              placeholder={'00'}
              placeholderTextColor={R.colors.placeholderTextColor}
              value={props.rightValue}
              onChangeText={props.rightOnChangeText}
              keyboardType={'number-pad'}
            />
          </View>
          <Text
            style={{
              fontFamily: R.fonts.regular,
              color: R.colors.primaryTextColor,
              fontSize: R.fontSize.Size14,
              fontWeight: '400',
            }}>
            {props.rightDayHours}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CustomOpenForRow
