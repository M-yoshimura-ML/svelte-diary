<script>
  import { fly } from 'svelte/transition';
</script>

<section transition:fly="{{ y: 700, duration: 3000 }}">
  <h1 class="h4">diary effect</h1>

  <p>By continuing writing diary, once you'll be confident that you can continue one thing,
     It will be easier to challenge studying and exercising</p>

  <h2 class="h5">Writing has a mental health effect</h2>

  <p>Writing will make good effect on your health. Except keeping creativity,
     it works to release the stress of everyday life.</p>

  <h2 class="h5">Practical benefits too</h2>

  <p>Continuing to write is also practical. Reminds you of past mistakes, glory, wonderful memories, etc.</p>
</section>
