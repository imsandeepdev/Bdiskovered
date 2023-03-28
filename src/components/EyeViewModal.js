import * as React from 'react';
import {Modal,View, Pressable,Text,Image,ScrollView,Dimensions,StyleSheet} from 'react-native'
import R from '../res/R';
import AppButton from './AppButton';
import CustomTimeRow from './CustomTimeRow';
const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const EyeViewModal = (props) => {
    return (
      <Modal
        visible={props.visible}
        transparent={true}
        onRequestClose={props.onRequestClose}>
        <View style={Styles.modalMainView}>
          <View style={Styles.modalView}>
            <View style={Styles.modalViewReverse}>
              <Pressable
                onPress={props.cancelOnPress}
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
            </View>

            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: R.fontSize.Size20,
                }}>
                <View style={{flex: 1}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                      <View style={Styles.videoModalMainView}>
                        <Image
                          source={props.userProfile}
                          style={{
                            height: R.fontSize.Size60,
                            width: R.fontSize.Size60,
                          }}
                          resizeMode={'cover'}
                        />
                      </View>
                      {props.userStatusBackgroundColor && (
                        <View
                          style={{
                            position: 'absolute',
                            bottom: R.fontSize.Size2,
                            right: R.fontSize.Size2,
                          }}>
                          <View
                            style={{
                              height: R.fontSize.Size14,
                              width: R.fontSize.Size14,
                              borderRadius: R.fontSize.Size10,
                              borderWidth: 1,
                              backgroundColor: props.userStatusBackgroundColor,
                              borderColor: R.colors.white,
                            }}
                          />
                        </View>
                      )}
                    </View>
                    <Text style={Styles.videoModalTitleText}>
                      {props.userName}
                    </Text>
                  </View>
                  {props.bio != '' && (
                    <View style={{marginTop: R.fontSize.Size20}}>
                      <Text style={Styles.videoModalDescText}>{props.bio}</Text>
                    </View>
                  )}
                  <View style={Styles.videoModalMapMainView}>
                    {props.personalList}
                  </View>
                  <View style={Styles.videoModalMapMainView}>
                    {props.talentList}
                  </View>

                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      marginLeft: -R.fontSize.Size14,
                      marginTop: R.fontSize.Size20,
                    }}>
                    {props.availableList}
                  </View>
                </View>
              </View>
            </ScrollView>
            <View style={{paddingVertical: R.fontSize.Size10}}>
              <AppButton
                onPress={props.connectOnPress}
                title={'Connect'}
                marginHorizontal={R.fontSize.Size55}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
}

export default EyeViewModal

const Styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    backgroundColor: R.colors.modelBackground,
    justifyContent: 'flex-end',
  },
  modalView: {
    height: screenHeight / 2,
    backgroundColor: R.colors.white,
    borderTopLeftRadius: R.fontSize.Size8,
    borderTopRightRadius: R.fontSize.Size8,
    paddingVertical: R.fontSize.Size30,
  },
  modalViewReverse: {
    flexDirection: 'row-reverse',
    marginHorizontal: R.fontSize.Size20,
  },
  modalFilterText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size18,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
  },
  videoModalTitleText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size24,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
    flex: 1,
    marginHorizontal: R.fontSize.Size14,
  },
  videoModalDescText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size12,
    fontWeight: '400',
    color: R.colors.primaryTextColor,
  },
  videoModalMainView: {
    height: R.fontSize.Size60,
    width: R.fontSize.Size60,
    overflow: 'hidden',
    borderRadius: R.fontSize.Size30,
    borderWidth: 1,
    borderColor: R.colors.placeholderTextColor,
  },
  videoModalMapMainView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: R.fontSize.Size20,
  },
  videoModalMapView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: R.fontSize.Size14,
  },
  videoModalPersonalDetailView: {
    height: R.fontSize.Size10,
    width: R.fontSize.Size10,
    backgroundColor: R.colors.appColor,
    borderRadius: R.fontSize.Size10,
  },
  videoModalPersonalDetailText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.primaryTextColor,
    marginLeft: R.fontSize.Size8,
  },

  
  videoModalAvailableText: {
    fontFamily: R.fonts.regular,
    fontWeight: '700',
    fontSize: R.fontSize.Size18,
    color: R.colors.primaryTextColor,
  },
  videoModalAvailView: {
    alignItems: 'center',
    marginRight: R.fontSize.Size10,
    justifyContent: 'center',
    paddingHorizontal: R.fontSize.Size20,
    paddingVertical: R.fontSize.Size6,
    borderRadius: R.fontSize.Size8,
    marginBottom: R.fontSize.Size6,
  },
  videoModalAvailItemText: {
    fontFamily: R.fonts.regular,
    fontSize: R.fontSize.Size14,
    fontWeight: '700',
    color: R.colors.white,
    marginLeft: R.fontSize.Size8,
  },
});