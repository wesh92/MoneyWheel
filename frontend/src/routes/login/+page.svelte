<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<div class="mx-auto mt-16 max-w-md">
	<div class="rounded-lg border bg-white p-8 shadow-md">
		<h1 class="mb-2 text-center text-2xl font-bold">Welcome Back</h1>
		<p class="mb-6 text-center text-gray-600">Sign in to continue</p>

		{#if form?.error}
			<div
				class="mb-4 rounded-md border-l-4 border-red-600 bg-red-100 p-4 text-sm text-red-800"
				role="alert"
			>
				{form.error}
			</div>
		{/if}

		{#if form?.message}
			<div
				class="mb-4 rounded-md border-l-4 border-blue-600 bg-blue-100 p-4 text-sm text-blue-800"
				role="alert"
			>
				{form.message}
			</div>
		{/if}

		<form method="POST" class="space-y-6">
			<div>
				<label for="email" class="mb-2 block text-sm font-medium text-gray-700">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					required
				/>
			</div>
			<div>
				<label for="password" class="mb-2 block text-sm font-medium text-gray-700">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					required
				/>
			</div>
			<div class="flex items-center space-x-4 pt-2">
				<button
					formaction="?/login"
					type="submit"
					class="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Sign In
				</button>
				<button
					formaction="?/signup"
					type="submit"
					class="flex-1 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
				>
					Sign Up
				</button>
			</div>
		</form>
	</div>
</div>

