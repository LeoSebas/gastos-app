export default function InputBox({ children , className} : { children? : any ,className?: string}){
    return(<div className={`flex flex-col p-3 min-w-[200px] ${className}`}>
        {children}
    </div>)
}