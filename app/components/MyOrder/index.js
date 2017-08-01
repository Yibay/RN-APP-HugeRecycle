import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


class MyOrder extends Component {

	// DrawerNavigator 导航 设置
	// 侧边栏 DrawerItems 内，Icon, Label，在各 页面内 设置
	static navigationOptions = {
		// 设置 Label, 可覆盖 DrawerNavigator 中设置
	    // drawerLabel: '虎哥回收',
	    // 设置 Icon
	    drawerIcon: ({ tintColor }) => (
	    	<Icon name="md-clipboard" size={24} />
	    ),
	};

	render() {
		return (
			<View style={styles.container}>
				<Text onPress={() => this.props.navigation.navigate('DrawerOpen')}>我的订单</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default MyOrder;