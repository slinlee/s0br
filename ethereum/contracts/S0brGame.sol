// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0 <=0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol"; // debugging

contract S0brGame is Ownable {
    // TODO - add function to get number of commitments(saved days)
    // TODO - add setters

    // address private ERC20TokenAddress; //Address of the ERC20 Token we're distributing
    IERC20 private token;
    address private requiredNFTAddress; // Address of the ERC721 Token required
    uint256 private faucetDripAmount; //Amount to be sent
    uint256 private timeout; //Timeout in minutes
    mapping(address => uint256[]) commitments; //Time of last faucet drip per address

    event sentTokens(address indexed _user, uint256 _timestamp);
    event commitedDay(address indexed _user, uint256 _timestamp);

    constructor(
        IERC20 _token,
        uint256 _faucetDripBase,
        uint256 _faucetDripDecimal,
        uint256 _timeout
    ) {
        // TODO - add in NFT address as param and save here
        token = _token;
        faucetDripAmount = _faucetDripBase * (10**_faucetDripDecimal); // Native token
        timeout = _timeout; //Timeout in minutes
    }

    // function getERC20TokenAddress() external view returns (address) {
    //     return ERC20TokenAddress;
    // }

    function getRequiredNFTAddress() external view returns (address) {
        return requiredNFTAddress;
    }

    function getFaucetDripAmount() external view returns (uint256) {
        return faucetDripAmount;
    }

    function getTimeout() external view returns (uint256) {
        return timeout;
    }

    function getAddressCommitments(address _user)
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
        return true; // debug
        ERC721 instance = ERC721(requiredNFTAddress);
        if (instance.balanceOf(_user) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    function faucet(address payable _to) external {
        require(
            address(this).balance >= faucetDripAmount,
            "Insufficient Faucet Funds"
        );

        // console.log("commitments ", commitments[_to][commitments[_to].length - 1]); // debug
        // require(commitments[_to]commitments[_to].length - 1] <= block.timestamp - (timeout * 1 minutes), "Too Early for Another Faucet Drop");

        // require(hasRequiredNFT(_to), "You do not have the required NFT Token");
        commitments[_to].push(block.timestamp);
        token.transfer(_to, faucetDripAmount);
        emit commitedDay(_to, block.timestamp);
    }

    function getBalance() external view returns (uint256) {
        // TODO - change this to show the ERC20 balance
        return address(this).balance;
    }

    fallback() external payable {}

    receive() external payable {}
}
