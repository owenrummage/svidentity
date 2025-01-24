import { prisma } from '$lib/prisma'; // Your Prisma client instance
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { type RequestHandler } from '@sveltejs/kit';

// Define the schema for validation using Zod
const registerSchema = z.object({
	email: z.string().email().min(5, 'Email is required'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
	firstName: z.string().optional(),
	lastName: z.string().optional()
});

// Define the POST handler with explicit typing for the request
export const POST: RequestHandler = async ({ request }) => {
	try {
		// Parse form data
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Validate the incoming data
		const parsed = registerSchema.safeParse({
			email,
			password,
			firstName: formData.get('firstName') as string | null,
			lastName: formData.get('lastName') as string | null
		});

		if (!parsed.success) {
			return new Response(JSON.stringify({ message: parsed.error.errors[0].message }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Check if the email already exists
		const existingUser = await prisma.user.findUnique({
			where: { email }
		});

		if (existingUser) {
			return new Response(JSON.stringify({ message: 'Email already registered' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Hash the password before storing it
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new user in the database
		await prisma.user.create({
			data: {
				email,
				passwordHash: hashedPassword,
				firstName: parsed.data.firstName || undefined, // Store firstName if provided
				lastName: parsed.data.lastName || undefined // Store lastName if provided
			}
		});

		// Redirect to the login page
		return new Response(JSON.stringify({ message: 'Successfully created an account' }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		// Handle unexpected errors
		return new Response(JSON.stringify({ message: 'Internal server error', error: error }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
