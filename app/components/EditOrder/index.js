import React, { Component } from 'react';
import { StyleSheet, View, Text, Switch, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconO from 'react-native-vector-icons/Octicons';


import Header from '../common/header';
import Footer from './footer';


class EditOrder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAerialWork: false,
			remarks: '',
			tag: ['停车不方便','到达后联系','回收物品较多','无电梯']
		}
	}

	render() {
		let params = this.props.navigation.state.params;
		return (
			<View style={styles.container}>
				<Header title='订单编辑' navigation={this.props.navigation} />
				<View style={styles.main}>
					<Text style={styles.chooseAddress} onPress={() => this._goManageAddressPage()}>去选择地址</Text>
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
					<View style={styles.airConditionerBox}>
						<View style={styles.airConditioner}>
							<IconO name='tools' size={22} color='#c7c7c7' />
							<Text style={styles.airConditionerTxt}>是否需要拆卸空调（拆卸费50元）</Text>
						</View>
						<Switch onValueChange={this._changeAerialWork.bind(this)} value={this.state.isAerialWork} />
					</View>
					<View style={styles.remarksBox}>
						<TextInput style={styles.remarks} multiline={true} numberOfLines={5}
							placeholder='给虎哥写点小提示 停车不方便等' placeholderTextColor='#bbb'
							value={this.state.remarks} maxLength={100}
							onChangeText={this._changeRemarks.bind(this)}
							textAlignVertical='top'/>
						<Text style={[styles.maxLength, this.state.remarks.length ? styles.none : null]}>(100字以内)</Text>
					</View>
					<View style={styles.tagBox}>
						{
							this.state.tag.map((item, index) => 
								<Text key={index} style={styles.tag} onPress={() => this._addTag(item)}>{item}</Text>)
						}
					</View>
				</View>
				<Footer />
			</View>
		)
	}

	_changeAerialWork() {
		this.setState({
			isAerialWork: !this.state.isAerialWork
		});
	}

	_changeRemarks(text) {
		this.setState({
			remarks: text
		})
	}

	_addTag(text){
		this.setState({
			remarks: this.state.remarks + ' ' + text
		})
	}

	_goManageAddressPage(){
		this.props.navigation.navigate('ManageAddress');
	}
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