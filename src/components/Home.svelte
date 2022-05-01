<script>
  import { onMount, onDestroy } from "svelte/internal";
  import { signWithGoogle, googleSignOut } from '../helpers/firebase';
  import { Button, ProgressCircular } from "smelte";
  import { userId } from "../store";
  import { fetch } from "../helpers/api";
  import { Router, Link, Route } from "svelte-routing";
  import StarRating from 'svelte-star-rating';
  import dayjs from 'dayjs';
  let uid;
  const unsubscribe = userId.subscribe(id => {uid = id});
  let promise = fetch();
  onMount(async() => {
    promise = await fetch(uid);
    console.log(promise);
  });
  onDestroy( () => { unsubscribe } );
</script>

{#if !uid}
  <Button on:click={signWithGoogle} class="text-white-900 mt-10">Login</Button>
{:else}
  {#await promise}
    <p>loading...</p>
    <p class="mt-10 flex justify-center"><ProgressCircular /></p>
  {:then diaries} 
    <!-- <p>loaded!</p>  -->
    <Router>
      {#each diaries as diary}
        <Link to={'/diary/' + diary.id} class="flex item-center mb-6">
          <aside class="diary-aside">
            <p class="text-left">{dayjs(diary.createdAt).format('YYYY/MM/DD')}</p>
            <img class="diary-image" src={diary.image ? diary.image : '/dummy.jpeg'} alt="diary image" />
            <p><StarRating rating={diary.rate / 2} /></p>
          </aside>
          <p>{diary.body}</p>
        </Link>
      {/each}
    </Router>
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