<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<div v-if="this.$root.authenticated">
			<p v-if="claims.name">Welcome, {{ claims.name }}!</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data: function () {
		return {
			claims: '',
		};
	},
	created() {
		this.setup();
	},
	methods: {
		async setup() {
			if (this.$root.authenticated) {
				this.claims = await this.$auth.getUser();
			}
		},
	},
};
</script>
