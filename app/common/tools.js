import React from 'react';
import { Alert } from 'react-native';


/* --- RecycleList 组件中 使用的工具函数 start --- */

// 将 请求回的数据，处理成 RecycleList 可以展示的 数据类型
export function createRecycleListData(data) {
    data = data.data;
    _createRecycleRowData(data.electricProducts);
    _createRecycleRowData(data.clothingShoesProducts);
    _createRecycleRowData(data.garbageProducts);
    _createRecycleRowData(data.furnitureProducts);
    _assign(data.electricProducts, [data.electricHtml, { serviceTime: data.serviceTime }]);
    _assign(data.clothingShoesProducts, [data.clothingHtml, { serviceTime: data.serviceTime }]);
    _assign(data.garbageProducts, [data.garbageHtml, { serviceTime: data.serviceTime }]);
    _assign(data.furnitureProducts, [data.furnitureHtml, { serviceTime: data.serviceTime }]);
    return [].concat(data.electricProducts, data.clothingShoesProducts, data.garbageProducts, data.furnitureProducts);
}

// 构造 RecycleRow 用的 desc 描述文本
function _createRecycleRowData(data) {
    if (data instanceof Array) {
        data.forEach((item) => {
            let desc_array = item.specs.map((item) => item.name);
            item.desc = desc_array.join(' ');
        });
    }
}

// 绑定 额外属性
function _assign(data, props) {
    if (data instanceof Array) {
        data.forEach(item => {
            if (props instanceof Array) {
                props.forEach(prop => {
                    Object.assign(item, prop);
                });
            } else if (props instanceof Object) {
                Object.assign(item, props);
            }
        });
    }
}

/* --- RecycleList 组件中 使用的工具函数 end --- */


/* --- EditAddress 组件中 使用的工具函数 start --- */

export function testAddressForm(formData){
    console.log(formData);

    if(!formData.customerName) {
        Alert.alert('请填写联系人姓名');
        return false;
    }
    if(!formData.telNo) {
        Alert.alert('请填写手机号码');
        return false;
    }
    if(!/^1[34578]\d{9}$/.test(formData.telNo)){
        Alert.alert('手机号码格式错误');
        return false;
    }
    if(!formData.regionId) {
        Alert.alert('请选择区');
        return false;
    }
    if(!formData.streetId) {
        Alert.alert('请选择街道');
        return false;
    }
    if(!formData.communityId) {
        Alert.alert('请选择小区');
        return false;
    }

    // 若有户号
    if(formData.haveHouseNumber) {
        if(!formData.building) {
            Alert.alert('请填写幢');
            return false;
        }
        if(!/^[0-9A-Z]+$/.test(formData.building)){
            Alert.alert('幢不能含有中文');
            return false;
        }
        if(!formData.unit) {
            Alert.alert('请填写单元');
            return false;
        }
        if(!/^[0-9A-Z]+$/.test(formData.unit)){
            Alert.alert('单元不能含有中文');
            return false;
        }
        if(!formData.room) {
            Alert.alert('请填写室');
            return false;
        }
        if(!/^[0-9A-Z]+$/.test(formData.room)){
            Alert.alert('室不能含有中文');
            return false;
        }
    }
    // 若无户号
    else {
        if(!formData.address){
            Alert.alert('请填写详细地址');
            return false;
        }
    }

    return true;
    
}

/* --- EditAddress 组件中 使用的工具函数 end --- */


/* --- EditOrder 组件 和 ManageAddress 组件中 均有使用到 start --- */

// 将地址obj 拼接成 一个 str
export function joinAddress(row){
    let address = row.city + row.region + row.street + row.communityName;
    if(row.haveHouseNumber){
        address += row.building + '幢' + row.unit + '单元' + row.room + '室';
    }
    else {
        address += row.address;
    }
    return address;
}

/* --- EditOrder 组件 和 ManageAddress 组件中 均有使用到 end --- */


/* --- MyOrder 组件中 使用 start --- */

// 补全8位数
export function create8DigitNumber(num) {
    // 若是 数字，则转成string
    num = ''+ num;
    // 不足8位数，补0补全8位
    if(num.length <= 8){
        num = '00000000'.substr(0, 8 - num.length) + num;
    }
    return num;
}
// 格式化时间 如：2017-08-18 15:16:27
export function timeFormatting(time) {
    const date = new Date(time)
    return date.getFullYear() + '-' + create2DigitNumber(date.getMonth() + 1) + '-' + date.getDate() + ' '
            + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
// 补全2位数 函数
function create2DigitNumber(num) {
    // 若是 数字，则转成string
    num = ''+ num;
    // 不足8位数，补0补全8位
    if(num.length <= 2){
        num = '00'.substr(0, 2 - num.length) + num;
    }
    return num;
}

/* --- MyOrder 组件中 使用 end --- */


// 数组去重函数
function arrayrRemovesDuplicates (prev_array) {
    // 结果数组(去重后的数组)
    let result_array = [];

    return prev_array
        // 先将原数组排序，
        .sort((v1, v2) => v1 - v2)
        // 然后归并，
        .reduce((prev, cur, index, array) => {
            // 把原数组首项存入
            if(index === 1){
                result_array.push(prev);
            }
            // 比较前后2项，若不等，则存入结果数组
            if(cur !== prev){
                result_array.push(cur);
            }
            // 非 数组最后一项，返回 当前值，用于和下一项比较
            if(index !== array.length - 1){
                return cur;
            }
            // 若为数组 最后一项，则返回 结果数组
            return result_array;
            
        });
}