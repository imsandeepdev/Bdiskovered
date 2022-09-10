import {View, Text, Image, Pressable} from 'react-native';
import R from '../res/R';


const Header = (props) => {
    return(
        <View
        style={{flexDirection:'row', height:R.fontSize.Size50,alignItems:'center',paddingHorizontal:R.fontSize.Size2}}
        >
            <Pressable
            onPress={props.onPress}
            style={({pressed})=>[{
                height:R.fontSize.Size40,
                width:R.fontSize.Size40,
                alignItems:'center',
                justifyContent:'center',
                opacity: pressed?0.5:1
            }]}
            >
                <Image
                    source={props.leftSource}
                    style={{height:R.fontSize.Size8,width:R.fontSize.Size14,transform:[{rotate:'90deg'}]}}
                    resizeMode={'contain'}
                />
            </Pressable>

        </View>
    )
}

export default Header