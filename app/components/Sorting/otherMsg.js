import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


import config from '../../common/config';


class OtherMsg extends Component {
	render() {
		return (
			<View>
				<Text style={styles.coupon}>优惠券详情</Text>
				<View style={styles.couponDetail}>
					<Image style={styles.couponImg} source={{uri: config.static.base + this.props.goods.coupon.image}} />
					<Text style={styles.couponText}>{this.props.goods.coupon.text}</Text>
				</View>
				<Text style={styles.coupon}>服务时间</Text>
				<View style={styles.serviceTime}>
					<Text style={styles.serviceTimeText}>{this.props.goods.serviceTime.txt1}</Text>
					<Text style={styles.serviceTimeText}>{this.props.goods.serviceTime.txt2}</Text>
					<Text style={styles.serviceTimeText}>{this.props.goods.serviceTime.txt3}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	coupon: {
		height: 45,
		backgroundColor: '#f4f8fb',
		fontSize: 16,
		lineHeight: 43,
		textAlign: 'center',
		color: '#515055'
	},
	couponDetail: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	couponImg: {
		width: 35,
		height: 30,
		resizeMode: 'stretch',
		marginVertical:18,
		marginHorizontal: 10
	},
	couponText: {
		fontSize: 10,
		color: '#515055'
	},
	serviceTime: {
		alignItems: 'center'
	},
	serviceTimeText: {
		lineHeight: 30,
		color: '#515055'
	}
});

export default OtherMsg;