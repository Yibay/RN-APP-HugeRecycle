import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


class Header extends Component {

	render() {
		return(
			<View style={styles.header}>
				<Icon style={styles.back} name="md-arrow-back" size={30} onPress={this._goBack.bind(this)}/>
				<Text style={styles.headerText}>{this.props.title}</Text>
			</View>
		)
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
		position: 'relative',
		paddingTop: 31,
		paddingBottom: 11,
		paddingLeft: 12,
		paddingRight: 12,
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	back: {
		position: 'absolute',
		zIndex: 100,
		top: 25,
		left: 12
	},
	headerText: {
		fontSize: 20
	}
});

Header.propTypes = {
	title: PropTypes.string.isRequired,
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired
	})
};

export default Header;