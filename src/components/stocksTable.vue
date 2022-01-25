<template>
	<n-spin :show="stocksList.length == 0" size="large">
		<n-data-table :columns="columns" :data="stocksList" />
	</n-spin>
</template>

<script>
import { NDataTable, NSpin } from 'naive-ui';
import DateFormat from '@/helpers/DateFormat';

export default {
	props: {
		stocksList: {
			type: Array,
			default: () => [],
		},
		locale: null,
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
		let locale = this.$props.locale;
		this.columns = [
			{
				title: 'Name',
				key: 'stock_name',
			},
			{
				title: 'Last Updated',
				key: 'updated_on',
				render(row) {
					return DateFormat.format(row.updated_on, locale);
				},
			},
			{
				title: 'Created ON',
				key: 'created_on',
				render(row) {
					return DateFormat.format(row.created_on, locale);
				},
			},
			{
				title: 'Symbol',
				key: 'stock_symbol',
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
