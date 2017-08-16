import React, { Component, PropTypes } from 'react';
import { StyleSheet, AsyncStorage, Dimensions, View, Text, Image, TextInput, Alert, TouchableOpacity } from 'react-native';


import request from '../../common/request';
import config from '../../common/config';


let { width, height } = Dimensions.get('window');
class SignIn extends Component {

	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			code: ''
		}
		console.log(this.props);
	}

	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.logo} source={require('./img/logo.png')} />
				<View style={styles.form}>
					<View>
						<TextInput style={styles.tel} placeholder='请输入手机号' onChangeText={(text) => this._changeTel(text)} />
						<View style={styles.codeBox}>
							<TextInput style={styles.code} placeholder='请输入验证码' onChangeText={(text) => this._changeCode(text)} />
							<Text style={styles.getCode} onPress={() => this._getCode()}>获取验证码</Text>
						</View>
					</View>
					<View>
						<Text style={styles.submit} onPress={() => this._getToken()}>登录</Text>
						<View style={styles.agreementBox}>
							<Text style={styles.agree}>注册账号表示您已同意</Text>
							<Text style={styles.agreement}>（虎哥回收用户协议）</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity style={styles.closeBox} onPress={() => this.props.navigation.goBack()}>
					<Image style={styles.close} source={require('./img/close.png')} />
				</TouchableOpacity>
			</View>
		);
	}

	_changeTel(text) {
		this.setState({
			phone: text
		});
	}

	_changeCode(text) {
		this.setState({
			code: text
		});
	}

	// 请求 短信验证码
	_getCode() {
		if(!this.state.phone || !this.state.phone.trim()){
			return Alert.alert('请输入手机号');
		}
		if(!/^1[34578]\d{9}$/.test(this.state.phone)){
			return Alert.alert('手机号格式不正确');
		}
		// 发送请求 获取验证码短信
		request.post(config.api.base + config.api.getCode, { phone: this.state.phone })
			.then((res) => {
				console.log(res);
				if(!res.status){
					Alert.alert('发送验证码成功');
				}
			}).catch(e => console.log(e))
	}

	// 请求 验证身份信息, 并本地储存 accessToken
	_getToken() {
		if(!this.state.phone || !this.state.phone.trim()){
			return Alert.alert('请输入手机号');
		}
		if(!/^1[34578]\d{9}$/.test(this.state.phone)){
			return Alert.alert('手机号格式不正确');
		}
		if(!this.state.code || !this.state.code.trim()) {
			return Alert.alert('请输入验证码');
		}
		// 发送请求 获取accessToken
		request.post(config.api.base + config.api.getToken, {
			phone: this.state.phone,
			code: this.state.code
		})
		// 将 accessToken 存储在本地
		.then(res => {
			console.log(res);
			// 将 accessToken 存储在本地
			if(res.data){
				return Promise.all([
						AsyncStorage.setItem('X-AUTH-TOKEN', res.data['X-AUTH-TOKEN']),
						AsyncStorage.setItem('user_id', (res.data.user.id).toString()),
						AsyncStorage.setItem('user_name', res.data.user.name),
						AsyncStorage.setItem('user_phone', (res.data.user.phone).toString())
					]);
			}
		})
		// 存储后，在从本地 读取 accessToken
		.then(() => {
			return AsyncStorage.getItem('X-AUTH-TOKEN');
		})
		// AsyncStorage.getItem 后then的首參 是result，而不是error
		.then(result => {
			this.props.setToken(result)
		})
		.catch(e => {
			console.log(e);
		})
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
		backgroundColor: '#ecf0f3',
		alignItems: 'center'
	},
	logo: {
		width: width / 3,
		height: width / 3 / 379 * 362,
		marginTop: height / 8,
		resizeMode: 'contain'
	},
	form: {
		flex: 1,
		width: width * 0.8,
		justifyContent: 'space-between'
	},
	tel: {
		height: 50,
		paddingLeft: 20,
		marginTop: 20,
		borderRadius: 25,
		backgroundColor: '#fff',
		fontSize: 15
	},
	codeBox: {
		flexDirection: 'row',
		marginTop: 20
	},
	code: {
		flex: 1,
		height: 50,
		paddingLeft: 20,
		marginRight: 10,
		borderRadius: 25,
		backgroundColor: '#fff',
		fontSize: 15
	},
	getCode: {
		flex: 1,
		height: 50,
		borderRadius: 25,
		backgroundColor:'#ffcf31',
		overflow: 'hidden',
		textAlign: 'center',
		lineHeight: 50,
		fontSize: 15
	},
	submit: {
		height: 50,
		marginBottom: 20,
		borderRadius: 25,
		backgroundColor: '#ffcf31',
		overflow: 'hidden',
		textAlign: 'center',
		lineHeight: 50,
		fontSize: 17
	},
	agreementBox: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 50
	},
	agree: {
		fontSize: 10,
		fontWeight: '700'
	},
	agreement: {
		fontSize: 10,
		color: '#ff0000',
		fontWeight: '700'
	},
	closeBox: {
		position: 'absolute',
		width: 30,
		height: 30,
		top: 50,
		left: 30
	},
	close: {
		width: 30,
		height: 30,
		resizeMode: 'contain'
	}
});

SignIn.PropTypes = {
	// 必备参数： 设置accessToken
	setToken: PropTypes.func.isRequired,
	// 必备参数： 导航，用于close返回
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired
	})
}

export default SignIn;