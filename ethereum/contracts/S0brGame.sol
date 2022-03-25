// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0 <=0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol"; // debugging

contract S0brGame is Ownable {
    // TODO - add function to get number of timeouts (saved days)
    // TODO - add setters
    // TODO - rename timeouts?

    address private ERC20TokenAddress; //Address of the ERC20 Token we're distributing
    address private requiredNFTAddress; // Address of the ERC721 Token required
    uint256 private faucetDripAmount; //Amount to be sent
    uint256 private timeout; //Timeout in minutes
    uint256 private ERC20TokenMinimum; //Minimum amount of tokens needs to be considered for this faucet // TODO - del me
    mapping(address => uint256[]) timeouts; //Time of last faucet drip per address

    event sentTokens(address indexed _user, uint256 _timestamp);
    event commitedDay(address indexed _user, uint256 _timestamp);

    constructor(
        address _ERC20TokenAddress,
        uint256 _faucetDripBase,
        uint256 _faucetDripDecimal,
        uint256 _ERC20TokenMinimum,
        uint256 _timeout
    ) {
        // TODO - add in NFT address as param and save here
        ERC20TokenAddress = _ERC20TokenAddress;
        faucetDripAmount = _faucetDripBase * (10**_faucetDripDecimal); //Ether (or Native Token)
        ERC20TokenMinimum = _ERC20TokenMinimum * (10**18); //300 ERC20 Tokens, assumes 18 decimals
        timeout = _timeout; //Timeout in minutes
    }

    function getERC20TokenAddress() external view returns (address) {
        return ERC20TokenAddress;
    }

    function getRequiredNFTAddress() external view returns (address) {
        return requiredNFTAddress;
    }

    function getFaucetDripAmount() external view returns (uint256) {
        return faucetDripAmount;
    }

    function getTimeout() external view returns (uint256) {
        return timeout;
    }

    // function getERC20TokenMinimum() external view returns(uint) {
    //     // TODO - del me
    //     return ERC20TokenMinimum;
    // }

    function getAddressTimeout(address _user)
        external
        view
        returns (uint256[] memory)
    {
        if (timeouts[_user].length > 0) {
            return timeouts[_user];
        } else {
            return new uint256[](0);
        }
    }

    // TODO - Add function for saving the recent timeout

    // TODO - Add function for checking if it's too soon for a new check-in

    // function hasERC20Token(address _user) public view returns(bool) {
    //     // TODO - how do we do this for nft?
    //     ERC20 instance = ERC20(ERC20TokenAddress);
    //     if( instance.balanceOf(_user) >= ERC20TokenMinimum ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    function hasRequiredNFT(address _user) public view returns (bool) {
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

        // console.log("timeouts ", timeouts[_to][timeouts[_to].length - 1]); // debug
        // require(timeouts[_to][timeouts[_to].length - 1] <= block.timestamp - (timeout * 1 minutes), "Too Early for Another Faucet Drop");

        // require(hasERC20Token(_to), "You Do Not Have Enough ERC20 tokens");
        require(hasRequiredNFT(_to), "You do not have the required NFT Token");
        timeouts[_to].push(block.timestamp);
        (bool sent, ) = _to.call{value: faucetDripAmount}(""); // TODO - look at this. Make this send erc20 token instead of MATIC
        require(sent, "Failed to send token");
        emit commitedDay(_to, block.timestamp);
    }

    function getBalance() external view returns (uint256) {
        // TODO - change this to show the ERC20 balance
        return address(this).balance;
    }

    fallback() external payable {}

    receive() external payable {}
}
