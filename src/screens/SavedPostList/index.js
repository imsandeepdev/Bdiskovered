import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList
} from 'react-native';
import {
  AlartModal,
  AppButton,
  FullViewStoryScreen,
  Header,
  StoryScreen,
  VideoCard,
} from '../../components';
import R from '../../res/R';
import {connect, Connect, useDispatch} from 'react-redux';
import { SavedPostListRequest } from '../../actions/savedPost.action';
import { Config } from '../../config';
import axios from 'axios';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const SavedPostList = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [savedVideoList, setSavedVideoList] = useState([])

    useEffect(()=>{

        onCallSavedPostAPI()

    },[props.navigation])

    const onCallSavedPostAPI = () => {
        setLoading(true)
        dispatch(SavedPostListRequest(response=>{
            console.log('SAVED POST LIST RESPONSE', response?.Post)
            if(response.status == 'success')
            {
            setSavedVideoList(response?.Post);
            setLoading(false);
            }
        }))
    }

    

    return (
      <StoryScreen loading={loading}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
            title={'Saved Post'}
          />
          <View style={{flex: 1,paddingHorizontal:R.fontSize.Size10}}>
           
              <FlatList    
                style={{ flex:1,}}
                numColumns={3}
                data={savedVideoList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                  console.log(item);
                  return (
                    <View
                      style={{
                        marginHorizontal: R.fontSize.Size2,
                        marginTop: R.fontSize.Size4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      key={index}>
                      <Pressable
                        onPress={() =>
                          props.navigation.navigate('FilterVideoScreen', {
                            playIndex: index,
                            videoItems: savedVideoList,
                            fromScreen: 'SavedPostListScreen' 
                          })
                        }
                        style={({pressed}) => [
                          {
                            opacity: pressed ? 0.5 : 1,
                            width: screenWidth / 3.6,
                            height: screenWidth / 3,
                            borderRadius: R.fontSize.Size5,
                            margin: R.fontSize.Size5,
                            overflow: 'hidden',
                          },
                        ]}>
                        <VideoCard
                          videoUrl={`${Config.API_URL}${item?.post.replace(
                            'http://localhost:8080/',
                            '',
                          )}`}
                          paused={true}
                        />
                      </Pressable>
                    </View>
                  );
                }}
                ListEmptyComponent={()=>{
                    return(
                        <View
                        style={{flex:1, alignItems:'center', justifyContent:'center'}}
                        >
                            <Text
                            style={{fontFamily:R.fonts.regular,
                            fontSize:R.fontSize.Size12,
                            color:R.colors.placeHolderColor,
                            textAlign:'center',
                            fontWeight:'500'
                            }}
                            >{'No have saved post'}</Text>
                        </View>    
                    )
                }}
              />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}

export default SavedPostList
