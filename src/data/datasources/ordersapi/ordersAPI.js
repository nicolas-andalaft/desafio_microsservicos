import axios from 'axios';
import UserEntity from '../../entities/userEntity';

export default class OrdersAPI {
	baseUrl = 'http://localhost:8083';

	async setUser(accessToken, email) {
		let endpoint = '/user';

		try {
			let response = await axios.post(this.baseUrl + endpoint, {
				headers: {
					Authorization: 'Bearer ' + accessToken,
				},
				body: {
					email: email,
				},
			});

			return UserEntity.fromMap(response.data.user);
		} catch (error) {
			console.error(`Error: ${error}`);
			return null;
		}
	}
}
