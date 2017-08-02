import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Header from './header';
import Footer from './footer';
import Nav from './nav';
import Content from './content';


class Sorting extends Component {
	render() {
		console.log(this.props);
		return (
			<View style={styles.container}>
				<Header navigation={this.props.navigation} />
				<View style={styles.main}>
					<Nav style={styles.nav} />
					<Content style={styles.content} />
				</View>
				<Footer />
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
		flexDirection: 'row'
	},
	nav: {
		width: 'auto'
	},
	content: {
		flex: 1
	}
});

export default Sorting;