import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import R from '../res/R';
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);


const CarouselCards = props => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={props.cardData}
        renderItem={props.renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={props.cardDataLength}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: R.fontSize.Size40,
          height: R.fontSize.Size5,
          borderRadius: R.fontSize.Size5,
          marginHorizontal: 0,
          backgroundColor: R.colors.appColor,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
    </View>
  );
};


export default CarouselCards;
