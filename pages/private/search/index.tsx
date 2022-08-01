import { useState } from "react";
import { useSelector} from "react-redux";
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
    const [reload, setReload] = useState(false)




    return (
            <div className={style.Search}>
                <SearchBar setResults={setResults} userCategories={userCategories} page={page} setPage={setPage} setError={setError} reload={reload}/>
                {(error)&& <p>{error}</p>}
                {   results?.totalPages!==0 && //La paginación no se muestra si no hay páginas. El backend devuelve el resultado de totalItems/limit redondeado hacia arriba. Por ahi es mejor que esto se haga en el frontend, por una cuestion de performance, pero dudo que afecte mucho.
                    <section className="w-11/12 lg:w-10/12 xl:w-10/12 2xl:w-8/12">
                        <ListExpenses results={results} userCategories={userCategories} setReload={setReload} reload={reload}/>
                        <div className="max-w-min">
                            <Pagination totalItems={results?.totalItems} totalPages={results?.totalPages} page={page} setPage={setPage}/>
                        </div>

                    </section>
                }
            </div>

    )
}