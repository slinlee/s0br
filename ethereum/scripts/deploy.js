const { ethers, upgrades } = require("hardhat");

async function main() {
  const Game = await ethers.getContractFactory("S0brGame");
  console.log("Deploying Game...");
  const game = await upgrades.deployProxy(Game); // TODO check this line
  await game.deployed();
  console.log("Game deployed to: ", game.address);
}

main();
