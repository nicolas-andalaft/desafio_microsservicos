import axios from 'axios';
import UserEntity from '../../entities/userEntity';
import OrderEntity from '../../entities/orderEntity';

export default class OrdersAPI {
	baseUrl = 'http://localhost:8083';

	async setUser(accessToken, email) {
		let endpoint = '/user';

		try {
			let response = await axios.post(this.baseUrl + endpoint, {
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
				body: {
					email: email,
				},
			});

			return Object.assign(new UserEntity(), response.data.user);
		} catch (error) {
			console.info('User endpoint could not be accessed');
			return null;
		}
	}

	async newOrder(accessToken, order) {
		let endpoint = '/order/new';

		try {
			let response = await axios.post(this.baseUrl + endpoint, {
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
				body: {
					order,
				},
			});

			return Object.assign(new OrderEntity(), response.data.order);
		} catch (error) {
			console.info('New order endpoint could not be accessed');
			return null;
		}
	}
}
