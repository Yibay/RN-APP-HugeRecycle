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
				<ListView 
					dataSource={this.state.dataSource}
					renderRow={this._renderRow}
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
			<Text>{row.street}</Text>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default ManageAddress;