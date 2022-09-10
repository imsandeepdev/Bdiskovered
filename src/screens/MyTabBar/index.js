import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import R from 'res/R';
import Styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MyTabBar = props => {
  const focusedOptions =
    props.descriptors[props.state.routes[props.state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const insets = useSafeAreaInsets();

  return (
    <View style={[Styles.container, {paddingBottom: insets.bottom}]}>
      {props.state.routes.map((route, index) => {
        const {options} = props.descriptors[route.key];
        const label = route.name;

        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={Styles.tabIcon}
            key={index.toString()}>
            {options.tabBarIcon({focused: isFocused})}
            <Text
              style={[
                Styles.label,
                {
                  color: isFocused
                    ? props.activeTintColor
                    : props.inactiveTintColor,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;
