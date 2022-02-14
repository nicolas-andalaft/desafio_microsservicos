<template>
	<n-card hoverable>
		<h2>
			<n-icon><md-stats /></n-icon>
			{{ stock.stock_symbol }}
		</h2>
		<h4>{{ stock.stock_name }}</h4>
		<n-h1 class="volume">
			<n-text type="primary"> {{ stock.volume }} volumes </n-text>
		</n-h1>
		<template #footer>
			<p>Created</p>
			<n-tag size="medium">
				<n-time :time="stock.created_on" format="dd/MM/yyyy hh:mm" />
			</n-tag>
			<p>Last Updated</p>
			<n-tag size="medium" type="info">
				<n-time :time="stock.updated_on" format="dd/MM/yyyy hh:mm" />
			</n-tag>
		</template>
	</n-card>
</template>

<script>
import { NCard, NTime, NIcon, NH1, NText, NTag } from 'naive-ui';
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
	},
	props: {
		stock: {},
	},
};
</script>
