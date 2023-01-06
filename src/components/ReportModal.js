import * as React from 'react';
import {View, Pressable, Text, Modal, Image} from 'react-native';
import R from '../res/R';

const CustomRow = (props) => {
    return (
      <Pressable
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
            height: R.fontSize.Size22,
            width: R.fontSize.Size22,
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
      </Pressable>
    );
}

const ReportModal = props => {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      onRequestClose={props.onRequestClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: R.colors.modelBackground,
          justifyContent: 'flex-end',

        }}>
        <View
          style={{
            backgroundColor: R.colors.white,
            // borderRadius: R.fontSize.Size8,
            borderTopLeftRadius: R.fontSize.Size8,
            borderTopRightRadius: R.fontSize.Size8,
            padding: R.fontSize.Size10,
            paddingBottom: R.fontSize.Size40,
            // marginHorizontal: R.fontSize.Size15,
            paddingVertical: R.fontSize.Size10,
          }}>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              borderBottomWidth: 1,
              borderColor: R.colors.black,
            }}>
            <Pressable
              onPress={props.closeModal}
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  padding: R.fontSize.Size10,
                },
              ]}>
              <Image
                source={R.images.cancleIcon}
                style={{height: R.fontSize.Size16, width: R.fontSize.Size16}}
                resizeMode={'contain'}
              />
            </Pressable>
          </View>
          <View
            style={{
              marginVertical: R.fontSize.Size5,
              marginHorizontal: R.fontSize.Size10,
            }}>
            <CustomRow
              onPress={props.onPress1}
              Icon={R.images.cutVideoIcon}
              title={'Cut this video'}
            />
            <CustomRow
              onPress={props.onPress2}
              Icon={R.images.blockIcon}
              title={`Don't recommend this channel`}
            />
            <CustomRow
              onPress={props.onPress3}
              Icon={R.images.reportIcon}
              title={'Report'}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;
