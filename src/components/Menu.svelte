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
  <nav class="bg-primary-900" on:click={()=> open = false}>
    <Router>
      <Link class="block" to="/">Home</Link>
      <Link class="block" to="about">About</Link>
      <Link class="block" to="create">Create</Link>
      {#if !uid}
        <Link class="block" to="#" on:click={signWithGoogle}>Login</Link>
      {:else}
        <Link class="block" to="#" on:click={googleSignOut}>Logout</Link>
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