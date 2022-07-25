import ListExpenses from "../../../components/ListExpenses";
import SearchBar from "../../../components/SearchBar";
import PrivateLayout from "../../../layouts/PrivateLayout/MainLayout";
import style from "./search.module.css"

export default function Search (){



    return (
            <div className={style.Search}>
                <SearchBar/>
                <ListExpenses/>
            </div>
    )
}