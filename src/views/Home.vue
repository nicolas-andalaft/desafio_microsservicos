<template>
	<div class="home">
		<div v-if="this.$root.authenticated">
			<div v-if="user.name">
				<p>Welcome, {{ user.name }}!</p>
				<p>
					Current ballance:
					{{
						user.dollar_balance ? user.dollar_balance + ' US' : 'unavailable'
					}}
				</p>
			</div>
			<br />
			<div class="d-flex">
				<stocks-table :stocksList="stocksList" :locale="getLocale()">
				</stocks-table>
				<order-form
					:user="this.user"
					:stocksList="this.stocksList"
					:onValid="this.updateUserAndOrders"
				></order-form>
				<div>
					<order-card
						v-for="(order, index) in orders"
						v-bind:key="index"
						:order="order"
					></order-card>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import StocksController from '@/controllers/StocksController';
import OrdersController from '@/controllers/OrdersController';
import OrderForm from '@/components/orderForm';
import StocksTable from '@/components/stocksTable';
import OrderCard from '@/components/orderCard';

export default {
	name: 'Home',
	data: function () {
		return {
			user: {},
			stocksList: [],
			orders: [],
		};
	},
	components: {
		OrderForm,
		StocksTable,
		OrderCard,
	},
	async created() {
		if (this.$root.authenticated) {
			// Set user information
			let claims = await this.$auth.getUser();
			this.user.name = claims.name;
			this.user.username = claims.email;

			this.updateStocks();
			this.updateUserAndOrders();
		}
	},
	methods: {
		async updateStocks() {
			let accessToken = this.$auth.getAccessToken();

			StocksController.getStocks(accessToken).then((result) => {
				if (result) {
					this.stocksList = result;
				}
			});
		},
		async updateUserAndOrders() {
			let accessToken = this.$auth.getAccessToken();

			let userResp = await OrdersController.getUser(
				accessToken,
				this.user.username
			);
			if (!userResp) return;

			// Update user object with response
			// (used to update dollar balance)
			Object.assign(this.user, userResp);

			let ordersResp = await OrdersController.getUserOrders(
				accessToken,
				this.user
			);
			if (!ordersResp) return;

			this.orders = ordersResp;
		},
		getLocale() {
			return navigator.languages[0];
		},
	},
};
</script>

<style scoped>
.d-flex {
	display: flex;
}
</style>
