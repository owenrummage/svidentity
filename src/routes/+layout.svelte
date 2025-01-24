<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<div class="w-screen h-screen flex flex-col items-center justify-center">
	{@render children()}
</div>
