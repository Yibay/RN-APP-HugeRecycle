// app 入口文件

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';


// 引入 store对象
import store from './store/index';
// 引入 入口组件
import Menu from './components/Menu/index';


// 包裹 入口组件
const HugeRecycleApp = () => (
	<Provider store={store}>
		<Menu />
	</Provider>
)
// 将入口 组件 挂载到 app入口
AppRegistry.registerComponent('HugeRecycle', () => HugeRecycleApp);