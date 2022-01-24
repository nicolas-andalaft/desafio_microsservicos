import OrdersAPI from '../datasources/ordersapi/ordersAPI';

export default class OrdersController {
	constructor() {
		this.datasource = new OrdersAPI();
	}

	setUser(accessToken, email) {
		try {
			return this.datasource.setUser(accessToken, email);
		} catch (e) {
			//console.error(e);
			return null;
		}
	}

	newOrder(accessToken, order) {
		console.log(order);
		return this.datasource.newOrder(accessToken, order);
	}
}
