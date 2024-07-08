/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery GetShoe($id: String!) {\n  shoe(id: $id) {\n    id\n    name\n    msrp\n    images\n    description\n    colorway\n    releaseDate\n    style\n  }\n}\n": types.GetShoeDocument,
    "\n  mutation SetShoe($shoe: ShoeInput!) {\n    setShoe(shoe: $shoe) {\n      style\n    }\n  }\n  ": types.SetShoeDocument,
    "\n  query Token($id: Int!) {\n  token(id: $id) {\n    id\n    metadata {\n      description\n      image\n      name\n    }\n    uri\n  }\n}\n    ": types.TokenDocument,
    "\n  mutation SetShoeTokenMetadata($id: Int!, $metadata: ShoeTokenMetadataInput!) {\n  setShoeTokenMetadata(id: $id, metadata: $metadata){\n    name\n  }\n}\n": types.SetShoeTokenMetadataDocument,
    "\nquery Pairs {\n  pairs {\n    shoeID {\n      id\n    }\n    tokenID {\n      id\n    }\n  }\n}  \n": types.PairsDocument,
    "\n  mutation SaveShoeTokenPair($shoeId: Int!, $tokenId: Int!) {\n  saveShoeTokenPair(shoeID: $shoeId, tokenID: $tokenId) {\n    shoeID {\n      id\n    }\n    tokenID {\n      id\n    }\n  }\n}\n  ": types.SaveShoeTokenPairDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetShoe($id: String!) {\n  shoe(id: $id) {\n    id\n    name\n    msrp\n    images\n    description\n    colorway\n    releaseDate\n    style\n  }\n}\n"): (typeof documents)["\nquery GetShoe($id: String!) {\n  shoe(id: $id) {\n    id\n    name\n    msrp\n    images\n    description\n    colorway\n    releaseDate\n    style\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SetShoe($shoe: ShoeInput!) {\n    setShoe(shoe: $shoe) {\n      style\n    }\n  }\n  "): (typeof documents)["\n  mutation SetShoe($shoe: ShoeInput!) {\n    setShoe(shoe: $shoe) {\n      style\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Token($id: Int!) {\n  token(id: $id) {\n    id\n    metadata {\n      description\n      image\n      name\n    }\n    uri\n  }\n}\n    "): (typeof documents)["\n  query Token($id: Int!) {\n  token(id: $id) {\n    id\n    metadata {\n      description\n      image\n      name\n    }\n    uri\n  }\n}\n    "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SetShoeTokenMetadata($id: Int!, $metadata: ShoeTokenMetadataInput!) {\n  setShoeTokenMetadata(id: $id, metadata: $metadata){\n    name\n  }\n}\n"): (typeof documents)["\n  mutation SetShoeTokenMetadata($id: Int!, $metadata: ShoeTokenMetadataInput!) {\n  setShoeTokenMetadata(id: $id, metadata: $metadata){\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Pairs {\n  pairs {\n    shoeID {\n      id\n    }\n    tokenID {\n      id\n    }\n  }\n}  \n"): (typeof documents)["\nquery Pairs {\n  pairs {\n    shoeID {\n      id\n    }\n    tokenID {\n      id\n    }\n  }\n}  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SaveShoeTokenPair($shoeId: Int!, $tokenId: Int!) {\n  saveShoeTokenPair(shoeID: $shoeId, tokenID: $tokenId) {\n    shoeID {\n      id\n    }\n    tokenID {\n      id\n    }\n  }\n}\n  "): (typeof documents)["\n  mutation SaveShoeTokenPair($shoeId: Int!, $tokenId: Int!) {\n  saveShoeTokenPair(shoeID: $shoeId, tokenID: $tokenId) {\n    shoeID {\n      id\n    }\n    tokenID {\n      id\n    }\n  }\n}\n  "];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;