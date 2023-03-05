import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
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
} from 'react-native';
import {
  CustomCardView,
  Header,
  StoryScreen,
  AppButton,
  ShadowHeader,
  CustomCardLine,
} from '../../components';
import {connect,useDispatch} from 'react-redux';
import R from '../../res/R';
import Styles from './style';
import { PostFilterRequest } from '../../actions/postFilter.action';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;


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

  const dispatch = useDispatch()
  const [videoTypes, setVideoTypes] = useState([]);
   const [tailentList, setTailentList] = useState([
     {
       id: '1',
       name: 'Music',
     },
     {
       id: '2',
       name: 'Art',
     },
     {
       id: '3',
       name: 'Dance',
     },
     {
       id: '4',
       name: 'Fashion',
     },
   ]);
  const [usdToggle, setUsdToggle] = useState(false);
  const [dropDownList, setDropDownList] = useState([]);
  const [dropDownTitle, setDropDownTitle] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [modalPicker, setModalPicker] = useState(false);
  const [filterPrice, setFilterPrice] = useState();
  const [filterLocation, setFilterLocation] = useState();
  const [filterAge, setFilterAge] = useState();
  const [filterRating, setFilterRating] = useState();
  const [filterLikes, setFilterLikes] = useState();

  const [location, setLocation] = useState('')



  const onCallOpenModal = (modalType) => {

   { 
    modalType == 'Price' &&
      (setDropDownTitle(modalType),
      setDropDownList([
        {firstValue: 'USD 0', secondValue: 'USD 10'},
        {firstValue: 'USD 10', secondValue: 'USD 50'},
        {firstValue: 'USD 50', secondValue: 'USD 100'},
        {firstValue: 'USD 100', secondValue: 'USD 200'},
        {firstValue: 'USD 200', secondValue: 'USD 500'},
        {firstValue: 'USD 500', secondValue: 'USD 1000'},
        {firstValue: 'USD 1000', secondValue: ''},
      ]));
    }
    {
      modalType == 'Age' &&
        (setDropDownTitle(modalType),
        setDropDownList([
          {firstValue: '16', secondValue: '29'},
          {firstValue: '30', secondValue: '39'},
          {firstValue: '40', secondValue: '49'},
          {firstValue: '50', secondValue: '59'},
          {firstValue: '60', secondValue: ''},
        ]));
    }
    {
      modalType == 'Rating' &&
        (setDropDownTitle(modalType),
        setDropDownList([
          {firstValue: '0.0', secondValue: '1.0'},
          {firstValue: '1.0', secondValue: '2.0'},
          {firstValue: '2.0', secondValue: '3.0'},
          {firstValue: '3.0', secondValue: '4.0'},
          {firstValue: '4.0', secondValue: '5.0'},
        ]));
    }
    {
      modalType == 'Likes' &&
        (setDropDownTitle(modalType),
        setDropDownList([
          {firstValue: '0', secondValue: '20'},
          {firstValue: '21', secondValue: '40'},
          {firstValue: '41', secondValue: '60'},
          {firstValue: '61', secondValue: '80'},
          {firstValue: '81', secondValue: '100'},
        ]));
    }
    {
      modalType == 'Country' &&
        (setDropDownTitle(modalType),
        setLocationList([
          {firstValue: 'Saudi Arabia', secondValue: 'Saudi Arabia'},
          {
            firstValue: 'United Arab Emirates',
            secondValue: 'United Arab Emirates',
          },
          {firstValue: 'Egypt', secondValue: 'Egypt'},
        ]));
    }
    setModalPicker(true)
  }

  const onCallModalClosed = (item, type) => {
    console.log("ITEM", item)
    {
      type == 'Price' && setFilterPrice(item)
    }
    {
      type == 'Age' && setFilterAge(item);
    }
    {
      type == 'Rating' && setFilterRating(item);
    }
    {
      type == 'Likes' && setFilterLikes(item);
    }
    {
       type == 'Country' && setFilterLocation(item);
    }
    setDropDownTitle('')
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



  const onCallCheckSub = () => {
    console.log(
      'PROFILE SUBSCRIPTION',
      props.userProfile?.Profile?.subscription,
    );
     props.userProfile?.Profile?.subscription != 0
       ? onCallfilterApply()
       : props.navigation.navigate('SubscriptionScreen')
  }


  const onCallfilterApply = () => {
    console.log(filterPrice?.firstValue.trim());
    let CategoryValue = videoTypes.toString()
    let Category = CategoryValue.replaceAll(',', ',');
    let data = {
      start_price:
        filterPrice?.firstValue != undefined ? filterPrice?.firstValue : '0',
      end_price:
        filterPrice?.secondValue != undefined ? filterPrice?.secondValue : '0',
      start_age:
        filterAge?.firstValue != undefined ? filterAge?.firstValue : '0',
      end_age:
        filterAge?.secondValue != undefined ? filterAge?.secondValue : '0',
      start_rating:
        filterRating?.firstValue != undefined ? filterRating?.firstValue : '0',
      end_rating:
        filterRating?.secondValue != undefined
          ? filterRating?.secondValue
          : '0',
      category: `${Category.toString()}`,
      location:
        filterLocation?.firstValue != undefined
          ? filterLocation?.secondValue
          : '',
    };
    console.log('Tailent Data List', data);
    dispatch(PostFilterRequest(data, response => {
      console.log("FILTER RES", response)
      if(response.status == 'success' && response.message != 'No result found')
      {
        props.navigation.navigate('FilterVideoScreen', {
          videoItems: response?.Post,
        })
      }
      else
      {
        props.navigation.navigate('NoResultScreen', {
          from: 'SearchScreen',
        })
      }
    }))
  }

 
  return (
    <StoryScreen loading={props.loading}>
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
                    <CustomTitle
                      fontSize={R.fontSize.Size18}
                      title={'Filter:'}
                    />
                  </View>

                  <View style={{flex: 1, marginVertical: R.fontSize.Size20}}>
                    <CustomTitle title={'Price'} />
                    <CustomCardLine
                      onPress={() => onCallOpenModal('Price')}
                      title={
                        filterPrice != null
                          ? `${filterPrice?.firstValue}${
                              filterPrice?.secondValue != '' ? ' - ' : '+'
                            }${filterPrice?.secondValue}`
                          : 'Select Price'
                      }
                      onPressSecondRight={() => {
                        filterPrice != null
                          ? setFilterPrice()
                          : onCallOpenModal('Price');
                      }}
                      rightIcon={
                        filterPrice != null
                          ? R.images.cancleIcon
                          : R.images.chevronDown
                      }
                    />
                    <CustomTitle title={'Country'} />
                    <CustomCardLine
                      onPress={() => onCallOpenModal('Country')}
                      title={
                        filterLocation?.firstValue != null
                          ? `${filterLocation?.firstValue}`
                          : 'Select Country'
                      }
                      onPressSecondRight={() => {
                        filterLocation != null
                          ? setFilterLocation()
                          : onCallOpenModal('Country');
                      }}
                      rightIcon={
                        filterLocation != null
                          ? R.images.cancleIcon
                          : R.images.chevronDown
                      }
                    />

                    <CustomTitle title={'Age'} />
                    <CustomCardLine
                      onPress={() => onCallOpenModal('Age')}
                      title={
                        filterAge != null
                          ? `${filterAge?.firstValue}${
                              filterAge?.secondValue != '' ? ' - ' : '+'
                            }${filterAge?.secondValue}`
                          : 'Select Age'
                      }
                      onPressSecondRight={() => {
                        filterAge != null
                          ? setFilterAge()
                          : onCallOpenModal('Age');
                      }}
                      rightIcon={
                        filterAge != null
                          ? R.images.cancleIcon
                          : R.images.chevronDown
                      }
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
                        filterRating != null
                          ? `${filterRating?.firstValue}${
                              filterRating?.secondValue != '' ? ' - ' : '+'
                            }${filterRating?.secondValue}`
                          : 'Select Rating'
                      }
                      onPressSecondRight={() => {
                        filterRating != null
                          ? setFilterRating()
                          : onCallOpenModal('Rating');
                      }}
                      rightIcon={
                        filterRating != null
                          ? R.images.cancleIcon
                          : R.images.chevronDown
                      }
                    />

                    <CustomTitle title={'Likes'} />
                    <CustomCardLine
                      onPress={() => onCallOpenModal('Likes')}
                      title={
                        filterLikes != null
                          ? `${filterLikes?.firstValue}${
                              filterLikes?.secondValue != '' ? ' - ' : '+'
                            }${filterLikes?.secondValue}`
                          : 'Select Likes'
                      }
                      onPressSecondRight={() => {
                        filterLikes != null
                          ? setFilterLikes()
                          : onCallOpenModal('Likes');
                      }}
                      rightIcon={
                        filterLikes != null
                          ? R.images.cancleIcon
                          : R.images.chevronDown
                      }
                    />
                  </View>
                </View>

                <View style={{paddingVertical: R.fontSize.Size30}}>
                  <AppButton onPress={() => onCallCheckSub()} title={'Apply'} />
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
                  {dropDownTitle != 'Country' ? (
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
                            onPress={() =>
                              onCallModalClosed(item, dropDownTitle)
                            }
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
                              {`${item?.firstValue}${
                                item?.secondValue != '' ? ' - ' : '+'
                              }${item?.secondValue}`}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: R.fontSize.Size20,
                        marginVertical: R.fontSize.Size20,
                      }}>
                      {locationList.map((item, index) => {
                        return (
                          <Pressable
                            key={index}
                            onPress={() =>
                              onCallModalClosed(item, dropDownTitle)
                            }
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
                              {`${item?.firstValue}`}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
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
  loading: state.postFilterRoot.loading,
  authToken: state.auth.authToken,
  userProfile: state.getProfileDetailsRoot.getProfileInit,
  userType: state.auth.userType,
});

export default connect(mapStatetoProps)(SearchScreen);
