import config from '$lib/stores/config.json';
import { HCA_CLIENT_SECRET } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, cookies }) => {
    // debugging if the callback dosent work
    // console.log('Client ID:', config["hca-client-id"]);
    // console.log('Client Secret exists:', !!process.env.HCA_CLIENT_SECRET);
    
    const code = url.searchParams.get('code');
    if (!code) {
        throw redirect(303, url.origin);
    }
    
    const response = await fetch('https://auth.hackclub.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: config["hca-client-id"],
            client_secret: HCA_CLIENT_SECRET,
            redirect_uri: `${url.origin}/api/callback`,
            code: code,
            grant_type: "authorization_code"
        }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data?.access_token) {
        throw redirect(303, url.origin);
    }

    const expiresIn = Number(data.expires_in);
    
    cookies.set('hca_access_token', data.access_token, {
        path: '/',
        ...(Number.isFinite(expiresIn) && expiresIn > 0 ? { maxAge: Math.floor(expiresIn) } : {}),
        httpOnly: true,
        secure: url.protocol === 'https:',
        sameSite: 'strict'
    });

    throw redirect(303, `${url.origin}/shop`);
};
