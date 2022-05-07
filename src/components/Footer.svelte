<script>
  import { onDestroy } from 'svelte';
  import { Router, Link } from 'svelte-routing';
  import { userId } from '../store';
  let uid;
</script>

<footer class='flex items-center justify-around bg-secondary-900 dark:bg-dark-900 text-white-900'>
  <Router>
    <Link class="block mb-2" to="/">Home</Link>
    <Link class="block mb-2" to="about">About diary effect</Link>
    {#if !uid}
      <Link class="block mb-2" to="create">Create</Link>
    {/if}
  </Router>
  <!-- <div class="bar" transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} /> -->
</footer>


<style>
  footer {
    height: 60px;
  }
</style>