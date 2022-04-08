// scripts/upgrade_game.js

const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
  const S0brGame = await ethers.getContractFactory("S0brGame");
  console.log("Upgrading game...");
  await upgrades.upgradeProxy(
    "0xD4Cc23e2fBE876ef5122bA97a4e8840D92CA3a81",
    S0brGame
  );
  console.log("Game upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
