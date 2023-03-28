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
    
     const unsubscribe = props.navigation.addListener('focus', () => {
       screenFocus();
     });
     return unsubscribe;
  }, [props.navigation]);

  const screenFocus = () => {
    console.log('USER ID', props.userProfile?.Profile?.user_id);
    onCallConnectedUserAPI();
  }

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

  };

  return (
    <StoryScreen loading={loading}>
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={'Connections'}
        title_justifyContent={'center'}
        title_marginRight={R.fontSize.Size70}
      />
      {/* <View style={styles.topLineView} /> */}
      <View style={{flex: 1}}>
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
                    connect_status: item?.connect_status,
                    comm_id:item?.communication_id,
                    fireID: item?.communication_id,
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
                <View>
                  <View style={styles.IconView}>
                    {item?.avatar != '' &&
                    item?.avatar != Config.USER_PROFILE_URL ? (
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
                    ) : (
                      <Image
                        source={R.images.inActiveProfileIcon}
                        style={styles.iconImage}
                        resizeMode={'contain'}
                      />
                    )}
                  </View>

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                    }}>
                    <View
                      style={{
                        height: R.fontSize.Size16,
                        width: R.fontSize.Size16,
                        borderRadius: R.fontSize.Size10,
                        borderWidth: 2,
                        backgroundColor:
                          item?.user_status == 'available'
                            ? R.colors.whatsAppColor
                            : R.colors.redColor,
                        borderColor: R.colors.white,
                      }}
                    />
                  </View>
                </View>
                {/* <View style={styles.IconView}>
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
                </View> */}
                <View style={styles.textView}>
                  <Text style={styles.userNameText}>{item?.username}</Text>
                  <Text
                    style={[
                      styles.userNameText,
                      {fontWeight: '400', color: R.colors.placeholderTextColor},
                    ]}>
                    {item?.message}
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

export default connect(mapStateToProps)(ConnectionScreen);
