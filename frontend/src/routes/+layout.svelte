<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css'; // Import the global Tailwind styles
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { createBrowserClient } from '@supabase/ssr';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const supabase = createBrowserClient(data.supabaseUrl, data.supabaseKey);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (session?.expires_at !== data.session?.expires_at) {
				invalidateAll();
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="min-h-screen bg-gray-100 text-gray-800">
	<header class="bg-gray-800 text-white shadow-md">
		<nav class="container mx-auto flex items-center justify-between p-4">
			<a href="/" class="text-xl font-bold hover:text-blue-300">BudgetApp</a>
			<div class="flex items-center space-x-4">
				{#if data.user}
					<span class="text-sm italic">{data.user.email}</span>
					<form action="/login?/logout" method="POST">
						<button
							type="submit"
							class="rounded bg-gray-600 px-4 py-2 text-sm font-semibold hover:bg-gray-700"
						>
							Logout
						</button>
					</form>
				{:else}
					<a
						href="/login"
						class="rounded bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
					>
						Login
					</a>
				{/if}
			</div>
		</nav>
	</header>

	<main class="container mx-auto p-4">
		<slot />
	</main>
</div>

