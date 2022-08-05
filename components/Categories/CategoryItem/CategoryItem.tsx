import Image from "next/image"
import style from "./CategoryItem.module.css"
import deleteIcon from "/public/icons/icons8-delete-64.png"
import editIcon from "/public/icons/icons8-edit-64.png"
import {CategoryFormAction} from "../CategoryForm/CategoryForm";
import Link from "next/link";

export default function CategoryItem(props) {
    const {
        name,
        color,
        categoryID,
        handleModify,
        handleDelete
    }: { name: string, color: string, categoryID: string, handleModify: (action: CategoryFormAction, _id: string) => void, handleDelete: (action: CategoryFormAction, _id: string) => void } = props

    return (

        <div className={style.CategoryItem} style={{"background": color}}>
            
            <Link href={`/private/categories/${name}`} >
                <p className={`hover:cursor-pointer text-xl p-3 CategoryItem__name ${style.CategoryItem__name}`}>{name}</p>
            </Link>
            <div className={style.CategoryItem__options}>
                <div className={style.CategoryItem__options_item} onClick={() => {
                    handleModify(CategoryFormAction.modify, categoryID)
                }}><Image alt="edit" src={editIcon}/></div>
                <div className={style.CategoryItem__options_item} onClick={() => {
                    handleDelete(CategoryFormAction.delete, categoryID)
                }}><Image alt="delete" src={deleteIcon}/></div>
            </div>

        </div>

    )
}