<script>
  import { onDestroy } from 'svelte';
  import { Router, Link } from 'svelte-routing';
  import { fly, scale } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import { signWithGoogle, googleSignOut } from '../helpers/firebase';
  import { userId } from '../store';
  let uid;

  userId.subscribe( id => {
    uid = id;
  });

  onDestroy(() => unsubscribe);

  export let open;
</script>

{#if open}
  <nav class="bg-primary-900 dark:bg-dark-900" on:click={()=> open = false}>
    <Router>
      <Link class="block mb-2" to="/">Home</Link>
      <Link class="block mb-2" to="about">About diary effect</Link>
      <!-- <Link class="block mb-2" to="create">Create</Link> -->
      {#if !uid}
        <Link class="block mb-2" to="#" on:click={signWithGoogle}>Login</Link>
      {:else}
        <Link class="block mb-2" to="create" >create diary</Link>
        <Link class="block mb-2" to="#" on:click={googleSignOut}>Logout</Link>
      {/if}
    </Router>
    <div class="bar" transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
  </nav>
{/if}

<style>
  /* :global(html) {
      background: #1d1d2f;
  } */
  nav {
      text-align: center;
      font-size: 1.5em;
      letter-spacing: 0.15em;
      padding: 1em;
      padding-top: 0;
      color: #eef;
  }
  a {
      cursor: pointer;
      width: max-content;
      margin: 1rem auto;
      display: block;
  }
  a:hover {
      text-decoration: underline;
  }
  .bar {
      border-style: solid;
      border-color: white;
      border-width: 1px;
      height: 0;
  }
</style>