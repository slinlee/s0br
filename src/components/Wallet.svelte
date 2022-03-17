<script>
  import { ethers } from "ethers";
  import AddTokenButton from "./AddTokenButton.svelte";
  let account;
  let connectWalletError;
  let walletConnected = false;
  let balance;
  let network;

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
        getBalance(account);
        getNetwork();
        console.log("wallet connected");
        console.log(account);
      })
      .catch((error) => {
        walletConnected = false;
        connectWalletError = error;
        console.log("error connecting wallet");
      });
  }

  async function getBalance(account) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const bal = await provider.getBalance(account);

    balance = ethers.utils.formatEther(bal);
  }

  async function getNetwork() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    network = await provider.getNetwork();
    network = network.name;
  }
</script>

<div class="place-self-end p-8" data-test="wallet-info">
  {#if walletConnected}
    <div>
      Connected Account: {account}
    </div>
    <div>Balance: {balance}</div>
    <div>Network: {network}</div>
    <AddTokenButton />
  {:else}
    <button class="button buttonMetaMask" on:click={connectWallet}>
      Connect MetaMask
    </button>
  {/if}
</div>
