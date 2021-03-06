const { expect } = require("chai");
const { network } = require("hardhat");
require("dotenv").config();

describe("S0BR Game Test", function () {
  let Token;
  let s0brToken;
  let Faucet;
  let faucet;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let faucetDripBase;
  let faucetDripDecimal;
  let timeout;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("S0brToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    s0brToken = await Token.deploy();

    faucetDripBase = 1;
    faucetDripDecimal = 18;
    timeout = 60;

    Faucet = await ethers.getContractFactory("S0brGame");
    faucet = await upgrades.deployProxy(Faucet, [
      s0brToken.address,
      faucetDripBase,
      faucetDripDecimal,
      timeout,
    ]);
  });

  describe("Faucet Supply", function () {
    beforeEach(async function () {
      // Send 2 s0brToken to the faucet to prime it
      const transactionHash = await s0brToken.transfer(
        faucet.address,
        ethers.utils.parseEther("2")
      );
    });

    it("Should have 2 erc20 tokens", async function () {
      const initialBalance = await faucet.getBalance();
      expect(initialBalance).to.equal(ethers.utils.parseEther("2"));
    });

    it("Should increase if another person sends tokens", async function () {
      const initialBalance = await faucet.getBalance();
      await s0brToken.transfer(addr1.address, ethers.utils.parseEther("50"));

      const tx = await s0brToken
        .connect(addr1)
        .transfer(faucet.address, ethers.utils.parseEther("1.0"));

      const newBalance = await faucet.getBalance();
      expect(newBalance).to.equal(
        initialBalance.add(ethers.utils.parseEther("1.0"))
      );
    });
  });

  describe("Faucet", function () {
    // TODO - check if user has requiredNFT

    // it("Should return the accurate tokenAddress", async function () {
    //   const currenERC20TokenAddress = await faucet.getERC20TokenAddress();
    //   const deployedERC20TokenAddress = await s0brToken.address;
    //   expect(currenERC20TokenAddress).to.equal(deployedERC20TokenAddress);
    // });

    it("Should return the accurate Faucet Drip Amount", async function () {
      const currentFaucetDripAmount = await faucet.getFaucetDripAmount();
      const varFaucetDripAmount = faucetDripBase * 10 ** faucetDripDecimal;

      expect(String(currentFaucetDripAmount)).to.equal(
        String(varFaucetDripAmount)
      );
    });

    it("Should return the accurate Timeout", async function () {
      const currentTimeout = await faucet.getTimeout();
      expect(currentTimeout).to.equal(timeout);
    });

    it("Should not send funds if there are no tokens to give", async function () {
      await expect(faucet.faucet(addr1.address)).to.be.revertedWith(
        "Insufficient Faucet Funds"
      );

      await s0brToken.transfer(faucet.address, ethers.utils.parseEther("0.5"));

      await expect(faucet.faucet(addr1.address)).to.be.revertedWith(
        "Insufficient Faucet Funds"
      );

      await s0brToken.transfer(faucet.address, ethers.utils.parseEther("0.5"));

      await faucet.faucet(addr1.address); // Success
    });

    it("Should Send 1 Token to Person Who Asks", async function () {
      // Send 100 tokens to the faucet to prime it
      await s0brToken.transfer(faucet.address, ethers.utils.parseEther("100"));
      const currentFaucetDripAmount = await faucet.getFaucetDripAmount();

      const addr1InitialBalance = await s0brToken.balanceOf(addr1.address);

      await faucet.faucet(addr1.address);

      const addr1NewBalance = await s0brToken.balanceOf(addr1.address);

      expect(addr1NewBalance).to.equal(
        addr1InitialBalance.add(currentFaucetDripAmount)
      );
    });

    it("Should Not Send Ether the same day, but should the next day", async function () {
      // IMPT - this assumes PST timezone
      // Send 100 tokens to the faucet to prime it
      await s0brToken.transfer(faucet.address, ethers.utils.parseEther("100"));

      // Check in at 7 am, then next day at 10 am <- pass
      // 7 am
      await network.provider.send("evm_setNextBlockTimestamp", [1964959200]);
      await faucet.faucet(addr1.address); //Success

      // 7 pm
      await network.provider.send("evm_setNextBlockTimestamp", [1965002400]);
      await expect(faucet.faucet(addr1.address)).to.be.revertedWith(
        "Too early to commit again"
      ); //Failure

      // 10 am next day
      await network.provider.send("evm_setNextBlockTimestamp", [1965056400]);
      await faucet.faucet(addr1.address); //Success

      // 8 am next next day
      await network.provider.send("evm_setNextBlockTimestamp", [1965135600]);
      await faucet.faucet(addr1.address); //Success
    });

    // TODO - convert this to test if user has NFT
    // it("Should not send tokens if there is insufficient ERC20 tokens", async function () {
    //   // Send 100 tokens to the faucet to prime it
    //   await s0brToken.transfer(faucet.address, ethers.utils.parseEther("100"));

    //   await expect(faucet.faucet(addr2.address)).to.be.revertedWith(
    //     "You Do Not Have Enough ERC20 tokens"
    //   ); //Fail

    //   const transactionHashToken0 = await s0brToken.transfer(
    //     addr2.address,
    //     ethers.utils.parseEther("100")
    //   );

    //   await expect(faucet.faucet(addr2.address)).to.be.revertedWith(
    //     "You Do Not Have Enough ERC20 tokens"
    //   ); //Fail

    //   const transactionHashToken1 = await s0brToken.transfer(
    //     addr2.address,
    //     ethers.utils.parseEther("200")
    //   );

    //   await faucet.faucet(addr2.address); //Success
    // });

    it("Should check if the timeout is present after a faucet call is made", async function () {
      // TODO - convert how timeout is saved

      // Send 100 tokens to the faucet to prime it
      await s0brToken.transfer(faucet.address, ethers.utils.parseEther("100"));

      const preFaucetTimeout = await faucet.getCommitments(addr1.address);

      await faucet.faucet(addr1.address);

      const postFaucetTimeout = await faucet.getCommitments(addr1.address);

      // expect(preFaucetTimeout).to.be.below(postFaucetTimeout);
      // TODO - also check the value is later
      expect(preFaucetTimeout.length).to.be.equal(postFaucetTimeout.length - 1);
    });

    it("Should emit an event once a transfer is made", async function () {
      // Send 100 tokens to the faucet to prime it
      await s0brToken.transfer(faucet.address, ethers.utils.parseEther("100"));

      async function getCurrentBlockTimestamp() {
        const currentBlockNumber = await ethers.provider.getBlockNumber();
        const currentBlockData = await ethers.provider.getBlock(
          currentBlockNumber
        );
        return currentBlockData.timestamp;
      }

      expect(await faucet.faucet(addr1.address))
        .to.emit(faucet, "madeCommitment")
        .withArgs(addr1.address, await getCurrentBlockTimestamp());
    });
  });
});
