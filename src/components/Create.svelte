<script>
  import { Slider, TextField, Button } from "smelte";

  let rate = 0;
  let body = '';

</script>

<h3>Make your diary</h3>
<p>Create</p>
<form class="p-5">
  <p class="mb-5">today's feeling is {rate} point.</p>
  <Slider class="mb-5" min="0" max="10" bind:value={rate} />
  <TextField class="bg-white-900" label="diary content" bind:value={body} textarea row="5" outlined />
  <Button classes="text-white-900 p-2" >save diary</Button>
</form>