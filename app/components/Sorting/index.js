import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Header from './header';
import Footer from './footer';


class Sorting extends Component {
	render() {
		console.log(this.props);
		return (
			<View style={styles.container}>
				<Header navigation={this.props.navigation} />
				<View style={styles.container}>
					<Text>物品分类</Text>	
				</View>
				<Footer />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Sorting;