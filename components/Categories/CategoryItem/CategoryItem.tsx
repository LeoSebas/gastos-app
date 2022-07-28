import Image from "next/image"
import style from "./CategoryItem.module.css"
import deleteIcon from "/public/icons/delete.svg"
import editIcon from "/public/icons/edit.svg"

export default function CategoryItem (props){
    const{name, color, categoryID} = props
    
    return(
        <div className={style.CategoryItem} style={{background: color}}>
            <p>{name}</p>
            <div className={style.CategoryItem__options}>
                    <div className={style.CategoryItem__options_item}><Image src={editIcon} /></div>
                    <div className={style.CategoryItem__options_item}><Image src={deleteIcon} /> </div>
            </div>

        </div>
    )
}