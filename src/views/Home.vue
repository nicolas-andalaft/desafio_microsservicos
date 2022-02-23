<template>
	<div class="home">
		<n-grid cols="1 m:2" responsive="screen">
			<n-grid-item>
				<stocks-table :stocksList="stocksList" :onStockSelect="onStockSelect">
				</stocks-table>
			</n-grid-item>
			<n-grid-item v-if="currentStock.id != null">
				<n-anchor :top="0" :show-rail="false" affix class="container">
					<h1>
						{{ currentStock.stock_name }} - {{ currentStock.stock_symbol }}
					</h1>
					<h2>Ask</h2>
					<stock-chart ref="askChart" ask />
					<h2>Bid</h2>
					<stock-chart ref="bidChart" bid />
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
import StockChart from '@/components/stockChart';
import StocksController from '@/controllers/StocksController';
import StocksTable from '@/components/stocksTable';
import router from '@/router/index';

export default {
	components: {
		StocksTable,
		NGrid,
		NGridItem,
		NButton,
		StockChart,
		NAnchor,
	},
	data: function () {
		return {
			accessToken: '',
			currentStock: {},
			stocksList: [],
		};
	},
	async created() {
		this.accessToken = this.$auth.getAccessToken();

		this.updateStocks();
	},
	methods: {
		async updateStocks() {
			StocksController.getStocks(this.accessToken).then((result) => {
				if (result) {
					this.stocksList = result;
				}
			});
		},
		onStockSelect(selected) {
			this.currentStock = selected;

			StocksController.getStockHistory(this.accessToken, selected.id).then(
				(list) => {
					this.$refs.askChart.updateData(list);
					this.$refs.bidChart.updateData(list);
				}
			);
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
