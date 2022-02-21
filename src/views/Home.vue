<template>
	<div class="home">
		<n-grid cols="1 m:2" responsive="screen">
			<n-grid-item>
				<stocks-table :stocksList="stocksList" :onStockSelect="onStockSelect">
				</stocks-table>
			</n-grid-item>
			<n-grid-item v-if="Object.keys(currentStock).length !== 0">
				<n-anchor top="0" :show-rail="false" affix>
					<h1>
						{{ currentStock.stock_name }} - {{ currentStock.stock_symbol }}
					</h1>
					<n-button type="primary" @click="orderFormRedirect">
						Create buy order
					</n-button>
				</n-anchor>
			</n-grid-item>
		</n-grid>
	</div>
</template>

<script>
import { NGrid, NGridItem, NButton, NAnchor } from 'naive-ui';
import StocksController from '@/controllers/StocksController';
import StocksTable from '@/components/stocksTable';
import router from '@/router/index';

export default {
	data: function () {
		return {
			currentStock: {},
			stocksList: [],
		};
	},
	components: {
		StocksTable,
		NGrid,
		NGridItem,
		NButton,
		NAnchor,
	},
	async created() {
		this.updateStocks();
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
		onStockSelect(selected) {
			this.currentStock = selected;
		},
		orderFormRedirect() {
			router.push({
				name: 'orderForm',
				params: {
					type: '0',
					id_stock: this.currentStock.id,
				},
			});
		},
	},
};
</script>
