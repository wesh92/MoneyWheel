<!-- src/routes/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<h1 class="text-2xl font-bold">Dashboard</h1>
	<p class="mt-2">
		Welcome, <span class="font-semibold">{data.user?.email}</span>!
	</p>
	<p class="mt-4">This is your main dashboard. Transaction data will be displayed here soon.</p>
</div>


