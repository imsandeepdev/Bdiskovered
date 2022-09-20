import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions
} from 'react-native';
import {Header, StoryScreen} from '../../components';
import R from '../../res/R';
const screenWidth = Dimensions.get('screen').width;

const PopularList = [
  {
    id: '1',
    name: 'bhishmasurgghgffr',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '2',
    name: 'Priya',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '3',
    name: 'RiyaD',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
  {
    id: '4',
    name: 'Dimple',
    videoImg: 'https://pbs.twimg.com/media/Brsi03SCEAE_BzM.jpg',
    source:
      'https://image.shutterstock.com/image-vector/king-dhritarashtra-sitting-on-throne-260nw-1893392059.jpg',
  },
];

const PopularViewAllScreen = props => {
  return (
    <StoryScreen>
      <SafeAreaView style={{flex: 1}}>
        <Header
          onPress={() => props.navigation.goBack()}
          leftSource={R.images.chevronBack}
          title={'Connected Users'}
        />

        <View style={{flex: 1, marginHorizontal: R.fontSize.Size20,marginVertical:R.fontSize.Size10 }}>
          <FlatList
            // style={{}}
            data={PopularList}
            numColumns={2}
            keyExtractor={item => item?.id}
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal:R.fontSize.Size10,
                    marginBottom:R.fontSize.Size10
                  }}>
                  <View
                    style={{
                      height: R.fontSize.Size130,
                      overflow: 'hidden',
                      borderRadius: R.fontSize.Size8,
                    }}>
                    <Image
                      source={{
                        uri: item?.videoImg,
                      }}
                      style={{
                        height: R.fontSize.Size130,
                        width: screenWidth / 2.5,
                      }}
                      resizeMode={'cover'}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: R.fontSize.Size6,
                    }}>
                    <Image
                      source={{uri: item.source}}
                      style={{
                        height: R.fontSize.Size25,
                        width: R.fontSize.Size25,
                        borderRadius: R.fontSize.Size15,
                      }}
                      resizeMode={'cover'}
                    />
                    <Text
                      style={{
                        flex: 1,
                        marginHorizontal: R.fontSize.Size10,
                        fontFamily: R.fonts.regular,
                        fontSize: R.fontSize.Size14,
                        color: R.colors.placeholderTextColor,

                        fontWeight: '400',
                      }}
                      numberOfLines={1}>
                      {item?.name}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </StoryScreen>
  );
};

export default PopularViewAllScreen;
