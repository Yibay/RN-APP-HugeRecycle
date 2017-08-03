import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


import config from '../../common/config';


class Row extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image style={styles.img} source={{uri: config.static.base + this.props.goods.image}} />
				<View style={[styles.desc, this.props.index === 0 ? styles.firstDesc : null]}>
					<View style={styles.firstLine}>
						<Text style={styles.name}>{this.props.goods.name}</Text>
						<Text style={styles.price}>{this.props.goods.price + '元现金'}</Text>
					</View>
					<Text style={styles.otherGift}>{this.props.goods.otherGift}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	img: {
		width: 40,
		height: 40,
		margin: 10
	},
	desc: {
		flex: 1,
		justifyContent: 'center',
		paddingRight: 5,
		borderTopWidth: 1,
		borderTopColor: '#e3e7ea'
	},
	firstDesc: {
		borderTopWidth: 0
	},
	firstLine: {
		marginBottom: 8,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	name: {
		fontSize: 15,
		color: '#000'
	},
	price: {
		fontSize: 14,
		color: '#ff3b80'
	},
	otherGift: {
		fontSize: 13,
		color: '#9d9d9d'
	}
});


export default Row;