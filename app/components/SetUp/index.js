import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';


import SetUp from '../../containers/SetUp/setUp';
import MyEnvRecord from '../MyEnvRecord/index';
import MyOrder from '../MyOrder/index';
import ManageAddress from '../ManageAddress/index';
import EditAddress from '../EditAddress/index';
import Feedback from '../Feedback/index';
import AboutUs from '../AboutUs/index';


// 栈导航
const SetUpPage = StackNavigator(
	{
		SetUp: { screen: SetUp },
		// 我的环保金记录 页面
		MyEnvRecord: { screen: MyEnvRecord },
		MyOrder: { screen: MyOrder },
		// 地址管理 页面
		ManageAddress: { screen: ManageAddress },
		EditAddress: { screen: EditAddress },
		// 意见反馈
		Feedback: { screen: Feedback },
		// 关于我们
		AboutUs: { screen: AboutUs }
	},
	{
		headerMode: 'none'
	}
);

export default SetUpPage;