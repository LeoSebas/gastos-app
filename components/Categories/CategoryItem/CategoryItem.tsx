import style from "./CategoryItem.module.css"

export default function CategoryItem (props){
    const{name, color, categoryID, options} = props
    
    return(
        <div className={style.CategoryItem}>
            CategoryItem
        </div>
    )
}