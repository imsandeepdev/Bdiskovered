import * as react from 'react';
import {useState, useEffect} from 'react';
import {Text, View, Pressable, Image, SafeAreaView,TextInput} from 'react-native';
import { StoryScreen, Header, AppButton, CustomCardView } from '../../components';
import R from '../../res/R';
import Styles from './styles';

const AccountType = [
    {id:'1', title:'Business'},
    {id:'2', title:'Talent'},
    {id:'3', title:'Viewer'}

]

const UserTypeScreen = (props) => {

    const [selectedUser, setSelectedUser] = useState('')
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [userType, setUserType] = useState('')

    const onCallUserSelect = (item) => {

        let tempValue = item?.id
        if(tempValue == item.id)
        {
            setSelectedUser(item?.id)
            setUserType(item?.title)
        }

    }

    return (
      <StoryScreen>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
          />
          <View style={Styles.mainView}>
            <View style={{flex: 1}}>
              <View style={{marginTop: R.fontSize.Size50}}>
                <Text style={Styles.userselectionText}>{'User Selection'}</Text>
                <Text
                  style={[
                    Styles.accountTypeText,
                    {marginTop: R.fontSize.Size10},
                  ]}>
                  {'Select Account Type'}
                </Text>
              </View>
              <View style={{marginTop: R.fontSize.Size30}}>
                {AccountType.map((item, index) => {
                  return (
                    <CustomCardView
                      key={index}
                      onPress={() => onCallUserSelect(item)}
                      backgroundColor={
                        selectedUser == item?.id
                          ? R.colors.PrimaryApp_color
                          : R.colors.white
                      }
                      title={item.title}
                      TextColor={
                        selectedUser == item?.id
                          ? R.colors.white
                          : R.colors.primaryTextColor
                      }
                      rightIcon={R.images.checkWhiteIcon}
                    />
                  );
                })}
              </View>
              <View
                style={{
                  marginTop: R.fontSize.Size45,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[Styles.termsText]}>
                  {'Accept '}
                  <Text
                    onPress={() => console.log('Terms')}
                    style={{color: R.colors.appColor}}>
                    {'Terms & Conditions'}
                  </Text>
                  <Text> {'of usage.'}</Text>
                </Text>
                <Pressable
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  style={({pressed}) => [
                    {
                      height: R.fontSize.Size20,
                      width: R.fontSize.Size20,
                      borderRadius: R.fontSize.Size4,
                      borderWidth: 1,
                      borderColor: acceptTerms
                        ? R.colors.appColor
                        : R.colors.placeHolderColor,
                      padding: R.fontSize.Size4,
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}></Pressable>
              </View>
            </View>

            <AppButton
              onPress={() =>
                props.navigation.navigate('SignupScreen', {
                  from: userType,
                })
              }
              marginHorizontal={R.fontSize.Size35}
              title={'Proceed'}
            />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}
export default UserTypeScreen