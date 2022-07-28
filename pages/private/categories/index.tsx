import { useSelector } from "react-redux"
import ListCategories from "../../../components/Categories/ListCategories/ListCategories"
import { AppState } from "../../../redux"
import style from "./categories.module.css"


export default function Categories (){

    const userCategories = useSelector((state: AppState) => state.categories)


    return (
        <div className={style.Categories}>
            <ListCategories userCategories={userCategories}/>


        </div>
    )

}