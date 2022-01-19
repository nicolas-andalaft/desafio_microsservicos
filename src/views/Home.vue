<template>
	<div class="home">
		<div v-if="this.$root.authenticated">
			<div v-if="user.name">
				<p>Welcome, {{ user.name }}!</p>
				<p>Current ballance: {{ user.dollarBalance ?? 0 }} US</p>
			</div>
			<br />
			<table>
				<thead>
					<th>Name</th>
					<th>Last Updated</th>
					<th>Created ON</th>
					<th>Ativo</th>
					<th>Ask Min</th>
					<th>Ask Max</th>
					<th>Bid Min</th>
					<th>Bid Max</th>
				</thead>
				<tbody>
					<tr v-for="(entry, index) in stocksData" :key="index">
						<td>{{ entry.stockName }}</td>
						<td>{{ formatDate(entry.updatedOn) }}</td>
						<td>{{ formatDate(entry.createdOn) }}</td>
						<td>{{ entry.stockSymbol }}</td>
						<td>{{ entry.askMin }}</td>
						<td>{{ entry.askMax }}</td>
						<td>{{ entry.bidMin }}</td>
						<td>{{ entry.bidMax }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import StocksController from '../data/controllers/stocksController';
import OrdersController from '../data/controllers/ordersController';

export default {
	name: 'Home',
	data: function () {
		return {
			locale: '',
			user: {},
			stocksData: [],
		};
	},
	created() {
		this.setup();
	},
	methods: {
		async setup() {
			this.locale = navigator.languages[0] ?? 'en-US';

			if (this.$root.authenticated) {
				let stocksController = new StocksController();
				let ordersController = new OrdersController();
				let accessToken = this.$auth.getAccessToken();

				this.stocksData = await stocksController.getStocks(accessToken);

				let claims = await this.$auth.getUser();
				this.user = await ordersController.setUser(accessToken, claims.email);
				this.user.name = claims.name;
			}
		},
		formatDate(dateString) {
			let date = new Date(dateString);
			return date.toLocaleString(this.locale, {
				dateStyle: 'short',
				timeStyle: 'medium',
			});
		},
	},
};
</script>
