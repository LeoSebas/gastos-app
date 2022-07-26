import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import ListExpenses from "../../../components/ListExpenses";
import SearchBar from "../../../components/SearchBar";
import PrivateLayout from "../../../layouts/PrivateLayout/MainLayout";
import { AppState } from "../../../redux";
import style from "./search.module.css"



export default function Search (){
    const [results, setResults] = useState([])
    const userCategories = useSelector((state: AppState) => state.categories)


    return (
            <div className={style.Search}>
                <SearchBar setResults={setResults} userCategories={userCategories}/>
                
                <ListExpenses results={results} userCategories={userCategories}/>
            </div>
    )
}