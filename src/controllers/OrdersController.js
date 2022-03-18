export default class OrdersController {
	static datasource;

	static initialize(datasource) {
		if (!OrdersController.datasource) OrdersController.datasource = datasource;
	}

	static getUser(accessToken, email) {
		return OrdersController.datasource.getUser(accessToken, email);
	}

	static newOrder(accessToken, order) {
		return OrdersController.datasource.newOrder(accessToken, order);
	}

	static getUserOrders(accessToken, user) {
		if (typeof user.id === 'undefined') return [];

		return OrdersController.datasource.getUserOrders(accessToken, user);
	}

	static getUserStocksBalance(accessToken, user) {
		if (typeof user.id === 'undefined') return [];

		return OrdersController.datasource.getUserStocksBalance(accessToken, user);
	}

	static switchUserOrder(accessToken, order) {
		if (
			typeof order.id_user === 'undefined' ||
			typeof order.id_stock === 'undefined'
		)
			return null;

		return OrdersController.datasource.switchUserOrder(accessToken, order);
	}

	static getUserOrdersHistory(accessToken, user, status) {
		if (typeof user.id === 'undefined') return null;
		if (status == null) status = '-1';

		return OrdersController.datasource.getUserOrdersHistory(
			accessToken,
			user,
			status
		);
	}

	static disableUserOrderHistory(accessToken, order) {
		if (typeof order.id === 'undefined') return null;

		return OrdersController.datasource.disableUserOrderHistory(
			accessToken,
			order
		);
	}
}
