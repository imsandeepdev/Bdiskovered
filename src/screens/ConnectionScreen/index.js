import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Image, SafeAreaView, Text, Pressable, FlatList, Dimensions} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import { Connect, useDispatch } from 'react-redux';
import { ConnectedUsersRequest } from '../../actions/connectedUser.action';
import { Config } from '../../config';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;


const ConnectionScreen = props => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [connectedUserList, setConnectedUserList] = useState([])

  useEffect(() => {

    onCallConnectedUserAPI()

  },[props.navigation]);

  const onCallConnectedUserAPI = () => {
    dispatch(ConnectedUsersRequest(response=>{
        console.log('Connected User Res',response)
        if(response.status=='success')
        {
            setLoading(false)
            setConnectedUserList(response.data?.connected)
        }
        else
        {
            setLoading(false);

        }
    }))
  }


  return (
    <StoryScreen loading={loading}>
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={'User Connections'}
      />
        <View
        style={{height:R.fontSize.Size2, backgroundColor:R.colors.placeholderTextColor,width:'100%'}}
        />
      <View
        style={{
          flex: 1,
          paddingHorizontal: R.fontSize.Size20,
        }}>
        <FlatList
            style={{flex:1}}
            data={connectedUserList}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item,index}) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => console.log('Pressed')}
                    style={({pressed}) => [
                      {
                        paddingVertical: R.fontSize.Size6,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: R.colors.placeholderTextColor,
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}>
                    <View
                      style={{
                        height: R.fontSize.Size55,
                        width: R.fontSize.Size55,
                        borderRadius: R.fontSize.Size30,
                        borderWidth: 1,
                        borderColor: R.colors.placeholderTextColor,
                        overflow: 'hidden',
                      }}>
                      <Image
                        source={{uri:`${Config.API_URL}${item?.avatar.slice(22)}`}}
                        style={{
                          height: R.fontSize.Size50,
                          width: R.fontSize.Size50,
                        }}
                        resizeMode={'cover'}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginLeft: R.fontSize.Size15,
                      }}>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size15,
                          fontWeight: '700',
                          color: R.colors.primaryTextColor,
                        }}>
                        {item?.name}
                      </Text>
                    </View>
                  </Pressable>
                );
            }}
            ListEmptyComponent={()=>{
              return(
                <View
                style={{alignItems:'center',justifyContent:'center',height:screenHeight/1.2, width:'100%'  }}
                >
                  <Text
                  style={{fontFamily:R.fonts.regular,fontSize:R.fontSize.Size14, fontWeight:'700', color:R.colors.placeHolderColor}}
                  >{'You have No connections'}</Text>
                </View>  
              )
            }}
        />
        
      </View>
    </StoryScreen>
  );
};

export default ConnectionScreen;
