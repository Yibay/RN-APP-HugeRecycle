import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, Image, ScrollView } from 'react-native';

import { DrawerNavigator, DrawerItems } from 'react-navigation';

import RecycleListPage from '../RecycleList/index';
import MyOrderPage from '../MyOrderPage/index';
import ShoppingMall from '../ShoppingMall/index';
import Publish from '../Publish/index';
import CustomerCenter from '../CustomerCenter/index';
import SetUpPage from '../SetUp/index';
import Sidebar from '../../containers/Menu/sidebar';
import BlueTooth from '../BlueTooth/index';


// 抽屉 导航
const Menu = DrawerNavigator(
	{
		// 默认 显示的 主页面 组件
		'虎哥回收': { screen: RecycleListPage },
		'我的订单': { screen: MyOrderPage },
		'虎哥商场': { screen: ShoppingMall },
		'虎哥发布': { screen: Publish },
		'个人中心': { screen: CustomerCenter },
		'设置': { screen: SetUpPage },
		'蓝牙': {screen: BlueTooth}
	},
	{
		drawerWidth: 200,
		drawerPosition: 'left',
		// 设置 侧边栏组件
		contentComponent: props => <Sidebar {...props} />,
		// contentOptions 及 为 传入侧边栏的 {...props}
		contentOptions: {
			style: {
				// backgroundColor: 'blue'
			}
		}
	}
);



export default Menu;