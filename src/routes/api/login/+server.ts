import config from '$lib/stores/config.json';

export const GET = async ({ url }) => {
    const redirectUri = `${url.origin}/api/callback`;
    const authorizeUrl = new URL('https://auth.hackclub.com/oauth/authorize');

    authorizeUrl.searchParams.set('client_id', config['hca-client-id']);
    authorizeUrl.searchParams.set('redirect_uri', redirectUri);
    authorizeUrl.searchParams.set('response_type', 'code');
    authorizeUrl.searchParams.set('scope', 'email name slack_id verification_status');

    return new Response(null, {
        status: 303,
        headers: {
            location: authorizeUrl.toString()
        }
    });
};