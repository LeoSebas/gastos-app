import useBreakpoint from "../../../hooks/useBreakpoint";
import style from "./CategoryPageHeader.module.css"

export default function CategoryPageHeader({ category , totalSemanal, totalMensual}) {
    const {breakpoint} = useBreakpoint()
    const textResponsive =`text-xl sm:text-2xl md:text-3xl lg:text-3xl ${style.CategoryText}`

    const GastoSemanal = () => {
        return <div className="flex-1 h-full flex flex-col justify-evenly items-center rounded-3xl" style={{"background" : `${category.color}`}}>
            <h3 className={`${textResponsive} text-center`}>Últimos 7 días:</h3>
            <h3 className={`${textResponsive}`}>${totalSemanal ?? '---'}</h3>
        </div>
    }
    const GastoMensual = () => {
        return <div className="flex-1 h-full flex flex-col justify-evenly items-center rounded-3xl" style={{"background" : `${category.color}`}}>
            <h3 className={`text-center ${textResponsive}`}>Últimos 30 días:</h3>
            <h3 className={`${textResponsive}`}>${totalMensual ?? '---'}</h3>
        </div>
    }

    return ((breakpoint === 'xs') ? <div className={`flex flex-col items-center h-50 w-full rounded-3xl border border-black border-4 border-opacity-40`} style={{"background" : `${category.color}`}}>
        <h1 className={`flex-[1] p-5 ${textResponsive}`} >{category.name}</h1>
        <div className="flex-1 flex items-center w-full">
            <GastoSemanal />
            <GastoMensual />
        </div>
    </div> : <div className={`flex items-center h-40 w-full rounded-3xl border border-black border-4 border-opacity-40 `} style={{"background" : `${category.color}`}}>
        <h1 className={`flex-[2] p-5 ${textResponsive}`} >{category.name}</h1>
        <GastoSemanal />
        <GastoMensual />
    </div>)
}