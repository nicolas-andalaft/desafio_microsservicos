<template>
	<n-spin :show="stocksList.length == 0" size="small">
		<n-data-table :columns="columns" :data="stocksList" class="smallTable" />
	</n-spin>
</template>

<script>
import { h } from 'vue';
import { NDataTable, NSpin, NTime } from 'naive-ui';

export default {
	props: {
		stocksList: {
			type: Array,
			default: () => [],
		},
	},
	data: function () {
		return {
			columns: [],
		};
	},
	components: {
		NDataTable,
		NSpin,
	},
	mounted() {
		this.columns = [
			{
				title: 'Name',
				key: 'stock_name',
			},
			{
				title: 'Symbol',
				key: 'stock_symbol',
			},
			{
				title: 'Updated',
				key: 'updated_on',
				render(row) {
					return h(NTime, {
						time: Date.parse(row.updated_on),
						type: 'relative',
					});
				},
			},
			{
				title: 'Created',
				key: 'created_on',
				render(row) {
					return h(NTime, {
						time: Date.parse(row.created_on),
						type: 'relative',
					});
				},
			},
			{
				title: 'Ask Min',
				key: 'ask_min',
			},
			{
				title: 'Ask Max',
				key: 'ask_max',
			},
			{
				title: 'Bid Min',
				key: 'bid_min',
			},
			{
				title: 'Bid Max',
				key: 'bid_max',
			},
		];
	},
};
</script>

<style>
.smallTable {
	font-size: 0.8rem;
}
</style>
