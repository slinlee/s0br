<script>
  async function addToken() {
    // Placeholder token from the example
    const tokenAddress = "0xd00981105e61274c8a5cd5a88fe7e037d935b513";
    const tokenSymbol = "TUT";
    const tokenDecimals = 18;
    const tokenImage = "http://placekitten.com/200/300";
    const { ethereum } = window;
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  }
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
