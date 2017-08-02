import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


class Header extends Component {

	render() {
		return(
			<View style={styles.header}>
				<Icon style={styles.back} name="md-arrow-back" size={30} onPress={this._goBack.bind(this)}/>
				<Text style={styles.headerText}>物品分类</Text>
			</View>
		)
	}
	// 调出 左边栏 菜单
	_goBack(){
		this.props.navigation.goBack();
	}

}

const styles = StyleSheet.create({
	header: {
		position: 'relative',
		paddingTop: 31,
		paddingBottom: 11,
		paddingLeft: 12,
		paddingRight: 12,
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	back: {
		position: 'absolute',
		zIndex: 100,
		top: 25,
		left: 12
	},
	headerText: {
		fontSize: 20
	}
});

export default Header;