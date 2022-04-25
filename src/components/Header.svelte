<script>
  import { Router, Link } from 'svelte-routing';
  import { Hamburger } from 'svelte-hamburgers';
  import Menu from './Menu.svelte';
  let open;
  import BrightnessContrast from "carbon-icons-svelte/lib/BrightnessContrast.svelte";
</script>

<header class='bg-primary-900 flex justify-between items-center'>
  <Hamburger bind:open --color="white" />
  <img src='/logo.png' alt='logo' />

  <BrightnessContrast class='mr-6 text-white-900' />
</header>
<Menu bind:open />

<style>
  header {
    height: 60px;
  }

  img {
    max-height: 100%
  }
</style>