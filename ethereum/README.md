# Contracts

This is where the magic happens.

### Stack:

- Hardhat - dev and deployment
- Solidity
- Ethers - javascript interface to chain
- Waffle - testing
- OpenZeppelin (for token standards and upgradable contracts)

Targetted at Polygon.

To deploy (working this out):

Using the `scripts/deploy*.js` scripts. Fill in the `.env` example with your api tokens and addresses. Remember to not check them into git.

- deploy ERC20 token
- deploy ERC721 token <- this is the one users need to own to be able to 'play the game'
- Deploy the S0brGame, filling in the constructor with the addresses generated above.
