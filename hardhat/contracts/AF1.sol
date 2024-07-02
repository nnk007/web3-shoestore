// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AF1 {
    mapping(address=>uint256) private balances;
    mapping(uint256=>address) private tokens;
    mapping(uint256=>string) private uris;
    uint256 private _nextID;
    string public name = "AF1";
    address private owner;
    constructor(){
        owner = msg.sender;
    }
    modifier onlyOwner() {
        require(msg.sender==owner,"Not owner");
        _;
    }
    modifier positiveBalance(address _addr) {
        require(balances[_addr]>0,"No tokens in posession");
        _;
    }
    modifier ownerToken(address _owner,uint256 _tokenID) {
        require(tokens[_tokenID]==_owner,"Token not in posession");
        _;
    }
    function ownerOf(uint256 tokenID) public view returns(bool){
        return tokens[tokenID] == msg.sender;
    }
    function balanceOf(address _addr) public view returns(uint256){
        return balances[_addr];
    }
    function _transfer(address from,address to, uint256 tokenID) private positiveBalance(from) ownerToken(from,tokenID) returns(bool) {
        require(_nextID<tokenID,"Token not yet minted");
        balances[from]-=1;
        balances[to]+=1;
        tokens[tokenID]=to;
        return true;
    }
    function mint(string memory uri) public onlyOwner() {
        balances[owner]+=1;
        tokens[_nextID]=owner;
        uris[_nextID]=uri;
        _nextID++;
    }
    function transfer(uint256 tokenID,address to) public returns(bool){
        _transfer(msg.sender,to,tokenID);
        return true;
    }
    function totalSupply() public view returns(uint256) {
        return _nextID;
    }
    function tokenURI(uint256 tokenID) public view returns(string memory) {
        return uris[tokenID];
    }
    function tokensOf(address _owner) public view returns(string[] memory)  {
        uint256 ts = totalSupply();
        uint256 bal = balanceOf(_owner);
        string[] memory t = new string[](bal);
        uint256 j = 0;
        for(uint256 i=0; i < ts && i < bal; ++i){
            if(tokens[i]==_owner){
                t[j] = uris[i];
                ++j;
            }
        }
        return t;
    }
}
