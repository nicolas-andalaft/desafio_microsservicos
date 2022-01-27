import APIDatasource from '@/datasources/API/APIDatasource';

export default class OrdersAPI {
	baseUrl = 'http://localhost:8083';

	async getUser(accessToken, email) {
		let endpoint = '/user';

		return APIDatasource.post(this.baseUrl + endpoint, accessToken, {
			email: email,
		});
	}

	async newOrder(accessToken, order) {
		let endpoint = '/orders/new';

		return APIDatasource.post(this.baseUrl + endpoint, accessToken, {
			order: order,
		});
	}

	async getUserOrders(accessToken, user) {
		let endpoint = '/orders/user/';
		return APIDatasource.get(this.baseUrl + endpoint + user.id, accessToken);
	}
}
