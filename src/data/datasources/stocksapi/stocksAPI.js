import axios from 'axios';
import StockEntity from '../../entities/stockEntity';

export default class StocksAPI {
	baseUrl = 'http://localhost:8082';

	async getStocks(accessToken) {
		let endpoint = '/stocks';

		try {
			let response = await axios.get(this.baseUrl + endpoint, {
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
			});

			let result = [];
			response.data.forEach((stock) => {
				result.push(Object.assign(new StockEntity(), stock));
			});

			return result;
		} catch (error) {
			console.error(`Error: ${error}`);
			return null;
		}
	}
}
