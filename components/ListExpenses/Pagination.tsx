import { useEffect, useState } from "react"
import style from "./Pagination.module.css"


export function Pagination (props){
    const {totalItems, page, setPage, totalPages} = props
    const [pagesArray, setPagesArray] = useState([])
    function setNumber (){
        var array = []
        var i = page-3
        var maxLimit = page+4
        if(i<=0){
            i=1
        }
        if(maxLimit > totalPages){
            maxLimit = totalPages+1
        }
        for(i; i < maxLimit; i++){
            array.push(i)
        } 
        setPagesArray(array)
    }

   useEffect(() => {
     setNumber()
   }, [page, totalPages])
   

    return (
        <div className={style.Pagination}>
            {(page!==1)&&<button onClick={()=>setPage(page-1)}>&lt;</button>}
            {pagesArray?.map((number)=> <button key={number} className={(page===number)?`${style.Pagination__current} ${style.Pagination__numbers}`:style.Pagination__numbers} onClick={()=>setPage(number)}>{number}</button>)}
            {(page!==totalPages)&&<button onClick={()=>setPage(page+1)}>&gt;</button>}
        </div>
    )
}