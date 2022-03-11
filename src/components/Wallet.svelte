<script>
  import { ethers } from "ethers";
  let account;
  let connectWalletError;
  let walletConnected = false;
  async function connectWallet() {
    walletConnected = false;
    const { ethereum } = window;
    console.log("ethereum: ", ethereum);
    console.log("Connecting wallet");
    await ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accountList) => {
        const [firstAccount] = accountList;
        account = firstAccount;
        walletConnected = true;
        console.log("wallet connected");
        console.log(account);
      })
      .catch((error) => {
        walletConnected = false;
        connectWalletError = error;
        console.log("error connecting wallet");
      });
  }
</script>

<div class="fixed top-0 right-0 border-1 p-8" data-test="wallet-info">
  {#if walletConnected}
    <div>
      <span class="dotConnected" />
      Connected Account: {account}
    </div>
  {:else}
    <button class="button buttonMetaMask" on:click={connectWallet}>
      Connect MetaMask
    </button>
  {/if}
</div>
