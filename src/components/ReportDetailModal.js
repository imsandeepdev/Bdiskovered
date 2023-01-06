import * as React from 'react';
import {View, Pressable, Text, Modal, Image, ScrollView} from 'react-native';
import R from '../res/R';

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
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: R.colors.white,
            borderRadius: R.fontSize.Size8,
            paddingBottom: R.fontSize.Size20,
            marginHorizontal: R.fontSize.Size15,
          }}>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
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
              {/* <Pressable
                        onPress={props.onPress}
                        style={({pressed}) => [
                        {
                            marginVertical: R.fontSize.Size4,
                            borderBottomWidth: 0.5,
                            borderColor: R.colors.placeHolderColor,
                            height: R.fontSize.Size40,
                            borderRadius: R.fontSize.Size8,
                            alignItems: 'center',
                            opacity: pressed ? 0.5 : 1,
                            flexDirection: 'row',
                        },
                        ]}>
                        <Image
                        source={props.Icon}
                        style={{
                            height: R.fontSize.Size18,
                            width: R.fontSize.Size18,
                            paddingHorizontal: R.fontSize.Size20,
                        }}
                        resizeMode={'contain'}
                        />
                        <View style={{flex: 1, marginLeft: R.fontSize.Size10}}>
                        <Text
                            style={{
                            fontFamily: R.fonts.regular,
                            color: R.colors.lightBlack,
                            fontWeight: '700',
                            fontSize: R.fontSize.Size14,
                            }}>
                            {props.title}
                        </Text>
                        </View>
                    </Pressable> */}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: R.fontSize.Size15,
                justifyContent: 'flex-end',
              }}>
              <Pressable
                onPress={props.onPressCancel}
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    borderWidth: 1,
                    width: R.fontSize.Size100,
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
                    width: R.fontSize.Size100,
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
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportDetailModal;
