// 封装 fetch请求 模块
import queryString from 'query-string';
import _ from 'lodash';


import config from './config';

// 需要用 export default 向外 暴露 整个模块,
// 不然 其他模块 import 时，需要用 import * as request
let request = {};

request.get = function (url, params){

	if(params){
		url += '?' + queryString.stringify(params);
	}

	return fetch(url)
		.then((response) => response.json())

}

request.post = function (url, body){

	let options = _.extend(config.header, {
		body: JSON.stringify(body)
	});

	return fetch(url, options)
		.then((response) => response.json())

}

export default request;