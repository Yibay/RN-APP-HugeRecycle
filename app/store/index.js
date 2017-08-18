/*
 *  生成 store对象
 */

// 引入 生成 store的函数
import { createStore } from 'redux';

// 引入 合并后的 reducer 函数
import appReducers from '../reducers/index';

// 生成 store
let store = createStore(appReducers);
// 首次打印 store的state
console.log(store.getState());

// 订阅 store的state更新事件
let unsubscribe = store.subscribe(() =>
	// 每次更新state，打印 store的state
	console.log(store.getState())
);

export default store;