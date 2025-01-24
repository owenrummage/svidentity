<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-riow gap-4">
	{#if $page.error}
		<span class="text-red-500 font-bold">{$page.status}:</span>
		<p>{$page.error.message}</p>
	{/if}
</div>
