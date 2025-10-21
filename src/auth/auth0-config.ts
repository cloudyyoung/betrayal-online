// Auth0 Configuration
// You'll need to replace these with your actual Auth0 values
// Get these from your Auth0 Dashboard: https://manage.auth0.com/

export const auth0Config = {
    domain: 'cloudyyoung.auth0.com',
    clientId: 'bRRsWWsltUM6Czuus0TP6gH6vu88ebx8',
    authorizationParams: {
        redirect_uri: window.location.origin,
    },
    // Cache location for token storage
    cacheLocation: 'localstorage' as const,
};
