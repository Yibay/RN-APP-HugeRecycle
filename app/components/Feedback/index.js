import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, TextInput, Text, Alert } from 'react-native';


import request from '../../common/request';
import config from '../../common/config';

import HeaderLR from '../common/headerLR';


class Feedback extends Component {

	constructor(props) {
		super(props);
		this.state = {
			feedback: ''
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<HeaderLR title='意见反馈' rightButtonTxt='发送' rightButtonImg={require('./img/icon_ok_normal.png')}
					rightButtonEvent={() => this._send()} navigation={this.props.navigation}/>
				<View style={styles.feedbackBox}>
					<TextInput style={styles.feedbackInput} multiline={true} placeholder='请输入您的反馈意见，谢谢您'
						placeholderTextColor='#9f9f9f' autoCapitalize='none' maxLength={200} onChangeText={feedback => this.setState({ feedback })} />
					<Text style={[styles.wordLimit, this.state.feedback ? {display: 'none'} : null]}>(200字以内)</Text>
				</View>
			</View>
		)
	}

	_send() {
		AsyncStorage.getItem('X-AUTH-TOKEN')
			// 将客户反馈 发送给服务器
			.then(token => request.post(config.api.base + config.api.createFeedback, {
				feedback: this.state.feedback
			}, {'X-AUTH-TOKEN': token}))
			.then(res => {
				// 发送成功后，显示结果
				if(!res.status && res.data) {
					Alert.alert('评论成功');
				}
			})
			.catch(e => console.log(e))
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	feedbackBox: {
		position: 'relative'
	},
	feedbackInput: {
		margin: 20,
		paddingHorizontal: 10,
		paddingTop: 10,
		height: 250,
		backgroundColor: '#fff',
		fontSize: 15
	},
	wordLimit: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		backgroundColor: '#fff',
		fontSize: 15,
		color: '#9f9f9f'
	}
})

export default Feedback;