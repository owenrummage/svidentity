<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
	import { page } from '$app/state';
	import { goto } from '$app/navigation'; // Import for redirecting to the login page

	let redirectUrl: string | null = page.url.searchParams.get('redirect');

	let email = '';
	let password = '';
	let firstName = '';
	let lastName = '';
	let errorMessage = '';
	let successMessage = '';

	// Form submission handler
	async function submitForm() {
		// Reset messages
		errorMessage = '';
		successMessage = '';

		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);
		formData.append('firstName', firstName);
		formData.append('lastName', lastName);

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				body: formData
			});

			const data = await response.json();

			if (response.ok) {
				successMessage = data.message;
				setTimeout(() => {
					goto(`/login?redirect=${redirectUrl}`); // Redirect to login page on success
				}, 1000); // Delay redirect to show success message
			} else {
				errorMessage = data.message;
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			errorMessage = 'An error occurred. Please try again.';
		}
	}
</script>

<form class=" gap-4 flex flex-col h-full" on:submit|preventDefault={submitForm}>
	<div class="mb-4">
		<h1 class="text-2xl font-bold">New here?</h1>
		<h3 class="text-sm">Please fill in the details below to create an account.</h3>
	</div>
	<!-- Display success or error message -->
	{#if successMessage}
		<p class="text-green-500">{successMessage}</p>
	{:else if errorMessage}
		<p class="text-red-500">{errorMessage}</p>
	{/if}
	<Label for="email">Email:</Label>
	<Input id="email" type="email" bind:value={email} required />

	<Label for="password">Password:</Label>
	<Input id="password" type="password" bind:value={password} required />

	<Label for="firstName">First Name:</Label>
	<Input id="firstName" type="text" bind:value={firstName} />

	<Label for="lastName">Last Name:</Label>
	<Input id="lastName" type="text" bind:value={lastName} />

	<!-- Submit button within the form -->
	<Button class="mt-auto" type="submit">Register</Button>
	<Button variant="outline" on:click={() => goto(`/login?redirect=${redirectUrl}`)}>Login</Button>
</form>
