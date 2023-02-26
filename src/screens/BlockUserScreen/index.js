import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  FlatList,
  Alert
} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {connect, useDispatch} from 'react-redux';
import {Config} from '../../config';
import { BlockUserListRequest, UnblockUserRequest } from '../../actions/block.action';
import Toast from 'react-native-simple-toast';
import styles from './styles';

const BlockUserScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [blockUserList, setBlockUserList] = useState([]);

  useEffect(() => {
    onBlockUserAPI();
  }, [props.navigation]);

  const onBlockUserAPI = () =>{
    // setLoading(true)
    dispatch(BlockUserListRequest(response => {
        setBlockUserList(response.data?.block_list);
        // setLoading(false)
    }))
  }

   const onUnblockAlart = (userId) => {
     Alert.alert(
       'Unblock User!',
       `Are you sure want to unblock this user ?`,
       [
         {
           text: 'Proceed',
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
    dispatch(UnblockUserRequest(data, response => {
        console.log("Unblock Response", response)
        if(response.status == 'success')
        {
            onBlockUserAPI()
        }
        else
        {
            Toast.show(response.message, Toast.SHORT);
        }
    }))
   }

  return (
    <StoryScreen loading={props.loading}>
      
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={'Blocked Users'} 
      />
      <View style={styles.mainView}/>
      <View style={{flex: 1}}>
        <FlatList
          style={styles.flatStyle}
          data={blockUserList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                onPress={() => onUnblockAlart(item?._id)}
                style={({pressed}) => [
                  styles.pressView,
                  {opacity: pressed ? 0.5 : 1}
                ]}>
                <View style={styles.imageView}>
                  <Image
                    source={{
                      uri: `${Config.API_URL}${item?.avatar.replace(
                        'http://localhost:8080/',
                        '',
                      )}`,
                    }}
                    style={styles.image}
                    resizeMode={'cover'}
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.text}>
                    {item?.name}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyView}>
                <Text style={styles.emptyText}>
                  {'No blocked users'}
                </Text>
              </View>
            )
          }}
        />
      </View>
    </StoryScreen>
  );
};

const mapStateToProps = (state, props) => ({
  loading: state.blockRoot.loading,
});

export default connect(mapStateToProps)(BlockUserScreen);
