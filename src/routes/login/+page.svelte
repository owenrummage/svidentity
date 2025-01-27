<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	let redirectUrl: string | null = page.url.searchParams.get('redirect');

	let email = '';
	let password = '';
	let successMessage: string | null = null;
	let errorMessage: string | null = null;

	const login = async (event: Event) => {
		event.preventDefault();
		successMessage = null;
		errorMessage = null;

		try {
			// Send login request
			const response = await fetch('/api/login', {
				method: 'POST',
				body: new URLSearchParams({ email, password })
			});

			if (response.ok) {
				successMessage = 'Login successful! Redirecting...';
				setTimeout(() => {
					window.location.href = redirectUrl;
				}, 2000); // Add slight delay to show success message
			} else {
				errorMessage = 'Login failed: Invalid email or password.';
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			errorMessage = 'An error occurred while trying to log in. Please try again later.';
		}
	};
</script>

<form class=" gap-4 flex flex-col h-full" on:submit|preventDefault={login}>
	<div class="mb-4">
		<h1 class="text-2xl font-bold">Welcome back</h1>
		<h3 class="text-sm">Please login to your account to access the application</h3>
	</div>
	<!-- Display success or error message -->
	{#if successMessage}
		<p class="text-green-500 mb-4">{successMessage}</p>
	{:else if errorMessage}
		<p class="text-red-500 mb-4">{errorMessage}</p>
	{/if}
	<Label for="email">Email:</Label>
	<Input id="email" type="email" bind:value={email} required />

	<Label for="password">Password:</Label>
	<Input id="password" type="password" bind:value={password} required />

	<!-- Submit button within the form -->
	<Button class="mt-auto" type="submit">Login</Button>
	<Button variant="outline" on:click={() => goto(`/register?redirect=${redirectUrl}`)}
		>Register</Button
	>
</form>
