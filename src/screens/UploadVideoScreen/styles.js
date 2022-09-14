import {StyleSheet, Dimensions} from 'react-native';
import R from '../../res/R';

const {width, height} = Dimensions.get('screen');
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  headingText: {
    fontSize: R.fontSize.Size20,
    fontFamily: R.fonts.regular,
    color: R.colors.primaryTextColor,
  },
  controllerMainView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000c4',
    justifyContent: 'space-between',
  },
  controllerTouch: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controllerPlay: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  fullscreenVideo: {
    height: width,
    width: height,
    backgroundColor: R.colors.whatsAppColor,
  },
});

export default Styles;
