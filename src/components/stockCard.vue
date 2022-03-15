<template>
	<n-card class="item-card" hoverable>
		<h2>
			<n-icon><md-stats /></n-icon>
			{{ item.stock_symbol }}
		</h2>
		<h4 class="subtitle">{{ item.stock_name }}</h4>

		<n-space align="center" vertical>
			<n-h1 class="volume">
				<n-text type="primary"> {{ item.volume }} volumes </n-text>
			</n-h1>
			<n-button @click="changeRoute" strong secondary>
				Create sell order
			</n-button>
		</n-space>

		<template #footer>
			<n-space justify="space-around">
				<n-tag size="medium" class="tag-label">
					<p>Created</p>
					<n-time :time="getDate(item.created_on)" type="relative" />
				</n-tag>

				<n-tag size="medium" type="info" class="tag-label">
					<p>Last updated</p>
					<n-time :time="getDate(item.updated_on)" type="relative" />
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
		item: {},
	},
	methods: {
		changeRoute() {
			router.push({
				name: 'orderForm',
				params: {
					type: 1,
					id_stock: this.$props.item.id_stock,
				},
			});
		},
		getDate(date) {
			return date == null ? null : new Date(date);
		},
	},
};
</script>
