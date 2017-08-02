import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';


var width = Dimensions.get('window').width;

class Nav extends Component {
	render() {
		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.navLi}>
						<Text style={styles.navLiText}>电视</Text>
					</View>
					<View style={styles.navLi}>
						<Text style={styles.navLiText}>空调</Text>
					</View>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: width / 4,
		backgroundColor: '#ecf0f3'
	},
	navLi: {
		paddingTop: 18,
		paddingBottom: 18,
		borderTopWidth: 1,
		backgroundColor: '#ecf0f3',
		alignItems: 'center'
	},
	navLiText: {
		fontSize: 18
	}
});

export default Nav;