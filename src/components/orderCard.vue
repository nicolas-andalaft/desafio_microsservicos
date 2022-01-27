<template>
	<n-card :title="order.stock_symbol">
		<h3>{{ order.stock_name }}</h3>
		<p>{{ order.type }}</p>
		<p>{{ order.volume }}</p>
		<p>{{ order.price }}</p>
		<p>{{ order.created_on }}</p>
		<p>{{ order.updated_on }}</p>
	</n-card>
</template>

<script>
import { NCard } from 'naive-ui';
//import DateFormat from '@/helpers/DateFormat';

export default {
	props: {
		order: {},
	},
	components: {
		NCard,
	},
};
</script>
