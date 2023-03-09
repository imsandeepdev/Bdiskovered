import {View, Text, Image, Pressable} from 'react-native';
import R from '../res/R';

const ShadowHeader = props => {
  return (
    <View style={{overflow: 'hidden'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: R.fontSize.Size2,
          backgroundColor: '#fff',
          height: props.headerHeight ?? R.fontSize.Size50,
          // shadowColor: '#000',
          // shadowOffset: {width: 1, height: 1},
          // shadowOpacity: 0.4,
          // shadowRadius: 3,
          // elevation: 5,
          borderBottomWidth: props.headerBottomWidth ?? null,
          borderColor:R.colors.placeholderTextColor
        }}>
        <View style={{flex: 1}}>
          <Pressable
            onPress={props.onPress}
            style={({pressed}) => [
              {
                height: R.fontSize.Size40,
                width: R.fontSize.Size40,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.5 : 1,
              },
            ]}>
            <Image
              source={props.leftSource}
              style={{height: R.fontSize.Size20, width: R.fontSize.Size20}}
              resizeMode={'contain'}
            />
          </Pressable>
        </View>
        <View
          style={{
            marginHorizontal: R.fontSize.Size12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={props.rightSourceOnPress}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.5 : 1,
                marginRight: props.marginRightSource ?? R.fontSize.Size35,
                padding: R.fontSize.Size2,
                
              },
            ]}>
            <Image
              source={props.rightSource}
              style={{height: R.fontSize.Size18, width: R.fontSize.Size18}}
              resizeMode={'contain'}
            />
          </Pressable>
          {props.rightTitle}
          <Pressable
            onPress={props.rightSourceOnPress2}
            style={({pressed}) => [
              {
                opacity: pressed ? 0.5 : 1,
                padding: R.fontSize.Size2,
              },
            ]}>
            <Image
              source={props.rightSource2}
              style={{height: R.fontSize.Size20, width: R.fontSize.Size20}}
              resizeMode={'contain'}
            />
            {props.rightSourceExtraView}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ShadowHeader;
