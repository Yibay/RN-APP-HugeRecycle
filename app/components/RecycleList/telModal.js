import React, { Component, PropTypes } from 'react';
import { StyleSheet, Modal, View, Text, TouchableWithoutFeedback, TouchableOpacity, Linking } from 'react-native';

import Communications from 'react-native-communications';


class TelModal extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		url: 'tel:10086'
	// 	}
	// }

	render() {
		const { modalVisible, closeModal } = this.props;
		return (
			<Modal transparent={true} visible={modalVisible} animationType='fade'>
				<TouchableWithoutFeedback onPress={closeModal}>
					<View style={styles.container}>
						<TouchableOpacity onPress={() => {Communications.phonecall('4009391818', false);}}>
							<View>
								<View style={[styles.txtBox, styles.clientServiceCenter]}>
									<Text style={styles.txt}>呼叫客服中心</Text>
								</View>
								<View style={[styles.txtBox, styles.tel400]}>
									<Text style={[styles.txt, styles.tel400txt]}>400-939-1818</Text>
								</View>
							</View>
						</TouchableOpacity>
						<Text style={[styles.txtBox, styles.txt, styles.cancel]}>取消</Text>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		)
	}

	// _tel400() {
	// 	Linking.canOpenURL(this.state.url).then(supported => {

 //          if (!supported) {

 //            console.log('Can\'t handle url: ' + this.state.url);

 //          } else {

 //            return Linking.openURL(this.state.url);

 //          }

 //        }).catch(err => console.error('An error occurred', err));

	// }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	txtBox: {
		marginHorizontal: 20,
		backgroundColor: '#fff',
		overflow: 'hidden'
	},
	clientServiceCenter: {
		borderTopLeftRadius: 5,	
		borderTopRightRadius: 5,
		borderBottomWidth: 1,
		borderColor: '#ebebeb'
	},
	tel400: {
		borderBottomLeftRadius: 5,	
		borderBottomRightRadius: 5
	},
	txt: {
		textAlign: 'center',
		lineHeight: 50,
	},
	tel400txt: {
		color: '#ffc45d'
	},
	cancel: {
		marginVertical: 10,
		borderRadius: 5
	}
})

TelModal.propTypes = {
	// 是否 展示选择器
	modalVisible: PropTypes.bool.isRequired,
	// 取消后，回调函数
	closeModal: PropTypes.func.isRequired
}

export default TelModal;