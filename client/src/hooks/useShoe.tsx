import { GET_SHOE } from "@/functions/queries";
import { useQuery } from "@apollo/client";

export default function useShoe(id:number){
    const {data,loading,error} = useQuery(GET_SHOE,{variables:{id:`${id}`}});
    const shoe = data ? data.shoe : null;
    return {shoe:shoe,loading,error};
}