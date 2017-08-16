import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, ListView, TouchableOpacity } from 'react-native';


import request from '../../common/request';
import config from '../../common/config';

import Header from '../common/header';


class MyEnvRecord extends Component {

	constructor(props){
		super(props);

		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.state = {
			dataSource: ds.cloneWithRows([])
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title='我的环保记录' navigation={this.props.navigation}/>
				<ListView style={styles.myOrderList}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					enableEmptySections={true} />
			</View>
		)
	}

	componentDidMount() {
		AsyncStorage.getItem('X-AUTH-TOKEN')
			.then(token => request.get(config.api.base + config.api.myOrders, null, {'X-AUTH-TOKEN': token}))
			.then(res => {
				// 更新 我的订单 列表
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(res.data)
				})
			})
			.catch(e => console.log(e))
	}

	_renderRow(row) {
		return (
			<TouchableOpacity onPress={() => this._goToMyOrderPage(row.id)}>
				<View style={styles.orderItem}>
					<View style={styles.orderMsg}>
						<Text>{row.recycleCategoryDesc}</Text>
						<Text style={styles.orderTime}>{row.createOrderTime}</Text>
					</View>
					<Text style={styles.orderStatus}>{row.orderStatus}</Text>
				</View>
			</TouchableOpacity>
		)
	}

	// 进入 我的订单页 (传入订单ID，用于 我的订单页，请求订单详情参数)
	_goToMyOrderPage(id) {
		this.props.navigation.navigate('MyOrder', {id: id});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	myOrderList: {
		borderTopWidth: 1,
		borderColor: '#e5e5e5'
	},
	orderItem: {
		padding: 20,
		borderBottomWidth: 1,
		borderColor: '#e5e5e5',
		backgroundColor: '#fff'
	},
	orderMsg: {
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	orderTime: {
		color: '#666'
	},
	orderStatus: {
		textAlign: 'right',
		color: '#ff4444'
	}
})

export default MyEnvRecord;