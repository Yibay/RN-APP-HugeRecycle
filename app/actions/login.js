// 登录功能 action

/* --- type 类型 start --- */
export const Login = 'Login';
export const Logout = 'Logout';
/* --- type 类型 end --- */

/* --- 生成 Action对象的函数 start --- */
// 登录
export function login (user_info) {
	return {
		type: Login,
		user_info
	}
}
// 登出
export function logout () {
	return {
		type: Logout
	}
}
/* --- 生成 Action对象的函数 end --- */