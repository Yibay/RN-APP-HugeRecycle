import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';


var width = Dimensions.get('window').width;

class Nav extends Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					{
						this.props.recycleList.map((item) => (
							<View key={item.id} style={[styles.navLi, this.props.selectId == item.id ? styles.navLiSelected : null]}>
								<Text style={styles.navLiText}>{item.name}</Text>
								<View style={this.props.selectId == item.id ? styles.navLiBorderSelected : null}></View>
							</View>)
						)
					}
					
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: width / 4 * 1.1,
		backgroundColor: '#ecf0f3'
	},
	navLi: {
		paddingTop: 18,
		paddingBottom: 18,
		borderTopWidth: 1,
		borderTopColor: '#e3e7ea',
		backgroundColor: '#ecf0f3',
		alignItems: 'center'
	},
	navLiSelected: {
		position: 'relative',
		backgroundColor: '#fff'
	},
	navLiText: {
		fontSize: 16,
		color: '#515055'
	},
	navLiBorderSelected: {
		position: 'absolute',
		zIndex: 100,
		left: 0,
		top: 0,
		height: 52,
		borderLeftWidth: 4,
		borderLeftColor: '#ffcf31'
	}
});

export default Nav;