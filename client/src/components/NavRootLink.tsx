import Link from "next/link"
export default function HomeLink(){
    return (
        <Link className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-500 hover:bg-slate-500 hover:text-white transition-all rounded-3xl" href={"/"}>
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
        </Link>
    )
}