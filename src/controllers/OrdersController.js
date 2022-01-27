export default class OrdersController {
	static datasource;

	constructor(datasource) {
		if (!OrdersController.datasource) OrdersController.datasource = datasource;
	}

	static async getUser(accessToken, email) {
		return await OrdersController.datasource.getUser(accessToken, email);
	}

	static async newOrder(accessToken, order) {
		return await OrdersController.datasource.newOrder(accessToken, order);
	}

	static async getUserOrders(accessToken, user) {
		return await OrdersController.datasource.getUserOrders(accessToken, user);
	}
}
