// 引入 合并reducers所用函数
import { combineReducers } from 'redux';
// 引入 actions 中的 type
import { Login, Logout } from '../actions/login';

// 用户信息 默认值
const user_info = {
	'X-AUTH-TOKEN': '',
	h5Code: '',
	user: {
		id: null,
		name: '',
		phone: ''
	}
}

/* --- reducers 控制state函数 start --- */
// 用户身份信息 state
function userInfo(state = user_info, action){
	switch(action.type){
		// 登录时，覆写用户信息
		case Login: 
			return action.user_info
		// 登出时，清空用户信息
		case Logout:
			return user_info;
		default:
			return state;
	}
}
/* --- reducers 控制state函数 end --- */

// 合并所有 reducers 为一个 reducer
const appReducers = combineReducers({ userInfo });

export default appReducers;