import { GET_TOKEN } from "@/functions/queries";
import { useQuery } from "@apollo/client";

export default function useToken(id:number){
    const {data,loading,error} = useQuery(GET_TOKEN,{variables:{id:+`${id}`}});
    const token = data ? data.token : null;
    return {token:token,loading,error};
}