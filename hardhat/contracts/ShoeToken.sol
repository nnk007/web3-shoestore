// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Burnable} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import {ERC1155URIStorage} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
contract ShoeToken is ERC1155("http://localhost:3000/api/shoe/{id}.json"), ERC1155Burnable, ERC1155URIStorage {
    address private owner;
    uint256 private nextId;
    constructor(string memory _baseURI){
        owner = msg.sender;
        nextId = 0x0;
        _setURI(_baseURI);
    }
    modifier onlyOwner {
        require(msg.sender == owner, "Not owner");
        _;
    }
    function uri(uint256 tokenId) public override(ERC1155,ERC1155URIStorage) view returns(string memory) {
        return super.uri(tokenId);
    }
    function updateTokenURI(uint256 tokenId,string memory newURI) public onlyOwner() {
        return _setURI(tokenId, newURI);
    }
    function createCoupon(uint256 id, uint256 amnt) public onlyOwner() {
        _mint(owner,id,amnt,"");
    }
    function mintCoupon(uint256 id, uint256 amnt) public onlyOwner() {
        _mint(owner, id, amnt, "");
    }
    modifier hasToken(uint256 id) {
        require(balanceOf(msg.sender, id)>0,"No such token in possession");
        _;
    }
    function burnCoupon(uint256 id) public hasToken(id) {
        _burn(msg.sender, id, 1);
    }
    function burnCoupon(address from,uint256 id,uint256 amnt) public onlyOwner(){
        _burn(from,id,amnt);        
    }
}
