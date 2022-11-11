import * as React from 'react';
import {View, Pressable, Text,Modal,Image} from 'react-native';
import R from '../res/R';


const AlartModal = (props) => {
    return (
      <Modal
        visible={props.visible}
        transparent={true}
        onRequestClose={props.onRequestClose}>
            <View
            style={{
                flex:1,
                backgroundColor:R.colors.modelBackground,
                justifyContent:'center'
            }}>
                <View
                style={{
                    backgroundColor:R.colors.white, 
                    borderRadius:R.fontSize.Size8,
                    // borderTopLeftRadius:R.fontSize.Size8,
                    // borderTopRightRadius:R.fontSize.Size8 ,
                    padding:R.fontSize.Size20, 
                    paddingBottom:R.fontSize.Size20,
                    marginHorizontal:R.fontSize.Size15,
                    paddingVertical:R.fontSize.Size20
                }}
                >
                    <View
                    style={{alignItems:'center',justifyContent:'center'}}>
                        <Image
                         source={R.images.appLogoBold}
                         style={{height:R.fontSize.Size50,width:R.fontSize.Size200}}
                         resizeMode={'contain'}
                        />
                    </View>
                    <View style={{marginVertical:R.fontSize.Size12, marginHorizontal:R.fontSize.Size20}}>
                        <Text
                        style={{
                            fontFamily:R.fonts.regular,
                            fontWeight:'700',
                            color:R.colors.primaryTextColor,
                            fontSize:R.fontSize.Size16,
                            textAlign:'center'
                        }}
                        >
                            {props.title}
                        </Text>
                    </View>
                   {
                   props.customButton ??
                   <Pressable
                    onPress={props.onPress}
                    style={({pressed})=>[{
                        marginVertical:R.fontSize.Size4,
                        backgroundColor:R.colors.appColor,
                        height:R.fontSize.Size45,
                        borderRadius:R.fontSize.Size8,
                        alignItems:'center',
                        justifyContent:'center',
                        opacity: pressed ? 0.5 :1
                    }]}
                    >
                        <Text style={{
                            fontFamily:R.fonts.regular,
                            color:R.colors.white,
                            fontWeight:'700',
                            fontSize:R.fontSize.Size16
                        }}>{'OK'}</Text>
                    </Pressable>}


                </View>

            </View>
        </Modal>
    );
}

export default AlartModal