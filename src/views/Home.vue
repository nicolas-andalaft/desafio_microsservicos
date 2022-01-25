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
				></order-form>
			</div>
		</div>
	</div>
</template>

<script>
import StocksController from '@/controllers/StocksController';
import OrdersController from '@/controllers/OrdersController';
import OrderForm from '@/components/orderForm';
import StocksTable from '@/components/stocksTable';

export default {
	name: 'Home',
	data: function () {
		return {
			user: {},
			stocksList: [],
		};
	},
	components: {
		OrderForm,
		StocksTable,
	},
	created() {
		this.setup();
	},
	methods: {
		async setup() {
			if (this.$root.authenticated) {
				let claims = await this.$auth.getUser();
				let accessToken = this.$auth.getAccessToken();

				OrdersController.getUser(accessToken, claims.email).then((result) => {
					if (result) this.user = result;

					this.user.name = claims.name;
				});

				StocksController.getStocks(accessToken).then((result) => {
					if (result) {
						this.stocksList = result;
					}
				});
			}
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
