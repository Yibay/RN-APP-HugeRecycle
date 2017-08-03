import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Header from './header';
import Footer from './footer';
import Nav from './nav';
import Content from './content';


class Sorting extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectId: this.props.navigation.state.params.selectId
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header navigation={this.props.navigation} />
				<View style={styles.main}>
					<Nav style={styles.nav} recycleList={this.props.navigation.state.params.recycleList} selectId={this.state.selectId}
						changeSelectId={this._changeSelectId.bind(this)} />
					<Content style={styles.content} recycleList={this.props.navigation.state.params.recycleList} selectId={this.state.selectId} />
				</View>
				<Footer />
			</View>
		)
	}

	_changeSelectId(id) {
		this.setState({
			selectId: id
		})
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
		// width: 'auto'
	},
	content: {
		flex: 1
	}
});

export default Sorting;