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
                opacity: pressed?0.5:1,
                
            }]}
            >
                <Image
                    source={props.leftSource}
                    style={{height:R.fontSize.Size20,width:R.fontSize.Size20}}
                    resizeMode={'contain'}
                />
            </Pressable>
            <View
            style={{flex:1, marginHorizontal:R.fontSize.Size20,alignItems:'center',flexDirection:'row'}}
            >   
                {props.headIcon}
                <Text 
                style={{fontFamily:R.fonts.regular,
                color:R.colors.primaryTextColor,
                fontSize:R.fontSize.Size16,
                fontWeight:'700',
                }}
                >{props.title}</Text>
            </View>

        </View>
    )
}

export default Header