import * as React from 'react';
import {View, TextInput, Pressable, Image, Text, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import {AppButton, CustomCardView, StoryScreen}from '../../components'
import R from '../../res/R';

const screenWidth = Dimensions.get('screen').width



const UpdateProfileScreen = () => {



    return(
        <StoryScreen>
            <SafeAreaView
            style={{flex:1}}
            >
            <ScrollView
            contentContainerStyle={{flexGrow:1}}
            showsVerticalScrollIndicator={false}
            >
            <View style={{flex:1, paddingHorizontal:R.fontSize.Size20}}>
                <View
                style={{marginTop:R.fontSize.Size30, flexDirection:'row', alignItems:'center'}}
                >
                    <View
                    style={{height:R.fontSize.Size110,width:R.fontSize.Size110,alignItems:'center',justifyContent:'center'}}
                    >
                        
                        <Image
                            source={{uri:'https://f.hubspotusercontent10.net/hubfs/4992313/img_Blog_Hero_HowTo_024@2x-min.jpg'}}
                            style={{height:R.fontSize.Size100, width:R.fontSize.Size100, borderRadius:R.fontSize.Size50}}
                            resizeMode={'cover'}
                        />
                        <View
                        style={{position:'absolute', top:-2, right:-15,alignItems:'center',justifyContent:'center'}}
                        >
                            <Pressable
                            onPress={()=> console.log('editProfile')}
                            style={({pressed})=>[{
                                padding: R.fontSize.Size5,
                                opacity: pressed ? 0.5: 1,
                                alignItems:'center',
                                justifyContent:'center'
                            }]}
                            >
                                <Image
                                    source={R.images.profileEditIcon}
                                    style={{height:R.fontSize.Size22, width:R.fontSize.Size22}}
                                    resizeMode={'contain'}
                                />
                            </Pressable>
                        </View>
                    </View>
                    <View
                    style={{flex:1, alignItems:'center',justifyContent:'center'}}
                    >
                        <AppButton
                            title={'Update Profile'}
                            textColor = {R.colors.white}
                        />

                    </View>
                </View>
                <View
                style={{marginTop:R.fontSize.Size40,flex:1, borderWidth:1}}
                >

                </View>
            </View>
            </ScrollView>
            </SafeAreaView>
        </StoryScreen>   
    )
}

export default UpdateProfileScreen;