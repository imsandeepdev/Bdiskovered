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
import {connect, useDispatch} from 'react-redux';
import { GetTailentRequest } from '../../actions/getTailent.action';
import { UserSelectionFinishRequest } from '../../actions/tailentProfileCreate.action';
import CommonFunctions from '../../utils/CommonFuntions';
import Toast from 'react-native-simple-toast';


const TalentFinishScreen = props => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selected, setSelected] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedTailent, setSelectedTailent] = useState([]);
  const [selectTime, setSelectTime] = useState('Full');
  const [data, setData] = useState([]);

 useEffect(() => {
   onCallGetTailentAPI();
 }, [props.navigation]);

 const onCallGetTailentAPI = () => {
   setLoading(true);
   console.log('Gettailent');
   dispatch(
     GetTailentRequest(response => {
       console.log('GET TAILENT RES', response);
       if (response.status == 'success') {
         let arr = response.data.map((item, index) => {
           item.selected = false;
           return {...item};
         });
         console.log('UPDATEARR', arr);
         setData(arr);
         setLoading(false);
       }
     }),
   );
 };

  const onCallUserSelect = (item, ind) => {
    const dummyData = data;
    let arr = dummyData.map((item, index) => {
      if (ind == index) {
        item.selected = !item.selected;
      }
      return {...item};
    });
    console.log('arr return', arr);
    let tempArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].selected) {
        tempArray.push(arr[i].talent);
      }
    }
    console.log(tempArray);
    setSelectedTailent(tempArray);
    setData(arr);
  };

  const onCheckCondition = () => {
    return (
      CommonFunctions.isBlank(
        selectedTailent.toString(),
        'Please select type of talent to view ',
      ) 
    );
  };

const onCallFinish = () => {
  if (onCheckCondition()) {
    let data = {
      category: selectedTailent.toString()
    };
    console.log('DATA', data);
    dispatch(
      UserSelectionFinishRequest(data, response => {
        console.log('TAILENT FINISH SCREEN CREATE RES', response);
        if (response.status) {
          props.navigation.navigate('HomeMenu');
          Toast.show(response.message, Toast.SHORT);
        } else {
          Toast.show(response.message, Toast.SHORT);
        }
      }),
    );
  }
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
              keyExtractor={(item, index) => index}
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
                    title={item?.talent}
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
              onPress={() => onCallFinish()}
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
