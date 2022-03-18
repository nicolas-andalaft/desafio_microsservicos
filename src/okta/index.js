import OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaUri = 'https://dev-3308328.okta.com';
const clientId = '0oa3li26rlI97dgFg5d7';

const oktaSignIn = new OktaSignIn({
	baseUrl: oktaUri,
	clientId: clientId,
	redirectUri: 'http://localhost:8080/login/callback',
	authParams: {
		pkce: true,
		issuer: `${oktaUri}/oauth2/default`,
		display: 'page',
		scopes: ['openid', 'profile', 'email'],
	},
});

const oktaAuth = new OktaAuth({
	issuer: `${oktaUri}/oauth2/default`,
	clientId: clientId,
	redirectUri: window.location.origin + '/login/callback',
	scopes: ['openid', 'profile', 'email'],
});

export { oktaAuth, oktaSignIn };
