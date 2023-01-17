import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Pressable, Text, Image, FlatList, SafeAreaView} from 'react-native';
import { Header, StoryScreen } from '../../components';
import { Config } from '../../config';
import R from '../../res/R';


const HelpList = [
  {
    id: 1,
    title: 'Contact us',
    image: R.images.contactIcon,
    url: Config.TermsNConditions,
   
  },
  {
    id: 2,
    title: 'Term & Conditions',
    image: R.images.termIcon,
    url: Config.TermsNConditions,
  },
  {
    id: 3,
    title: 'Privacy and Policy',
    image: R.images.privacyIcon1,
    url: Config.PrivacyPolicy,
  },
  {
    id: 4,
    title: 'Community Guidlines',
    image: R.images.guideIcon,
    url: Config.CommunityURL,
  },
];

const HelpScreen = (props) => {

    const [loading, setLoading] = useState(false)

    const onCallScreen = (index, item) => {

      if(index == 0)
      {
        props.navigation.navigate('FaqScreen',{from: item?.title});
      }
      else
      {
      props.navigation.navigate('WebViewScreen',{
        from: item?.title,        
        url: item?.url
      });
    }
    }

    return (
      <StoryScreen loading={loading}>
        <SafeAreaView style={{flex: 1}}>
          <Header
            onPress={() => props.navigation.goBack()}
            leftSource={R.images.chevronBack}
            title={'Help Screen'}
          />

          <View style={{flex: 1}}>
            <FlatList
              style={{flex: 1, paddingHorizontal: R.fontSize.Size20}}
              data={HelpList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => onCallScreen(index, item)}
                    style={({pressed}) => [
                      {
                        paddingVertical: R.fontSize.Size10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: R.colors.placeholderTextColor,
                        opacity: pressed ? 0.5 : 1,
                      },
                    ]}>
                    <View
                      style={{
                        height: R.fontSize.Size45,
                        width: R.fontSize.Size45,
                        borderRadius: R.fontSize.Size30,
                        // borderWidth: 1,
                        // borderColor: R.colors.placeholderTextColor,
                        // overflow: 'hidden',
                        // backgroundColor:R.colors.lightWhite,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={item?.image}
                        style={{
                          height: R.fontSize.Size40,
                          width: R.fontSize.Size40,
                        }}
                        resizeMode={'cover'}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginLeft: R.fontSize.Size15,
                      }}>
                      <Text
                        style={{
                          fontFamily: R.fonts.regular,
                          fontSize: R.fontSize.Size18,
                          fontWeight: '500',
                          color: R.colors.primaryTextColor,
                        }}>
                        {item?.title}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
              
            />
          </View>
        </SafeAreaView>
      </StoryScreen>
    );
}

export default HelpScreen