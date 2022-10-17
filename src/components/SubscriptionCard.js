import * as React from 'react';
import {View, Pressable, TouchableOpacity, Image, Text} from 'react-native';
import R from '../res/R';



const SubscriptionCard = (props) => {
    return (
      <Pressable
        onPress={props.onPressAdd}
        style={({pressed})=>[{
          overflow: 'hidden',
          paddingBottom: R.fontSize.Size4,
          paddingRight: R.fontSize.Size4,
          paddingLeft: R.fontSize.Size2,
          borderRadius: R.fontSize.Size5,
          marginTop: props.marginTop,
          opacity: pressed ? 0.5: 1
        }]}>
        <View
          style={{
            borderWidth: props.borderWidth,
            borderColor: props.borderColor ?? R.colors.appColor,
            paddingHorizontal: R.fontSize.Size20,
            borderRadius: R.fontSize.Size8,
            backgroundColor: R.colors.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          {props.topTitle}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: R.fontSize.Size20,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'baseline',
              }}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size35,
                  color: props.priceTextColor ?? R.colors.appColor,
                  fontWeight: '700',
                }}>
                {props.price}
              </Text>
              <Text
                style={{
                  marginHorizontal: R.fontSize.Size5,
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size22,
                  color: props.slashTextColor ?? R.colors.primaryTextColor,
                  fontWeight: '700',
                }}>
                {'/'}
              </Text>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size22,
                  color: props.noTextColor ?? R.colors.primaryTextColor,
                  fontWeight: '700',
                  marginRight: R.fontSize.Size5,
                }}>
                {props.noText}
              </Text>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size15,
                  color: props.monthTextColor ?? R.colors.primaryTextColor,
                  fontWeight: '400',
                }}>
                {props.month}
              </Text>
            </View>
            <View
              style={{
                padding: R.fontSize.Size5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                onPress={props.onPressAdd}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    padding: R.fontSize.Size4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Image
                  source={R.images.activeAddIcon}
                  style={{
                    height: R.fontSize.Size18,
                    width: R.fontSize.Size18,
                  }}
                  resizeMode={'contain'}
                />
              </Pressable>
            </View>
          </View>
          {props.bottomButton}
        </View>
      </Pressable>
    );
}

export default SubscriptionCard