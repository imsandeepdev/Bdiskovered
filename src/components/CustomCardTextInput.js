import {View, Pressable, Text, Image, TextInput} from 'react-native'
import R from '../res/R'

const CustomCardTextInput = (props) => {
    return (
      <View
        style={{
          overflow: 'hidden',
          paddingBottom: R.fontSize.Size4,
          paddingRight: R.fontSize.Size4,
          paddingLeft: R.fontSize.Size2,
          borderRadius: R.fontSize.Size5,
        }}>
        <Pressable
          onPress={props.onPress}
          style={({pressed}) => [
            {
              height: R.fontSize.Size50,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: R.fontSize.Size5,
              shadowColor: '#000',
              backgroundColor: props.backgroundColor ?? R.colors.white,
              borderRadius: R.fontSize.Size5,
              alignItems: 'center',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2.84,
              elevation: 5,
              paddingHorizontal: R.fontSize.Size15,
              opacity: pressed ? 0.5 : 1,
              marginBottom: props.marginBottom ?? R.fontSize.Size20,
            },
          ]}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput
              style={{
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
        </Pressable>
      </View>
    );
}

export default CustomCardTextInput