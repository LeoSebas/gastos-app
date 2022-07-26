import { Expense } from "./Expense"
import style from "./ListExpenses.module.css"
import { Pagination } from "./Pagination"

export default function ListExpenses(props){
    const {results, userCategories} = props
    console.log(userCategories)
    function getCategoryName(id:string){
        return userCategories[userCategories.findIndex(category =>{
            return category._id === id
        })].name
    }
    

    return (
        <div className={style.ListExpenses}>
            <div className={style.ListExpenses__list}>
                <Expense name="Name" date="Date" value="Value" category="Category"/>
                {results.expenses?.map((expense)=> <Expense name={expense.name} date={expense.date} value={expense.value} options={true} category={getCategoryName(expense.categoryID)}/>)}
            </div>
            <Pagination totalItems={results.totalItems}/>
        </div>
    )
}