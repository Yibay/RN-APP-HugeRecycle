import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Header from './header';


class EditAddress extends Component {

	render() {
		return(
			<View>
				<Header title='地址编辑' navigation={this.props.navigation} />
			</View>
		);
	}
}

export default EditAddress;