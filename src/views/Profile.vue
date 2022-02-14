<template>
	<div>
		<h2>Stock ballance</h2>
		<p v-if="stocksList.length == 0">You don't have any stocks</p>
		<n-space>
			<stock-card
				v-for="(stock, index) in stocksList"
				v-bind:key="index"
				:stock="stock"
			/>
		</n-space>
	</div>
</template>

<script>
import { NSpace } from 'naive-ui';
import StockCard from '@/components/stockCard';
import OrdersController from '@/controllers/OrdersController';

export default {
	components: {
		NSpace,
		StockCard,
	},
	data() {
		return {
			stocksList: [],
		};
	},
	async beforeCreate() {
		let accessToken = await this.$auth.getAccessToken();
		this.stocksList = await OrdersController.getUserStocksBalance(accessToken, {
			id: 17,
		});
	},
};
</script>

<style>
p {
	margin-bottom: 5px;
	margin-top: 20px;
}
.volume {
	text-align: center;
	margin: 0 40px;
}
/* .n-card {
	padding: 0 20px;
} */
</style>
