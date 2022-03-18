export default class StocksController {
	static datasource;

	static initialize(datasource) {
		if (!StocksController.datasource) StocksController.datasource = datasource;
	}

	static getStocks(accessToken) {
		return StocksController.datasource.getStocks(accessToken);
	}

	static getStock(accessToken, id) {
		if (id === null) return {};

		return StocksController.datasource.getStock(accessToken, id);
	}

	static getStockHistory(accessToken, id) {
		if (id === null) return {};

		return StocksController.datasource.getStockHistory(accessToken, id);
	}
}
