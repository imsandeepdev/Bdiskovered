import * as react from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  StoryScreen,
  Header,
  AppButton,
  CustomCardView,
  CustomTimeCard,
} from '../../components';
import R from '../../res/R';
import Styles from './styles';

const TalentFinishScreen = props => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selected, setSelected] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectetTailent, setSelectedTailent] = useState([]);
  const [selectTime, setSelectTime] = useState('Full');
  const [data, setData] = useState([
    {id: '1', title: 'Music'},
    {id: '2', title: 'Art'},
    {id: '3', title: 'Dance'},
    {id: '4', title: 'Fashion'},
  ]);

  useEffect(() => {
    let arr = data.map((item, index) => {
      item.selected = false;
      return {...item};
    });
    console.log('ARRNEWITEM', arr);
    setData(arr);
  }, [props.navigation]);

  const onCallUserSelect = (item, ind) => {
    const dummyData = data;
    let arr = dummyData.map((item, index) => {
      if (ind == index) {
        item.selected = !item.selected;
      }
      return {...item};
    });
    console.log('arr return', arr);
    setData(arr);
  };

  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
        />
        <View style={Styles.mainView}>
          <View style={{flex: 1}}>
            <FlatList
              contentContainerStyle={{flexGrow: 1}}
              data={data}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View
                  style={{
                    marginTop: R.fontSize.Size50,
                    marginHorizontal: R.fontSize.Size5,
                    marginBottom: R.fontSize.Size30,
                  }}>
                  <Text style={Styles.userselectionText}>
                    {'Content Selection'}
                  </Text>
                  <Text
                    style={[
                      Styles.accountTypeText,
                      {marginTop: R.fontSize.Size10},
                    ]}>
                    {'Select Type of Talent to View'}
                  </Text>
                  <Text
                    style={[
                      Styles.userselectionText,
                      {marginTop: R.fontSize.Size15},
                    ]}>
                    {'You can choose multiple talent at a time'}
                  </Text>
                </View>
              }
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <CustomCardView
                    marginHorizontal={R.fontSize.Size5}
                    key={index}
                    onPress={() => onCallUserSelect(item, index)}
                    backgroundColor={
                      item.selected == true
                        ? R.colors.PrimaryApp_color
                        : R.colors.white
                    }
                    title={item.title}
                    TextColor={
                      item.selected == true
                        ? R.colors.white
                        : R.colors.primaryTextColor
                    }
                    rightIcon={R.images.checkWhiteIcon}
                  />
                );
              }}
            />
          </View>
          <View style={{paddingVertical: R.fontSize.Size16}}>
            <AppButton
              onPress={() => props.navigation.navigate('HomeMenu')}
              marginHorizontal={R.fontSize.Size35}
              title={'Finish'}
            />
          </View>
        </View>
      </SafeAreaView>
    </StoryScreen>
  );
};
export default TalentFinishScreen;
