<template>
	<div class="home">
		<div v-if="this.$root.authenticated">
			<div v-if="user.name">
				<p>Welcome, {{ user.name }}!</p>
				<p>
					Current ballance:
					{{ user.dollar_balance ? user.dollar_balance + 'US' : 'unavailable' }}
				</p>
			</div>
			<br />
			<div class="d-flex">
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
						<tr v-for="(entry, index) in stocksList" :key="index">
							<td>{{ entry.stock_name }}</td>
							<td>{{ formatDate(entry.updated_on) }}</td>
							<td>{{ formatDate(entry.created_on) }}</td>
							<td>{{ entry.stock_symbol }}</td>
							<td>{{ entry.ask_min }}</td>
							<td>{{ entry.ask_max }}</td>
							<td>{{ entry.bid_min }}</td>
							<td>{{ entry.bid_max }}</td>
						</tr>
					</tbody>
				</table>
				<order-form
					:user="this.user"
					:stocksList="this.stocksList"
				></order-form>
			</div>
		</div>
	</div>
</template>

<script>
import StocksController from '../data/controllers/stocksController';
import OrdersController from '../data/controllers/ordersController';
import OrderForm from '../components/orderForm.vue';

export default {
	name: 'Home',
	data: function () {
		return {
			locale: '',
			user: {},
			stocksList: [],
		};
	},
	components: {
		OrderForm,
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

				let claims = await this.$auth.getUser();
				let accessToken = this.$auth.getAccessToken();

				ordersController.setUser(accessToken, claims.email).then((result) => {
					if (result) this.user = result;

					this.user.name = claims.name;
				});

				stocksController.getStocks(accessToken).then((result) => {
					if (result) this.stocksList = result;
				});
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

<style scoped>
.d-flex {
	display: flex;
}
</style>
