import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, Switch, TextInput, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconO from 'react-native-vector-icons/Octicons';


import request from '../../common/request';
import config from '../../common/config';
import { joinAddress } from '../../common/tools';

import SignIn from '../../containers/SignIn/index';
import Header from '../common/header';
import Footer from './footer';


class EditOrder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAerialWork: false,
			remarks: '',
			tag: ['停车不方便','到达后联系','回收物品较多','无电梯'],
			defaultAddress: null,
			needUpadateDefaultAddress: false
		}
	}

	componentWillMount(){
		// 先确认 本地是否已 存储token
		AsyncStorage.getItem('X-AUTH-TOKEN')
			.then(res => {
				this.setState({
					token: res
				})
			})
	}

	render() {
		let params = this.props.navigation.state.params;
		// 若未登录，则先登录
		if(!this.state.token){
			// 2个参数：1、用于设置accessToken；2、用于close返回
			return <SignIn setToken={token => this.setState({token: token, needUpadateDefaultAddress: true})} navigation={this.props.navigation} />
		}
		// 已登录 则直接进入页面
		else {
			return (
				<View style={styles.container}>
					<Header title='订单编辑' navigation={this.props.navigation} />
					<View style={styles.main}>
						{/* 地址栏 */}
						{
							this.state.defaultAddress ? 
							<TouchableOpacity onPress={() => this._goManageAddressPage()}>
								<View style={styles.defaultAddress}>
									<View style={styles.defaultAddressNameTelBox}>
										<Text style={styles.defaultAddressNameTel}>{this.state.defaultAddress.customerName}</Text>
										<Text style={styles.defaultAddressNameTel}>{this.state.defaultAddress.telNo}</Text>
									</View>
									<Text style={styles.defaultAddressMsg}>
										{
											joinAddress(this.state.defaultAddress)
										}
									</Text>
								</View>
							</TouchableOpacity>
							:
							<Text style={styles.chooseAddress} onPress={() => this._goManageAddressPage()}>去选择地址</Text>
						}
						{/* 回收物品栏 */}
						<View style={styles.recycleBox}>
							<View style={styles.recycleTitle}>
								<Icon name='recycle' size={22} color='#c7c7c7' />
								<Text style={styles.recycleTitleTxt}>回收物品</Text>
							</View>
							<View style={styles.goodsBox}>
								<Text>
									{
										params.recycleGood.map(item => item.name).join('、')
									}
								</Text>
							</View>
						</View>
						{/* 拆卸空调栏 */}
						<View style={styles.airConditionerBox}>
							<View style={styles.airConditioner}>
								<IconO name='tools' size={22} color='#c7c7c7' />
								<Text style={styles.airConditionerTxt}>是否需要拆卸空调（拆卸费50元）</Text>
							</View>
							<Switch onValueChange={this._changeAerialWork.bind(this)} value={this.state.isAerialWork} />
						</View>
						{/* 备注栏 */}
						<View style={styles.remarksBox}>
							<TextInput style={styles.remarks} multiline={true} numberOfLines={5}
								placeholder='给虎哥写点小提示 停车不方便等' placeholderTextColor='#bbb'
								value={this.state.remarks} maxLength={100}
								onChangeText={remarks => this.setState({remarks})}
								textAlignVertical='top'/>
							<Text style={[styles.maxLength, this.state.remarks.length ? styles.none : null]}>(100字以内)</Text>
						</View>
						{/* 标签栏 */}
						<View style={styles.tagBox}>
							{
								this.state.tag.map((item, index) => 
									<Text key={index} style={styles.tag} onPress={() => this._addTag(item)}>{item}</Text>)
							}
						</View>
					</View>
					<Footer placeOrder={() => this._placeOrder()} />
				</View>
			)
		}
	}

	componentDidMount() {
		// 更新 默认地址
		this._updateDefaultAddress();
	}

	componentDidUpdate() {
		// 若需要更新
		if(this.state.needUpadateDefaultAddress){
			// 则更新 默认地址
			this._updateDefaultAddress();
		}
	}

	/* --- A. 更新 默认地址 start --- */

	// 进入 地址管理页
	_goManageAddressPage(){
		this.props.navigation.navigate('ManageAddress', {
			token: this.state.token,
			setUpdateDefaultAddress: () => this._setUpdateDefaultAddress()
		});
	}

	// 触发 更新地址
	_setUpdateDefaultAddress() {
		this.setState({
			needUpadateDefaultAddress: true
		})
	}

	// 更新 默认地址
	_updateDefaultAddress() {
		// 获取 token
		AsyncStorage.getItem('X-AUTH-TOKEN')
			// 获取 客户下单页面 初始化数据
			.then(res => request.get(config.api.base + config.api.initRecycleCreate, null, {'X-AUTH-TOKEN': res}))
			.then(res => {
				console.log(res);
				this.setState({
					// 更新 默认地址
					defaultAddress: res.data.defaultAddress,
					tag: res.data.tips,
					needUpadateDefaultAddress: false
				})
			})
			.catch(e => console.log(e))
	}

	/* --- 更新 默认地址 end --- */

	

	/* --- B. 订单编辑 控件 start --- */

	// 开关：是否需要 拆卸空调
	_changeAerialWork() {
		this.setState({
			isAerialWork: !this.state.isAerialWork
		});
	}

	// 向备注栏 增加 标签
	_addTag(text){
		this.setState({
			remarks: this.state.remarks + ' ' + text
		})
	}

	// 按钮：下单
	_placeOrder() {
		// 表单参数
		let params = {};
		// 回收 大类别数组
		let types = this.props.navigation.state.params.recycleGood.map(item => ({type: item.category}));
		// 根据 大类别数组 是否出现重复类别 判定 type（无重复为1；有重复为3）
		let type = 1;
		// 从小到大，有序排列，归并判断前后2项是否相等
		types.sort((v1, v2) => v1.type - v2.type).reduce((prev, cur) => {
			if(cur.type === prev.type){
				type = 3;
			}
			return cur;
		});
		Object.assign(params, this.state.defaultAddress, {
			// 联系人 名称
			accountName: this.state.defaultAddress.customerName,
			// 联系电话
			phone: this.state.defaultAddress.telNo,
			// 是否需要 拆空调
			isAerialWork: this.state.isAerialWork,
			// 回收小类别
			recycleCategoryDesc: this.props.navigation.state.params.recycleGood.map(item => item.name).join('、'),
			// 回收类别 数组
			types: types,
			// 单一大类别，还是多个大类别？
			type: type
		});
		console.log(params);
		AsyncStorage.getItem('X-AUTH-TOKEN')
			.then(token => request.post(config.api.base + config.api.createOrder, params, {'X-AUTH-TOKEN': token}))
			.then(res => console.log(res))
			.catch(e => console.log(e))
		
	}

	/* --- 订单编辑 控件 end --- */

	
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	main: {
		flex: 1
	},
	chooseAddress: {
		marginVertical: 15,
		backgroundColor: '#fff',
		height: 50,
		lineHeight: 50,
		textAlign: 'center',
		color: 'red'
	},
	defaultAddress: {
		marginVertical: 15,
		paddingHorizontal: 20,
		backgroundColor: '#fff'
	},
	defaultAddressNameTelBox: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	defaultAddressNameTel: {
		height: 35,
		lineHeight: 35
	},
	defaultAddressMsg: {
		height: 35,
		lineHeight: 35,
		color: '#6e6e6e'
	},
	recycleBox: {
		paddingLeft: 20,
		backgroundColor: '#fff'
	},
	recycleTitle: {
		height: 35,
		borderBottomWidth: 1,
		borderBottomColor: '#f4f4f4',
		flexDirection: 'row',
		alignItems: 'center'
	},
	recycleTitleTxt: {
		marginLeft: 5,
		fontSize: 13,
		color: '#6e6e6e'
	},
	goodsBox: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	airConditionerBox: {
		height: 50,
		marginTop: 15,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	airConditioner: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	airConditionerTxt: {
		marginLeft: 5
	},
	remarksBox: {
		position: 'relative',
		marginTop: 15,
		height: 130,
		paddingHorizontal: 20,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: '#fff',
	},
	remarks: {
		fontSize: 13,
		lineHeight: 20
	},
	maxLength: {
		position: 'absolute',
		right: 20,
		bottom: 15,
		fontSize: 13,
		color: '#bbb'
	},
	none: {
		display: 'none'
	},
	tagBox: {
		padding: 20,
		flexDirection: 'row'
	},
	tag: {
		height: 26,
		marginRight: 5,
		paddingHorizontal: 6,
		borderWidth: 1,
		borderColor: '#d3d7da',
		borderRadius: 13,
		fontSize: 12,
		lineHeight: 24,
		color: '#aeadb2'
	}
});

export default EditOrder;