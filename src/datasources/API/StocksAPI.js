import APIDatasource from '@/datasources/API/APIDatasource';

export default class StocksAPI {
	baseUrl = 'http://localhost:8082';

	async getStocks(accessToken) {
		let endpoint = '/stocks';

		return APIDatasource.get(this.baseUrl + endpoint, accessToken);
	}
}
