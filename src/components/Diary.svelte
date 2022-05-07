<script>
  import { onMount } from 'svelte';
  import { deleteDiary, getDiary, updateDiary } from '../helpers/api';
  import { Slider, TextField, Button, ProgressCircular } from "smelte";
  import dayjs from 'dayjs';
import { doc } from 'firebase/firestore';

  export let id;
  console.log(id);
  let promise = getDiary();
  let title, rate, body, createdAt, image, preview;
  onMount( async() => {
    promise = await getDiary(id);
    title = promise.title;
    rate = promise.rate;
    body = promise.body;
    createdAt = promise.createdAt;
    console.log(promise);
  });

  const onFileSelect = (e) => {
      let target = e.target.files[0];
      image = target;
      let reader = new FileReader();
      reader.readAsDataURL(target);
      reader.onload = e => {
        preview = e.target.result;
      };
  }

  const submit = async() => {
    console.log(promise);
    const returnValue = await updateDiary(id, title, body, rate, image);
    if(returnValue){
      alert('update success');
    } else {
      //
      alert('update failed');
      document.location.href('/');
    }
  }

  const deleteHandle = async() => {
    const result = await deleteDiary(id);
    if(result){
      alert('diary is deleted successfully');
      document.location.href = '/';
    }else {
      alert('something is wrong for deleting diary');
    }
  }
 </script>

{#await promise}
  <p class="mt-10 flex justify-center"><ProgressCircular /></p>
{:then diary} 
  <h4>{dayjs(createdAt).format('YYYY/MM/DD')} Diary</h4>
  <form class="p-5" on:submit|preventDefault={submit}>
    {#if !preview}
      <img src={diary.image ? diary.image : '../dummy.jpeg'} class="mb-4" alt="diary" />
    {:else}
      <img src={preview} class="mb-4" alt="diary" />  
    {/if}
    <label for="file-input" class="bg-primary-900 text-white-900 dark:bg-dark-900 px-4 py-2 rounded mb-6 w-4/12" >select image</label>
    <input type="file" accept="image/*" id="file-input" class="hidden" bind:this={image} on:change={(e) => onFileSelect(e)} />
    <TextField class="bg-white-900 dark:bg-dark-500 my-2" label="diary title" bind:value={title} row="1" outlined />
    <p class="m-5">today's feeling is {rate} point.</p>
    <Slider class="mb-5" min="1" max="10" bind:value={rate} />
    <TextField class="bg-white-900 dark:bg-dark-500" label="diary content" bind:value={body} textarea row="5" outlined />
    <Button type="submit" classes="text-white-900 dark:bg-dark-500 p-2" >update diary</Button>
  </form>
  <Button class="bg-alert-900 dark:bg-alert-500 dark-hover:bg-dark-700 text-white-900 mb-9" on:click={deleteHandle} >delete diary</Button>
{/await}