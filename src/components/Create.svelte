<script>
  import { onDestroy } from "svelte";
  import { Slider, TextField, Button } from "smelte";
  import { userId } from '../store';
  import { postDiary } from '../helpers/api';
 
  let uid = null;
  const unsubscribe = userId.subscribe( id => uid=id );
  console.log('uid' + uid);

  let rate = 1;
  let body = '';
  let image, preview = '';

  const submit = async() => {
    if(body.length < 10){
      alert('pls write diary content more than 10 letters.');
      return false;
    }
    console.log('submit');
    console.log(uid, rate, body);
    // post to firestore
    const result = await postDiary(uid, body, rate, image);
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
  <p class="mb-5">today's feeling is {rate} point.</p>
  <Slider class="mb-5" min="1" max="10" bind:value={rate} />
  <TextField class="bg-white-900" label="diary content" bind:value={body} textarea row="5" outlined />
  {#if preview}
    <img src={preview} alt="preview" class="mb-6" />
  {/if}
  <label for="file-input" class="bg-primary-900 text-white-900 px-4 py-2 rounded mb-6 w-4/12 m-auto" >select image</label>
  <input type="file" accept="image/*" id="file-input" class="hidden" bind:this={image} on:change={(e) => onFileSelect(e)} />
  <Button type="submit" class="text-white-900 p-2" >save diary</Button>
</form>