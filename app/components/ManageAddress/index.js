import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, ListView, Alert } from 'react-native';


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
			dataSource: ds.cloneWithRows([]),
			needUpdateAddress: false
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header navigation={this.props.navigation} title='地址管理' goToEditAddress={() => this._goToEditAddress()} />
				<ListView style={styles.addressList}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					enableEmptySections={true} />
			</View>
		)
	}

	componentDidMount() {
		// 初始化 客户地址列表
		this._updateAddress();
	}

	componentDidUpdate() {
		// 新增／更新 地址时，刷新地址列表
		if(this.state.needUpdateAddress){
			this._updateAddress();
		}
	}

	/* --- A. 按钮事件 start --- */

	// a. 按钮1 编辑｜添加 地址（进入地址 编辑页）
	_goToEditAddress(row) {
		let params = {
			// 将通知 本页 更新客户地址列表的功能函数 传给下一页
			// 用于 保存地址后，返回本页
			setUpdateAddress: this._setUpdateAddress.bind(this)
		};
		// 若有row信息 则传入（编辑地址，而不是新增地址）
		if(row){
			// 将此地址信息传入
			Object.assign(params, {
				formData: row
			});
		}
		// 编辑页 并 传入数据
		this.props.navigation.navigate('EditAddress', params);
	}

	// a.1 触发事件 更新地址列表
	_setUpdateAddress(){
		this.setState({
			needUpdateAddress: true
		})
	}

	// a.2 更新 地址列表
	_updateAddress() {
		let params = this.props.navigation.state.params;
		// 请求 地址列表 信息
		request.get(config.api.base + config.api.getAddressList, null, {
			'X-AUTH-TOKEN': params.token
		})
		.then(res => {
			console.log(res);
			// 确认地址列表 信息有效
			if(!res.status && res.data && res.data.addresses){
				// 更新 地址列表数据
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(res.data.addresses),
					needUpdateAddress: false
				})
			}
		})
		.catch(e => console.log(e))
	}

	// b. 按钮2 确认 是否 删除地址
	_comfirmDeleteAddress(addressId) {
		Alert.alert(
			'确认删除地址？',
			null,
			[
				{text: '取消', onPress: () => console.log('取消删除')},
				{text: '确认', onPress: () => this._deleteAddress(addressId)}
			]
		)
	}
	// b.1 删除 地址
	_deleteAddress(id) {
		console.log('删除地址id：' + id);
		// 获取 token
		AsyncStorage.getItem('X-AUTH-TOKEN')
			// 发送 删除地址 请求
			.then(token => request.get(config.api.base + config.api.deleteAddress + id, null, {'X-AUTH-TOKEN': token}))
			.then(res => {
				console.log(res);
				// 删除地址后，更新 地址列表
				this._updateAddress();
			})
			.catch(e => console.log(e))
	}


	/* --- 按钮事件 end --- */


	/* --- B. 渲染本页列表 start --- */
	_renderRow(row) {
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
						<Text style={styles.operationItemTxt} onPress={() => this._goToEditAddress(row)}>编辑</Text>
					</View>
					<View style={styles.operationItem}>
						<Text style={styles.operationItemTxt} onPress={() => this._comfirmDeleteAddress(row.id)}>删除</Text>
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
	/* --- 渲染本页列表 end --- */

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