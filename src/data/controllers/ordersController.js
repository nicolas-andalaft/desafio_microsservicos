import OrdersAPI from '../datasources/ordersapi/ordersAPI';

export default class OrdersController {
	constructor() {
		this.datasource = new OrdersAPI();
	}

	setUser(accessToken, email) {
		return this.datasource.setUser(accessToken, email);
	}
}
