import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


class HeaderLR extends Component {

	render() {
		return(
			<View style={styles.header}>
				<Icon name="md-arrow-back" size={30} onPress={this._goBack.bind(this)}/>
				<Text style={styles.headerText}>{this.props.title}</Text>
				{/* 跳转至 地址编辑页 */}
				{this._renderRightButton(this.props.rightButtonTxt)}
			</View>
		)
	}

	// 渲染 右边按钮
	// 可选择显示：
		// 1、Text 文本
		// 2、Icon 图标
		// 3、Image 图片
	_renderRightButton(rightButtonTxt) {
		// 若存在 图片资源，则优先 显示图片按钮
		if(this.props.rightButtonImg){
			return (
				<TouchableOpacity onPress={ () => this.props.rightButtonEvent() }>
					<Image style={styles.rightButtonImg} source={ this.props.rightButtonImg } />
				</TouchableOpacity>
			)
		}
		// 若文本 以 'icon:' 开头，则认为返回一个 Icon图标
		if(/^icon:/.test(rightButtonTxt)){
			return (<Icon name={ rightButtonTxt.substr('icon:'.length) } size={30} onPress={ () => this.props.rightButtonEvent() }/>)
		}
		return (<Text onPress={ () => this.props.rightButtonEvent() } style={styles.rightButtonTxt}> { rightButtonTxt } </Text>)
	}
	// 返回上一页
	_goBack(){
		// 若预设了 回退函数
		if(this.props.goBack){
			// 则执行 回退函数
			this.props.goBack();
		}
		else{
			// 否则 执行 默认回退函数
			this.props.navigation.goBack();
		}
	}

}

const styles = StyleSheet.create({
	header: {
		paddingTop: 25,
		paddingBottom: 5,
		paddingLeft: 12,
		paddingRight: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	headerText: {
		fontSize: 20
	},
	rightButtonImg: {
		width: 25,
		height: 25,
		resizeMode: 'contain'
	},
	rightButtonTxt: {
		fontSize: 17
	}
});

HeaderLR.propTypes = {
	// 中间标题
	title: PropTypes.string.isRequired,
	// 右按钮 文案
	rightButtonTxt: PropTypes.string.isRequired,
	// 右按钮 事件
	rightButtonEvent: PropTypes.func.isRequired,
	// 导航对象
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired
	})
};

export default HeaderLR;