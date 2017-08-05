import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Header from './header';


class ManageAddress extends Component {

	render() {
		return (
			<View>
				<Header navigation={this.props.navigation} title='地址管理' />
			</View>
		)
	}
}

export default ManageAddress;