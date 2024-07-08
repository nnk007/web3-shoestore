/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** RFC3339/ISO8601 Date format */
  ISO_DATE: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder?: Maybe<Order>;
  saveShoeTokenPair?: Maybe<ShoeTokenPair>;
  setShoe?: Maybe<Shoe>;
  setShoeTokenMetadata?: Maybe<ShoeTokenMetadata>;
};


export type MutationCreateOrderArgs = {
  shoeID: Scalars['String']['input'];
};


export type MutationSaveShoeTokenPairArgs = {
  shoeID: Scalars['Int']['input'];
  tokenID: Scalars['Int']['input'];
};


export type MutationSetShoeArgs = {
  shoe: ShoeInput;
};


export type MutationSetShoeTokenMetadataArgs = {
  id: Scalars['Int']['input'];
  metadata: ShoeTokenMetadataInput;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID']['output'];
  shoeID: Scalars['String']['output'];
  state: OrderStateEnum;
  tx: Scalars['String']['output'];
};

export enum OrderStateEnum {
  Dispatched = 'DISPATCHED',
  New = 'NEW',
  PaymentReceived = 'PAYMENT_RECEIVED',
  Processing = 'PROCESSING',
  Received = 'RECEIVED'
}

export type Query = {
  __typename?: 'Query';
  pairs: Array<ShoeTokenPair>;
  shoe?: Maybe<Shoe>;
  shoesByToken: Array<Scalars['Int']['output']>;
  token?: Maybe<ShoeToken>;
  tokensByShoe: Array<Scalars['Int']['output']>;
};


export type QueryShoeArgs = {
  id: Scalars['String']['input'];
};


export type QueryShoesByTokenArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTokenArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTokensByShoeArgs = {
  id: Scalars['Int']['input'];
};

export type Shoe = {
  __typename?: 'Shoe';
  colorway: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  msrp: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  releaseDate: Scalars['ISO_DATE']['output'];
  style: Scalars['String']['output'];
};

export type ShoeInput = {
  colorway: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  images: Array<Scalars['String']['input']>;
  msrp: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  releaseDate: Scalars['ISO_DATE']['input'];
  style: Scalars['String']['input'];
};

export type ShoeToken = Token & {
  __typename?: 'ShoeToken';
  id: Scalars['Int']['output'];
  metadata: ShoeTokenMetadata;
  uri: Scalars['String']['output'];
};

export type ShoeTokenMetadata = TokenMetadata & {
  __typename?: 'ShoeTokenMetadata';
  description: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  properties: Shoe;
};

export type ShoeTokenMetadataInput = {
  description: Scalars['String']['input'];
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ShoeTokenPair = {
  __typename?: 'ShoeTokenPair';
  shoeID: Shoe;
  tokenID: ShoeToken;
};

export type Token = {
  id: Scalars['Int']['output'];
  metadata?: Maybe<TokenMetadata>;
  uri: Scalars['String']['output'];
};

export type TokenMetadata = {
  description: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GetShoeQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetShoeQuery = { __typename?: 'Query', shoe?: { __typename?: 'Shoe', id: number, name: string, msrp: number, images: Array<string>, description: string, colorway: string, releaseDate: any, style: string } | null };

export type SetShoeMutationVariables = Exact<{
  shoe: ShoeInput;
}>;


export type SetShoeMutation = { __typename?: 'Mutation', setShoe?: { __typename?: 'Shoe', style: string } | null };

export type TokenQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type TokenQuery = { __typename?: 'Query', token?: { __typename?: 'ShoeToken', id: number, uri: string, metadata: { __typename?: 'ShoeTokenMetadata', description: string, image: string, name: string } } | null };

export type SetShoeTokenMetadataMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  metadata: ShoeTokenMetadataInput;
}>;


export type SetShoeTokenMetadataMutation = { __typename?: 'Mutation', setShoeTokenMetadata?: { __typename?: 'ShoeTokenMetadata', name: string } | null };

export type PairsQueryVariables = Exact<{ [key: string]: never; }>;


export type PairsQuery = { __typename?: 'Query', pairs: Array<{ __typename?: 'ShoeTokenPair', shoeID: { __typename?: 'Shoe', id: number }, tokenID: { __typename?: 'ShoeToken', id: number } }> };

export type SaveShoeTokenPairMutationVariables = Exact<{
  shoeId: Scalars['Int']['input'];
  tokenId: Scalars['Int']['input'];
}>;


export type SaveShoeTokenPairMutation = { __typename?: 'Mutation', saveShoeTokenPair?: { __typename?: 'ShoeTokenPair', shoeID: { __typename?: 'Shoe', id: number }, tokenID: { __typename?: 'ShoeToken', id: number } } | null };


export const GetShoeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShoe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shoe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"msrp"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"colorway"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"style"}}]}}]}}]} as unknown as DocumentNode<GetShoeQuery, GetShoeQueryVariables>;
export const SetShoeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetShoe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shoe"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShoeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setShoe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shoe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shoe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"style"}}]}}]}}]} as unknown as DocumentNode<SetShoeMutation, SetShoeMutationVariables>;
export const TokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Token"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<TokenQuery, TokenQueryVariables>;
export const SetShoeTokenMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetShoeTokenMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"metadata"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShoeTokenMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setShoeTokenMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"metadata"},"value":{"kind":"Variable","name":{"kind":"Name","value":"metadata"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SetShoeTokenMetadataMutation, SetShoeTokenMetadataMutationVariables>;
export const PairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Pairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pairs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shoeID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PairsQuery, PairsQueryVariables>;
export const SaveShoeTokenPairDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveShoeTokenPair"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shoeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveShoeTokenPair"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shoeID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shoeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"tokenID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shoeID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<SaveShoeTokenPairMutation, SaveShoeTokenPairMutationVariables>;