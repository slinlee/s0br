const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
  const timeout = 1440;
  const faucetDripBase = 1;
  const faucetDripDecimal = 18;

  const Game = await ethers.getContractFactory("S0brGame");
  console.log("Deploying Game...");
  const game = await upgrades.deployProxy(Game, [
    process.env.MUMBAI_TOKEN_ADDRESS,
    faucetDripBase,
    faucetDripDecimal,
    timeout,
  ]); // TODO check this line
  await game.deployed();
  console.log("Game deployed to: ", game.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
