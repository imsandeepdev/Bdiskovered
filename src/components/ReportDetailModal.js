import * as React from 'react';
import {View, Pressable, Text, Modal, Image, ScrollView,Dimensions} from 'react-native';
import R from '../res/R';

const screenHeight = Dimensions.get('screen').height;

const ReportDetailModal = props => {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      onRequestClose={props.onRequestClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: R.colors.modelBackground,
          justifyContent: props.modaljustifyContent ?? 'center',
        }}>
        <View
          style={{
            backgroundColor: R.colors.white,
            borderRadius: R.fontSize.Size8,
            paddingBottom: R.fontSize.Size20,
            minHeight:R.fontSize.Size200,
            maxHeight: screenHeight/1.5
            // marginHorizontal: R.fontSize.Size15,
          }}>
          <View
            style={{
              alignItems:'center',
              flexDirection:'row',
              borderBottomWidth:0.5,
              borderColor:R.colors.placeHolderColor

            }}>
            <View style={{flex:1, marginHorizontal:R.fontSize.Size15}}>
              <Text
              style={{
                fontFamily:R.fonts.regular,
                color:R.colors.primaryTextColor,
                fontSize:R.fontSize.Size14,
                fontWeight:'500'
              }}
              > {props.title}</Text>
            </View>
            <Pressable
              onPress={props.closeModal}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  padding: R.fontSize.Size10,
                  marginHorizontal: R.fontSize.Size5,
                },
              ]}>
              <Image
                source={R.images.cancleIcon}
                style={{height: R.fontSize.Size14, width: R.fontSize.Size14}}
                resizeMode={'contain'}
              />
            </Pressable>
          </View>
          <View
            style={{
              marginHorizontal: R.fontSize.Size20,
            }}>
            <View>
              {props.ReportContent}
              
            </View>
            {
              props.buttonHidden ? null
              :
            
            <View
              style={{
                flexDirection: 'row',
                alignItems:'center',
                justifyContent:'center',
                paddingVertical:R.fontSize.Size10
              }}>
              <Pressable
                onPress={props.onPressCancel}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    borderWidth: 1,
                    width: R.fontSize.Size150,
                    height: R.fontSize.Size35,
                    borderRadius: R.fontSize.Size4,
                    borderColor: R.colors.appColor,
                    marginHorizontal: R.fontSize.Size10,
                    backgroundColor: R.colors.appColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontWeight: '500',
                    fontSize: R.fontSize.Size16,
                    color: R.colors.lightWhite,
                  }}>
                  {'Cancel'}
                </Text>
              </Pressable>
              <Pressable
                onPress={props.onPressReport}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    borderWidth: 1,
                    width: R.fontSize.Size150,
                    height: R.fontSize.Size35,
                    borderRadius: R.fontSize.Size4,
                    borderColor: R.colors.appColor,
                    marginHorizontal: R.fontSize.Size10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Text
                  style={{
                    fontFamily: R.fonts.regular,
                    fontWeight: '500',
                    fontSize: R.fontSize.Size16,
                    color: R.colors.appColor,
                  }}>
                  {props.reportTitle}
                </Text>
              </Pressable>
            </View>
          }
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportDetailModal;
