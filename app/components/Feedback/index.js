import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import HeaderLR from '../common/headerLR';


class Feedback extends Component {
	render() {
		return (
			<View style={styles.container}>
				<HeaderLR title='意见反馈' rightButtonTxt='发送' rightButtonImg={require('./img/icon_ok_normal.png')}
					rightButtonEvent={() => this._send()} navigation={this.props.navigation}/>
			</View>
		)
	}

	_send() {
		console.log('发送');
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default Feedback;