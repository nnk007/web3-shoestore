"use client"
import { useAccount } from "wagmi";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
  });

export default function Layout({children}:{children:React.ReactNode}){
    const {isDisconnected} = useAccount()
    console.log(isDisconnected);
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}