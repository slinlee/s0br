// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0 <=0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "hardhat/console.sol"; // debugging

contract S0brGame is OwnableUpgradeable {
    // TODO - add function to get number of commitments(saved days)
    // TODO - add setters

    IERC20 private token;
    address private requiredNFTAddress; // Address of the ERC721 Token required
    uint256 private faucetDripAmount; //Amount to be sent
    uint256 private timeout; //Timeout in minutes
    mapping(address => uint256[]) commitments; //Time of last faucet drip per address

    event sentTokens(address indexed _user, uint256 _timestamp);
    event madeCommitment(address indexed _user, uint256 _timestamp);

    function initialize(
        IERC20 _token,
        uint256 _faucetDripBase,
        uint256 _faucetDripDecimal,
        uint256 _timeout
    ) public initializer {
        OwnableUpgradeable.__Ownable_init();

        // TODO - add in NFT address as param and save here
        token = _token;
        faucetDripAmount = _faucetDripBase * (10**_faucetDripDecimal); // Native token
        timeout = _timeout; //Timeout in minutes
    }

    // constructor() initializer{}

    function getRequiredNFTAddress() external view returns (address) {
        return requiredNFTAddress;
    }

    function getFaucetDripAmount() external view returns (uint256) {
        return faucetDripAmount;
    }

    function getTimeout() external view returns (uint256) {
        return timeout;
    }

    function getCommitments(address _user)
        external
        view
        returns (uint256[] memory)
    {
        if (commitments[_user].length > 0) {
            return commitments[_user];
        } else {
            return new uint256[](0);
        }
    }

    // TODO - Add function for saving the recent timeout

    // TODO - Add function for checking if it's too soon for a new check-in

    function hasRequiredNFT(address _user) public view returns (bool) {
        // TODO - not used yet
        ERC721 instance = ERC721(requiredNFTAddress);
        if (instance.balanceOf(_user) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    function faucet(address payable _to) external {
        require(
            token.balanceOf(address(this)) >= faucetDripAmount,
            "Insufficient Faucet Funds"
        );

        // console.log("commitments ", commitments[_to][commitments[_to].length - 1]); // debug
        // require(commitments[_to]commitments[_to].length - 1] <= block.timestamp - (timeout * 1 minutes), "Too Early for Another Faucet Drop");

        // require(hasRequiredNFT(_to), "You do not have the required NFT Token");
        commitments[_to].push(block.timestamp);
        token.transfer(_to, faucetDripAmount);
        emit madeCommitment(_to, block.timestamp);
        emit sentTokens(_to, block.timestamp);
    }

    function getBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    fallback() external payable {}

    receive() external payable {}
}
