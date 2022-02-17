<template>
	<n-card class="item-card" hoverable>
		<h2>
			<n-icon><md-stats /></n-icon>
			{{ stock.stock_symbol }}
		</h2>
		<h4 class="subtitle">{{ stock.stock_name }}</h4>
		<n-h1 class="volume">
			<n-text type="primary"> {{ stock.volume }} volumes </n-text>
		</n-h1>
		<template #footer>
			<n-space justify="space-around">
				<n-tag size="medium" class="tag-label">
					<p>Created</p>
					<n-time :time="new Date(stock.created_on)" type="relative" />
				</n-tag>

				<n-tag size="medium" type="info" class="tag-label">
					<p>Last Updated</p>
					<n-time :time="new Date(stock.updated_on)" type="relative" />
				</n-tag>
			</n-space>
		</template>
	</n-card>
</template>

<script>
import { NCard, NTime, NIcon, NH1, NText, NTag, NSpace } from 'naive-ui';
import { MdStats } from '@vicons/ionicons4';

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
	},
	props: {
		stock: {},
	},
};
</script>
