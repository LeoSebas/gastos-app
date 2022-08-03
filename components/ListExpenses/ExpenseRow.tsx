import Image from "next/image";
import style from "./Expense.module.css";
import deleteIcon from "/public/icons/icons8-delete-64.png"
import editIcon from "/public/icons/icons8-edit-64.png"
import useBreakpoint from "../../hooks/useBreakpoint";
import {useEffect, useState} from "react";


export function ExpenseRow(props) {
    const {name, value, date, _id, category, options, handleModify, handleDelete, color, open} = props
    const formattedDate = new Date(date).toLocaleDateString()
    const formattedTime = new Date(date).toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
    const {breakpoint} = useBreakpoint()

    const MobileRow = ({open}) => {
        const [showMore, setShowMore] = useState(false)

        useEffect(()=> {
            setShowMore(open)
        }, [open])

        return <div className="flex flex-col w-full z-10 h-35">
            <div className={style.Expense}>
                <p className={style.Expense__name}>{name}</p>
                {options ? <p className={style.Expense__value}>${value}</p> : <p className={style.Expense__value}>{value}</p>}
                {options ? <div className="hover: cursor-pointer p-2" onClick={() => {
                    setShowMore(!showMore)
                }}>⋮
                </div> : <p className=""></p>}
            </div>
            {showMore
                ? <div className="flex h-25 p-2 pt-5 -mt-8 -z-10 rounded-2xl overflow-hidden transition-[margin] ease-in-out delay-150 duration-500 hover:-mt-5 "
                             style={{"background": "var(--clr-main)"}}>
                <div className="flex flex-col w-full p-2 justify-around">
                    <p className="overflow-ellipsis">Fecha: {options ? formattedDate + " " + formattedTime : date}  </p>
                    <div className="flex"><p>Categoria: </p>
                        <div className="rounded-2xl px-2 " style={{"background": color}}><span>{category}</span></div>
                    </div>
                </div>
                {(options) ?
                    <div className="flex p-2">
                        <div className={style.Expense__edit} onClick={() => handleModify(_id)}><Image src={editIcon}/>
                        </div>
                        <div className={style.Expense__delete} onClick={() => handleDelete(_id)}><Image
                            src={deleteIcon}/></div>
                    </div> : <div className={style.Expense__options}></div> //Esto no me agradaaaa
                }</div> : <></>}
        </div>
    }

    const DesktopRow = () => {
       return <div className={style.Expense}>
            <p className={style.Expense__name}>{name}</p>
            <p className={style.Expense__date}>{options ? formattedDate + " " + formattedTime : date}</p>
            <p className={style.Expense__value}>{value}</p>
            <p className={style.Expense__category} style={{"background": color}}><p>{category}</p></p>
            {(options) ?
                <div className={style.Expense__options}>
                    <div className={style.Expense__edit} onClick={() => handleModify(_id)}><Image src={editIcon}/></div>
                    <div className={style.Expense__delete} onClick={() => handleDelete(_id)}><Image src={deleteIcon}/>
                    </div>
                </div> : <div className={style.Expense__options}></div> //Esto no me agradaaaa
            }
        </div>
    }
    return breakpoint === "xs" || breakpoint === "2xs" ? <MobileRow open={open}/> : (
        <DesktopRow />
    )
}