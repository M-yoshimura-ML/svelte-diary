<script>
  import { onMount, onDestroy } from "svelte/internal";
  import { signWithGoogle, googleSignOut } from '../helpers/firebase';
  import { Button, ProgressCircular, TextField } from "smelte";
  import { userId } from "../store";
  import { fetch } from "../helpers/api";
  import { Router, Link, Route } from "svelte-routing";
  import StarRating from 'svelte-star-rating';
  import dayjs from 'dayjs';
  let uid, filterMonth;
  const unsubscribe = userId.subscribe(id => {uid = id});
  let promise = fetch();
  onMount(async() => {
    promise = await fetch(uid);
    // console.log(promise);
  });
  onDestroy( () => { unsubscribe } );
  const filterHandle = async() => {
    // console.log(filterMonth);
    promise = await fetch(uid, filterMonth);
  }
</script>

{#if !uid}
  <Button on:click={signWithGoogle} class="text-white-900 mt-10">Login</Button>
{:else}
  <section class="m-auto mb-6 w-6/12">
    <h5>search diary by month</h5>
    <TextField label="" type="month" bind:value={filterMonth} on:change={filterHandle} />
  </section>
  {#await promise}
    <p>loading...</p>
    <p class="mt-10 flex justify-center"><ProgressCircular /></p>
  {:then diaries} 
    {#if diaries.length > 0}
      <!-- <p>loaded!</p>  -->
      <Router>
        {#each diaries as diary}
          <Link to={'/diary/' + diary.id} class="flex items-center mb-6 border-b-2">
            <aside class="diary-aside">
              <p class="text-left">{dayjs(diary.createdAt).format('YYYY/MM/DD')}</p>
              <img class="diary-image" src={diary.image ? diary.image : '/dummy.jpeg'} alt="diary image" />
              <p class="mb-6"><StarRating rating={diary.rate / 2} /></p>
            </aside>
            <p>{diary.title}</p>
          </Link>
        {/each}
      </Router>
    {:else}
      <p>diary was not found.</p>  
    {/if}
  {/await}
{/if}


<style>
  .diary-aside {
    width: 40%;
    margin-right: 1rem;
  }
  .diary-image {
    width: 100%;
  }
</style>