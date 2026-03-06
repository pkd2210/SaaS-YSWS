import config from '$lib/stores/config.json';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ cookies }) => {
    // Create a demo access token - this would be a fake token that our layout server will recognize
    const demoToken = 'demo_user_token_' + Date.now();
    
    // Set the demo token as a cookie similar to how the real login works
    cookies.set('hca_access_token', demoToken, { 
        path: '/', 
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        httpOnly: true,
        secure: false, // Set to false for demo purposes 
        sameSite: 'strict'
    });

    // Redirect to shop after demo login
    throw redirect(303, config["url-base"] + "/");
};