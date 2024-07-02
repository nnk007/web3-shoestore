'use client'

import { useWalletInfo, useWeb3Modal, useWeb3ModalState } from "@web3modal/wagmi/react"
import { useAccount } from "wagmi";

export default function AccountDisplay() {
    const {walletInfo} = useWalletInfo();
    const { open: openModal, close: closeModal } = useWeb3Modal()
    const { open: isModalOpen, selectedNetworkId } = useWeb3ModalState();
    const {status} = useAccount();
    return (
        <div>
            <button className="flex gap-2  items-center justify-center px-4 py-2 border rounded-3xl bg-purple-600 text-white hover:bg-purple-500 shadow-md transition-all" onClick={() => openModal()}>
                {walletInfo ? <img src={walletInfo  .icon} alt="" /> : null}
                {status=="disconnected" ? "Connect" : status=="connected" ? "View account" : "Connecting..."}
            </button>
        </div>
    )
}