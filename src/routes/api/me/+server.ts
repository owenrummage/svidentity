import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async ({ cookies }: RequestEvent) => {
	// Retrieve the session_id cookie
	const sessionId = cookies.get('session_id');

	// If there's no session_id cookie, return an empty object
	if (!sessionId) {
		return json({ message: 'No session cookie!' }, { status: 500 });
	}

	try {
		// Find the session and include the associated user
		const session = await prisma.session.findUnique({
			where: { id: sessionId },
			include: { user: { include: { roles: true } } }
		});

		// If no session is found, return an empty object
		if (!session) {
			return json({ message: 'Session doesnt exist!' }, { status: 500 });
		}

		// Sanitize the user data by removing the passwordHash and sanitizing the session
		const sanitizedUser = {
			...session.user,
			passwordHash: undefined, // Remove the password hash
			sessions: undefined // Remove sessions if included in the model
		};

		// Return the sanitized user data
		return json(sanitizedUser);
	} catch (error) {
		// Log the error and return an empty object
		console.error('Error fetching session:', error);
		return json({ message: 'Internal server error' }, { status: 500 });
	}
};
