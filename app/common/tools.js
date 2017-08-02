// 将 请求回的数据，处理成 RecycleList 可以展示的 数据类型
export function createRecycleListData (data) {
	data = data.data;
	_createRecycleRowData(data.electricProducts);
	_createRecycleRowData(data.clothingShoesProducts);
	_createRecycleRowData(data.garbageProducts);
	_createRecycleRowData(data.furnitureProducts);
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