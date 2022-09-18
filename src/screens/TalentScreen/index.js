import * as react from 'react';
import {useState, useEffect} from 'react';
import {Text, View, Pressable, Image, SafeAreaView,TextInput, FlatList,ScrollView, Modal,Dimensions } from 'react-native';
import { StoryScreen, Header, AppButton, CustomCardView, CustomTimeCard } from '../../components';
import R from '../../res/R';
import Styles from './styles';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
import {connect, useDispatch} from 'react-redux';
import { GetTailentRequest } from '../../actions/getTailent.action';


const PriceList = [
  {
    id: '1',
    Price: '80 - 100$',
  },
  {
    id: '2',
    Price: '180 - 200$',
  },
  {
    id: '3',
    Price: '280 - 300$',
  },
  {
    id: '4',
    Price: '300 - 400$',
  },
  {
    id: '5',
    Price: '400 - 500$',
  },
];

const TalentScreen = (props) => {

    const dispatch = useDispatch()
    const [modalPicker, setModalPicker] = useState(false)
    const [selectPrice, setSelectPrice] = useState('')
    const [loading, setLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [selectetTailent, setSelectedTailent] = useState([])
    const [selectTime, setSelectTime] = useState('Full')
    const [data,setData] = useState([])

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
        setData(arr)
    }

    const onCallSelectPrice = (item) => {

        setSelectPrice(item)
        setModalPicker(false)
    }

    return (
      <StoryScreen loading={loading}>
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
                ListFooterComponent={
                  <View>
                    <View
                      style={{
                        marginTop: R.fontSize.Size10,
                        marginHorizontal: R.fontSize.Size5,
                      }}>
                      <CustomTimeCard
                        fullTimeOnPress={() => setSelectTime('Full')}
                        fullTimeTextColor={
                          selectTime == 'Full'
                            ? R.colors.appColor
                            : R.colors.placeholderTextColor
                        }
                        partTimeOnPress={() => setSelectTime('Part')}
                        partTimeTextColor={
                          selectTime == 'Part'
                            ? R.colors.appColor
                            : R.colors.placeholderTextColor
                        }
                        gigsOnPress={() => setSelectTime('Gigs')}
                        gigsTextColor={
                          selectTime == 'Gigs'
                            ? R.colors.appColor
                            : R.colors.placeholderTextColor
                        }
                      />
                      <CustomCardView
                        onPress={() => setModalPicker(true)}
                        title={selectPrice != '' ? selectPrice : 'Select Price'}
                        TextColor={R.colors.placeholderTextColor}
                        rightIcon={R.images.chevronDown}
                      />
                    </View>
                    <View
                      style={{
                        marginTop: R.fontSize.Size45,
                        marginHorizontal: R.fontSize.Size5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={[Styles.termsText]}>
                        {'Want to customise this part later?'}
                      </Text>
                      <Pressable
                        onPress={() =>
                          props.navigation.navigate('TalentFinishScreen')
                        }
                        style={({pressed}) => [
                          {
                            opacity: pressed ? 0.5 : 1,
                          },
                        ]}>
                        <Text
                          style={{
                            fontFamily: R.fonts.regular,
                            fontSize: R.fontSize.Size12,
                            fontWeight: '700',
                            color: R.colors.appColor,
                          }}>
                          Skip
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                }
              />
            </View>
            <View style={{paddingVertical: R.fontSize.Size16}}>
              <AppButton
                onPress={() => props.navigation.navigate('TalentFinishScreen')}
                marginHorizontal={R.fontSize.Size35}
                title={'Proceed'}
              />
            </View>
          </View>
        </SafeAreaView>
        <Modal
          visible={modalPicker}
          transparent={true}
          onRequestClose={() => setModalPicker(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: R.colors.modelBackground,
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                paddingVertical: R.fontSize.Size25,
                paddingHorizontal: R.fontSize.Size20,
                backgroundColor: R.colors.white,
                paddingBottom: R.fontSize.Size20,
                height: screenHeight / 2.5,
              }}>
              <Text
                style={{
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size14,
                  fontWeight: '700',
                  color: R.colors.primaryTextColor,
                }}>
                {'Select Your Price'}
              </Text>
              <View
                style={{
                  flex: 1,
                  marginVertical: R.fontSize.Size8,
                  marginHorizontal: R.fontSize.Size20,
                }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={PriceList}
                  keyExtractor={item => item?.id}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        key={index}
                        style={{
                          borderBottomWidth: 1,
                          marginBottom: R.fontSize.Size5,
                          borderColor: R.colors.placeholderTextColor,
                        }}>
                        <Pressable
                          onPress={() => onCallSelectPrice(item?.Price)}
                          style={({pressed}) => [
                            {
                              opacity: pressed ? 0.5 : 1,
                              height: R.fontSize.Size40,
                              alignItems: 'center',
                              justifyContent: 'center',
                            },
                          ]}>
                          <Text
                            style={{
                              fontFamily: R.fonts.regular,
                              color: R.colors.placeHolderColor,
                              fontSize: R.fontSize.Size14,
                              fontWeight: '500',
                            }}>
                            {item?.Price}
                          </Text>
                        </Pressable>
                      </View>
                    );
                  }}
                />
              </View>
              <Pressable
                onPress={() => setModalPicker(false)}
                style={({pressed}) => [
                  {
                    height: R.fontSize.Size40,
                    borderWidth: 1,
                    opacity: pressed ? 0.5 : 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: R.colors.appColor,
                    borderRadius: R.fontSize.Size5,
                    marginBottom: R.fontSize.Size10,
                    marginHorizontal: R.fontSize.Size20,
                  },
                ]}>
                <Text>{'Cancel'}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </StoryScreen>
    );
}
export default TalentScreen