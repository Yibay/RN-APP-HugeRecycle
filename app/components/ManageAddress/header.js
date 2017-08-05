import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


class Header extends Component {

	render() {
		return(
			<View style={styles.header}>
				<Icon name="md-arrow-back" size={30} onPress={this._goBack.bind(this)}/>
				<Text style={styles.headerText}>{this.props.title}</Text>
				<Text onPress={ () => this._addAddress() } style={styles.add}>添加</Text>
			</View>
		)
	}
	// 调出 左边栏 菜单
	_goBack(){
		this.props.navigation.goBack();
	}

	_addAddress() {
		this.props.navigation.navigate('EditAddress');
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
		backgroundColor: '#fff'
	},
	headerText: {
		fontSize: 20
	},
	add: {
		fontSize: 17
	}
});

Header.propTypes = {
	title: PropTypes.string.isRequired,
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired
	})
};

export default Header;