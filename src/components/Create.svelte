<script>
  import { onDestroy } from "svelte";
  import { Slider, TextField, Button } from "smelte";
  import { userId } from '../store';
  import { postDiary } from '../helpers/api';
 
  let uid = null;
  const unsubscribe = userId.subscribe( id => uid=id );
  console.log('uid' + uid);

  let rate = 1;
  let title, body = '';
  let image, preview = '';

  const submit = async() => {
    if(title.length == 0) {
      alert('pls fill in title.');
      return false;
    }

    if(body.length < 10){
      alert('pls write diary content more than 10 letters.');
      return false;
    }
    console.log('submit');
    console.log(uid, rate, body, image);
    console.log('image.name:', image.name);
    // post to firestore
    const result = await postDiary(uid, title, body, rate, image);
    if(!result){
      alert('failed to add diary');
    } else {
      alert('saved diary');
      document.location.href = '/';
    }
  }

  const onFileSelect = (e) => {
      let target = e.target.files[0];
      image = target;
      let reader = new FileReader();
      reader.readAsDataURL(target);
      reader.onload = e => {
        preview = e.target.result;
      };
    }

  onDestroy(() => unsubscribe);

</script>

<h3>Make your diary</h3>
<p>Create</p>
<form class="p-5" on:submit|preventDefault={submit}>
  <!-- <p for="title" class="bg-primary-900 text-white-900 dark:bg-dark-900 w-4/12 mb-2" >diary title</p>
  <input type="text" id="title" class="bg-primary-900 text-white-900 dark:bg-dark-900 w-8/12 mb-5" bind:value={title} /> -->
  <TextField class="bg-white-900 dark:bg-dark-500 mb-2" label="diary title" bind:value={title} row="1" outlined />
  <p class="mb-5">today's feeling is {rate} point.</p>
  <Slider class="mb-5" min="1" max="10" bind:value={rate} />
  <TextField class="bg-white-900 dark:bg-dark-500" label="diary content" bind:value={body} textarea row="5" outlined />
  {#if preview}
    <img src={preview} alt="preview" class="mb-6" />
  {/if}
  <label for="file-input" class="bg-primary-900 text-white-900 dark:bg-dark-900 px-4 py-2 rounded mb-6 w-4/12 m-auto" >select image</label>
  <input type="file" accept="image/*" id="file-input" class="hidden" bind:this={image} on:change={(e) => onFileSelect(e)} />
  <Button type="submit" class="text-white-900 p-2 dark:bg-dark-500" >save diary</Button>
</form>