<script>
  import DebugStats from "./DebugStats.svelte";

  let showStats = false;

  const toggleStats = () => {
    showStats = !showStats;
  };
</script>

<div class="col-span-12 place-self-end m-8 mt-20">
  <a href="https://discord.gg/y7PGJRZvPa" target="_blank">Discord</a>
  - <span on:click={toggleStats}>Debugging Stats</span>
</div>

{#if showStats}
  <DebugStats class="col-span-12 place-self-end m-8 mt-20" />
{/if}
