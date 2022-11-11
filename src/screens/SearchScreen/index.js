import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  Text,
  SafeAreaView,
  Modal,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native';
import {
  CustomCardView,
  Header,
  StoryScreen,
  AppButton,
  CustomCardTextInput,
  ShadowHeader,
  CustomCardLine,
  CustomLineTextInput,
} from '../../components';
import {connect, Connect, useDispatch} from 'react-redux';
import R from '../../res/R';
import Geolocation from 'react-native-geolocation-service';
import Styles from './style';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

  const USDList = [
    'USD 0 - USD 0',
    'USD 0 - USD 10',
    'USD 10 - USD 50',
    'USD 50 - USD 100',
    'USD 100 - USD 200',
    'USD 200 - USD 500',
    'USD 500 - USD 1000',
    'USD 1000+',
  ];

const CustomTitle = (props) => {
  return (
    <View>
      <Text
        style={{
          fontFamily: R.fonts.regular,
          color: R.colors.primaryTextColor,
          fontSize: props.fontSize ?? R.fontSize.Size15,
          fontWeight: '900',
        }}>
        {props.title}
      </Text>
    </View>
  );
}


const SearchScreen = props => {

  const [videoTypes, setVideoTypes] = useState([]);
   const [tailentList, setTailentList] = useState([
     {
       id: '1',
       name: 'Music',
     },
     {
       id: '2',
       name: 'Dance',
     },
     {
       id: '3',
       name: 'Fashion',
     },
     {
       id: '4',
       name: 'Music',
     },
   ]);
  const [usdToggle, setUsdToggle] = useState(false);
  const [dropDownList, setDropDownList] = useState([]);
  const [dropDownTitle, setDropDownTitle] = useState('');
  const [modalPicker, setModalPicker] = useState(false);
  const [filterPrice, setFilterPrice] = useState('');
  const [filterAge, setFilterAge] = useState('');
  const [filterRating, setFilterRating] = useState('');




  const onCallOpenModal = (modalType) => {

   { 
    modalType == 'Price' && (
    setDropDownTitle(modalType),
    setDropDownList([
      'USD 0 - USD 0',
      'USD 0 - USD 10',
      'USD 10 - USD 50',
      'USD 50 - USD 100',
      'USD 100 - USD 200',
      'USD 200 - USD 500',
      'USD 500 - USD 1000',
      'USD 1000+',
    ]))
    }
    {
      modalType == 'Age' &&
        (setDropDownTitle(modalType),
        setDropDownList([
          '0 - 0',
          '16 - 24',
          '24 - 28',
          '29 - 35',
          '36 - 50',
          '51 - 65',
          '65+',
        ]));
    }
    {
      modalType == 'Rating' &&
        (setDropDownTitle(modalType),
        setDropDownList([
          '0.0 - 0.0',
          '0.0 - 1.0',
          '1.0 - 1.5',
          '1.5 - 2.0',
          '2.0 - 2.5',
          '2.5 - 3.0',
          '3.0 - 3.5',
          '3.5 - 4.0',
          '4.0 - 4.5',
          '4.5 - 5.0',
        ]));
    }
    setModalPicker(true)
  }

  const onCallModalClosed = (item, type) => {
    {
      type == 'Price' && setFilterPrice(item)
    }
    {
      type == 'Age' && setFilterAge(item);
    }
    {
      type == 'Rating' && setFilterRating(item);
    }
    setModalPicker(false)
  }

  const onCallVideoSelect = (item, ind) => {
    const dummyData = tailentList;
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
        tempArray.push(arr[i].name);
      }
    }
    console.log(tempArray);
    setVideoTypes(tempArray);
    setTailentList(arr);
  };

 
  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.toggleDrawer()}
          leftSource={R.images.menuIcon}
          headerBottomWidth={0.5}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
                <View style={{flex: 1}}>
                  <View style={{marginTop: R.fontSize.Size20}}>
                    <CustomTitle fontSize={R.fontSize.Size18} title={'Filter:'} />
                  </View>

                  <View style={{flex: 1, marginVertical: R.fontSize.Size20}}>
                    <CustomTitle title={'Price'} />
                    <CustomCardLine
                      onPress={() => onCallOpenModal('Price')}
                      title={filterPrice != '' ? filterPrice : 'Select Price'}
                      rightIcon={R.images.chevronDown}
                    />
                    <CustomTitle title={'Location'} />
                    <CustomLineTextInput placeholder={'Location'} />
                    <CustomTitle title={'Age'} />
                    <CustomCardLine
                      onPress={() => onCallOpenModal('Age')}
                      title={filterAge != '' ? filterAge : 'Select Age'}
                      rightIcon={R.images.chevronDown}
                    />
                    <View
                      style={{
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        marginLeft: -R.fontSize.Size14,
                      }}>
                      {tailentList.map((item, index) => {
                        return (
                          <Pressable
                            onPress={() => onCallVideoSelect(item, index)}
                            key={index}
                            style={({pressed}) => [
                              {
                                opacity: pressed ? 0.5 : 1,
                                width: screenWidth / 3.8,
                                marginVertical: R.fontSize.Size8,
                                marginLeft: R.fontSize.Size14,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: item?.selected
                                  ? R.colors.appColor
                                  : R.colors.lightWhite,
                                paddingVertical: R.fontSize.Size10,
                                borderRadius: R.fontSize.Size20,
                                borderColor: R.colors.placeHolderColor,
                              },
                            ]}>
                            <Text
                              style={{
                                fontFamily: R.fonts.regular,
                                fontSize: R.fontSize.Size14,
                                fontWeight: '700',
                                color: item?.selected
                                  ? R.colors.white
                                  : R.colors.placeHolderColor,
                              }}
                              numberOfLines={1}>
                              {item.name}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                    <CustomTitle title={'Rating'} />
                    <CustomCardLine
                      onPress={() => onCallOpenModal('Rating')}
                      title={
                        filterRating != '' ? filterRating : 'Select Rating'
                      }
                      rightIcon={R.images.chevronDown}
                    />
                  </View>
                </View>

                <View style={{paddingVertical: R.fontSize.Size30}}>
                  <AppButton
                    onPress={() => console.log('Apply')}
                    title={'Apply'}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <Modal
        visible={modalPicker}
        transparent={true}
        onRequestClose={() => setModalPicker(false)}>
        <View style={Styles.modalMainView}>
          <View style={Styles.modalView}>
            <View style={Styles.modalViewReverse}>
              <Pressable
                onPress={() => setModalPicker(false)}
                style={({pressed}) => [
                  {
                    padding: R.fontSize.Size6,
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}>
                <Image
                  source={R.images.cancleIcon}
                  style={{height: R.fontSize.Size10, width: R.fontSize.Size10}}
                  resizeMode={'contain'}
                />
              </Pressable>
              <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontSize: R.fontSize.Size15,
                    fontWeight: '700',
                    color: R.colors.appColor,
                  }}>
                  {dropDownTitle}
                </Text>
              </View>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: R.fontSize.Size20,
                      marginVertical: R.fontSize.Size20,
                    }}>
                    {dropDownList.map((item, index) => {
                      return (
                        <Pressable
                          key={index}
                          onPress={() => onCallModalClosed(item, dropDownTitle)}
                          style={({pressed}) => [
                            {
                              opacity: pressed ? 0.5 : 1,
                              height: R.fontSize.Size45,
                              borderBottomWidth: 1,
                              borderColor: R.colors.placeholderTextColor,
                              justifyContent: 'center',
                            },
                          ]}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontSize: R.fontSize.Size14,
                              color: R.colors.primaryTextColor,
                              fontWeight: '500',
                            }}>
                            {item}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </StoryScreen>
  );
};

const mapStatetoProps = (state, props) => ({
  authToken: state.auth.authToken,
  userType: state.auth.userType,
});

export default connect(mapStatetoProps)(SearchScreen);
