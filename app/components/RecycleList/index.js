import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ListView, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';


import Header from './header'
import Sorting from '../Sorting/index';

import request from '../../common/request';
import config from '../../common/config';
import { createRecycleListData } from '../../common/tools';


let data = {
	"data": [
		{
			"thumb": "http://facebook.github.io/react/img/logo_og.png","title": "电视","desc": "CRT 14-24寸 CRT 25寸及以上 液晶 14-123123123123123123"
		},
		{
			"thumb": "http://dummyimage.com/50x50/19e671","title": "空调","desc": "窗式 壁柜 柜式 吸顶"
		},
		{
			"thumb": "http://dummyimage.com/50x50/as22ff","title": "冰箱","desc": "50-120升 120-220升 220升以上 冰柜"
		},
		{
			"thumb": "http://dummyimage.com/50x50/e67119","title": "电脑","desc": "主机 显示器 笔记本"
		},
		{
			"thumb": "http://dummyimage.com/50x50/7119e6","title": "洗衣机","desc": "单缸 双缸 全自动 滚筒"
		},
		{
			"thumb": "http://dummyimage.com/50x50/71e619","title": "一体机","desc": "大型一体机"
		},
		{
			"thumb": "http://dummyimage.com/50x50/9e6711","title": "衣服","desc": "春装 夏装 秋装 冬装 童装"
		},
		{
			"thumb": "http://dummyimage.com/50x50/119e67","title": "床单被褥","desc": "床单被褥"
		},
		{
			"thumb": "http://dummyimage.com/50x50/67119e","title": "可回收垃圾","desc": "可回收垃圾"
		},
		{
			"thumb": "http://dummyimage.com/50x50/9e1167","title": "废旧家具","desc": "沙发 床垫 床 桌子 椅子 柜子"
		}
	]
};


// RecycleList 组件
class RecycleList extends Component {

	// DrawerNavigator 导航 设置
	// 侧边栏 DrawerItems 内，Icon, Label，在各 页面内 设置
	static navigationOptions = {
		// 设置 Label, 可覆盖 DrawerNavigator 中设置
	    // drawerLabel: '虎哥回收',
	    // 设置 Icon
	    drawerIcon: ({ tintColor }) => (
	    	<Icon name="md-sync" size={24} />
	    ),
	};

	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.state = {
			dataSource: ds.cloneWithRows(data.data)
		}
	}

	render() {
		console.log(this.props);
		return (
			<View style={styles.container}>
				<Header navigation={this.props.navigation} />
				<ListView style={styles.list}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}>
				</ListView>
			</View>
		)
	}

	componentDidMount() {
		// this.props.navigation.navigate('DrawerOpen');
		request.get(config.api.base + config.api.getProducts)
			.then((data) => {createRecycleListData(data)})
	}

	_renderRow(row) {
		return (
			<TouchableHighlight onPress={this._goSortingPage.bind(this)}>
				<View style={styles.row}>
					<Image style={styles.rowImg} source={{uri: row.thumb}} />
					<View style={styles.rowMsg}>
						<Text style={styles.rowTitle} numberOfLines={1}>{row.title}</Text>
						<Text style={styles.rowDesc} numberOfLines={1}>{row.desc}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	_goSortingPage(){
		this.props.navigation.navigate('Sorting', {name: 'Lucy'});
	}

	
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	list: {
		flex: 1
	},
	row: {
		flexDirection: 'row',
		backgroundColor: '#fff'
	},
	rowImg: {
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 10,
		marginTop: 10,
		width: 50,
		height: 50,
		borderRadius: 25
	},
	rowMsg: {
		flex: 1,
		justifyContent: 'center',
		borderBottomWidth: 1,
		borderColor: '#f4f4f4'
	},
	rowTitle: {
		marginBottom: 10,
		fontSize: 18,
		fontWeight: '700'
	},
	rowDesc: {
		fontSize: 14,
		color: '#bbbbbb',
		flexWrap: 'nowrap',
		overflow: 'hidden'
	},
	icon: {
	    width: 24,
	    height: 24,
	},
});

const RecycleListPage = StackNavigator(
	{
		List: { screen: RecycleList },
		Sorting: { screen: Sorting },
	},
	{
		headerMode: 'none'
	}
);

export default RecycleListPage;