import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, Image, TextInput, Modal, Picker } from 'react-native';


import request from '../../common/request';
import config from '../../common/config';
import { testAddressForm } from '../../common/tools';

import Header from './header';
import PickerModal from './pickerModal';


class EditAddress extends Component {

	constructor(props) {
		super(props);
		// 由编辑入口进入的 初始化表单信息
		let formData = this.props.navigation.state.params.formData ? this.props.navigation.state.params.formData : {};
		console.log(123123);
		console.log(formData);
		this.state = {
			modalVisible: false,
			formData: {
				id: formData.id ? formData.id : null,
				// 姓名
				customerName: formData.customerName ? formData.customerName : null,
				// 电话
				telNo: formData.telNo ? formData.telNo : null,
				// 地址信息
				cityId: formData.cityId ? formData.cityId : null,
				city: formData.city ? formData.city : null,
				regionId: formData.regionId ? formData.regionId : null,
				region: formData.region ? formData.region : null,
				streetId: formData.streetId ? formData.streetId : null,
				street: formData.street ? formData.street : null,
				communityId: formData.communityId ? formData.communityId : null,
				communityName: formData.communityName ? formData.communityName : null,
				// 有无户号 (boolean值，要用typeof 判定是否为 undefined)
				haveHouseNumber: typeof formData.haveHouseNumber === 'undefined' ? true : formData.haveHouseNumber,
				// 有户号 详细地址信息
				building: formData.building ? formData.building : null,
				unit: formData.unit ? formData.unit : null,
				room: formData.room ? formData.room : null,
				// 无户号 详细地址信息
				address: formData.address ? formData.address : null,
				// 是否为默认地址 (boolean值，要用typeof 判定是否为 undefined)
				locationDefault: typeof formData.locationDefault === 'undefined' ? false : formData.locationDefault
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
				{/* 页头 */}
				<Header title='地址编辑' navigation={this.props.navigation} saveAddress={() => this._saveAddress()} />
				{/* 表单 */}
				<View style={styles.form}>
					<View style={[styles.formRow ,styles.formFirstRow]}>
						<Image style={styles.formImg} source={require('./img/img_account.png')} />
						<TextInput style={styles.formInput} placeholder='请输入联系人姓名' onChangeText={customerName => this.setState({
							formData: Object.assign({}, this.state.formData, {customerName: customerName.trim()})
						})} value={this.state.formData.customerName}/>
					</View>
					<View style={styles.formRow}>
						<Image style={styles.formImg} source={require('./img/tel_phone.png')} />
						<TextInput style={styles.formInput} placeholder='请输入手机号码' onChangeText={telNo => this.setState({
							formData: Object.assign({}, this.state.formData, {telNo: telNo.trim()})
						})} value={this.state.formData.telNo} />
					</View>
					{/* 地址 级联选择器 */}
					<View style={styles.formRow}>
						{/* 选择 区 */}
						<Image style={styles.formImg} source={require('./img/address.png')} />
						<Text style={[styles.formPickerPlaceholder, this.state.formData.region ? styles.formPickerVal : null]}
							onPress={() => this._showPicker(this.state.regions, this.state.formData.region,
								{ id:'regionId', name: 'region', sublist: 'streets' })}>
							{ this.state.formData.region ? this.state.formData.region : '请选择区' }
						</Text>
						{/* 选择 街道 */}
						<Image style={styles.formImg} source={require('./img/address.png')} />
						<Text style={[styles.formPickerPlaceholder, this.state.formData.street ? styles.formPickerVal : null]}
							onPress={() => this._showPicker(this.state.streets, this.state.formData.street,
								{id:'streetId', name: 'street', sublist: 'communities'})}>
							{ this.state.formData.street ? this.state.formData.street : '请选择街道' }
						</Text>
					</View>
					<View style={styles.formRow}>
						{/* 选择 小区 */}
						<Image style={styles.formImg} source={require('./img/address.png')} />
						<Text style={[styles.formPickerPlaceholder, this.state.formData.communityName ? styles.formPickerVal : null]}
							onPress={() => this._showPicker(this.state.communities, this.state.formData.communityName,
								{ id:'communityId', name: 'communityName'})}>
							{ this.state.formData.communityName ? this.state.formData.communityName : '请选择小区' }
						</Text>
						{/* 有无 户号 */}
						<Image style={styles.formImg} source={
							this.state.formData.haveHouseNumber ? require('./img/ic_finished_time_2.png') : require('./img/ic_finished_time.png')} />
						<Text style={styles.formPickerPlaceholder}
							onPress={() => this.setState({
								formData: Object.assign({}, this.state.formData, {haveHouseNumber: !this.state.formData.haveHouseNumber})
							})}>
							户号
						</Text>
					</View>
					{
						/* 根据 有无户号 显示 */
						this.state.formData.haveHouseNumber ? 
						/* 有户号地址 */
						<View style={styles.formRow}>
							<Image style={styles.formImg} source={require('./img/address.png')} />
							<View style={styles.formLineBox}>
								<TextInput style={styles.formInputHasLine} onChangeText={building => this.setState({
									formData: Object.assign({}, this.state.formData, {building: building.trim().toUpperCase()})
								})} keyboardType='numeric' autoCapitalize='none' value={this.state.formData.building} />
							</View>
							<Text style={styles.formTxt}>幢</Text>
							<View style={styles.formLineBox}>
								<TextInput style={styles.formInputHasLine} onChangeText={unit => this.setState({
									formData: Object.assign({}, this.state.formData, {unit: unit.trim().toUpperCase()})
								})} value={this.state.formData.unit} />
							</View>
							<Text style={styles.formTxt}>单元</Text>
							<View style={styles.formLineBox}>
								<TextInput style={styles.formInputHasLine} onChangeText={room => this.setState({
									formData: Object.assign({}, this.state.formData, {room: room.trim().toUpperCase()})
								})} value={this.state.formData.room} />
							</View>
							<Text style={[styles.formTxt, {marginRight: 20}]}>室</Text>
						</View>
						:
						/* 无户号地址 */
						<View style={styles.formRow}>
							<Image style={styles.formImg} source={require('./img/address.png')} />
							<TextInput style={styles.formInput} placeholder='请输入详细地址' onChangeText={address => this.setState({
								formData: Object.assign({}, this.state.formData, {address: address.trim()})
							})} />
						</View>
					}
				</View>
				<View style={styles.msgBox}>
					<Text style={styles.msg}>(目前暂时只支持杭州地区)</Text>
					<Text style={styles.msg}>(虎哥中转站服务暂时支持部分小区)</Text>
				</View>
				{/* 选择器组件 */}
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
					// 大区下拉列表
					let regions = res.data.cities[0].regions;
					// 街道下拉列表
					let streets = this.state.streets;
					// 小区下拉列表
					let communities = this.state.communities;
					// 若由 编辑入口 进入，根据 区ID 初始化 街道下拉列表
					if(this.state.formData.regionId) {
						streets = regions.filter(item => item.id === this.state.formData.regionId)[0].streets
						// 若由 编辑入口 进入，根据 街道ID 初始化 小区下拉列表
						if(this.state.formData.streetId) {
							communities = streets.filter(item => item.id === this.state.formData.streetId)[0].communities
						}
					}
					// 更新数据
					this.setState({
						formData: Object.assign({}, this.state.formData, {
							cityId: this.state.cityId ? this.state.cityId : res.data.cities[0].id,
							city: this.state.city ? this.state.city :  res.data.cities[0].name
						}),
						// 1阶 区列表
						regions: regions,
						// 2阶 街道列表(若从编辑页，进入则初始化)
						streets: streets,
						// 3阶 小区列表(若从编辑页，进入则初始化)
						communities: communities
					})
				}
			})
			.catch(e => console.log(e))
	}

	// 保存地址 信息发送请求
	_saveAddress() {
		// 后台设定 address 不能为空
		// 所以 若有户号
		if(this.state.formData.haveHouseNumber){
			// 则拼接 幢-单元-室
			this.setState({
				formData: Object.assign({}, this.state.formData, {
					address: [this.state.formData.building, this.state.formData.unit, this.state.formData.room].join('-')	
				})
			})
		}
		console.log(this.state.formData);
		// 验证 表单数据
		if(testAddressForm(this.state.formData)){
			// 新增｜修改 地址请求 url
			let url = config.api.base;
			// 若 表单id 不为 null，则为 修改
			if(this.state.formData.id){
				// 拼接 修改地址 url
				url += config.api.editAddress;
			}
			// 若 表单id 为 null，则为 新增
			else {
				// 拼接 新增地址 url
				url += config.api.addAddress;
			}
			// 获取token
			AsyncStorage.getItem('X-AUTH-TOKEN')
				// 发送请求
				.then(token => request.post(url, this.state.formData, {'X-AUTH-TOKEN': token}))
				.then(res => {
					console.log(res);
					// 通知上一页 更新 客户地址列表
					this.props.navigation.state.params.setUpdateAddress();
					// 返回上一页
					this.props.navigation.goBack();
				})
				.catch(e => console.log(e))
		}
	}

	/* --- pickerModal 相关start --- */

	// 弹出 选择器 (设置 选项列表，默认选中值)
	// 参数1: list, option列表；[{id: Number, name: String},...]
	// 参数2: defaultName, String
	// 参数3: submitItem，{id: String, name: String, sublist: String}
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

	/* --- pickerModal 相关end --- */
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
	formPickerPlaceholder: {
		flex: 1,
		height: 60,
		lineHeight: 59,
		fontSize: 18,
		color: '#c7c7cd'
	},
	formPickerVal: {
		color: '#000'
	},
	formLineBox: {
		flex: 1,
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: '#767676'
	},
	formInputHasLine: {
		height: 40,
		textAlign: 'center'
	},
	formTxt: {
		height: 60,
		marginHorizontal: 5,
		fontSize: 18,
		lineHeight: 60,
		color: '#767676'
	},
	msg: {
		marginTop: 15,
		textAlign: 'center',
		fontSize: 15,
		color: '#767676'
	}
});

export default EditAddress;