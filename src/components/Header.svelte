<script>
  import { onMount } from 'svelte';
  import { Router, Link } from 'svelte-routing';
  import { Hamburger } from 'svelte-hamburgers';
  import Menu from './Menu.svelte';
  import { Button } from 'smelte';
  let open;
  import BrightnessContrast from "carbon-icons-svelte/lib/BrightnessContrast.svelte";
  
  const toggleDark = () => {
    // need to get body element
    if(localStorage.isDark === 'true'){
      //change to light mode
      document.getElementById('body').classList.remove('mode-dark');
      localStorage.isDark = 'false';
    } else {
      //
      document.getElementById('body').classList.add('mode-dark');
      localStorage.isDark = 'true';
    }
  }

  onMount(() => {
    if(localStorage.isDark === 'true'){
      document.getElementById('body').classList.add('mode-dark');
      localStorage.isDark = 'true';
    } else {
      document.getElementById('body').classList.remove('mode-dark');
      localStorage.isDark = 'false';
    }
  });

</script>

<header class='bg-primary-900 dark:bg-dark-900 flex justify-between items-center'>
  <Hamburger bind:open --color="white" />
  <img src='/logo.png' alt='logo' on:click={()=> location.href='/'}/>
  <button on:click={toggleDark}>
    <BrightnessContrast class='mr-6 text-white-900'  />
  </button>
  
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