export default class StocksController {
	static datasource;

	constructor(datasource) {
		if (!StocksController.datasource) StocksController.datasource = datasource;
	}

	static async getStocks(accessToken) {
		return await StocksController.datasource.getStocks(accessToken);
	}

	static async getStock(accessToken, id) {
		if (id === null) return {};

		return await StocksController.datasource.getStock(accessToken, id);
	}
}
