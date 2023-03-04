import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  FlatList
} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {connect,useDispatch} from 'react-redux';
import {Config} from '../../config';
import styles from './styles';
import { ConnectedUsersRequest } from '../../actions/connectedUser.action';

const ConnectionScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [connectedUserList, setConnectedUserList] = useState([]);
  const [myUserId, setMyUserId] = useState('');

  useEffect(() => {
    console.log('USER ID', props.userProfile?.Profile?.user_id);
    onCallConnectedUserAPI();
  }, [props.navigation]);

  const onCallConnectedUserAPI = () => {
    setLoading(true);
    dispatch(ConnectedUsersRequest(response=>{
      console.log("Connected User List Response",response)
      if (response.status == 'success') {
        setLoading(false);
        setConnectedUserList(response?.result);
        setMyUserId(props.userProfile?.Profile?.user_id);
      } else {
        setLoading(false);
      }
    }))

  //   console.log(`${Config.API_URL}${Config.connectedUsersAPI}`);
  //   console.log(props.authToken);

  //  setLoading(true);
  //  let headerAuth = {
  //    token: props.authToken,
  //  };

  //   const headers = headerAuth;
  //   const config = {
  //     method: 'POST',
  //     headers,
  //   };

  //  fetch(`${Config.API_URL}${Config.connectedUsersAPI}`, config)
  //    .then(res => res.json())
  //    .then(response => {
  //      console.log('RES conn', response);
  //      if (response.status == 'success') {
  //        setLoading(false);
  //        setConnectedUserList(response.data?.connected);
  //        setMyUserId(response.data?.userId);
  //      } else {
  //        setLoading(false);
  //      }
  //    })
  //    .catch(error => {
  //      console.log('ERRORONAPI', error);
  //     setLoading(false);
  //    })
  };

  return (
    <StoryScreen loading={loading}>
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={'User Connections'}
      />
      <View style={styles.topLineView}/>
      <View style={{flex:1}}>
        <FlatList
          style={styles.flatView}
          data={connectedUserList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Pressable
                key={index}
                onPress={() =>
                  props.navigation.navigate('ChatScreen', {
                    tailentUserId: item?.user_id,
                    MyUserId: myUserId,
                    userName: item?.username,
                    userItem: item,
                    fireID:
                      item?.user_id > myUserId
                        ? myUserId + '+' + item?.user_id
                        : item?.user_id + '+' + myUserId,
                  })
                }
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
                <View style={styles.IconView}>
                  <Image
                    source={{
                      uri: `${Config.API_URL}${item?.avatar?.replace(
                        'http://localhost:8080/',
                        '',
                      )}`,
                    }}
                    style={styles.iconImage}
                    resizeMode={'cover'}
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.userNameText}>
                    {item?.username}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyView}>
                <Text style={styles.emptyText}>
                  {'You have no connections'}
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
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps)(ConnectionScreen);
