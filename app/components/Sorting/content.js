import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';


import Row from './row';
import OtherMsg from './otherMsg';

import config from '../../common/config';


class Content extends Component {
	render() {
		let selectGood = this.props.recycleList.filter((item) => item.id === this.props.selectId)[0];
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.add} onPress={() => {this.props.toggleRecycleGood(this.props.selectId, selectGood.name)}}>
					{this.props.recycleGood.some(item => item.id === this.props.selectId) ? '取消回收' : '添加到回收栏'}
				</Text>
				{
					this.props.recycleList
						// 筛选 选中的分类
						.filter(item => item.id === this.props.selectId)
						// 获取 子分类
						.map(item => item.specs)[0]
						// 生成 子分类 模板
						.map((item, index) => <Row key={item.id} goods={item} index={index} />)
				}
				{
					this.props.recycleList
						.filter(item => item.id === this.props.selectId)
						.map(item => <OtherMsg key={item.id} goods={item} />)
				}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderTopWidth: 1,
		borderTopColor: '#e3e7ea',
		backgroundColor: '#fff'
	},
	add: {
		height: 38,
		width: 142,
		marginVertical: 8,
		alignSelf: 'center',
		borderColor: '#ffcf31',
		borderWidth: 2,
		borderRadius: 19,
		overflow: 'hidden',
		textAlign: 'center',
		fontSize: 14,
		lineHeight: 34
	}
});

export default Content;