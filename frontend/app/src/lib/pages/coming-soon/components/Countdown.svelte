<script lang="ts">
  import { onDestroy } from 'svelte';

  export let release: Date;
  export let onFinish: VoidFunction;

  let now = Date.now();

  $: diff = release.getTime() - now;
  $: delta = diff > 0 ? diff / 1000 : 0;
  $: days = Math.floor(delta / 86400);
  $: hours = Math.floor((delta - days * 86400) / 3600) % 24;
  $: minutes = Math.floor((delta - days * 86400 - hours * 3600) / 60) % 60;
  $: seconds = Math.floor(delta % 60);

  const updateTimer = () => {
    now = Date.now();
  };

  const interval = setInterval(updateTimer, 1000);
  $: if (delta <= 0) clearInterval(interval);
  $: if (delta <= 0) onFinish();

  onDestroy(() => clearInterval(interval));

  const fillPrefixedZeros = (val: number) => {
    if (val < 10) return `0${val}`;
    return `${val}`;
  };
</script>

<div class="flex items-center justify-center gap-2 text-center text-secondary-600 md:gap-5">
  <div class="space-y-1 md:space-y-2">
    <p class="text-xs text-secondary-200 md:text-sm">Tage</p>
    <p class="text-2xl font-bold md:md:text-4xl">{fillPrefixedZeros(days)}</p>
  </div>
  <span>:</span>
  <div class="space-y-1 md:space-y-2">
    <p class="text-xs text-secondary-200 md:text-sm">Stunden</p>
    <p class="text-2xl font-bold md:text-4xl">{fillPrefixedZeros(hours)}</p>
  </div>
  <span>:</span>
  <div class="space-y-1 md:space-y-2">
    <p class="text-xs text-secondary-200 md:text-sm">Minuten</p>
    <p class="text-2xl font-bold md:text-4xl">{fillPrefixedZeros(minutes)}</p>
  </div>
  <span>:</span>
  <div class="space-y-1 md:space-y-2">
    <p class="text-xs text-secondary-200 md:text-sm">Sekunden</p>
    <p class="text-2xl font-bold md:text-4xl">{fillPrefixedZeros(seconds)}</p>
  </div>
</div>
