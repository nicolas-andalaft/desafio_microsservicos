<template>
	<div>
		<h2>{{ title }}</h2>
		<n-result v-if="list == null"> </n-result>
		<n-grid
			cols="1 s:2 m:3 l:4 xl:5 xxl:6"
			responsive="screen"
			x-gap="10"
			y-gap="10"
		>
			<n-grid-item v-for="(item, index) in list" v-bind:key="index">
				<component :is="card_component" :item="item"></component>
			</n-grid-item>
		</n-grid>
	</div>
</template>

<script>
import { NResult, NGrid, NGridItem } from 'naive-ui';

export default {
	components: {
		NResult,
		NGrid,
		NGridItem,
	},
	props: {
		card_component: null,
		title: null,
		list: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			tertiary: 'tertiary',
		};
	},
};
</script>
