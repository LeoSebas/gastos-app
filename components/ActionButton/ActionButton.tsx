/// Asi no se enoja el TS.
type ButtonType = 'button' | 'submit' | 'reset'

export default function ActionButton({
                                         children,
                                         className,
                                         type,
                                         disabled
                                     }: { children, className?: string, type: ButtonType, disabled?: boolean }) {
    return (<button className={`text-xl p-3 rounded border border-black m-3 ${className}`} type={type}
                    disabled={disabled}>{children}
    </button>)
}