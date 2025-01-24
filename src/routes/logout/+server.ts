import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export const GET = async ({ cookies, url }: RequestEvent) => {
	// Delete the cookie
	cookies.delete('session_id', { path: '/' });

	// Get the redirect URL from the query parameter
	const redirectUrl = url.searchParams.get('redirect') || 'https://rummage.cc';

	// Redirect to the specified URL
	throw redirect(302, redirectUrl);
};
