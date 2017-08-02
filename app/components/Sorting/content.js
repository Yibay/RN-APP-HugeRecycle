import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Row from './row';


class Content extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.add}>添加到回收栏</Text>
				{
					this.props.recycleList
						// 筛选 选中的分类
						.filter(item => item.id == this.props.selectId)
						// 获取 子分类
						.map(item => item.specs)[0]
						// 生成 子分类 模板
						.map(item => <Row key={item.id} goods={item} />)
				}
			</View>
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