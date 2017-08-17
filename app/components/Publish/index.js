import React, { Component } from 'react';
import { StyleSheet, View, Image, ListView, Text, TouchableOpacity } from 'react-native';

import { StackNavigator } from 'react-navigation';


import request from '../../common/request';
import config from '../../common/config';

import PublishMsg from '../PublishMsg/index';
import Header from '../common/header';


class Publish extends Component {

	// DrawerNavigator 导航 设置
	// 侧边栏 DrawerItems 内，Icon, Label，在各 页面内 设置
	static navigationOptions = {
		// 设置 Label, 可覆盖 DrawerNavigator 中设置
	    // drawerLabel: '虎哥回收',
	    // 设置 Icon
	    drawerIcon: ({ tintColor }) => (
	    	<Image style={{width: 20, height: 20, resizeMode: 'contain', marginLeft: 10}} source={require('./img/icon_news.png')} />
	    ),
	};

	constructor(props){
		super(props);
		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: ds.cloneWithRows([])
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title='虎哥发布' navigation={this.props.navigation} goBack={() => this._goBack()} />
				<ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}
					enableEmptySections={true} />
			</View>
		)
	}

	componentDidMount() {
		request.get(config.api.base + config.api.publish)
			.then(res => {
				console.log(res);
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(res.data)
				})
			})
	}

	_renderRow(row) {
		return(
			<TouchableOpacity onPress={() => this._goToMsgUrl(row.url)}>
				<View style={styles.msgBox}>
					<Text style={styles.title}>{row.title}</Text>
					<Text style={styles.createTime}>{row.createTime}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	// 按钮: 返回上一页
	_goBack(){
		this.props.navigation.navigate('虎哥回收');
	}

	// 按钮：进入 信息详情页
	_goToMsgUrl(url){
		this.props.navigation.navigate('PublishMsg', {
			url: url
		})
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	msgBox: {
		paddingHorizontal: 15,
		paddingTop: 8,
		paddingBottom: 8,
		borderTopWidth: 1,
		borderColor: '#ececec'
	},
	title: {
		lineHeight: 25,
		fontSize: 12
	},
	createTime: {
		textAlign: 'right',
		lineHeight: 25,
		fontSize: 12,
		color: '#747474'
	}
})

const PublishPage = StackNavigator(
	{
		Publish: { screen: Publish },
		PublishMsg: { screen: PublishMsg }
	},
	{
		headerMode: 'none'
	}
)

export default PublishPage;