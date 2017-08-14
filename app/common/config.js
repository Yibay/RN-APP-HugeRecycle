
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
		// 获取 短信验证码
		getCode: 'mobile/auth/requestSmsCode',
		// 获取 身份验证的 accessToken
		getToken: 'mobile/auth/login',
		// 获取 客户下单页面 初始化数据
		initRecycleCreate: 'api/mobile/deal/initRecycleCreate',
		// 获取 客户地址列表
		getAddressList: 'api/mobile/deal/addresses',
		// 获取 地区信息
		getAddressInfo: 'api/mobile/normal/addressinfo',
		// 新增 客户地址
		addAddress: 'api/mobile/deal/addAddress',
		// 编辑 客户地址
		editAddress: 'api/mobile/deal/editAddress',
		// 删除 客户地址
		deleteAddress: 'api/mobile/deal/deleteAddress/',
		// 设置 默认地址
		setDefaultLocation: 'api/mobile/deal/setDefaultLocation/'
	},
	static: {
		base: 'http://test.hugehuge.cn/web/'
	}
}