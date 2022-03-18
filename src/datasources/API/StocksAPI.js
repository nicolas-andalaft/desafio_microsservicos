import APIDatasource from '@/datasources/API/APIDatasource';

export default class StocksAPI {
	baseUrl = 'http://localhost:8082';

	getStocks(accessToken) {
		let endpoint = '/stocks';

		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	getStock(accessToken, id) {
		let endpoint = '/stocks/' + id;

		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}

	getStockHistory(accessToken, id) {
		let endpoint = '/stocks/' + id + '/history';

		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}
}
