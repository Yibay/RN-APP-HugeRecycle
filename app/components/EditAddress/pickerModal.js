import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Modal, Picker } from 'react-native';


class PickerModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// 用于显示 选中项
			selectedVal: this.props.selectedItem.name,
			// 用于传入 回调函数的参数, 作用父级组件
			selectedItem: this.props.selectedItem
		}
	}

	componentWillReceiveProps(nextProps) {
		let selectedItem = nextProps.selectedItem;
		// 注意：若是 没有默认选中项，则 默认选中 第1项
		if(!selectedItem.name && nextProps.list.length){
			selectedItem = nextProps.list[0];
		}
		this.setState({
			selectedVal: selectedItem.name,
			selectedItem: selectedItem
		})
	}

	render() {
		const { modalVisible, changeSelect, closePicker } = this.props;
		return (
			<Modal transparent={true} visible={modalVisible} animationType='slide'>
				<View style={styles.container}>
					<View style={styles.formPicker}>
						<Picker
							selectedValue={this.state.selectedVal}
							onValueChange={(val, position) => {
								this.setState({
									selectedVal: val,
									// position 为 选中项目 在数组中的序号
									selectedItem: this.props.list[position]
								})
							}}>
							{
								// Picker.Item value必须是 String，不能是 Obj，否则 滚动选择器 回自动回滚到 首项
								this.props.list.map(item => <Picker.Item key={item.id} label={item.name} value={item.name} />)
							}
						</Picker>
						<Text onPress={() => changeSelect(this.state.selectedItem)} style={styles.confirmPickerVal}>确定</Text>
						<Text onPress={() => closePicker()} style={styles.cancelPickerVal}>取消</Text>
					</View>
				</View>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	formPicker: {
		backgroundColor: '#fff'
	},
	confirmPickerVal: {
		position: 'absolute',
		top: 20,
		right: 20,
		fontSize: 18
	},
	cancelPickerVal: {
		position: 'absolute',
		top: 20,
		left: 20,
		fontSize: 18
	}
})

PickerModal.propTypes = {
	// 是否 展示选择器
	modalVisible: PropTypes.bool.isRequired,
	// 被选项 列表
	list: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		})
	),
	// 默认选中项
	selectedItem: PropTypes.object.isRequired,
	// 确认后，回调函数
	changeSelect: PropTypes.func.isRequired,
	// 取消后，回调函数
	closePicker: PropTypes.func.isRequired
}

export default PickerModal;