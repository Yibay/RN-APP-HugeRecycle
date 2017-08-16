import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { StackNavigator } from 'react-navigation';


import SignIn from '../SignIn/index';
import ManageAddress from '../ManageAddress/index';
import EditAddress from '../EditAddress/index';
import MyEnvRecord from '../MyEnvRecord/index';
import MyOrder from '../MyOrder/index';
import Header from '../common/header';


class SetUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	// DrawerNavigator 导航 设置
	// 侧边栏 DrawerItems 内，Icon, Label，在各 页面内 设置
	static navigationOptions = {
		// 设置 Label, 可覆盖 DrawerNavigator 中设置
	    // drawerLabel: '虎哥回收',
	    // 设置 Icon
	    drawerIcon: ({ tintColor }) => (
	    	<Icon name='settings' size={24} />
	    ),
	};

	// 渲染前，先获取本地accessToken信息
	componentWillMount(){
		// 先确认 本地是否已 存储token
		AsyncStorage.getItem('X-AUTH-TOKEN')
			.then(res => {
				this.setState({
					token: res
				})
			})
	}

	render() {
		// 若未登录，则先登录
		if(!this.state.token){
			// 2个参数：1、用于设置accessToken；2、用于close返回
			return <SignIn setToken={token => this.setState({token: token, needUpadateDefaultAddress: true})} navigation={this.props.navigation} />
		}
		// 已登录 则直接进入页面
		else {
			return(
				<View style={ styles.container }>
					<Header title='设置' navigation={this.props.navigation} goBack={() => this._goBack()} />
					{/* 我的环保记录 */}
					<TouchableOpacity onPress={() => this._goToMyEnvRecordPage()}>
						<View style={styles.sectionBox}>
							<Image style={styles.sectionImg} source={require('./img/icon_record.png')}/>
							<Text style={styles.sectionTitle}>我的环保记录</Text>
						</View>
					</TouchableOpacity>
					{/* 地址管理栏 */}
					<TouchableOpacity onPress={() => this._goManageAddressPage()}>
						<View style={styles.sectionBox}>
							<Image style={styles.sectionImg} source={require('./img/icon_location.png')}/>
							<Text style={styles.sectionTitle}>地址管理</Text>
						</View>
					</TouchableOpacity>
					{/* 检测更新栏 */}
					<TouchableOpacity onPress={() => this._goManageAddressPage()}>
						<View style={styles.sectionBox}>
							<Image style={styles.sectionImg} source={require('./img/icon_update.png')}/>
							<Text style={styles.sectionTitle}>检测更新</Text>
						</View>
					</TouchableOpacity>
					{/* 意见反馈栏 */}
					<TouchableOpacity onPress={() => this._goManageAddressPage()}>
						<View style={styles.sectionBox}>
							<Image style={styles.sectionImg} source={require('./img/icon_feedback.png')}/>
							<Text style={styles.sectionTitle}>意见反馈</Text>
						</View>
					</TouchableOpacity>
					{/* 关于我们栏 */}
					<TouchableOpacity onPress={() => this._goManageAddressPage()}>
						<View style={styles.sectionBox}>
							<Image style={styles.sectionImg} source={require('./img/icon_us.png')}/>
							<Text style={styles.sectionTitle}>关于我们</Text>
						</View>
					</TouchableOpacity>

					{/* 登出模块 */}
					<TouchableOpacity onPress={() => this._logOut()}>
						<View style={styles.sectionBox}>
							<Text style={styles.sectionTitle}>退出</Text>
						</View>
					</TouchableOpacity>
				</View>
			)
		}
	}

	// 按钮：返回上一页
	_goBack(){
		this.props.navigation.navigate('虎哥回收');
	}

	// 进入 我的环保记录
	_goToMyEnvRecordPage(){
		this.props.navigation.navigate('MyEnvRecord');
	}

	// 进入 地址管理页
	_goManageAddressPage(){
		this.props.navigation.navigate('ManageAddress', {
			token: this.state.token
		});
	}

	// 按钮：退出登录
	_logOut() {
		console.log(this.props.navigation);
		Promise.all([
				AsyncStorage.removeItem('X-AUTH-TOKEN'),
				AsyncStorage.removeItem('user_id'),
				AsyncStorage.removeItem('user_name'),
				AsyncStorage.removeItem('user_phone')
			])
			// 抽屉导航中，跳转页面的方法
			.then(() => this.props.navigation.navigate('虎哥回收'))
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ecf0f3'
	},
	sectionBox: {
		marginTop: 12,
		paddingLeft: 18,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	sectionImg: {
		width: 24,
		height: 24,
		marginRight: 8,
		resizeMode: 'stretch'
	},
	sectionTitle: {
		marginVertical: 15,
		fontSize: 15
	}
})

const SetUpPage = StackNavigator(
	{
		SetUp: { screen: SetUp },
		ManageAddress: { screen: ManageAddress },
		EditAddress: { screen: EditAddress },
		MyEnvRecord: { screen: MyEnvRecord },
		MyOrder: { screen: MyOrder }
	},
	{
		headerMode: 'none'
	}
);

export default SetUpPage;