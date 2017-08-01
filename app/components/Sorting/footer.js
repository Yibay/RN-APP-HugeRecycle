import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


class Footer extends Component {

	render() {
		return(
			<View style={styles.footer}>
				<Text style={styles.text} onPress={this._call}>呼叫虎哥</Text>
			</View>
		)
	}

	_call() {
		console.log('call');
	}

}

const styles = StyleSheet.create({
	footer: {
		position: 'relative',
		paddingTop: 11,
		paddingBottom: 11,
		paddingLeft: 12,
		paddingRight: 12,
		borderWidth: 1,
		borderColor: '#8c8c8c',
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	text: {
		paddingTop: 10,
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 20,
		borderRadius: 17,
		overflow: 'hidden',
		backgroundColor: '#ffcf31',
		fontSize: 14,
		fontWeight: '900'
	}
});

export default Footer;