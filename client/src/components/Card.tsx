export default function Card({ children,className }: { children?: React.ReactNode,className?:string }) {
    return (
        <div className={`rounded-md shadow-md bg-gradient from-slate-50 to-slate-100 border-black/10 bg-white/10 ${className ?? ''}`}>
            {children}
        </div>
    )
}