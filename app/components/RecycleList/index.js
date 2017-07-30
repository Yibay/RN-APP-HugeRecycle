import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ListView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

let data = {
	"data": [
		{
			"thumb": "http://dummyimage.com/90x90/19e671","title": "电视","desc": "CRT 14-24寸 CRT 25寸及以上 液晶 14-"
		}
	]
};

class RecycleList extends Component {

	constructor(props) {
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.state = {
			dataSource: ds.cloneWithRows(data.data)
		}
	}

	render() {
		return (
			<ListView style={styles.container}
				dataSource={this.state.dataSource}
				renderHeader={this._renderHeader}
				renderRow={this._renderRow}>
			</ListView>
		)
	}

	_renderHeader() {
		return(
			<View style={styles.header}>
				<Icon name="md-menu" size={30} />
				<Text style={styles.headerText}>虎哥回收</Text>
				<Icon name="md-call" size={30} />
			</View>
		)
	}

	_renderRow(row) {
		return (
			<View>
				<Image style={styles.rowImage} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		paddingTop: 25,
		paddingBottom: 5,
		paddingLeft: 12,
		paddingRight: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#ffcf31'
	},
	headerText: {
		fontSize: 20
	},
	rowImage: {
		width: 20,
		height: 20
	}
});

export default RecycleList;