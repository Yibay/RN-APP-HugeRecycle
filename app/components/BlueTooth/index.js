import React, { Component } from 'react';
import { StyleSheet, NativeModules, NativeEventEmitter, View, Image, Button, Alert } from 'react-native';

import BleManager from 'react-native-ble-manager';


import Header from '../common/header';


const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class BlueTooth extends Component {

    // DrawerNavigator 导航 设置
    // 侧边栏 DrawerItems 内，Icon, Label，在各 页面内 设置
    static navigationOptions = {
        // 设置 Label, 可覆盖 DrawerNavigator 中设置
        // drawerLabel: '蓝牙',
        // 设置 Icon
        drawerIcon: ({ tintColor }) => (
            <Image style={{width: 20, height: 20, resizeMode: 'contain', marginLeft: 10}} source={require('./img/icon_news.png')} />
        ),
    };

    render(){
        return (
            <View style={styles.container}>
                <Header title='蓝牙' navigation={this.props.navigation} goBack={() => this._goBack()} />
                <Button title='可连接设备' onPress={this._alert} />
            </View>
        );
    }

    componentDidMount(){
        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this._handleDiscoverPeripheral.bind(this) );
        bleManagerEmitter.addListener('BleManagerStopScan', this._handleStopScan.bind(this) );
    }

    // 按钮: 返回上一页
    _goBack(){
        this.props.navigation.navigate('虎哥回收');
    }

    // 按钮：Alert
    _alert(){
        console.log('----开始扫描-----');
        console.log(BleManager);
        BleManager.start({showAlert: false});
        BleManager.scan([], 3, true).then((results) => {
            console.log('Scanning...');
            console.log(results);
        });
    }

    _handleDiscoverPeripheral(args){
        console.log('----发现设备-----');
        console.log(args);
    }
    _handleStopScan(){
        console.log('---停止扫描---')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd'
    }
});

export default BlueTooth;