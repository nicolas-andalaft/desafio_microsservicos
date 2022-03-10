<template>
	<div>
		<h2>Stock ballance</h2>
		<p v-if="stocksList.length === 0">You don't have any stocks</p>
		<n-grid
			cols="1 s:2 m:3 l:4 xl:5 xxl:6"
			responsive="screen"
			x-gap="10"
			y-gap="10"
		>
			<n-grid-item v-for="(stock, index) in stocksList" v-bind:key="index">
				<stock-card :stock="stock" />
			</n-grid-item>
		</n-grid>
		<h2>Orders</h2>
		<p v-if="orderList.length === 0">You don't have any orders</p>
		<n-grid
			cols="1 s:2 m:3 l:4 xl:5 xxl:6"
			responsive="screen"
			x-gap="10"
			y-gap="10"
		>
			<n-grid-item v-for="(order, index) in orderList" v-bind:key="index">
				<order-card :order="order" />
			</n-grid-item>
		</n-grid>
	</div>
</template>

<script>
import { NGrid, NGridItem } from 'naive-ui';
import StockCard from '@/components/stockCard';
import OrderCard from '@/components/orderCard';
import OrdersController from '@/controllers/OrdersController';

export default {
	components: {
		StockCard,
		OrderCard,
		NGrid,
		NGridItem,
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
