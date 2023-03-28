import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList
} from 'react-native';
import {
  Header,
  StoryScreen,
  VideoCard,
} from '../../components';
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import { SavedPostListRequest } from '../../actions/savedPost.action';
import { Config } from '../../config';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const SavedPostList = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [savedVideoList, setSavedVideoList] = useState([])

    useEffect(()=>{

       const unsubscribe = props.navigation.addListener('focus', () => {
         onCallSavedPostAPI();
       });
       return unsubscribe;
       

    },[props.navigation])

    const onCallSavedPostAPI = () => {
        // setLoading(true)
        dispatch(SavedPostListRequest(response=>{
            console.log('SAVED POST LIST RESPONSE', response)
            if(response.status == 'success')
            {
            setSavedVideoList(response?.Post);
            // setLoading(false);
            }
        }))
    }

    

    return (
      <StoryScreen loading={props.loading}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
            title={'Saved Posts'}
            title_justifyContent={'center'}
            title_marginRight={R.fontSize.Size70}
          />
          <View
            style={{
              flex: 1,
              paddingHorizontal: R.fontSize.Size10,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <FlatList
              style={{flex: 1}}
              numColumns={3}
              data={savedVideoList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
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
                          fromScreen: 'SavedPostListScreen',
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
                        shareFiled={true}
                        playButtonVisible={true}
                      />
                    </Pressable>
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      justifyContent: 'center',
                      height: screenHeight / 1.2,
                      width: screenWidth,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size12,
                        color: R.colors.placeHolderColor,
                        fontWeight: '500',
                      }}>
                      {'You have no saved posts'}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}

const mapStateToProps = (state, props) => ({
  loading:state.savedPostRoot.loading
    
});

export default connect(mapStateToProps)(SavedPostList)
