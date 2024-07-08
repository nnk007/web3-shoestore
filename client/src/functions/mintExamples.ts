"use server"
import { ShoeInput } from '@/__generated__/graphql';
import {createCoupon, simulate} from './token';
import { setShoe, setShoeTokenPair } from './graphql';
const shoes: ShoeInput[] = [
  {
    id:0,
    style:"CW2288-111/TSUT-AF01",
    colorway:"White/White",
    images:["https://images.stockx.com/360/Nike-Air-Force-1-Low-07-White-Travis-Scott-Cactus-Jack-Utopia-Edition/Images/Nike-Air-Force-1-Low-07-White-Travis-Scott-Cactus-Jack-Utopia-Edition/Lv2/img01.jpg"],
    releaseDate:"2023-07-28",
    name: "Nike Air Force 1 Low '07",
    description: `Unveiled on July 28, 2023, the Nike Air Force 1 Low Travis Scott Cactus Jack Utopia Edition is more than just a sneaker; it's the embodiment of Travis’ creative genius, this shoe echoes with the sounds and themes of his groundbreaking album, 'Utopia’.`,
    msrp: 150
  },
  {
    id:1,
    style:"DO9392-200",
    colorway:"Baroque Brown/Lemon Drop-Wheat-Chile Red",
    releaseDate:"2022-05-27",
    name: "Nike Air Max 1",
    description: `In collaboration with Travis Scott's record label Cactus Jack, the Nike Air Max 1 Travis Scott Cactus Jack Brown draws inspiration from the Nike ACG Pocket Knife hiking shoe. It features a layered mesh upper with tonal-brown Durabuck overlays and reversed Swoosh logos. A drawstring Gillie lacing system nods to common features on trail runners. At the base, a yellowed sole with a cloudy Air unit completes the design.`,
    images: ["https://images.stockx.com/360/Nike-Air-Max-1-Travis-Scott-Baroque-Brown/Images/Nike-Air-Max-1-Travis-Scott-Baroque-Brown/Lv2/img01.jpg"],
    msrp: 150
  }
]

export async function mintExamples():Promise<void> {
  return shoes.forEach(async (shoe) => {
    await setShoe(shoe);
    console.log("setShoe: ",shoe.id);
    await createCoupon(BigInt(shoe.id),BigInt(1));
    console.log("crateCoupon: ",shoe.id);
    await setShoeTokenPair(shoe.id,shoe.id);
    console.log("setPair: [",shoe.id,":",shoe.id,"]")
    return;
  })
}
