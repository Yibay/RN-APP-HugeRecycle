import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';


import Header from '../common/header';
import Footer from './footer';
import Nav from './nav';
import Content from './content';


class Sorting extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectId: this.props.navigation.state.params.selectId,
			recycleGood: []
		}
	}

	render() {
		let params = this.props.navigation.state.params;
		return (
			<View style={styles.container}>
				<Header title={'物品分类'} navigation={this.props.navigation} />
				<View style={styles.main}>
					<Nav style={styles.nav} recycleList={params.recycleList} selectId={this.state.selectId}
						changeSelectId={this._changeSelectId.bind(this)} />
					<Content style={styles.content} recycleList={params.recycleList} selectId={this.state.selectId} 
						toggleRecycleGood={this._toggleRecycleGood.bind(this)} recycleGood={this.state.recycleGood} />
				</View>
				<Footer recycleGood={this.state.recycleGood} navigation={this.props.navigation} />
			</View>
		)
	}

	_changeSelectId(id) {
		this.setState({
			selectId: id
		})
	}

	_toggleRecycleGood(id, name) {
		if(this.state.recycleGood.some(item => item.id === id)){
			this.setState({
				recycleGood: this.state.recycleGood.filter(item => item.id != id)
			});
		}
		else {
			this.setState({
				recycleGood: [].concat(this.state.recycleGood, {id: id,name: name})
			});
		}
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