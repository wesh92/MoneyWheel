<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { createBrowserClient, isBrowser } from '@supabase/ssr';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	// Use the properties passed down from the server to create the client
	const supabase = createBrowserClient(data.supabaseUrl, data.supabaseKey);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			// A new user has signed in or out, so we need to invalidate the
			// server-side session to update the UI
			if (session?.expires_at !== data.session?.expires_at) {
				invalidateAll();
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<header>
	<nav>
		<a href="/">Home</a>
		{#if data.session}
			<span>{data.session.user.email}</span>
			<!-- This form posts to a logout action -->
			<form action="/login?/logout" method="POST">
				<button type="submit">Logout</button>
			</form>
		{:else}
			<a href="/login">Login</a>
		{/if}
	</nav>
</header>

<main>
	<!-- This is where the content of each page will be rendered -->
	<slot />
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: sans-serif;
		background-color: #f4f4f4;
		color: #333;
	}

	header {
		background-color: #333;
		color: white;
		padding: 1rem 2rem;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	nav a {
		color: white;
		text-decoration: none;
		font-size: 1.1rem;
	}

	nav span {
		font-style: italic;
	}

	nav form {
		display: inline;
		margin-left: 1rem;
	}

	nav button {
		background-color: #555;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
	}
	
	nav button:hover {
		background-color: #777;
	}

	main {
		max-width: 1200px;
		margin: 2rem auto;
		padding: 0 2rem;
	}
</style>

