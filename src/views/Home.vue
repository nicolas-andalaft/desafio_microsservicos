<template>
	<div class="home">
		<n-grid cols="12" item-responsive responsive="screen">
			<n-grid-item span="12 m:8 xl:6">
				<stocks-table :stocksList="stocksList" :onStockSelect="onStockSelect">
				</stocks-table>
			</n-grid-item>
			<n-grid-item v-if="currentStock.id != null" span="0 m:4 xl:6">
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
import SocketClient from '@/datasources/SocketClient';

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

		new SocketClient(this.updateStocks);
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
					this.$refs.askChart?.updateData(list);
					this.$refs.bidChart?.updateData(list);
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
