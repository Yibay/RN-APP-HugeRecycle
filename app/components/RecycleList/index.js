import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ListView, TouchableHighlight } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from 'react-navigation';


import Sorting from '../Sorting/index';
import EditOrder from '../EditOrder/index';
import ManageAddress from '../ManageAddress/index';
import EditAddress from '../EditAddress/index';
import Header from './header';

import request from '../../common/request';
import config from '../../common/config';
import { createRecycleListData } from '../../common/tools';


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
			dataSource: ds.cloneWithRows([]),
			recycleList: []
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header navigation={this.props.navigation} />
				<ListView style={styles.list}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					enableEmptySections={true}>
				</ListView>
			</View>
		)
	}

	componentDidMount() {
		// this.props.navigation.navigate('DrawerOpen');
		request.get(config.api.base + config.api.getProducts)
			.then((data) => { 
				let row = createRecycleListData(data);
				console.log(row);
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(row),
					recycleList: row
				});
			})
	}

	_renderRow(row) {
		return (
			<TouchableHighlight onPress={() => this._goSortingPage.bind(this)(row.id)}>
				<View style={styles.row}>
					<Image style={styles.rowImg} source={{uri: config.static.base + row.image}} />
					<View style={styles.rowMsg}>
						<Text style={styles.rowTitle} numberOfLines={1}>{row.name}</Text>
						<Text style={styles.rowDesc} numberOfLines={1}>{row.desc}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}

	_goSortingPage(id){
		this.props.navigation.navigate('Sorting', {
			recycleList: this.state.recycleList, 
			selectId: id
		});
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
		color: '#bbb',
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
		EditOrder: { screen: EditOrder },
		ManageAddress: { screen: ManageAddress },
		EditAddress: { screen: EditAddress }
	},
	{
		headerMode: 'none'
	}
);

export default RecycleListPage;