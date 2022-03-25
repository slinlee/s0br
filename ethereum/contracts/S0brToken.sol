// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 <=0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract S0brToken is ERC20, ERC20Burnable {
    uint256 constant _initial_supply = 10_000_000 * (10**18);

    constructor() ERC20("S0brToken", "S0BR") {
        _mint(msg.sender, _initial_supply);
    }
}
