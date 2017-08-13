// 封装 fetch请求 模块
import queryString from 'query-string';


import config from './config';

// 需要用 export default 向外 暴露 整个模块,
// 不然 其他模块 import 时，需要用 import * as request
let request = {};

// 参数1 url: String,  参数2 params: Obj,  参数3 header: Obj
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
		.catch(e => {console.log('fetch请求时报错'); console.log(e);})
		.then((response) => response.json())
		.catch(e => {console.log('json解析时报错'); console.log(e);})

}

// 参数1 url: String,  参数2 params: Obj,  参数3 header: Obj
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
		.catch(e => {console.log('fetch请求时报错'); console.log(e);})
		.then((response) => response.json())
		.catch(e => {console.log('json解析时报错'); console.log(e);})

}

export default request;
