// src/routes/api/login/+server.ts

import { prisma } from '$lib/prisma';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto'; // For generating a random session ID
import { z } from 'zod';
import { json, type RequestEvent } from '@sveltejs/kit';
import { serialize } from 'cookie'; // For cookie serialization

// Define the schema for validation using Zod
const loginSchema = z.object({
	email: z.string().email().min(5, 'Email is required'),
	password: z.string().min(8, 'Password must be at least 8 characters')
});

export const POST = async ({ request }: RequestEvent) => {
	try {
		// Parse the request body
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Validate the incoming data
		const parsed = loginSchema.safeParse({ email, password });

		if (!parsed.success) {
			return json({ message: parsed.error.errors[0].message }, { status: 400 });
		}

		// Find the user in the database by email
		const user = await prisma.user.findUnique({
			where: { email }
		});

		if (!user) {
			return json({ message: 'Invalid email or password' }, { status: 400 });
		}

		// Compare the provided password with the hashed password in the database
		const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

		if (!isPasswordValid) {
			return json({ message: 'Invalid email or password' }, { status: 400 });
		}

		// Generate a secure random session ID using crypto
		const sessionId = randomBytes(16).toString('hex'); // 64-byte hex session ID

		// Create a new session in the database
		await prisma.session.create({
			data: {
				id: sessionId, // Session ID is generated randomly
				userId: user.id // Associate session with user
			}
		});

		// Set the session ID in an HttpOnly cookie
		const cookie = serialize('session_id', sessionId, {
			httpOnly: true, // Ensures the cookie is not accessible via JavaScript
			secure: process.env.NODE_ENV === 'production', // Set secure flag in production
			maxAge: 60 * 60, // 1 hour expiry
			path: '/' // Make the cookie available throughout the site
		});

		// Respond with the session token
		return json(
			{ message: 'Login successful' },
			{
				status: 200,
				headers: { 'Set-Cookie': cookie } // Set cookie header
			}
		);
	} catch (error) {
		console.error(error);
		return json({ message: 'Internal server error' }, { status: 500 });
	}
};
