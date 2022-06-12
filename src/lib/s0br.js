import { toDate } from "date-fns";
import { browser } from "$app/env";
import { ethers, utils } from "ethers";

import S0brToken from "../routes/contracts/S0brToken.sol/S0brToken.json";
import S0brGame from "../routes/contracts/S0brGame.sol/S0brGame.json";
import {
  balance,
  walletConnected,
  account,
  network,
  commitments,
  errorMsg,
  maticBalance,
} from "$lib/stores.js";

const mvpUserAddress = "0x475b95dbb79b6109e405499de90e5515f1ac9c71";

const gameAddress = "0x28D4aAc8Dc916bAd9778313df9334334A7e04A6A";
const tokenAddress = "0x139159c21171aB09c46A027503aFD6b91E3A0851";
const networkChainId = 137; // Polygon Mainnet
const networkMetadata = {
  chainId: utils.hexValue(networkChainId),
  chainName: "Polygon Mainnet",
  rpcUrls: ["https://polygon-rpc.com"],
};
let provider, signer, gameContract, tokenContract;

if (browser && typeof window.ethereum === "undefined") {
  errorMsg.set("Install Metamask to use S0BR");
}

if (browser && typeof window.ethereum !== "undefined" && !provider) {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
      errorMsg.set("Network changed. Reloading");
      window.location.reload();
    }
  });

  window.ethereum.on("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
      errorMsg.set("Please connect to MetaMask.");
    } else {
      console.log("Account changed. Reloading.");
      errorMsg.set("Account changed. Reloading.");
      window.location.reload();
    }
  });
}

export async function getData() {
  if (browser && typeof window.ethereum !== "undefined") {
    // Get account
    const [firstAccount] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    account.set(firstAccount);

    walletConnected.set(true);

    // Get network
    let net = await provider.getNetwork();
    if (net.chainId !== networkChainId) {
      errorMsg.set("Connect your Metamask to the Polygon Mainnet Network");
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkMetadata.chainId }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          errorMsg.set("Add Polygon Mainnet Network to your Metamask.");
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [networkMetadata],
            });
          } catch (addError) {
            // handle "add" error
            errorMsg.set(
              `There was an error adding Polygon Mainnet: "${addError}"`
            );
            console.log(addError);
          }
        }
      }
      return;
    }
    network.set(net.name);

    if (!gameContract || !tokenContract) {
      signer = provider.getSigner();
      gameContract = new ethers.Contract(gameAddress, S0brGame.abi, signer);
      tokenContract = new ethers.Contract(tokenAddress, S0brToken.abi, signer);

      // listen for 'faucet' events
      let filter = gameContract.filters.madeCommitment(firstAccount);
      gameContract.on(filter, () => {
        console.log("User made commitment"); // debug
        getData();
      });
    }

    // Get s0br token balance
    let bal = await tokenContract.balanceOf(firstAccount);
    balance.set(ethers.utils.formatEther(bal));

    // Get matic balance
    let maticBal = await provider.getBalance(firstAccount);
    maticBalance.set(ethers.utils.formatEther(maticBal));
    if (maticBal == 0) {
      errorMsg.set("You'll need to get some MATIC to use this app.");
    }

    // Get calendar data

    let data = [];
    let cleanedData = [];

    data = await gameContract.getCommitments(firstAccount);
    data.forEach((item) => {
      cleanedData = [
        ...cleanedData,
        { date: toDate(item.toNumber() * 1000), value: 1 },
      ];
    });

    if (firstAccount === mvpUserAddress) {
      // Manually add successes to the UI to test out the feature
      const unsuccesses = [
        { date: "2022, 4, 8", value: -0.8 },
        { date: "2022, 5, 2", value: -0.8 },
        { date: "2022, 5, 3", value: -0.8 },
        { date: "2022, 5, 17", value: -0.8 },
        { date: "2022, 5, 28", value: -0.8 },
        { date: "2022, 6, 9", value: -0.8 },
        { date: "2022, 6, 11", value: -0.8 },
      ];
      cleanedData = [...cleanedData, ...unsuccesses];
    }

    commitments.set(cleanedData);
  }
}

export async function addToken() {
  const tokenAddress = "0x139159c21171aB09c46A027503aFD6b91E3A0851";
  const tokenSymbol = "S0BR";
  const tokenDecimals = 18;
  const tokenImage = "https://s0br.today/s0brtoken.png";
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
  } catch (error) {
    errorMsg.set(`Error adding S0BR Token to Metamask: "${error}"`);
    console.log(error);
  }
}
