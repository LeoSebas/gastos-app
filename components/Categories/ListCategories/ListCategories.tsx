import CategoryItem from "../CategoryItem/CategoryItem"
import style from "./ListCategories.module.css"


export default function ListCategories (props){
    const{ userCategories } = props
    console.log(userCategories)
    return (
        <div>
            {userCategories?.map((category)=> <CategoryItem key={category._id} categoryID={category._id} name={category.name} color={category.color} options={true}/>)}

        </div>
    )
}