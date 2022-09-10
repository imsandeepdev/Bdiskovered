import * as React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(routeName, params) {
  navigationRef.current?.navigate(routeName, params);
}

export function reset(routeName, params) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: routeName, params: params}],
  });
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export default {
  navigate,
  reset,
  push,
};
