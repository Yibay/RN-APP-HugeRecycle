import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ListView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Sorting from '../Sorting/index';

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
		return (
			<ListView style={styles.container}
				dataSource={this.state.dataSource}
				renderHeader={this._renderHeader.bind(this)}
				renderRow={this._renderRow}>
			</ListView>
		)
	}

	// componentDidMount() {
	// 	this.props.navigation.navigate('DrawerOpen');
	// }

	_renderHeader() {
		return(
			<View style={styles.header}>
				<Icon name="md-menu" size={30} onPress={this._callMenu.bind(this)}/>
				<Text style={styles.headerText}>虎哥回收</Text>
				<Icon name="md-call" size={30} />
			</View>
		)
	}

	_renderRow(row) {
		return (
			<View style={styles.row}>
				<Image style={styles.rowImg} source={{uri: row.thumb}} />
				<View style={styles.rowMsg}>
					<Text style={styles.rowTitle} numberOfLines={1}>{row.title}</Text>
					<Text style={styles.rowDesc} numberOfLines={1}>{row.desc}</Text>
				</View>
			</View>
		)
	}

	// 调出 左边栏 菜单
	_callMenu(){
		this.props.navigation.navigate('DrawerOpen');
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		paddingTop: 25,
		paddingBottom: 5,
		paddingLeft: 12,
		paddingRight: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#ffcf31'
	},
	headerText: {
		fontSize: 20
	},
	row: {
		flexDirection: 'row'
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
		fontWeight: '700',
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

export default RecycleList;