import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {appSlice, AppState, ExpensesQueryParams} from "../../redux"
import { searchExpenses } from "../../services/expenses"
import style from "./SearchBar.module.css"
import sortArrow from "/public/icons/sortByArrow.svg"
import SvgSearchIcon from "./SearchIcon"




export default function SearchBar (props){
    const {setResults, userCategories, page, setPage, setError, reload} = props
    const currentUser = useSelector((state: AppState) => state.user)
    const dispatch = useDispatch() 
    const search = useRef<HTMLInputElement>(null);
    const minValue = useRef<HTMLInputElement>(null);
    const maxValue = useRef<HTMLInputElement>(null);
    const minDate = useRef<HTMLInputElement>(null);
    const maxDate = useRef<HTMLInputElement>(null);
    const category = useRef<HTMLSelectElement>(null);
    const [itemsPerPage, setItemsPerPage] = useState(5) // Estos 3 son estados ya que quiero que el fetch se realize de nuevo si cambian
    const [sortBy, setSortBy] = useState("name")
    const [desc, setDesc] = useState(1)
    const [advancedOpen, setAdvancedOpen] = useState(false)
    console.log(advancedOpen)
    
    const fetchSearch = async (token:string):Promise<any> => { //Esta es la funcion que manda a realizar la request
        var queryParams : ExpensesQueryParams = {
        search: search.current.value,
        minValue: minValue.current?.value,
        maxValue: maxValue.current?.value,
        minDate: minDate.current?.value,
        maxDate: maxDate.current?.value,
        category: category.current?.value,
        sortBy: sortBy,
        itemsPerPage: itemsPerPage,
        page: page,
        desc: desc
        }
        const response = await searchExpenses(token, queryParams)
        if(!response) {
            setError("Ha ocurrido un error") //Si no hay ninguna respuesta, algo fallo horriblemente
            setResults({totalItems:0, totalPages:0}) 
        } else if (response.data.error){
            setResults({totalItems:0, totalPages:0}) //Si hay error, mostrame porque fallo. Esto muestra si los datos puestos son errorneos.
            setError(response.data.msg)
        } else {
            setError("")
            setResults(response.data)
            dispatch(appSlice.actions.setQueryParams(queryParams))
        }
    }

    function handleClick (){ //Si hay una busqueda nueva, llevame a la página uno y traeme los resultados
        setPage(1)
        fetchSearch(currentUser.token)
    }

    useEffect(() => { //Si hay cambio de página, o se modificó un gasto, treame los gastos de esa página, o los nuevos gastos.
        fetchSearch(currentUser.token)
    }, [page, reload])
    
    useEffect(() => { //Si cambia alguno de los sorters, haceme el request de nuevo con el orden nuevo. Cabe recordar que la paginación y ordenamiento ya viene hecho por el backend, por eso se hace el request de nuevo.
        setPage(1)
        fetchSearch(currentUser.token)
    }, [sortBy, itemsPerPage, desc])


    return (
        <>
            <div className={style.SearchBar} id="searchForm">
                <div className={style.SearchBar__main}>
                    <div className={style.SearchBar__searchInput}>
                    <SvgSearchIcon className={style.searchIcon} stroke={"black"} fill={"white"} onClick={()=>handleClick()}/>
                    <input placeholder="Busque en sus gastos" form="searchForm" ref={search} id="search" onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleClick()
                        }
                    }}/>
                    </div>
                    <p className={style.SearchBar__more} onClick={()=>setAdvancedOpen(!advancedOpen)}>⋮</p>
                </div>
                
                <div className={advancedOpen? `${style.SearchBar__advanced} ${style.SearchBar__open}`: style.SearchBar__advanced}>
                    <div className={style.SearchBar__advanced_values}>
                        <input type="number" name="minValue" min={0} id="minValue" className={style.SearchBar__value} form="searchForm" ref={minValue} placeholder="Valor mínimo"/>
                        <input type="number" name="maxValue" min={0} id="maxValue" className={style.SearchBar__value} form="searchForm" ref={maxValue} placeholder="Valor máximo"/>
                    </div>

                    <div className={style.SearchBar__advanced_dates}>
                        <input type="date" name="minDate" min={0} id="minDate" className={style.SearchBar__date} form="searchForm" ref={minDate}/>
                        <input type="date" name="maxDate" min={0} id="maxDate" className={style.SearchBar__date} form="searchForm" ref={maxDate}/>
                    </div>

                    <select name="categories" id="categories" form="searchForm" ref={category} className={style.SearchBar__categories}>
                        <option value={""}>Todas las categorias</option>
                        {userCategories?.map ((category)=> <option key={category._id} value={category._id}>{category.name}</option>)}
                    </select>
                </div>   
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
                <Image src={sortArrow} className={style.arrowSort} onClick={()=>setDesc(1)}/>
                <Image src={sortArrow} className={style.arrowSortDown} onClick={()=>setDesc(-1)}/>
            </div>
        </>
    )
}