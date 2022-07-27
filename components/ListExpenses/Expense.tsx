import Image from "next/image";
import style from "./Expense.module.css";
import deleteIcon from "/public/icons/delete.svg"
import editIcon from "/public/icons/edit.svg"


export function Expense (props) {
    const {name, value, date, _id, category, options, handleModify, handleDelete} = props

    return (
        <div className={style.Expense}>
            <p className={style.Expense__name}>{name}</p>
            <p className={style.Expense__date}>{date}</p>
            <p className={style.Expense__value}>{value}</p>
            <p className={style.Expense__category}>{category}</p>
            {(options) ?
                <div className={style.Expense__options}>
                    <div className={style.Expense__edit} onClick={()=>handleModify(_id)}><Image src={editIcon} /></div>
                    <div className={style.Expense__delete} onClick={()=>handleDelete(_id)}><Image src={deleteIcon} /> </div>
                </div>: <div className={style.Expense__options}></div> //Esto no me agradaaaa
            }
        </div>
    )
}