import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { DrawerItems } from 'react-navigation';

// 侧边栏 （封装 抽屉 导航侧边栏 组件）
class Sidebar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user_phone: '虎哥'
		}
	}

	render() {
		return (
			<View>
				<View style={styles.sidebarLogo}>
					<Image style={styles.sidebarLogoImg} source={require('./img/huge_logo.png')}/>
					<Text>{this.props.user_phone ? this.props.user_phone : '虎哥'}</Text>
				</View>
				<ScrollView><DrawerItems {...this.props} /></ScrollView>
			</View>
		)
	}

	componentDidMount(){
		// 获取本地用户信息
		AsyncStorage.getItem('user_phone')
			.then(res => {
				// 若 用户登录，则显示 用户电话
				console.log(res);
				if(res) {
					this.setState({user_phone: res});
				}
			})
			.catch(e => console.log(e))
		AsyncStorage.getAllKeys()
			.then(res => console.log(res));
	}
}

const styles = StyleSheet.create({
	sidebarLogo: {
		paddingTop: 40,
		alignItems: 'center'
	},
	sidebarLogoImg: {
		marginBottom: 10,
		width: 70,
		height: 70,
		resizeMode: 'contain'
	}
});

function mapStateToProps(state){
	return {
		user_phone: state.userInfo.user.phone
	}
}

export default connect(mapStateToProps)(Sidebar);