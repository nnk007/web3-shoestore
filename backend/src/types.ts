import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ShoeTokenModel, ShoeTokenPairModel } from './models';
import { DataSourceContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  FullDate: { input: any; output: any; }
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
  releaseDate: Scalars['FullDate']['output'];
  style: Scalars['String']['output'];
};

export type ShoeInput = {
  colorway: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  images: Array<Scalars['String']['input']>;
  msrp: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  releaseDate: Scalars['FullDate']['input'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Token: ( ShoeTokenModel );
  TokenMetadata: ( ShoeTokenMetadata );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FullDate: ResolverTypeWrapper<Scalars['FullDate']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  OrderStateEnum: OrderStateEnum;
  Query: ResolverTypeWrapper<{}>;
  Shoe: ResolverTypeWrapper<Shoe>;
  ShoeInput: ShoeInput;
  ShoeToken: ResolverTypeWrapper<ShoeTokenModel>;
  ShoeTokenMetadata: ResolverTypeWrapper<ShoeTokenMetadata>;
  ShoeTokenMetadataInput: ShoeTokenMetadataInput;
  ShoeTokenPair: ResolverTypeWrapper<ShoeTokenPairModel>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Token: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Token']>;
  TokenMetadata: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['TokenMetadata']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  FullDate: Scalars['FullDate']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Order: Order;
  Query: {};
  Shoe: Shoe;
  ShoeInput: ShoeInput;
  ShoeToken: ShoeTokenModel;
  ShoeTokenMetadata: ShoeTokenMetadata;
  ShoeTokenMetadataInput: ShoeTokenMetadataInput;
  ShoeTokenPair: ShoeTokenPairModel;
  String: Scalars['String']['output'];
  Token: ResolversInterfaceTypes<ResolversParentTypes>['Token'];
  TokenMetadata: ResolversInterfaceTypes<ResolversParentTypes>['TokenMetadata'];
};

export interface FullDateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['FullDate'], any> {
  name: 'FullDate';
}

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createOrder?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'shoeID'>>;
  saveShoeTokenPair?: Resolver<Maybe<ResolversTypes['ShoeTokenPair']>, ParentType, ContextType, RequireFields<MutationSaveShoeTokenPairArgs, 'shoeID' | 'tokenID'>>;
  setShoe?: Resolver<Maybe<ResolversTypes['Shoe']>, ParentType, ContextType, RequireFields<MutationSetShoeArgs, 'shoe'>>;
  setShoeTokenMetadata?: Resolver<Maybe<ResolversTypes['ShoeTokenMetadata']>, ParentType, ContextType, RequireFields<MutationSetShoeTokenMetadataArgs, 'id' | 'metadata'>>;
};

export type OrderResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  shoeID?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['OrderStateEnum'], ParentType, ContextType>;
  tx?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  pairs?: Resolver<Array<ResolversTypes['ShoeTokenPair']>, ParentType, ContextType>;
  shoe?: Resolver<Maybe<ResolversTypes['Shoe']>, ParentType, ContextType, RequireFields<QueryShoeArgs, 'id'>>;
  shoesByToken?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryShoesByTokenArgs, 'id'>>;
  token?: Resolver<Maybe<ResolversTypes['ShoeToken']>, ParentType, ContextType, RequireFields<QueryTokenArgs, 'id'>>;
  tokensByShoe?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<QueryTokensByShoeArgs, 'id'>>;
};

export type ShoeResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Shoe'] = ResolversParentTypes['Shoe']> = {
  colorway?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  msrp?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  releaseDate?: Resolver<ResolversTypes['FullDate'], ParentType, ContextType>;
  style?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShoeTokenResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ShoeToken'] = ResolversParentTypes['ShoeToken']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['ShoeTokenMetadata'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShoeTokenMetadataResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ShoeTokenMetadata'] = ResolversParentTypes['ShoeTokenMetadata']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<ResolversTypes['Shoe'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShoeTokenPairResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ShoeTokenPair'] = ResolversParentTypes['ShoeTokenPair']> = {
  shoeID?: Resolver<ResolversTypes['Shoe'], ParentType, ContextType>;
  tokenID?: Resolver<ResolversTypes['ShoeToken'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = {
  __resolveType: TypeResolveFn<'ShoeToken', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['TokenMetadata']>, ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type TokenMetadataResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['TokenMetadata'] = ResolversParentTypes['TokenMetadata']> = {
  __resolveType: TypeResolveFn<'ShoeTokenMetadata', ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = DataSourceContext> = {
  FullDate?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Shoe?: ShoeResolvers<ContextType>;
  ShoeToken?: ShoeTokenResolvers<ContextType>;
  ShoeTokenMetadata?: ShoeTokenMetadataResolvers<ContextType>;
  ShoeTokenPair?: ShoeTokenPairResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  TokenMetadata?: TokenMetadataResolvers<ContextType>;
};

