import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, Image } from 'react-native';


import config from '../../common/config';

import Header from '../common/header';

let { width } = Dimensions.get('window');

class AboutUs extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Header title='关于我们' navigation={this.props.navigation} />
				<View style={styles.main}>
					<View style={styles.section}>
						<Image style={styles.logo} source={require('./img/huge_logo.png')} />
						<Text style={styles.title}>虎哥回收 一虎百应</Text>
						<Text style={styles.version}>版本号：v{config.version}</Text>
					</View>
					<View style={styles.section}>
						<Text style={styles.txt}>官网：www.hugehuge.cn</Text>
						<Text style={styles.txt}>微博：虎哥回收</Text>
						<Text style={styles.txt}>微信：虎哥回收</Text>
						<Text style={styles.txt}>虎哥热线：400－939-1818</Text>
						<Text style={styles.txt}>浙江九仓再生资源开发有限公司</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	main: {
		flex: 1,
		paddingTop: 50,
		paddingBottom: 40,
		justifyContent: 'space-between'
	},
	section: {
		alignItems: 'center'
	},
	logo: {
		width: width * 0.23,
		height: width * 0.23,
		resizeMode: 'contain'
	},
	title: {
		marginTop: 20,
		fontSize: 20
	},
	version: {
		marginTop: 10,
		fontSize: 13,
		color: '#3b3a3f'
	},
	txt: {
		marginBottom: 10,
		fontSize: 12,
		color: '#3b3a3f'
	}
})

export default AboutUs;