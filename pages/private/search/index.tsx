import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import ListExpenses from "../../../components/ListExpenses";
import { Pagination } from "../../../components/ListExpenses/Pagination";
import SearchBar from "../../../components/SearchBar";
import { AppState } from "../../../redux";
import style from "./search.module.css"



export default function Search (){
    const [results, setResults] = useState({totalItems:0, totalPages:0})
    const [page, setPage] = useState(1)
    const [error, setError] = useState('')
    const userCategories = useSelector((state: AppState) => state.categories)
    console.log(error)

    return (
            <div className={style.Search}>
                <SearchBar setResults={setResults} userCategories={userCategories} page={page} setPage={setPage} setError={setError}/>
                {(error)&& <p>{error}</p>}
                {   results?.totalPages!==0 && //La paginación no se muestra si no hay páginas. El backend devuelve el resultado de totalItems/limit redondeado hacia arriba. Por ahi es mejor que esto se haga en el frontend, por una cuestion de performance, pero dudo que afecte mucho.
                    <>
                        <ListExpenses results={results} userCategories={userCategories}/>
                        <Pagination totalItems={results?.totalItems} totalPages={results?.totalPages} page={page} setPage={setPage}/>
                    </>
                }
            </div>
    )
}