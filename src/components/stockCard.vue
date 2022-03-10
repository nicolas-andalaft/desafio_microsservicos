<template>
	<n-card class="item-card" hoverable>
		<h2>
			<n-icon><md-stats /></n-icon>
			{{ stock.stock_symbol }}
		</h2>
		<h4 class="subtitle">{{ stock.stock_name }}</h4>

		<n-space align="center" vertical>
			<n-h1 class="volume">
				<n-text type="primary"> {{ stock.volume }} volumes </n-text>
			</n-h1>
			<n-button @click="changeRoute" strong secondary>
				Create sell order
			</n-button>
		</n-space>

		<template #footer>
			<n-space justify="space-around">
				<n-tag size="medium" class="tag-label">
					<p>Created</p>
					<n-time :time="new Date(stock.created_on)" type="relative" />
				</n-tag>

				<n-tag size="medium" type="info" class="tag-label">
					<p>Last updated</p>
					<n-time :time="new Date(stock.updated_on)" type="relative" />
				</n-tag>
			</n-space>
		</template>
	</n-card>
</template>

<script>
import {
	NCard,
	NTime,
	NIcon,
	NH1,
	NText,
	NTag,
	NSpace,
	NButton,
} from 'naive-ui';
import { MdStats } from '@vicons/ionicons4';
import router from '@/router/index';

export default {
	components: {
		NCard,
		NTime,
		NIcon,
		NH1,
		NText,
		NTag,
		MdStats,
		NSpace,
		NButton,
	},
	props: {
		stock: {},
	},
	methods: {
		changeRoute() {
			router.push({
				name: 'orderForm',
				params: {
					type: 1,
					id_stock: this.$props.stock.id_stock,
				},
			});
		},
	},
};
</script>
