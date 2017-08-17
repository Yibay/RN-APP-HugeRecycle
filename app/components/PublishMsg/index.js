import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';


import Header from '../common/headerLR';

class PublishMsg extends Component {

	constructor(props) {
		super(props);
		this.state = {
			url : this.props.navigation.state.params.url,
			title : ''
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Header title={this.state.title} rightButtonTxt='分享' rightButtonEvent={() => console.log('分享')}
					navigation={this.props.navigation} />
				<WebView source={{uri: this.state.url}} onNavigationStateChange={e => this._onNavigationStateChange(e)}
					allowsInlineMediaPlayback={true} />
			</View>
		)
	}

	_onNavigationStateChange(e) {
		console.log(e);
		this.setState({
			title: e.title
		})
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default PublishMsg;