export default class OrdersController {
	static datasource;

	constructor(datasource) {
		if (!OrdersController.datasource) OrdersController.datasource = datasource;
	}

	static async getUser(accessToken, email) {
		let response = await OrdersController.datasource.getUser(
			accessToken,
			email
		);

		return response?.user;
	}

	static async newOrder(accessToken, order) {
		return await OrdersController.datasource.newOrder(accessToken, order);
	}
}
