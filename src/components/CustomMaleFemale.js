import {View, Pressable,Image,TextInput,Text} from 'react-native';
import R from '../res/R';


const CustomMaleFemale = (props) => {
    return (
      <View
        style={{
          overflow: 'hidden',
          paddingBottom: 3,
          paddingRight: 2,
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
            marginBottom: R.fontSize.Size20,
          }}>
          <Pressable
            onPress={props.maleOnPress}
            style={({pressed}) => [
              {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <Image
              source={props.maleIcon}
              style={{height: R.fontSize.Size20, width: R.fontSize.Size10}}
              resizeMode={'contain'}
            />
            <Text
              style={{
                fontFamily: R.fonts.regular,
                color: props.maleTextColor ?? R.colors.appColor,
                fontWeight: '700',
                fontSize: R.fontSize.Size15,
              }}>
              {'Male'}
            </Text>
          </Pressable>
          <View
            style={{
              height: R.fontSize.Size30,
              width: 1,
              backgroundColor: R.colors.placeholderTextColor,
            }}
          />
          <Pressable
            onPress={props.feMaleOnPress}
            style={({pressed}) => [
              {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                color: props.feMaleTextColor ?? R.colors.appColor,
                fontWeight: '700',
                fontSize: R.fontSize.Size15,
              }}>
              {'Female'}
            </Text>
            <Image
              source={props.feMaleIcon}
              style={{height: R.fontSize.Size20, width: R.fontSize.Size10}}
              resizeMode={'cover'}
            />
          </Pressable>
        </View>
      </View>
    );
}

export default CustomMaleFemale