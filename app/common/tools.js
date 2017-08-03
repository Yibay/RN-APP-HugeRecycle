// 将 请求回的数据，处理成 RecycleList 可以展示的 数据类型
export function createRecycleListData (data) {
	data = data.data;
	_createRecycleRowData(data.electricProducts);
	_createRecycleRowData(data.clothingShoesProducts);
	_createRecycleRowData(data.garbageProducts);
	_createRecycleRowData(data.furnitureProducts);
	_assign(data.electricProducts, [data.electricHtml, { serviceTime: data.serviceTime }]);
	_assign(data.clothingShoesProducts, [data.clothingHtml, { serviceTime: data.serviceTime }]);
	_assign(data.garbageProducts, [data.garbageHtml, { serviceTime: data.serviceTime }]);
	_assign(data.furnitureProducts, [data.furnitureHtml, { serviceTime: data.serviceTime }]);
	return [].concat(data.electricProducts,data.clothingShoesProducts,data.garbageProducts,data.furnitureProducts);
}

// 构造 RecycleRow 用的 desc 描述文本
function _createRecycleRowData (data) {
	if(data instanceof Array){
		data.forEach((item) => {
			let desc_array = item.specs.map((item) => item.name);
			item.desc = desc_array.join(' ');
		});
	}
}

// 绑定 额外属性
function _assign (data, props) {
	if(data instanceof Array) {
		data.forEach(item => {
			if(props instanceof Array){
				props.forEach(prop => {
					Object.assign(item, prop);
				});
			}
			else if(props instanceof Object){
				Object.assign(item, props);
			}
		});
	}
}