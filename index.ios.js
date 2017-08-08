/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';

import Menu from './app/components/Menu/index';
import Signin from './app/components/SignIn/index';


// 将入口 组件 挂载到 app入口
AppRegistry.registerComponent('HugeRecycle', () => Signin);
