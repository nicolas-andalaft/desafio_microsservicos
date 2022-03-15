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

	static async getUserOrdersHistory(accessToken, user, status) {
		if (typeof user.id === 'undefined') return null;
		if (status == null) status = '-1';

		return await OrdersController.datasource.getUserOrdersHistory(
			accessToken,
			user,
			status
		);
	}

	static async disableUserOrderHistory(accessToken, order) {
		if (typeof order.id === 'undefined') return null;

		return await OrdersController.datasource.disableUserOrderHistory(
			accessToken,
			order
		);
	}
}
