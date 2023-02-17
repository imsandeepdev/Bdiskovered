import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  Alert
} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {connect, Connect, useDispatch} from 'react-redux';
import {ConnectedUsersRequest} from '../../actions/connectedUser.action';
import {Config} from '../../config';
import axios from 'axios';
import { BlockUserListRequest, UnblockUserRequest } from '../../actions/block.action';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import Toast from 'react-native-simple-toast';

const BlockUserScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [blockUserList, setBlockUserList] = useState([]);

  useEffect(() => {
    onBlockUserAPI();
  }, [props.navigation]);

  const onBlockUserAPI = () =>{
    setLoading(true)
    dispatch(BlockUserListRequest(response => {
        console.log("Block user list response", response)
        setBlockUserList(response.data?.block_list);
        setLoading(false)
    }))
  }

   const onUnblockAlart = (userId) => {
     Alert.alert(
       'Unblock User!',
       `Are you sure want to unblock this user ?`,
       [
         {
           text: 'YES',
           onPress: () => onCallUnblockUserAPI(userId),
         },
         {
           text: 'CANCEL',
         },
       ],
       {
         cancelable: true,
       },
     );
   };

   const onCallUnblockUserAPI = (userId) => {
    let data = {
      blockId: userId
    };
    setLoading(true);

    dispatch(UnblockUserRequest(data, response => {
        console.log("Unblock Response", response)
        if(response.status == 'success')
        {
            Toast.show(response.message, Toast.SHORT)
            onBlockUserAPI()
        }
        else
        {
            Toast.show(response.message, Toast.SHORT);
            setLoading(false)
        }
    }))
   }

  return (
    <StoryScreen loading={loading}>
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={'Blocked Users'}
      />
      <View
        style={{
          height: R.fontSize.Size2,
          backgroundColor: R.colors.placeholderTextColor,
          width: '100%',
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}
          data={blockUserList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                onPress={() => onUnblockAlart(item?._id)}
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
                    source={{
                      uri: `${Config.API_URL}${item?.avatar.replace(
                        'http://localhost:8080/',
                        '',
                      )}`,
                    }}
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
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: screenHeight / 1.2,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size14,
                    fontWeight: '700',
                    color: R.colors.placeHolderColor,
                  }}>
                  {'No blocked users'}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </StoryScreen>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps)(BlockUserScreen);
