
export default {
	getHeader: {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	},
	postHeader: {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	},
	api: {
		base: 'http://test.hugehuge.cn/',
		getProducts: 'api/mobile/normal/getProducts',
		getCode: 'mobile/auth/requestSmsCode',
		getToken: 'mobile/auth/login',
		getAddressList: 'api/mobile/deal/addresses',
		getAddressInfo: 'api/mobile/normal/addressinfo'
	},
	static: {
		base: 'http://test.hugehuge.cn/web/'
	}
}