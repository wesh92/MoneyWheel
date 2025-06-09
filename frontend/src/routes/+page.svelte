<!-- frontend/src/routes/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<main style="font-family: sans-serif; padding: 2rem;">
  <h1 style="font-size: 2rem; color: #333;">Budget App Frontend</h1>
  
  <div style="margin-top: 2rem; padding: 1rem; border: 1px solid #ccc; border-radius: 8px;">
    <h2 style="font-size: 1.5rem;">Backend Connection Test</h2>
    {#if data.backendStatus}
      <p>Successfully connected to the backend!</p>
      <pre style="background-color: #f0f0f0; padding: 1rem; border-radius: 4px;"><code>{JSON.stringify(data.backendStatus, null, 2)}</code></pre>
    {:else}
      <p style="color: red;">Could not connect to the backend.</p>
    {/if}
  </div>
</main>
