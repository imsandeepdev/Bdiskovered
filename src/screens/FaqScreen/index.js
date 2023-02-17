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
  Alert,
} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
import {connect, Connect, useDispatch} from 'react-redux';
import {ConnectedUsersRequest} from '../../actions/connectedUser.action';
import {Config} from '../../config';
import axios from 'axios';
import {
  BlockUserListRequest,
  UnblockUserRequest,
} from '../../actions/block.action';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import Toast from 'react-native-simple-toast';

const FaqScreen = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [blockUserList, setBlockUserList] = useState([]);

  useEffect(() => {
  }, [props.navigation]);


 

  return (
    <StoryScreen loading={loading}>
      <Header
        onPress={() => props.navigation.goBack()}
        leftSource={R.images.chevronBack}
        title={props.route.params?.from}
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
          paddingHorizontal: R.fontSize.Size18,
        }}>
        {props.route.params?.from == 'FAQ' ? (
          <View style={{flex: 1}}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                color: R.colors.primaryTextColor,
                fontSize: R.fontSize.Size16,
                fontWeight:'700',
                marginTop:R.fontSize.Size10
              }}>
              {'What is BDiskover?'}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                color: R.colors.primaryTextColor,
                fontSize: R.fontSize.Size16,
              }}>
              {`
BDISKOVERED is a global talent discovery portal that links incredible talent with life-changing opportunities and connections.
Whether you are a singer or a poet, a dancer or a chef, we will HELP THE WORLD find you and give you the platform you need to succeed.
Everyone deserves the same opportunities to excel, yet too many are left behind because of who they are or where they are from. As a consequence of this, the whole world is missing out on the creativity, innovation, and talent that would otherwise enrich our lives.
BDISKOVERED is here to change that.
                `}
            </Text>
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontWeight: '700',
                fontSize: R.fontSize.Size18,
                color: R.colors.primaryTextColor,
                textAlign: 'center',
              }}>
              {'Contact us via'}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size14,
                color: R.colors.placeHolderColor,
                textAlign: 'center',
                marginTop: R.fontSize.Size8,
              }}>
              {'feedback@bdiskovered.com'}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontWeight: '700',
                fontSize: R.fontSize.Size16,
                color: R.colors.primaryTextColor,
                textAlign: 'center',
                marginTop: R.fontSize.Size8,
              }}>
              {'+971 50 659 0336'}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontWeight: '700',
                fontSize: R.fontSize.Size16,
                color: R.colors.primaryTextColor,
                textAlign: 'center',
                marginTop: R.fontSize.Size8,
              }}>
              {'Lavel 1, Gate Avenue, South Zone, DIFC, Dubai, UAE'}
            </Text>
          </View>
        )}
      </View>
    </StoryScreen>
  );
};

const mapStateToProps = (state, props) => ({
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStateToProps)(FaqScreen);
