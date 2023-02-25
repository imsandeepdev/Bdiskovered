import * as react from 'react';
import {useState, useEffect} from 'react';
import {Text, View, Pressable, Image, SafeAreaView,TextInput, FlatList,ScrollView, Modal,Dimensions,TouchableWithoutFeedback,KeyboardAvoidingView ,Keyboard,Platform} from 'react-native';
import { StoryScreen, Header, AppButton, CustomCardView, CustomTimeCard, CustomOpenForRow } from '../../components';
import R from '../../res/R';
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import {connect, useDispatch} from 'react-redux';
import { GetTailentRequest } from '../../actions/getTailent.action';
import Toast from 'react-native-simple-toast';
import CommonFunctions from '../../utils/CommonFuntions';
import { TailentProfileCreateRequest } from '../../actions/tailentProfileCreate.action';



const TalentScreen = (props) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [selectFullTime, setSelectFullTime] = useState(false)
    const [fullTimeText, setFullTimeText] = useState('')
    const [partTimeText, setPartTimeText] = useState('');
    const [gigsText, setGigsText] = useState('');
    const [fullTimePrice, setFullTimePrice] = useState('');
    const [selectPartTime, setSelectPartTime] = useState(false);
    const [partTimePrice, setPartTimePrice] = useState('');
    const [selectGigs, setSelectGigs] = useState(false);
    const [gigsPrice, setGigsPrice] = useState('');
    const [selectCategory, setSelectCategory] = useState([]);
    const [data,setData] = useState([]);



    useEffect(()=>{
        onCallGetTailentAPI();
    },[props.navigation])

    const onCallGetTailentAPI = () => {
      setLoading(true)
      console.log('Gettailent')
      dispatch(GetTailentRequest(response=>{
          console.log('GET TAILENT RES',response)
          if(response.status == 'success')
          {
            let arr = response.data.map((item, index) => {
              item.selected = false;
              return {...item};
            });
            console.log('UPDATEARR',arr)
            setData(arr)
            setLoading(false)
          }
      }))
    }

    const onCheckCondition = () => {
    return (
      CommonFunctions.isBlank(
        selectCategory.toString(),
        'Please Select Your Talent Category',
      ) &&
      CommonFunctions.isFalse(
        selectFullTime || selectPartTime || selectGigs,
        'Please Select Any Time',
      ) &&
      oncheckFullTime() &&
      oncheckPartTime() && 
      oncheckGigs()
    );
    }


    const spaceValid = txt => txt && txt.replace(/\s/g, '').length;
    const zeroValid = txt => txt && txt.replace(/0/g, '').length;

    const oncheckFullTime = () => {
      if (
        selectFullTime &&
        (fullTimePrice == '' ||
          spaceValid(fullTimePrice) == 0 ||
          zeroValid(fullTimePrice) == 0)
      ) {
        Toast.show('Please enter valid full time price');
        return false;
      }
      return true;
    }

     const oncheckPartTime = () => {
       if (
         selectPartTime &&
         (partTimePrice == '' ||
           spaceValid(partTimePrice) == 0 ||
           zeroValid(partTimePrice) == 0)
       ) {
         Toast.show('Please enter valid part time price');
         return false;
       }
       return true;
     };

      const oncheckGigs = () => {
        if (
          selectGigs &&
          (gigsPrice == '' ||
            spaceValid(gigsPrice) == 0 ||
            zeroValid(gigsPrice) == 0)
        ) {
          Toast.show('Please enter valid gigs price');
          return false;
        }
        return true;
      };
   

    const onCallCreateTailentProfile = () => {
      if(onCheckCondition())
      {
           let data = {
             gigs_amount: gigsPrice,
             full_time_amount: fullTimePrice,
             part_time_amount: partTimePrice,
             category: selectCategory.toString(),
             job_type1: selectFullTime ? 'Full Time' : '',
             job_type2: selectPartTime ? 'Part Time' : '',
             job_type3: selectGigs ? 'Gigs' : '',
           };
           console.log('DATA', data);
           dispatch(TailentProfileCreateRequest(data,response =>{
            console.log('TAILENT PROFILE CREATE RES', response)
            if(response.status)
            {
              props.navigation.navigate('TalentFinishScreen');
              Toast.show(response.message, Toast.SHORT)
            }
            else
            {
              Toast.show(response.message, Toast.SHORT);
            }
           }))
      }
    }


    const onCallUserSelect = (item,ind) => {
        const dummyData = data
        let arr = dummyData.map((item,index)=>{
            if(ind == index)
            {
              item.selected = !item.selected
            }
            return{...item}
        })
        console.log('arr return',arr)
        let tempArray = []
        for(let i=0; i<arr.length; i++)
        {
          if(arr[i].selected)
          {
            tempArray.push(arr[i].talent)
          }
        }
        console.log(tempArray)
        setSelectCategory(tempArray)
        setData(arr)
    }

   
    const onCallFullTimeRow = () => {
      setSelectFullTime(!selectFullTime)
      setFullTimePrice('')
    }

    const onCallPartTimeRow = () => {
      setSelectPartTime(!selectPartTime);
      setPartTimePrice('');
    };

    const onCallGigsRow = () => {
      setSelectGigs(!selectGigs);
      setGigsPrice('');
    };
    

    return (
      <StoryScreen loading={loading}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
          />
          <View style={Styles.mainView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding:0' : 'height'}
              style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        marginTop: R.fontSize.Size50,
                        marginHorizontal: R.fontSize.Size5,
                        marginBottom: R.fontSize.Size30,
                      }}>
                      <Text style={Styles.userselectionText}>
                        {'Talent & Work Type Selection'}
                      </Text>
                      <Text
                        style={[
                          Styles.accountTypeText,
                          {marginTop: R.fontSize.Size10},
                        ]}>
                        {'Select Your Talent & Work Type'}
                      </Text>
                      <Text
                        style={[
                          Styles.userselectionText,
                          {marginTop: R.fontSize.Size15},
                        ]}>
                        {'You can choose multiple talent at a time'}
                      </Text>
                    </View>

                    <View>
                     { 
                     data.map((item,index)=>{
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
                     })
                    }
                    </View>

                    <View>
                      <View
                        style={{
                          marginTop: R.fontSize.Size10,
                          marginHorizontal: R.fontSize.Size5,
                        }}>
                        <View>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              fontWeight: '900',
                              fontSize: R.fontSize.Size15,
                              color: R.colors.black,
                            }}>
                            {'Open For'}
                          </Text>
                          <View style={{marginTop: R.fontSize.Size10}}>
                            <CustomOpenForRow
                              leftOnPress={() => onCallFullTimeRow()}
                              leftImageSource={
                                selectFullTime
                                  ? R.images.checkTermsIcon
                                  : R.images.unCheckTermsIcon
                              }
                              leftTitle={'Full Time'}
                              leftTextColor={
                                selectFullTime
                                  ? R.colors.appColor
                                  : R.colors.placeholderTextColor
                              }
                              rightStatus={selectFullTime}
                              rightValue={fullTimePrice}
                              rightOnChangeText={price =>
                                setFullTimePrice(price)
                              }
                              rightDayHours={'/ Day'}
                            />
                            <CustomOpenForRow
                              leftOnPress={() => onCallPartTimeRow()}
                              leftImageSource={
                                selectPartTime
                                  ? R.images.checkTermsIcon
                                  : R.images.unCheckTermsIcon
                              }
                              leftTitle={'Part Time'}
                              leftTextColor={
                                selectPartTime
                                  ? R.colors.appColor
                                  : R.colors.placeholderTextColor
                              }
                              rightStatus={selectPartTime}
                              rightValue={partTimePrice}
                              rightOnChangeText={price =>
                                setPartTimePrice(price)
                              }
                              rightDayHours={'/ Hours'}
                            />
                            <CustomOpenForRow
                              leftOnPress={() => onCallGigsRow()}
                              leftImageSource={
                                selectGigs
                                  ? R.images.checkTermsIcon
                                  : R.images.unCheckTermsIcon
                              }
                              leftTitle={'Gigs'}
                              leftTextColor={
                                selectGigs
                                  ? R.colors.appColor
                                  : R.colors.placeholderTextColor
                              }
                              rightStatus={selectGigs}
                              rightValue={gigsPrice}
                              rightOnChangeText={price => setGigsPrice(price)}
                              rightDayHours={'/ Hours'}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </KeyboardAvoidingView>
            <View style={{paddingVertical: R.fontSize.Size16}}>
              <AppButton
                onPress={() => onCallCreateTailentProfile()}
                marginHorizontal={R.fontSize.Size35}
                title={'Proceed'}
              />
            </View>
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}
export default TalentScreen