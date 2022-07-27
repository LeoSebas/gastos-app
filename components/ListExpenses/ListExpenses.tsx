import { Expense } from "./Expense"
import style from "./ListExpenses.module.css"


export default function ListExpenses(props){
    const {results, userCategories} = props
    function getCategoryName(id:string){
        return userCategories[userCategories.findIndex(category =>{
            return category._id === id
        })].name
    }
    

    return (
        <div className={style.ListExpenses}>
            <div className={style.ListExpenses__list}>
                <Expense name="Name" date="Date" value="Value" category="Category"/>
                {results?.expenses?.map((expense)=> <Expense key={expense._id} name={expense.name} date={expense.date} value={expense.value} options={true} category={getCategoryName(expense.categoryID)}/>)}
            </div>
        </div>
    )
}