// import { gql } from "graphql-tag";

import { gql } from "@/__generated__";

export const GET_SHOE = gql(`
query GetShoe($id: String!) {
  shoe(id: $id) {
    id
    name
    msrp
    images
    description
    colorway
    releaseDate
    style
  }
}
`);
export const SET_SHOE = gql(`
  mutation SetShoe($shoe: ShoeInput!) {
    setShoe(shoe: $shoe) {
      style
    }
  }
  `);
export const GET_TOKEN = gql(`
  query Token($id: Int!) {
  token(id: $id) {
    id
    metadata {
      description
      image
      name
    }
    uri
  }
}
    `)

export const SET_TOKEN_METADATA = gql(`
  mutation SetShoeTokenMetadata($id: Int!, $metadata: ShoeTokenMetadataInput!) {
  setShoeTokenMetadata(id: $id, metadata: $metadata){
    name
  }
}
`)

export const GET_PAIRED_TOKENS = gql(`
query Pairs {
  pairs {
    shoeID {
      id
    }
    tokenID {
      id
    }
  }
}  
`)

// why save ?? set ???
export const SAVE_PAIR = gql(`
  mutation SaveShoeTokenPair($shoeId: Int!, $tokenId: Int!) {
  saveShoeTokenPair(shoeID: $shoeId, tokenID: $tokenId) {
    shoeID {
      id
    }
    tokenID {
      id
    }
  }
}
  `)