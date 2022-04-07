// scripts/upgrade_game.js

const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
  const game = await ethers.getContractFactory("S0brGame");
  console.log("Upgrading game...");
  await upgrades.upgradeProxy(process.env.MUMBAI_GAME_ADDRESS, game);
  console.log("Game upgraded");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
