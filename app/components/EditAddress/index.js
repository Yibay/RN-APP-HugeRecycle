import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Modal, Picker } from 'react-native';


import request from '../../common/request';
import config from '../../common/config';

import Header from './header';
import PickerModal from './pickerModal';


class EditAddress extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			formData: {
				id: null,
				cityId: null,
				city: null,
				regionId: null,
				region: null,
				streetId: null,
				street: null,
				communityId: null,
				communityName: null,
				address: null,
				telNo: null,
				locationDefault: false,
				building: null,
				unit: null,
				room: null
			},
			// 1阶 区列表
			regions: [],
			// 2阶 街道列表
			streets: [],
			// 3阶 小区列表
			communities: [],
			// 下拉选择器 选项
			list: [],
			// 下拉选择器 选中值
			selectedItem: {
				id: null,
				name: null
			},
			// 下拉选择器 submit 对应项
			submitItem: {
				id: null,
				name: null,
				sublist: null
			}
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<Header title='地址编辑' navigation={this.props.navigation} />
				<View style={styles.form}>
					<View style={[styles.formRow ,styles.formFirstRow]}>
						<Image style={styles.formImg} source={require('./img/img_account.png')} />
						<TextInput style={styles.formInput} placeholder='请输入联系人姓名' />
					</View>
					<View style={styles.formRow}>
						<Image style={styles.formImg} source={require('./img/tel_phone.png')} />
						<TextInput style={styles.formInput} placeholder='请输入手机号码' />
					</View>
					{/* 地址 级联选择器 */}
					<View style={styles.formRow}>
						{/* 选择 区 */}
						<Image style={styles.formImg} source={require('./img/address.png')} />
						<Text style={styles.formPickerVal}
							onPress={() => this._showPicker(this.state.regions, this.state.formData.region,
								{ id:'regionId', name: 'region', sublist: 'streets' })}>
							{ this.state.formData.region ? this.state.formData.region : '请选择区' }
						</Text>
						{/* 选择 街道 */}
						<Image style={styles.formImg} source={require('./img/address.png')} />
						<Text style={styles.formPickerVal}
							onPress={() => this._showPicker(this.state.streets, this.state.formData.street,
								{id:'streetId', name: 'street', sublist: 'communities'})}>
							{ this.state.formData.street ? this.state.formData.street : '请选择街道' }
						</Text>
					</View>
					<View style={styles.formRow}>
						{/* 选择 小区 */}
						<Image style={styles.formImg} source={require('./img/address.png')} />
						<Text style={styles.formPickerVal}
							onPress={() => this._showPicker(this.state.communities, this.state.formData.communityName,
								{ id:'communityId', name: 'communityName'})}>
							{ this.state.formData.communityName ? this.state.formData.communityName : '请选择小区' }
						</Text>
						{/* 有无 户号 */}
						<Image style={styles.formImg} source={require('./img/ic_default_selected.png')} />
						<Text style={styles.formPickerVal}
							onPress={() => {}}>
							户号
						</Text>
					</View>
				</View>
				<PickerModal modalVisible={this.state.modalVisible} closePicker={() => this._closePicker()}
					list={this._pretreat(this.state.list)}
					selectedItem={this.state.selectedItem} changeSelect={(item) => this._changeFormAddressData(item)} />
			</View>
		);
	}

	componentDidMount() {
		// 初始化 地区信息（下拉选择器 相应选项）
		request.get(config.api.base + config.api.getAddressInfo)
			.then(res => {
				console.log(res);
				if(!res.status){
					this.setState({
						formData: Object.assign({}, this.state.formData, {
							cityId: res.data.cities[0].id,
							city: res.data.cities[0].name
						}),
						regions: res.data.cities[0].regions
					})
				}
			})
			.catch(e => console.log(e))
	}

	// 弹出 选择器 (设置 选项列表，默认选中值)
	_showPicker(list, defaultName, submitItem) {
		this.setState({
			// 设置 选择器Modal 可见
			modalVisible: true,
			// 设置 被选项列表（若上一阶，未选完，默认空数组）
			list: list ? list : [],
			// 设置 默认选中项
			selectedItem: {
				name: defaultName
			},
			// 设置 提交修改项
			submitItem: submitItem
		})
	}

	// 关闭 选择器
	_closePicker() {
		this.setState({
			// 设置 选择器Modal 不可见
			modalVisible: false
		})
	}

	// 改变 地址值
	_changeFormAddressData(item) {
		console.log(item);
		// 0、注意：未改变选项，直接退出
		if(this.state.formData[this.state.submitItem.id] === item.id){
			// 关闭选择器
			return this._closePicker();
		}
		// 1、根据 this.state.submitItem设置项，确定 改变哪2项地址参数
		let submitItem ={};
		submitItem[this.state.submitItem.id] = item.id;
		submitItem[this.state.submitItem.name] = item.name;
		// 2、注意：级联 更新
		switch(this.state.submitItem.name) {
			case 'region':
				submitItem['streetId'] = null;
				submitItem['street'] = null;
			case 'street':
				submitItem['communityId'] = null;
				submitItem['communityName'] = null;
		}
		// 覆写 相应地址值
		submitItem = { formData: Object.assign({}, this.state.formData, submitItem) };
		// 3、如有子项 数组
		if(this.state.submitItem.sublist && item[this.state.submitItem.sublist]){
			// 相应改变 子项数组 对应 被选项数组
			submitItem[this.state.submitItem.sublist] = item[this.state.submitItem.sublist]
		}
		console.log(submitItem);
		// 4、改变 相应地址参数 值
		this.setState({
			...submitItem
		});
		// 5、关闭 选择器 Modal
		this._closePicker();
	}

	// 预处理 list, 因为communities数组中，没有id, name; 只有communityId, communityName
	_pretreat(list){
		console.log(list);
		return list.map(item => {
			if(!item.id && item.communityId){
				item.id = item.communityId;
			}
			if(!item.name && item.communityName){
				item.name = item.communityName;
			}
			return item;
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	form: {
		borderTopWidth: 1,
		borderTopColor: '#e7e7e7',
		paddingLeft: 20,
		backgroundColor: '#fff'
	},
	formRow: {
		borderTopWidth: 1,
		borderTopColor: '#e7e7e7',
		flexDirection: 'row',
		alignItems: 'center'
	},
	formFirstRow: {
		borderTopWidth: 0
	},
	formImg: {
		width: 30,
		height: 30,
		marginRight: 20
	},
	formInput: {
		flex: 1,
		height: 60
	},
	formPickerVal: {
		flex: 1,
		height: 60,
		lineHeight: 59,
		fontSize: 18,
		color: '#c7c7cd'
	}
});

export default EditAddress;