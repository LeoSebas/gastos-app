import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "../../redux"
import { searchExpenses } from "../../services/expenses"
import style from "./SearchBar.module.css"




export default function SearchBar (props){
    const {setResults, userCategories, page, setPage, setError} = props
    const currentUser = useSelector((state: AppState) => state.user)
    const search = useRef<HTMLInputElement>(null);
    const minValue = useRef<HTMLInputElement>(null);
    const maxValue = useRef<HTMLInputElement>(null);
    const minDate = useRef<HTMLInputElement>(null);
    const maxDate = useRef<HTMLInputElement>(null);
    const category = useRef<HTMLSelectElement>(null);
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [sortBy, setSortBy] = useState("name")
    
    const fetchSearch = async (token:string):Promise<any> => {
        var queryParams = {
        search: search.current.value,
        minValue: minValue.current?.value,
        maxValue: maxValue.current?.value,
        minDate: minDate.current?.value,
        maxDate: maxDate.current?.value,
        category: category.current?.value,
        sortBy: sortBy,
        itemsPerPage: itemsPerPage,
        page: page
        }
        const response = await searchExpenses(token, queryParams)
        if( !response || response?.data?.error) {
            setResults({totalItems:0, totalPages:0})
            console.log(response)
            setError(response.data.msg)
        } else {
            setError("")
            setResults(response.data)
            
        }
    }
    
    const handleSubmit = event => {
        event.preventDefault();
        setPage(1)
        fetchSearch(currentUser.token)
    }

    useEffect(() => {
        fetchSearch(currentUser.token)
    }, [page])
    
    useEffect(() => {
        setPage(1)
        fetchSearch(currentUser.token)
    }, [sortBy, itemsPerPage])


    return (
        <>
            <div className={style.SearchBar} id="searchForm">
                <form id="searchForm" onSubmit={handleSubmit}>
                    <input type="submit"></input>
                </form>
                <input placeholder="Busque en sus gastos" form="searchForm" ref={search} id="search"/>
                <input type="number" name="minValue" min={0} id="minValue" className={style.SearchBar__values} form="searchForm" ref={minValue}/>
                <input type="number" name="maxValue" min={0} id="maxValue" className={style.SearchBar__values} form="searchForm" ref={maxValue}/>
                <input type="date" name="minDate" min={0} id="minDate" className={style.SearchBar__dates} form="searchForm" ref={minDate}/>
                <input type="date" name="maxDate" min={0} id="maxDate" className={style.SearchBar__dates} form="searchForm" ref={maxDate}/>
                
                <select name="categories" id="categories" form="searchForm" ref={category}>
                    <option value={""}>Todas las categorias</option>
                    {userCategories?.map ((category)=> <option key={category._id} value={category._id}>{category.name}</option>)}
                </select>   
            </div>
            
            <div className={style.resultSorter}>
                <p>Items por página:</p>
                <select name="itemsPerPage" id="itemsPerPage" form="searchForm" value={itemsPerPage} onChange={d => setItemsPerPage((parseInt(d.target.value)))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
                <p>Ordenar por:</p>
                <select name="sortBy" id="sortBy" form="searchForm" value={sortBy} onChange={e => setSortBy((e.target.value))}>
                    <option value={"name"}>Nombre</option>
                    <option value={"date"}>Fecha</option>
                    <option value={"value"}>Importe</option>
                </select>
            </div>
        </>
    )
}