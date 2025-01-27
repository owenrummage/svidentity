import { prisma } from '$lib/prisma';
import { parse } from 'cookie';
import { redirect, error } from '@sveltejs/kit';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ request, url }) => {
	const cookies = parse(request.headers.get('cookie') || '');
	const sessionId = cookies['session_id'];
	const redirectURL = url.searchParams.get('redirect');

	if (!redirectURL) throw error(400, 'Invalid redirect domain');

	if (sessionId) {
		// Validate the session by checking if the session ID exists in the database
		const session = await prisma.session.findUnique({
			where: { id: sessionId },
			include: { user: true }
		});

		if (session) {
			// Session is valid, check if there's a redirectURL query parameter

			if (redirectURL) {
				let redirectWithToken;
				try {
					redirectWithToken = new URL(redirectURL);

					// Extract the domain from the redirect URL
					const redirectDomain = redirectWithToken.hostname;
					// Check if an application exists with the provided domain
					const app = await prisma.app.findFirst({
						where: { domain: redirectDomain }
					});

					if (!app) {
						// If no application with the domain exists, throw an error
						throw error(400, 'Invalid redirect domain');
					}

					// Append the session ID or token to the redirect URL
					redirectWithToken.searchParams.append('token', session.id);

					// Perform the redirect with the session token attached
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
				} catch (err) {
					// Handle malformed URL or other errors
					throw error(400, 'Invalid redirect domain!');
				}
				redirect(301, redirectWithToken.toString());
			}
		}
	}

	// If no session exists, allow the user to stay on the login page or show the login form
	return {};
};
