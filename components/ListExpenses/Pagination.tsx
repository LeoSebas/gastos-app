import { useEffect, useState } from "react"
import style from "./Pagination.module.css"
import SVGArrow from "../../assets/SVGArrow"
import SVGDoubleArrow from "../../assets/SVGDoubleArrow"
import SVGDots from "../../assets/SVGDots"



export function Pagination (props){
    const {page, setPage, totalPages} = props
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
                {(pagesArray[0]>1)&&<SVGDoubleArrow width="15%" className={style.Pagination__leftArrow} onClick={()=>setPage(1)}/>}
                {(page!==1)&&<SVGArrow width="15%" className={style.Pagination__leftArrow} onClick={()=>setPage(page-1)}/>}
                {(pagesArray[0]>1)&&<SVGDots width="15%" className={style.Pagination__dots}/>}
                {pagesArray?.map((number)=> <button key={number} className={(page===number)?`${style.Pagination__current} ${style.Pagination__numbersOdd}`:(number%2===0)?style.Pagination__numbersEven: style.Pagination__numbers} onClick={()=>setPage(number)}>{number}</button>)}
                {(pagesArray[pagesArray.length-1]<totalPages)&&<SVGDots width="15%" className={style.Pagination__dots}/>}
                {(page!==totalPages)&&<SVGArrow width="15%" className={style.Pagination__rightArrow} onClick={()=>setPage(page+1)}/>}
                {(pagesArray[pagesArray.length-1]<totalPages)&&<SVGDoubleArrow width="15%" className={style.Pagination__rightArrow} onClick={()=>setPage(totalPages)}/>}
        </div>
    )
}