<template>
	<div class="login">
		<div id="okta-signin-container"></div>
	</div>
</template>

<script>
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaSignIn } from '@/okta';
import router from '@/router/index';

export default {
	name: 'Login',
	mounted: function () {
		this.$nextTick(() => {
			oktaSignIn
				.showSignInToGetTokens({ el: '#okta-signin-container' })
				.then((tokens) => {
					oktaSignIn.authClient.tokenManager.setTokens(tokens);
					this.$store.state.authenticated = true;

					router.push('/');
				});
		});
	},
	unmounted() {
		// Remove the widget from the DOM on path change
		oktaSignIn.remove();
	},
};
</script>
