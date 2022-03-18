import APIDatasource from '@/datasources/API/APIDatasource';

export default class OrdersAPI {
	baseUrl = 'http://localhost:8083';

	getUser(accessToken, email) {
		let endpoint = `/user/${email}`;

		return APIDatasource.get(this.baseUrl + endpoint, accessToken, {
			email: email,
		});
	}

	getUserOrders(accessToken, user) {
		let endpoint = `/user/${user.id}/orders`;
		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	getUserStocksBalance(accessToken, user) {
		let endpoint = `/user/${user.id}/balance`;
		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	newOrder(accessToken, order) {
		let endpoint = `/orders/new`;

		return APIDatasource.post(this.baseUrl + endpoint, accessToken, {
			order: order,
		});
	}

	switchUserOrder(accessToken, order) {
		let endpoint = `/orders/${order.id}/switch`;

		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	getUserOrdersHistory(accessToken, user, status) {
		let endpoint = `/user/${user.id}/orders/history/${status}`;

		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	disableUserOrderHistory(accessToken, order) {
		let endpoint = `/orders/history/${order.id}/switch`;

		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}
}
