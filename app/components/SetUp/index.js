import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/SimpleLineIcons';


import Header from '../common/header';


class SetUp extends Component {

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

	render() {
		return(
			<View style={ styles.container }>
				<Header title='设置' navigation={this.props.navigation} />
				{/* 登出模块 */}
				<TouchableOpacity onPress={() => this._logOut()}>
					<View style={styles.logOut}>
						<Text style={styles.logOutTxt}>退出</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}

	_logOut() {
		AsyncStorage.removeItem('X-AUTH-TOKEN')
			.then(() => this.props.navigation.goBack())
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ecf0f3'
	},
	logOut: {
		marginTop: 12,
		padding: 18,
		backgroundColor: '#fff'
	},
	logOutTxt: {
		fontSize: 15
	}
})

export default SetUp;