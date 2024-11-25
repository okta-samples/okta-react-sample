
// eslint-disable-next-line
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: window.location.origin + '/login/callback',
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  },
};
