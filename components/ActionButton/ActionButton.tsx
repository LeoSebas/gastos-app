/// Asi no se enoja el TS.
type ButtonType = 'button' | 'submit' | 'reset'

export default function ActionButton({
                                         children,
                                         className,
                                         type,
                                         disabled,
                                         onClick,
                                     }: { children:any, className?: string, type: ButtonType, disabled?: boolean, onClick?: () => void }) {
    return (<button className={`text-xl p-3 rounded border border-black m-3 ${className ?? ''}`} type={type}
                    disabled={disabled} onClick={onClick}>{children}
    </button>)
}