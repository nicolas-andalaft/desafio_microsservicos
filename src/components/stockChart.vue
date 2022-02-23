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

			this.labels = dataList.map((e) => this.getDate(e.created_on));
		},
		getValue(value) {
			return (value ?? 0).toFixed(2);
		},
		getDate(date) {
			let value = new Date(date);
			return value.toLocaleDateString(navigator.languages[0]);
		},
	},
};
</script>
