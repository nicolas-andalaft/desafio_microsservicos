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
		if (typeof user.id === 'undefined') return [];

		return await OrdersController.datasource.getUserOrders(accessToken, user);
	}

	static async getUserStocksBalance(accessToken, user) {
		if (typeof user.id === 'undefined') return [];

		return await OrdersController.datasource.getUserStocksBalance(
			accessToken,
			user
		);
	}

	static async switchUserOrder(accessToken, order) {
		if (
			typeof order.id_user === 'undefined' ||
			typeof order.id_stock === 'undefined'
		)
			return null;

		return await OrdersController.datasource.switchUserOrder(
			accessToken,
			order
		);
	}
}
