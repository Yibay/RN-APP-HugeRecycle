import React from 'react';

import { StackNavigator } from 'react-navigation';


import MyOrder from '../MyOrder/index';
import MyEnvRecord from '../MyEnvRecord/index';

const MyOrderPage = StackNavigator(
	{
		MyOrder: { screen: MyOrder },
		MyEnvRecord: { screen: MyEnvRecord }
	},
	{
		headerMode: 'none'
	}
);

export default MyOrderPage;
