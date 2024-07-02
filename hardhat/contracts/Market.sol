// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Market is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    // Mapping from token ID to their corresponding listing
    mapping(address => mapping(uint256 => Listing)) private listings;

    event TokenListed(address indexed nftAddress, uint256 indexed tokenId, address indexed seller, uint256 price);
    event TokenBought(address indexed nftAddress, uint256 indexed tokenId, address indexed buyer, uint256 price);

    function listToken(address nftAddress, uint256 tokenId, uint256 price) external nonReentrant {
        IERC721 nft = IERC721(nftAddress);
        require(nft.ownerOf(tokenId) == msg.sender, "You are not the owner of this token");
        require(nft.isApprovedForAll(msg.sender, address(this)), "Contract is not approved to transfer this token");

        listings[nftAddress][tokenId] = Listing(msg.sender, price);

        emit TokenListed(nftAddress, tokenId, msg.sender, price);
    }

    function buyToken(address nftAddress, uint256 tokenId) external payable nonReentrant {
        Listing memory listing = listings[nftAddress][tokenId];
        require(listing.price > 0, "Token not listed for sale");
        require(msg.value >= listing.price, "Insufficient payment");

        delete listings[nftAddress][tokenId];

        IERC721(nftAddress).safeTransferFrom(listing.seller, msg.sender, tokenId);
        payable(listing.seller).transfer(listing.price);

        emit TokenBought(nftAddress, tokenId, msg.sender, listing.price);
    }

    function getListing(address nftAddress, uint256 tokenId) external view returns (Listing memory) {
        return listings[nftAddress][tokenId];
    }
}
