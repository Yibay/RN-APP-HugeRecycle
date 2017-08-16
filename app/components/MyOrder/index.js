import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


import request from '../../common/request';
import config from '../../common/config';
import { create8DigitNumber, timeFormatting } from '../../common/tools';

import Header from '../common/header';
import MoreHeader from './header';


class MyOrder extends Component {

	// DrawerNavigator 导航 设置
	// 侧边栏 DrawerItems 内，Icon, Label，在各 页面内 设置
	static navigationOptions = {
		// 设置 Label, 可覆盖 DrawerNavigator 中设置
	    // drawerLabel: '虎哥回收',
	    // 设置 Icon
	    drawerIcon: ({ tintColor }) => (
	    	<Icon name="md-clipboard" size={24} />
	    ),
	};

	constructor(props) {
		super(props);
		this.state = {
			order: {}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				{
					/* 页头 */
					this._renderHeader()
				}
				{/* 回收物品栏 */}
				<View style={styles.orderBox}>
					<View style={styles.orderTitle}>
						<Image style={styles.orderIcon} source={require('./img/icon_order_small.png')} />
						<Text style={styles.orderId}>订单号：{create8DigitNumber(this.state.order.id)}</Text>
					</View>
					<View style={styles.categoryBox}>
						<Text>{this.state.order.recycleCategoryDesc}</Text>
					</View>
				</View>
				{/* 订单进度图 */}
				<View style={styles.scheduleBox}>
					<View style={styles.scheduleIconBox}>
						<Image style={styles.Icon} source={require('./img/ic_order_time.png')} />
						<Image style={styles.Icon} source={require('./img/ic_accept_order_time_grey.png')} />
						<Image style={styles.Icon} source={require('./img/ic_arrived_time_grey.png')} />
						<Image style={styles.Icon} source={require('./img/ic_finished_time.png')} />
						<View style={styles.line}></View>
					</View>
					<View style={styles.orderProgress}>
						{
							this._renderOrderTime('createdTs')
						}
						{
							this._renderOrderTime('acceptedTs')
						}
						{
							this._renderOrderTime('arrivedTs')
						}
						{
							this._renderOrderTime('completedTs')
						}
					</View>
				</View>
			</View>
		)
	}

	componentDidMount() {
		AsyncStorage.getItem('X-AUTH-TOKEN')
			.then(token => {
				try {
					// 若有订单参数 随路由传入，则使用它
					return request.get(config.api.base + config.api.order + this.props.navigation.state.params.id, null, {'X-AUTH-TOKEN': token});	
				}
				catch(e) {
					console.log(e);
					// 若没有订单参数 传入，则默认使用 -1
					return request.get(config.api.base + config.api.order + '-1', null, {'X-AUTH-TOKEN': token});
				}
			})
			.then(res => {
				console.log(res);
				this.setState({
					order: res.data
				})
			})
			.catch(e => console.log(e))
	}

	// 渲染 header
	_renderHeader(){
		// 从其他页面 进入，则不显示 “更多”按钮
		if(this.props.navigation.state.params && this.props.navigation.state.params.id){
			return (<Header title='我的订单' navigation={this.props.navigation} />);
		}
		// 从抽屉导航 进入，则显示 “更多”按钮
		else {
			return (
				<MoreHeader title='我的订单' navigation={this.props.navigation}
						goBack={() => this._goBack()} goNextPage={() => this._goNextPage()} />
				);
		}
	}

	// 渲染 订单进程 中，各状态时间栏
	_renderOrderTime(status_time){
		if(this.state.order && this.state.order.tServiceOrder && this.state.order.tServiceOrder[status_time]){
			return (
				<View style={styles.orderItem}>
					<Text style={styles.orderTime}>{this._switchOrderTxt(status_time) + timeFormatting(this.state.order.tServiceOrder[status_time])}</Text>
					<View style={styles.triangle}></View>
				</View>
			)
		}
	}
	// 定制 订单状态时间文本
	_switchOrderTxt(status_time){
		let status_time_txt;
		switch(status_time) {
			case 'createdTs':
				status_time_txt = '下单时间: ';
				break;
			case 'acceptedTs':
				status_time_txt = '接单时间: ';
				break;
			case 'arrivedTs':
				status_time_txt = '到达时间: ';
				break;
			case 'completedTs':
				status_time_txt = '完成时间: ';
				break;
		}
		return status_time_txt;
	}

	// 按钮：返回上一页
	_goBack(){
		this.props.navigation.navigate('虎哥回收');
	}
	// 按钮：下一页
	_goNextPage() {
		this.props.navigation.navigate('MyEnvRecord');
	}
}

// Icon 尺寸
const icon_width = 35;
// IconBox 间距的一半
const icon_margin = 20;
// 订单状态变化 时间 高度
const order_time_height = 48;
const order_time_margin = ((icon_width + icon_margin * 2) - order_time_height) / 2;
// 三角形 width
const triangle_width = 10;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	// 回收物品栏
	orderBox: {
		marginTop: 10,
		paddingLeft: 20,
		backgroundColor: '#fff'
	},
	orderTitle: {
		height: 35,
		borderBottomWidth: 1,
		borderBottomColor: '#f4f4f4',
		flexDirection: 'row',
		alignItems: 'center'
	},
	orderIcon: {
		width: 15,
		height: 15,
		resizeMode: 'contain'
	},
	orderId: {
		marginLeft: 5,
		fontSize: 13,
		color: '#6e6e6e'
	},
	categoryBox: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	// 订单进度图
	scheduleBox: {
		position: 'relative',
		flex: 1,
		// marginTop: 20,
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	scheduleIconBox: {
		width: icon_width * 2,
		height: 'auto',
		alignItems: 'center'
	},
	Icon: {
		marginVertical: icon_margin,
		width: icon_width,
		height: icon_width,
		resizeMode: 'contain'
	},
	line: {
		position: 'absolute',
		zIndex: -100,
		top: icon_width,
		bottom: icon_width,
		borderLeftWidth: 1,
		borderColor: '#fed030'
	},
	// 订单状态信息
	orderProgress: {
		flex: 1,
		paddingRight: 20
	},
	orderItem: {
		position: 'relative'
	},
	orderTime: {
		marginVertical: order_time_margin,
		height: order_time_height,
		paddingLeft: 20,
		borderRadius: 5,
		backgroundColor: '#fff',
		overflow: 'hidden',
		lineHeight: order_time_height
	},
	triangle: {
		position: 'absolute',
		top: (icon_width + icon_margin * 2) / 2,
		left: - triangle_width / 2,
		width: triangle_width,
		height: triangle_width,
		transform: [{translateY: - triangle_width / 2}, {rotate: '45deg'}],
		backgroundColor: '#fff'
	}
});

export default MyOrder;