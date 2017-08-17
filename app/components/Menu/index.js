import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, Image, ScrollView } from 'react-native';

import { DrawerNavigator, DrawerItems } from 'react-navigation';

import RecycleListPage from '../RecycleList/index';
import MyOrderPage from '../MyOrderPage/index';
import ShoppingMall from '../ShoppingMall/index';
import Publish from '../Publish/index';
import CustomerCenter from '../CustomerCenter/index';
import SetUpPage from '../SetUp/index';


// 抽屉 导航
const Menu = DrawerNavigator(
	{
		// 默认 显示的 主页面 组件
		'虎哥回收': { screen: RecycleListPage },
		'我的订单': { screen: MyOrderPage },
		'虎哥商场': { screen: ShoppingMall },
		'虎哥发布': { screen: Publish },
		'个人中心': { screen: CustomerCenter },
		'设置': { screen: SetUpPage }
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

	constructor(props) {
		super(props);
		this.state = {
			user_phone: '虎哥'
		}
	}

	render() {
		return (
			<View>
				<View style={styles.sidebarLogo}>
					<Image style={styles.sidebarLogoImg} source={require('./img/huge_logo.png')}/>
					<Text>{this.state.user_phone}</Text>
				</View>
				<ScrollView><DrawerItems {...this.props} /></ScrollView>
			</View>
		)
	}

	componentDidMount(){
		// 获取本地用户信息
		AsyncStorage.getItem('user_phone')
			.then(res => {
				// 若 用户登录，则显示 用户电话
				console.log(res);
				if(res) {
					this.setState({user_phone: res});
				}
			})
			.catch(e => console.log(e))
		AsyncStorage.getAllKeys()
			.then(res => console.log(res));
	}
}

const styles = StyleSheet.create({
	sidebarLogo: {
		paddingTop: 40,
		alignItems: 'center'
	},
	sidebarLogoImg: {
		marginBottom: 10,
		width: 70,
		height: 70,
		resizeMode: 'contain'
	}
});

export default Menu;