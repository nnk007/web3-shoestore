import Card from "@/components/Card";
import Image from "next/image";
import { Acme } from "next/font/google";
import AccountDisplay from "@/components/AccountDisplay";
import PurchaseButton from "@/components/PurchaseButton";
import Balance from "@/components/BalanceDisplay";
import AdminLink from "@/components/AdminLink";
import Link from "next/link";
import RedeemLink from "@/components/RedeemLink";

const acme = Acme({
  weight: "400",
  subsets: ["latin"]
});


export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-2">
      <Card className="w-full p-2 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-3xl">Shoe Store</div>
          <div className="leading-none font-mono">now accepting crypto !</div>
        </div>
        <Balance />
        <div className="flex gap-2">
          <AdminLink />
          <RedeemLink/>
          <AccountDisplay />
        </div>
      </Card>
      <div className="flex gap-2 w-full">
        <Card className="p-2 w-[70%]">
          <div className="relative h-[600px] rounded-md overflow-hidden">
            <Image src={"https://images.stockx.com/360/Nike-Air-Force-1-Low-07-White-Travis-Scott-Cactus-Jack-Utopia-Edition/Images/Nike-Air-Force-1-Low-07-White-Travis-Scott-Cactus-Jack-Utopia-Edition/Lv2/img19.jpg"} alt="" fill className="object-contain" />
          </div>
        </Card>
        <Card className="w-[30%] p-2 flex flex-col gap-2 font-mono justify-between">
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-2xl">{`Nike Air Force 1 Low '07`}</div>
              <div className="text-slate-500">White (Travis Scott Cactus Jack Utopia Edition)</div>
            </div>
            <div>{`
              Unveiled on July 28, 2023, the Nike Air Force 1 Low Travis Scott Cactus Jack Utopia Edition is more than just a sneaker; it's the embodiment of Travis’ creative genius, this shoe echoes with the sounds and themes of his groundbreaking album, 'Utopia’.
              Radiating in a dominant all-white shade, this iconic silhouette carries the legacy of the Air Force 1 with a touch of Travis Scott's unique artistry. Crafted with precision, the sneaker showcases the word 'Utopia' imprinted on its heel - a direct nod to Scott's most recent album.
            `}</div>
          </div>
          <div className="flex flex-col text-center pb-4 gap-2">
            <div className="inline-block">Starting at <div className={`${acme.className} inline-flex text-xl`}><span className="overflow-hidden text-ellipsis w-[4rem] hover:w-auto">{(200 / 3500)}</span><span>ETH</span></div></div>
            <PurchaseButton basePrice={200/3500} />
          </div>
        </Card>
      </div>
    </div>
  )
}