import Image from "next/image"
import style from "./CategoryItem.module.css"
import deleteIcon from "/public/icons/delete.svg"
import editIcon from "/public/icons/edit.svg"
import {CategoryFormAction} from "../CategoryForm/CategoryForm";
import { useRef, useState } from "react";

export default function CategoryItem (props){
    const{name, color, categoryID ,handleModify, handleDelete} :{name:string, color:string, categoryID:string, handleModify: (action: CategoryFormAction, _id:string) => void, handleDelete: (action: CategoryFormAction, _id:string) => void} = props
  

    return(
        <div className={style.CategoryItem} style={{"background": color}}>
            <p>{name}</p>
            <div className={style.CategoryItem__options}>
                    <div className={style.CategoryItem__options_item} onClick={()=> {handleModify(CategoryFormAction.modify, categoryID)}}><Image src={editIcon} /></div>
                    <div className={style.CategoryItem__options_item} onClick={()=> {handleDelete(CategoryFormAction.delete, categoryID)}}><Image src={deleteIcon} /> </div>
            </div>

        </div>
    )
}