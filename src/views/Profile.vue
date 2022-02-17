<template>
	<div>
		<h2>Stock ballance</h2>
		<p v-if="stocksList.length === 0">You don't have any stocks</p>
		<n-space>
			<stock-card
				v-for="(stock, index) in stocksList"
				v-bind:key="index"
				:stock="stock"
			/>
		</n-space>
		<h2>Orders</h2>
		<p v-if="orderList.length === 0">You don't have any orders</p>
		<n-space>
			<order-card
				v-for="(order, index) in orderList"
				v-bind:key="index"
				:order="order"
			/>
		</n-space>
	</div>
</template>

<script>
import { NSpace } from 'naive-ui';
import StockCard from '@/components/stockCard';
import OrderCard from '@/components/orderCard';
import OrdersController from '@/controllers/OrdersController';

export default {
	components: {
		NSpace,
		StockCard,
		OrderCard,
	},
	data() {
		return {
			stocksList: [],
			orderList: [],
		};
	},
	beforeMount() {
		let user = this.$store.state.user;
		let token = this.$store.state.accessToken;

		OrdersController.getUserStocksBalance(token, user).then(
			(result) => (this.stocksList = result)
		);

		OrdersController.getUserOrders(token, user).then(
			(result) => (this.orderList = result)
		);
	},
};
</script>
