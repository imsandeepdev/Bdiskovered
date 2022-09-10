import {View, Text, Image, Pressable} from 'react-native';
import R from '../res/R';

const ShadowHeader = props => {
  return (
     <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
    <View
      style={{
        flexDirection: 'row',
        height: R.fontSize.Size50,
        alignItems: 'center',
        paddingHorizontal: R.fontSize.Size2,
        backgroundColor: '#fff',
       
        height: R.fontSize.Size50,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}>
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
    </View>
  );
};

export default ShadowHeader;
