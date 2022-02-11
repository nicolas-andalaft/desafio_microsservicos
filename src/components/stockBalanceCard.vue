<template>
	<n-card :title="stockBalance?.stock_symbol">
		<h3>{{ stockBalance?.stock_name }}</h3>
		<p>{{ stockBalance?.volume }}</p>
	</n-card>
</template>

<script>
import { NCard } from 'naive-ui';

export default {
	props: {
		stockBalance: {},
	},
	components: {
		NCard,
	},
};
</script>
