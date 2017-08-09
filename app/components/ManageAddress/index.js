import React, { Component } from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';


import request from '../../common/request';
import config from '../../common/config';

import Header from './header';


class ManageAddress extends Component {

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		})
		this.state = {
			dataSource: ds.cloneWithRows([])
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header navigation={this.props.navigation} title='地址管理' />
				<ListView style={styles.addressList}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					enableEmptySections={true} />
			</View>
		)
	}

	componentDidMount() {
		let params = this.props.navigation.state.params;
		// 请求 地址列表 信息
		request.get(config.api.base + config.api.getAddressList, null, {
			'X-AUTH-TOKEN': params.token
		})
		.then(res => {
			// 确认地址列表 信息有效
			if(!res.status && res.data && res.data.addresses){
				// 更新 地址列表数据
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(res.data.addresses)
				})
			}
		})
		.catch(e => console.log(e))
	}

	_renderRow(row) {
		console.log(row);
		return (
			<View style={styles.addressItem}>
				<View style={styles.nameTel}>
					<Text style={styles.name}>{row.customerName}</Text>
					<Text style={styles.tel}>{row.telNo}</Text>
				</View>
				<Text style={styles.address}>
					{ this._joinAddress(row) }
				</Text>
				<View style={styles.operation}>
					<View style={[styles.operationItem, styles.operationFirstItem]}>
						<Text style={styles.operationItemTxt}>默认</Text>
					</View>
					<View style={styles.operationItem}>
						<Text style={styles.operationItemTxt}>编辑</Text>
					</View>
					<View style={styles.operationItem}>
						<Text style={styles.operationItemTxt}>删除</Text>
					</View>
				</View>
			</View>
		)
	}

	_joinAddress(row){
		let address = row.city + row.region + row.street + row.communityName;
		if(row.haveHouseNumber){
			address += row.building + '幢' + row.unit + '单元' + row.room + '室';
		}
		else {
			address += row.address;
		}
		return address;
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	addressList: {
		flex: 1
	},
	addressItem: {
		marginTop: 12,
		backgroundColor: '#fff'
	},
	nameTel: {
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	name: {
		fontSize: 16,
		lineHeight: 35
	},
	tel: {
		fontSize: 13,
		lineHeight: 35
	},
	address: {
		paddingLeft: 20,
		lineHeight: 35,
		color: '#666'
	},
	operation: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	operationItem: {
		flex: 1,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderColor: '#e5e5e5'
	},
	operationFirstItem: {
		borderLeftWidth: 0
	},
	operationItemTxt: {
		lineHeight: 35,
		textAlign: 'center',
		color: '#666'
	}
})

export default ManageAddress;