<script>
  import { errorMsg } from "$lib/stores.js";
  import { addToken } from "$lib/s0br";
</script>

<button
  on:click={addToken}
  data-test="add-token-btn"
  class="rounded 
    p-6 
    shadow-lg 
    hover:shadow-2xl 
    transition 
    duration-75
    bg-gray-300 
    active:shadow
    text-gray-800 
    font-bold 
    py-2 
    px-4 
    inline-flex 
    items-center"
>
  Add Token
</button>
