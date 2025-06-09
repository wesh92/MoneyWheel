<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="login-container">
	<h1>Welcome</h1>
	<p>Sign in or create an account to continue</p>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form method="POST">
		<div class="form-group">
			<label for="email">Email</label>
			<input id="email" name="email" type="email" required />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input id="password" name="password" type="password" required />
		</div>
		<div class="button-group">
			<button formaction="?/login" class="primary">Sign In</button>
			<button formaction="?/signup">Sign Up</button>
		</div>
	</form>
</div>

<style>
	.login-container {
		max-width: 400px;
		margin: 4rem auto;
		padding: 2rem;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		background-color: #f9f9f9;
		font-family: sans-serif;
	}
	h1 {
		text-align: center;
		color: #333;
	}
	p {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}
	.form-group {
		margin-bottom: 1rem;
	}
	label {
		display: block;
		margin-bottom: 0.5rem;
		color: #444;
	}
	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box; /* Ensures padding doesn't affect width */
	}
	.button-group {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}
	button {
		flex-grow: 1;
		padding: 0.75rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.2s;
	}
	button.primary {
		background-color: #3498db;
		color: white;
		border-color: #3498db;
	}
	button:hover {
		background-color: #f0f0f0;
	}
	button.primary:hover {
		background-color: #2980b9;
	}
	.error {
		color: #e74c3c;
		background-color: #fdd;
		padding: 0.75rem;
		border-radius: 4px;
		text-align: center;
		margin-bottom: 1rem;
	}
</style>

