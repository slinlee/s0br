<script>
  import { ethers } from "ethers";
  import AddTokenButton from "./AddTokenButton.svelte";
  let account;
  let connectWalletError;
  let walletConnected = false;
  let balance;
  let network;

  const tokenAddress = "0xbd18ec69715668C942Ad9E87Ed42081bB27b67B0";
  export let tokenContract;

  async function connectWallet() {
    walletConnected = false;
    const { ethereum } = window;
    await ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accountList) => {
        const [firstAccount] = accountList;
        account = firstAccount;
        walletConnected = true;
        getBalance();

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

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        tokenAddress,
        tokenContract.abi,
        signer
      );
      const bal = await contract.balanceOf(account);
      balance = ethers.utils.formatEther(bal);
    }
  }

  async function getNetwork() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    network = await provider.getNetwork();
    network = network.name;
  }
</script>

<div class="col-span-12 place-self-end p-8" data-test="wallet-info">
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
