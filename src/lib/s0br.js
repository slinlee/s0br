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
} from "$lib/stores.js";

const gameAddress = "0x28D4aAc8Dc916bAd9778313df9334334A7e04A6A";
const tokenAddress = "0x139159c21171aB09c46A027503aFD6b91E3A0851";
const networkChainId = 137; // Polygon Mainnet
const networkMetadata = {
  chainId: utils.hexValue(networkChainId),
  chainName: "Polygon Mainnet",
  rpcUrls: ["https://polygon-rpc.com"],
};
let provider, signer, gameContract, tokenContract;

if (browser && typeof window.ethereum !== "undefined" && !provider) {
  provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
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

    // Get network
    let net = await provider.getNetwork();
    if (net.chainId !== networkChainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: networkMetadata.chainId }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [networkMetadata],
            });
          } catch (addError) {
            // handle "add" error
            console.log(addError);
          }
        }
      }
    }
    network.set(net.name);

    if (!gameContract || !tokenContract) {
      signer = provider.getSigner();
      gameContract = new ethers.Contract(gameAddress, S0brGame.abi, signer);
      tokenContract = new ethers.Contract(tokenAddress, S0brToken.abi, signer);
    }
    walletConnected.set(true);

    // Get balance
    let bal = await tokenContract.balanceOf(firstAccount);
    balance.set(ethers.utils.formatEther(bal));

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

    commitments.set(cleanedData);
  }
}
