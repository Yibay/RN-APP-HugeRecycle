import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';


class Footer extends Component {

	render() {
		return(
			<View style={styles.footer}>
				<View style={styles.recycleGoodBox}>
					{
						this.props.recycleGood.map(item => <Text key={item.id} style={styles.good}>{item.name}</Text>)
					}
				</View>
				<Text style={styles.text} onPress={this._call.bind(this)}>呼叫虎哥</Text>
			</View>
		)
	}

	_call() {
		if(this.props.recycleGood.length > 0){
			this.props.navigation.navigate('EditOrder', {
				recycleGood: this.props.recycleGood
			});
		}
		else {
			Alert.alert('请先选择要回收的物品');
		}
	}

}

const styles = StyleSheet.create({
	footer: {
		position: 'relative',
		paddingTop: 11,
		paddingBottom: 11,
		paddingLeft: 12,
		paddingRight: 12,
		borderWidth: 1,
		borderColor: '#8c8c8c',
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	recycleGoodBox: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	good: {
		marginRight: 5
	},
	text: {
		paddingTop: 10,
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 20,
		borderRadius: 17,
		overflow: 'hidden',
		backgroundColor: '#ffcf31',
		fontSize: 14,
		fontWeight: '900'
	}
});

export default Footer;