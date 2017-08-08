// 封装 fetch请求 模块
import queryString from 'query-string';


import config from './config';

// 需要用 export default 向外 暴露 整个模块,
// 不然 其他模块 import 时，需要用 import * as request
let request = {};

request.get = function (url, params, header){

	// 防止 config 被污染，用一个新对象 继承 config.getHeader
	let options = Object.assign({}, config.getHeader);

	// 设置 请求参数
	if(params){
		url += '?' + queryString.stringify(params);
	}

	// 设置 Header头内 参数
	if(header){
		Object.assign(options.headers, header);
	}

	console.log(options);

	return fetch(url, options)
		.then((response) => response.json())

}

request.post = function (url, body, header){

	// 防止 config 被污染，用一个新对象 继承 config.postHeader
	let options = Object.assign({}, config.postHeader);

	// 设置 body内 參数
	if(body){
		Object.assign(options, {
			body: JSON.stringify(body)
		});
	}

	// 设置 Header头内 参数
	if(header){
		Object.assign(options.headers, header);
	}

	console.log(options);

	return fetch(url, options)
		.then((response) => response.json())

}

export default request;
