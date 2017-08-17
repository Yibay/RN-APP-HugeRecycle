import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, WebView, Image } from 'react-native';


import config from '../../common/config';

import Header from '../common/headerLR';


class ShoppingMall extends Component {

	// DrawerNavigator 导航 设置
	// 侧边栏 DrawerItems 内，Icon, Label，在各 页面内 设置
	static navigationOptions = {
		// 设置 Label, 可覆盖 DrawerNavigator 中设置
	    // drawerLabel: '虎哥回收',
	    // 设置 Icon
	    drawerIcon: ({ tintColor }) => (
	    	<Image style={{width: 20, height: 20, resizeMode: 'contain', marginLeft: 10}} source={require('./img/icon_shop2.png')} />
	    ),
	};

	constructor(props) {
		super(props);
		this.state = {
			url: '',
			title: '',
			canGoBack: false
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<Header title={this.state.title} navigation={this.props.navigation} goBack={() => this._goBack()}
					rightButtonTxt='关闭' rightButtonImg={require('./img/close.png')} rightButtonEvent={() => this._close()} />
				{
					this._renderWebView()
				}
			</View>
		)
	}

	componentDidMount() {
		// 更新 url，刷新WebView 页面
		AsyncStorage.getItem('h5Code').
			then(code => this.setState({
				url: config.api.base + config.api.shoppingMall + code
			}))
			.catch(e => console.log(e))
	}

	// 渲染 WebView网页
	_renderWebView() {
		if(this.state.url){
			return(
				<WebView ref='test' style={styles.container} source={{uri: this.state.url}}
					// 监听 页面状态变化改变的事件
					onNavigationStateChange={e => this._onNavigationStateChange(e)} />
			)
		}
	}

	// 监听页面 变化，回调函数
	_onNavigationStateChange(e) {
		this.setState({
			canGoBack: e.canGoBack,
			title: e.title
		})
	}

	// 左侧按钮 回退函数
	_goBack() {
		if(this.state.canGoBack){
			this.refs.test.goBack();
		}
		else {
			this.props.navigation.goBack();
		}
	}

	// 右侧按钮 退出 个人中心页
	_close() {
		this.props.navigation.goBack();
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default ShoppingMall;