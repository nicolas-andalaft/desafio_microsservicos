<template>
	<div class="home">
		<n-grid cols="1 m:2" responsive="screen">
			<n-grid-item>
				<stocks-table :stocksList="stocksList"> </stocks-table>
			</n-grid-item>
		</n-grid>
	</div>
</template>

<script>
import { NGrid, NGridItem } from 'naive-ui';
import StocksController from '@/controllers/StocksController';
import StocksTable from '@/components/stocksTable';

export default {
	data: function () {
		return {
			stocksList: [],
		};
	},
	components: {
		StocksTable,
		NGrid,
		NGridItem,
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
	},
};
</script>

<style scoped>
.d-flex {
	display: flex;
}
</style>
