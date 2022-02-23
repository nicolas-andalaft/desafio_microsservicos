<template>
	<v-frappe-chart type="line" :labels="labels" :data="chartData" ref="chart" />
</template>

<script>
import { VFrappeChart } from 'vue-frappe-chart';

export default {
	components: {
		VFrappeChart,
	},
	props: {
		ask: {
			type: Boolean,
			default: false,
		},
		bid: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			chartData: [{ values: [0, 0] }, { values: [0, 0] }],
			labels: ['', ''],
		};
	},
	methods: {
		updateData(dataList) {
			let val_min = dataList.map((e) =>
				this.getValue(this.ask ? e.ask_min : e.bid_min)
			);
			let val_max = dataList.map((e) =>
				this.getValue(this.ask ? e.ask_max : e.bid_max)
			);

			this.chartData = [
				{ name: 'min', values: val_min },
				{ name: 'max', values: val_max },
			];

			this.labels = dataList.map((e) => e.created_on.substring(0, 1));
		},
		getValue(value) {
			return (value == null ? 0 : value).toFixed(2);
		},
	},
};
</script>
