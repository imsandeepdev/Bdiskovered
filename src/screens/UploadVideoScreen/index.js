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
import R from '../../res/R';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const VideoType = [
  {
    id: '1',
    title: 'Dance',
  },
  {
    id: '2',
    title: 'Fashon',
  },
  {
    id: '3',
    title: 'Dance',
  },
  {
    id: '4',
    title: 'Dance',
  },
];


const UploadVideoScreen = props => {
  const [modalPicker, setModalPicker] = useState(false);
  const [cardNo, setCardNo] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  const onCallPayment = () => {
    setModalPicker(false);
    props.navigation.navigate('PaymentResultScreen');
  };

  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <ShadowHeader
          onPress={() => props.navigation.toggleDrawer()}
          leftSource={R.images.menuIcon}
          rightSource={R.images.filterIcon}
          rightSourceOnPress={() => setModalPicker(true)}
          rightSource2={R.images.bellIcon}
          rightSourceOnPress2={() => console.log('Bell')}
        />
        <View style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}>
          <View style={{marginTop: R.fontSize.Size45}}>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size15,
                fontWeight: '400',
                color: R.colors.primaryTextColor,
              }}>
              {'Create Section'}
            </Text>
            <Text
              style={{
                fontFamily: R.fonts.regular,
                fontSize: R.fontSize.Size18,
                fontWeight: '700',
                color: R.colors.primaryTextColor,
                marginTop: R.fontSize.Size10,
              }}>
              {'Create a Video Post'}
            </Text>
          </View>
          <View style={{marginTop: R.fontSize.Size50}}>
            <Pressable
              style={({pressed}) => [
                {
                  height: R.fontSize.Size35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: R.fontSize.Size8,
                  borderColor: R.colors.placeHolderColor,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}>
              <Image
                source={R.images.activeAddIcon}
                style={{height: R.fontSize.Size10, width: R.fontSize.Size10}}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  marginHorizontal: R.fontSize.Size10,
                  fontFamily: R.fonts.regular,
                  fontSize: R.fontSize.Size14,
                  fontWeight: '400',
                  color: R.colors.primaryTextColor,
                }}>
                {'Add Video'}
              </Text>
            </Pressable>
          </View>
          <View style={{marginTop: R.fontSize.Size20}}>
            <CustomLineTextInput placeholder={'Video Title'} />
            <CustomLineTextInput placeholder={'Description'} />

            <View
              style={{
                flexWrap: 'wrap',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {VideoType.map((item, index) => {
                return (
                  <Pressable
                    style={({pressed}) => [
                      {
                        opacity: pressed ? 0.5 : 1,
                        width: screenWidth / 4,
                        marginVertical: R.fontSize.Size10,
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      },
                    ]}>
                    <Text
                      style={{
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        fontWeight: '700',
                        color: R.colors.primaryTextColor,
                      }}>
                      {item.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
        <View style={{marginBottom: R.fontSize.Size40}}>
          <AppButton title={'Create Post'} />
        </View>
      </SafeAreaView>
    </StoryScreen>
  );
};

export default UploadVideoScreen;
