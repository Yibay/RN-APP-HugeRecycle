/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import RecycleList from './app/components/RecycleList/index';

export default class HugeRecycle extends Component {
  render() {
    return (
      <RecycleList></RecycleList>
    );
  }
}


AppRegistry.registerComponent('HugeRecycle', () => HugeRecycle);
