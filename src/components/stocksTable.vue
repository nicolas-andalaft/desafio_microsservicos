<template>
	<n-spin :show="stocksList.length == 0" size="small">
		<n-data-table
			:columns="columns"
			:data="stocksList"
			:single-line="false"
			:row-props="rowProps"
			:pagination="pagination"
			class="smallTable"
		/>
	</n-spin>
</template>

<script>
import { h, reactive } from 'vue';
import { NDataTable, NSpin, NTime } from 'naive-ui';

export default {
	props: {
		stocksList: {
			type: Array,
			default: () => [],
		},
		onStockSelect: Function,
	},
	components: {
		NDataTable,
		NSpin,
	},
	setup(props) {
		let columns = [
			{
				title: 'Stock',
				render(row) {
					return h('div', {}, `${row.stock_name} - ${row.stock_symbol}`);
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
				title: 'Ask',
				align: 'center',
				children: [
					{
						title: 'Min',
						key: 'ask_min',
					},
					{
						title: 'Max',
						key: 'ask_max',
					},
				],
			},
			{
				title: 'Bid',
				align: 'center',
				children: [
					{
						title: 'Min',
						key: 'bid_min',
					},
					{
						title: 'Max',
						key: 'bid_max',
					},
				],
			},
		];

		const rowProps = (row) => {
			return {
				style: 'cursor: pointer;',
				onClick: () => props.onStockSelect(row),
			};
		};

		const pagination = reactive({
			page: 1,
			pageSize: 50,
			onChange: (page) => (pagination.page = page),
		});

		return {
			columns,
			rowProps,
			pagination,
		};
	},
};
</script>
