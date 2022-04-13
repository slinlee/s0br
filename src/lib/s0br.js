import { toDate } from "date-fns";
import { browser } from "$app/env";
import { ethers } from "ethers";

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

export async function getData() {
  if (browser && typeof window.ethereum !== "undefined") {
    const [firstAccount] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    account.set(firstAccount);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(gameAddress, S0brGame.abi, signer);
    const tokenContract = new ethers.Contract(
      tokenAddress,
      S0brToken.abi,
      signer
    );
    walletConnected.set(true);

    // Get balance
    let bal = await tokenContract.balanceOf(firstAccount);
    balance.set(ethers.utils.formatEther(bal));

    // Get network
    let net = await provider.getNetwork();
    network.set(net.name);

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
  } else {
    // Show user 'Connect to Metamask'
  }
}
