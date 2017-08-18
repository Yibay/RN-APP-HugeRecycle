/*
 *  生成 store对象
 */

// 获取 本地存储 模块
import { AsyncStorage } from 'react-native';
// 引入 生成 store的函数
import { createStore } from 'redux';

// 引入 合并后的 reducer 函数
import appReducers from '../reducers/index';

let user_info = {
	'X-AUTH-TOKEN': '',
	h5Code: '',
	user: {
		id: null,
		name: '',
		phone: ''
	}
}

AsyncStorage.getItem('X-AUTH-TOKEN')
	.then(token => user_info['X-AUTH-TOKEN'] = token ? token : '')
AsyncStorage.getItem('h5Code')
	.then(h5Code => user_info['h5Code'] = h5Code ? h5Code : '')
AsyncStorage.getItem('user_id')
	.then(user_id => user_info.user.id = user_id ? user_id : null)
AsyncStorage.getItem('user_name')
	.then(user_name => user_info.user.name = user_name ? user_name : '')
AsyncStorage.getItem('user_phone')
	.then(user_phone => user_info.user.phone = user_phone ? user_phone : '')

// 生成 store (第1参数为 reducer函数；第2参数为 初始化state)
let store = createStore(appReducers, {userInfo: user_info});
// 首次打印 store的state
console.log(store.getState());

// 订阅 store的state更新事件
let unsubscribe = store.subscribe(() =>
	// 每次更新state，打印 store的state
	console.log(store.getState())
);

export default store;