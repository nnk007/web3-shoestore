export function Modal({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`top-0 left-0 h-screen w-screen fixed z-50 ${className}`}>
            {children}
        </div>
    )
}