import { useSelector } from "react-redux"
import ListCategories from "../../../components/Categories/ListCategories/ListCategories"
import { AppState } from "../../../redux"
import style from "./categories.module.css"


export default function Categories (){

    const userCategories = useSelector((state: AppState) => state.categories)


    return (
        <div className={style.Categories}>

            <h2 className={style.Categories__title}>Categorias</h2>
            <ListCategories userCategories={userCategories}/>


        </div>
    )

}