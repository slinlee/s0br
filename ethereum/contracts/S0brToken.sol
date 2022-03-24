// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract S0brToken is ERC20 {

    uint constant _initial_supply = 10_000_000 * (10**18);

    constructor() ERC20("S0brToken", "S0BR") {
        _mint(msg.sender, _initial_supply);
    }
}
