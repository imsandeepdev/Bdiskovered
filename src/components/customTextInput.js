import {View, Pressable,Text, Image, StyleSheet, TextInput} from 'react-native'
import R from '../res/R'
import CountryFlag from 'react-native-country-flag';

const CustomTextInput = (props) => {
    return (
      <View
        style={{
          overflow: 'hidden',
          paddingBottom: R.fontSize.Size4,
          paddingRight: R.fontSize.Size4,
          paddingLeft: R.fontSize.Size2,
          borderRadius: R.fontSize.Size5,
        }}>
        <View
          style={{
            height: R.fontSize.Size50,
            flexDirection: 'row',
            shadowColor: '#000',
            backgroundColor: R.colors.white,
            borderRadius: R.fontSize.Size5,
            alignItems: 'center',
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 2.84,
            elevation: 5,
            marginBottom: props.marginBottom ?? 0,
          }}>
          <Pressable
            onPress={props.onChangeCounty}
            style={({pressed}) => [
              {
                flexDirection: 'row',
                marginHorizontal: R.fontSize.Size10,
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: pressed ? 0.5 : 1,
                height: '100%',
              },
            ]}>
            <Image
              source={R.images.chevronDown}
              style={{
                height: R.fontSize.Size5,
                width: R.fontSize.Size8,
                marginRight: R.fontSize.Size5,
              }}
              resizeMode={'contain'}
            />
            <CountryFlag isoCode={props.countryFlag ?? 'in'} size={20} />
            <View
              style={{
                width: 1,
                height: R.fontSize.Size25,
                backgroundColor: R.colors.placeHolderColor,
                marginHorizontal: R.fontSize.Size6,
              }}
            />
            <Text
              style={{
                fontFamily: R.fonts.regular,
                color: R.colors.appColor,
                fontWeight: '700',
                fontSize: R.fontSize.Size15,
              }}>
              {props.countryCode}
            </Text>
          </Pressable>

          <View
            style={{
              paddingHorizontal: R.fontSize.Size10,
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={{flex: 1}}>
              <TextInput
                style={{
                  height: '100%',
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size15,
                  letterSpacing: 1,
                  fontWeight: '700',
                  color: R.colors.placeHolderColor,
                }}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                keyboardType={'number-pad'}
                value={props.value}
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
              />
            </View>
            <View>
              <Image
                source={props.rightIcon}
                style={{height: R.fontSize.Size14, width: R.fontSize.Size14}}
                resizeMode={'contain'}
              />
            </View>
          </View>
        </View>
      </View>
    );
}

export default CustomTextInput