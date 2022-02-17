import APIDatasource from '@/datasources/API/APIDatasource';

export default class OrdersAPI {
	baseUrl = 'http://localhost:8083';

	async getUser(accessToken, email) {
		let endpoint = `/user/${email}`;

		return await APIDatasource.get(this.baseUrl + endpoint, accessToken, {
			email: email,
		});
	}

	async getUserOrders(accessToken, user) {
		let endpoint = `/user/${user.id}/orders`;
		return await APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	async getUserStocksBalance(accessToken, user) {
		let endpoint = `/user/${user.id}/balance`;
		return await APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	async newOrder(accessToken, order) {
		let endpoint = `/orders/new`;

		return await APIDatasource.post(this.baseUrl + endpoint, accessToken, {
			order: order,
		});
	}

	async switchUserOrder(accessToken, order) {
		let endpoint = `/orders/${order.id}/switch`;

		return await APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}
}
