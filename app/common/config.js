
export default {
	header: {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	},
	api: {
		base: 'http://test.hugehuge.cn/',
		getProducts: 'api/mobile/normal/getProducts',
		getCode: 'mobile/auth/requestSmsCode'
	},
	static: {
		base: 'http://test.hugehuge.cn/web/'
	}
}