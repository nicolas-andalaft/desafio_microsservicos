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
		let endpoint = '/order/new';

		return APIDatasource.post(this.baseUrl + endpoint, accessToken, {
			order: order,
		});
	}
}
