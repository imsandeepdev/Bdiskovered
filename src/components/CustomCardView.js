import {View, Pressable, Text, Image} from 'react-native'
import R from '../res/R'

const CustomCardView = (props) => {
    return(
       
            <Pressable
            onPress={props.onPress}
            style={({pressed})=>[{
                marginHorizontal: props.marginHorizontal ?? 0,
                height:R.fontSize.Size45,
                flexDirection:'row',
                alignItems:'center',
                borderRadius:R.fontSize.Size5,
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
                paddingHorizontal:R.fontSize.Size15,
                opacity: pressed ? 0.5:1,
                marginBottom: props.marginBottom ?? R.fontSize.Size20
            }]}
            >
                <View
                style={{flex:1,justifyContent:'center'}}
                >
                    <Text
                    style={{
                        fontFamily:R.fonts.regular,
                        fontSize:R.fontSize.Size15,
                        color: props.TextColor ??  R.colors.white,
                        fontWeight:'700' 
                    }}
                    >{props.title}</Text>
                </View>
                <View>
                    <Image
                        source={props.rightIcon}
                        style={{height:R.fontSize.Size12,width:R.fontSize.Size12}}
                        resizeMode={'contain'}
                    />
                </View>

            </Pressable>
      
    )
}

export default CustomCardView