import { GET_PAIRED_TOKENS } from "@/functions/queries";
import { useQuery } from "@apollo/client";
import { useMemo } from "react";

export default function useOwnableShoeIds(){
    const {data,loading,error} = useQuery(GET_PAIRED_TOKENS);
    const ids = useMemo(() => { return data ? data.pairs.map(pair => ({ shoeId: pair.shoeID.id, tokenId: pair.tokenID.id })) : [] }, [data]);
    return {ids,loading,error};
}