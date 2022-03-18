<template>
	<div>
		<card-list
			title="Stock ballance"
			:list="stocksList"
			:card_component="StockCard"
		/>
		<card-list title="Orders" :list="orderList" :card_component="OrderCard" />
	</div>
</template>

<script>
import CardList from '@/components/cardList';
import StockCard from '@/components/stockCard';
import OrderCard from '@/components/orderCard';
import OrdersController from '@/controllers/OrdersController';

export default {
	components: {
		CardList,
	},
	data() {
		return {
			stocksList: [],
			orderList: [],
		};
	},
	setup() {
		return {
			StockCard,
			OrderCard,
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
