import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


class Header extends Component {

	render() {
		return(
			<View style={styles.header}>
				<Icon name="md-menu" size={30} onPress={this._callMenu.bind(this)}/>
				<Text style={styles.headerText}>虎哥回收</Text>
				<Icon name="md-call" size={30} />
			</View>
		)
	}
	// 调出 左边栏 菜单
	_callMenu(){
		this.props.navigation.navigate('DrawerOpen');
	}

}

const styles = StyleSheet.create({
	header: {
		paddingTop: 25,
		paddingBottom: 5,
		paddingLeft: 12,
		paddingRight: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#ffcf31'
	},
	headerText: {
		fontSize: 20
	}
});

export default Header;