import {StyleSheet} from 'react-native';
import R from 'res/R';

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: R.colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  label: {
    fontFamily: R.fonts.medium,
    fontSize: R.fontSize.extraSmall,
    marginBottom: 7,
    width: '100%',
    textAlign: 'center',
  },
  tabIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
});

export default Styles;
