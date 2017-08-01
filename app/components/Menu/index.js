import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

import { DrawerNavigator, DrawerItems } from 'react-navigation';

import RecycleListPage from '../RecycleList/index';
import MyOrder from '../MyOrder/index';


// 抽屉 导航
const Menu = DrawerNavigator(
	{
		// 默认 显示的 主页面 组件
		'虎哥回收': { screen: RecycleListPage },
		'我的订单': { screen: MyOrder }
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

// 侧边栏 （封装 抽屉 导航侧边栏 组件）
class Sidebar extends Component {
	render() {
		return (
			<View>
				<View style={styles.sidebarLogo}>
					<Image style={styles.sidebarLogoImg} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
					<Text>虎哥</Text>
				</View>
				<ScrollView><DrawerItems {...this.props} /></ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	sidebarLogo: {
		paddingTop: 40,
		alignItems: 'center'
	},
	sidebarLogoImg: {
		marginBottom: 10,
		width: 50,
		height: 50
	}
});

export default Menu;