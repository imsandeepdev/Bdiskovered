import {View, Pressable,Image,TextInput,Text} from 'react-native';
import R from '../res/R';

const CustomTimeCard = (props) => {
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
            marginBottom: R.fontSize.Size20,
          }}>
          <Pressable
            onPress={props.fullTimeOnPress}
            style={({pressed}) => [
              {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                color: props.fullTimeTextColor ?? R.colors.appColor,
                fontWeight: '700',
                fontSize: R.fontSize.Size15,
              }}>
              {'Full Time'}
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
            onPress={props.partTimeOnPress}
            style={({pressed}) => [
              {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                color: props.partTimeTextColor ?? R.colors.appColor,
                fontWeight: '700',
                fontSize: R.fontSize.Size15,
              }}>
              {'Part Time'}
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
            onPress={props.gigsOnPress}
            style={({pressed}) => [
              {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                color: props.gigsTextColor ?? R.colors.appColor,
                fontWeight: '700',
                fontSize: R.fontSize.Size15,
              }}>
              {'Gigs'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
}

export default CustomTimeCard